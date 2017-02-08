using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameStoreWebAPI.Models;
using System.Data.Entity;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    public interface IGameRepository : IDisposable
    {
        IEnumerable<Game> GetGames();
        Game GetGameByID(int? GameID);

        Task<Game> GetGameAsync(int id);
        void InsertGame(Game Game);
        void DeleteGame(int GameID);
        void UpdateGame(Game Game);
        void Save();
        bool gameExists(Game game);
        IEnumerable<Genre> getGenres();
        IEnumerable<Publisher> getPublishers();
        IEnumerable<ESRB> GetRatings();

        Task<Int32> SaveAsync();
        IEnumerable<Game> GetGamesByRating(int rating);
    }
}