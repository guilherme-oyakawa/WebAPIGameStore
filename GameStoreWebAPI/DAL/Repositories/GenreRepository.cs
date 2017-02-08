using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GameStoreWebAPI.Models;
using System.Data.Entity;
using GameStoreWebAPI.ViewModels;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    public class GenreRepository : IGenreRepository, IDisposable
    {
        private StoreContext context;

        public GenreRepository(StoreContext context)
        {
            this.context = context;
        }

        public IEnumerable<Genre> GetGenres()
        {
            return context.Genres.ToList();
        }

        public Genre GetGenreByID(int? GenreID)
        {
            return context.Genres.Find(GenreID);
        }

        public async Task<Genre> GetGenreAsync(int id) {
            return await context.Genres.FindAsync(id);
        }

        public void InsertGenre(Genre Genre)
        {
            context.Genres.Add(Genre);
        }

        public void DeleteGenre(int GenreID)
        {
            Genre Genre = context.Genres.Find(GenreID);
            context.Genres.Remove(Genre);
        }

        public void UpdateGenre(Genre Genre)
        {
            context.Entry(Genre).State = EntityState.Modified;
        }

        public bool genreExists(Genre Genre)
        {
            var exists = from g in context.Genres
                         where Genre.Name == g.Name
                         select g;

            return (exists != null) ? true : false;
        }

        public IEnumerable<Game> GamesPerGenre(int id)
        {
            var games = from g in context.Games
                        where g.GenreID == id
                        select g;

            return games.ToList();
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

    }
}