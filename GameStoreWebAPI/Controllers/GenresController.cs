using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using GameStoreWebAPI.DAL;
using GameStoreWebAPI.Models;
using GameStoreWebAPI.DAL.Repositories;

namespace GameStoreWebAPI.Controllers
{
    public class GenresController : ApiController
    {
        private IGenreRepository rep;
        //private StoreContext db = new StoreContext();

        public GenresController() {
            this.rep = new GenreRepository(new StoreContext());
        }

        // GET: api/Genres
        public IEnumerable<Genre> GetGenres()
        {
            return rep.GetGenres();
        }

        // GET: api/Genres/5
        [ResponseType(typeof(Genre))]
        public async Task<IHttpActionResult> GetGenre(int id)
        {
            Genre genre = await rep.GetGenreAsync(id);
            if (genre == null)
            {
                return NotFound();
            }

            return Ok(genre);
        }

        // PUT: api/Genres/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutGenre(int id, Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != genre.GenreID)
            {
                return BadRequest();
            }

            rep.UpdateGenre(genre);
            //db.Entry(genre).State = EntityState.Modified;

            try
            {
                await rep.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenreExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Genres
        [ResponseType(typeof(Genre))]
        public async Task<IHttpActionResult> PostGenre(Genre genre)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertGenre(genre);
            await rep.SaveAsync();

            return CreatedAtRoute("DefaultApi", new { id = genre.GenreID }, genre);
        }

        // DELETE: api/Genres/5
        [ResponseType(typeof(Genre))]
        public async Task<IHttpActionResult> DeleteGenre(int id)
        {
            Genre genre = await rep.GetGenreAsync(id);
            if (genre == null)
            {
                return NotFound();
            }

            rep.DeleteGenre(id);
            await rep.SaveAsync();

            return Ok(genre);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GenreExists(int id)
        {
            return rep.GetGenres().Count(e => e.GenreID == id) > 0;
        }
    }
}