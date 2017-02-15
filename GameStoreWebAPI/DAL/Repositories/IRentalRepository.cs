﻿using GameStoreWebAPI.Models;
using GameStoreWebAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    interface IRentalRepository : IDisposable
    {
        IEnumerable<Rental> GetRentals();
        IEnumerable<Rental> GetReturnedRentals();
        IEnumerable<Rental> GetCurrentRentals();

        Rental GetRentalByID(int? RentalID);

        Task<Copy> GetCopyAsync(int id);

        Task<Rental> GetRentalAsync(int id);
        IEnumerable<Client> GetClientsWithRentals();

        IEnumerable<Rental> GetRentalsPerClient(int? id);

        IEnumerable<Client> GetClientByRental(int? id);

        IEnumerable<Copy> GetCopyByRental(int? id);

        void InsertRental(Rental Rental);
        void DeleteRental(int RentalID);
        void UpdateRental(Rental Rental);

        void UpdateCopy(Copy Copy);
        IEnumerable<Copy> GetAvailableCopies();
        //IEnumerable<Client> GetClients();
        IEnumerable<Client> GetActiveClients();
        
        IEnumerable<Copy> GetCopies();
        void InsertFee(Fee Fee);
        void ReturnCopy(int CopyID);
        void Save();

        Task<Int32> SaveAsync();
    }
}
