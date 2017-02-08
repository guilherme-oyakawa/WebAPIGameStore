﻿using GameStoreWebAPI.Models;
using GameStoreWebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace GameStoreWebAPI.DAL.Repositories
{
    public class RentalRepository : IRentalRepository, IDisposable
    {
        private StoreContext context;
        public RentalRepository(StoreContext context)
        {
            this.context = context;
        }

        public IEnumerable<Rental> GetRentals()
        {
            return context.Rentals.ToList();
        }

        public IEnumerable<Rental> GetReturnedRentals()
        {
            var rentals = from rental in context.Rentals
                          where rental.ReturnedOn != null
                          select rental;
            return (rentals.ToList());
        }
        public IEnumerable<Rental> GetCurrentRentals()
        {
            var rentals = from rental in context.Rentals
                          where rental.ReturnedOn == null
                          select rental;
            return (rentals.ToList());
        }

        public IEnumerable<Rental> GetRentalsPerClient(int? id)
        {
            var rentals = from rental in context.Rentals
                          where rental.ClientID == id
                          select rental;
            return rentals.ToList();
        }

        public IEnumerable<Client> GetClientsWithRentals()
        {
            var clients = from r in context.Rentals
                          group r by r.Client into s
                          select s.Key;
            return clients.ToList();
        }

        public IEnumerable<Client> GetClientByRental(int? id)
        {
            var client = from r in context.Rentals
                         where r.RentalID == id
                         select r.Client;
            return client;
        }

        public IEnumerable<Copy> GetCopyByRental(int? id)
        {
            var copy = from r in context.Rentals
                       where r.RentalID == id
                       select r.Copy;
            return copy.ToList();
        }

        public Rental GetRentalByID(int? RentalID)
        {
            return context.Rentals.Find(RentalID);
        }

        public async Task<Rental> GetRentalAsync(int id) {
            return await context.Rentals.FindAsync(id);
        }

        public void InsertRental(Rental Rental)
        {
            context.Rentals.Add(Rental);
        }

        public void DeleteRental(int RentalID)
        {
            Rental Rental = context.Rentals.Find(RentalID);
            context.Rentals.Remove(Rental);
        }

        public void UpdateRental(Rental Rental)
        {
            context.Entry(Rental).State = EntityState.Modified;
        }


        public void Save()
        {
            context.SaveChanges();
        }

        public async Task<Int32> SaveAsync() {
            return await context.SaveChangesAsync();
        }

        private bool disposed = false;
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Copy> GetAvailableCopies()
        {
            var query = from copy in context.Copies
                        where copy.Available == true
                        orderby copy.Game.Title
                        select copy;
            return query.ToList();
        }

        public IEnumerable<Client> GetActiveClients()
        {
            var query = from c in context.Clients
                        where c.Active == true
                        select c;
            return (query.ToList());
        }

        public IEnumerable<Copy> GetCopies()
        {
            return context.Copies.ToList();
        }

        public void InsertFee(Fee Fee)
        {
            context.Fees.Add(Fee);
        }


        public void ReturnCopy(int CopyID)
        {
            context.Database.ExecuteSqlCommand("EXEC ReturnCopy @copy = {0}", CopyID);
        }

    }
}