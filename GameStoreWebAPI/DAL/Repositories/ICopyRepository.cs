using GameStoreWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    interface ICopyRepository: IDisposable
    {
        IEnumerable<Copy> GetCopies();
        IEnumerable<Copy> GetAvailableCopies();
        IEnumerable<Copy> GetCopiesPerGame(int GameID);

        Copy GetCopyByID(int? CopyID);
        void InsertCopy(Copy Copy);
        void DeleteCopy(int CopyID);
        void UpdateCopy(Copy Copy);
        IEnumerable<Game> GetGames();

        IEnumerable<Game> GetCopyGame(int? id);

        Task<Copy> GetCopyAsync(int id);

        Task<Int32> SaveAsync();

        void Save();
    }
}
