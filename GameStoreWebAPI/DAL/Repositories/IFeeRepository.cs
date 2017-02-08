using GameStoreWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace GameStoreWebAPI.DAL.Repositories
{
    public interface IFeeRepository : IDisposable
    {
        IEnumerable<Fee> GetFees();
        IEnumerable<Fee> GetCurrentFees();
        IEnumerable<Fee> GetPaidFees();

        IEnumerable<Fee> GetFeesPerClient(int? id);

        Task<Fee> GetFeeAsync(int id);

        IEnumerable<Client> GetClientsWithFees();

        Fee GetFeeByID(int? FeeID);
        void InsertFee(Fee Fee);
        void DeleteFee(int FeeID);
        void UpdateFee(Fee Fee);

        void PayFee(int FeeID);

        Task<Int32> SaveAsync();

        IEnumerable<Rental> GetRentals();
        void Save();
    }
}