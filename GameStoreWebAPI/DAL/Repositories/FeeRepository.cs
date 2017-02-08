﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameStoreWebAPI.Models;
using System.Data.Entity;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    public class FeeRepository : IFeeRepository, IDisposable
    {
        private StoreContext context;

        public FeeRepository(StoreContext context)
        {
            this.context = context;
        }

        public IEnumerable<Fee> GetFees()
        {
            return context.Fees.ToList();
        }

        public IEnumerable<Fee> GetCurrentFees()
        {
            var fees = from fee in context.Fees
                       where fee.Paid == false
                       select fee;
            return fees;
        }
        public IEnumerable<Fee> GetPaidFees()
        {
            var fees = from fee in context.Fees
                       where fee.Paid == true
                       select fee;
            return fees.ToList();

        }

        public IEnumerable<Fee> GetFeesPerClient(int? id)
        {
            var fees = from fee in context.Fees
                       where fee.Rental.ClientID == id
                       select fee;
            return fees.ToList();
        }

        public IEnumerable<Client> GetClientsWithFees()
        {
            var clients = from f in context.Fees
                          group f by f.Rental.Client into c
                          select c.Key;
            return clients.ToList();
        }

        public Fee GetFeeByID(int? FeeID)
        {
            return context.Fees.Find(FeeID);
        }

        public async Task<Fee> GetFeeAsync(int id) {
            return await context.Fees.FindAsync(id);
        }

        public void InsertFee(Fee Fee)
        {
            context.Fees.Add(Fee);
        }

        public void DeleteFee(int FeeID)
        {
            Fee Fee = context.Fees.Find(FeeID);
            context.Fees.Remove(Fee);
        }

        public void UpdateFee(Fee Fee)
        {
            context.Entry(Fee).State = EntityState.Modified;
        }

        public void Save()
        {
            context.SaveChanges();
        }

        public IEnumerable<Rental> GetRentals()
        {
            return context.Rentals.ToList();
        }

        public void PayFee(int FeeID)
        {
            context.Database.ExecuteSqlCommand("EXEC PayFee @Fee = {0}", FeeID);
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

        public async Task<Int32> SaveAsync() {
            return await context.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}