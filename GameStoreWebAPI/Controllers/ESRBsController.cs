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

namespace GameStoreWebAPI.Controllers
{
    public class ESRBsController : ApiController
    {
        private StoreContext db = new StoreContext();

        // GET: api/ESRBs
        [HttpGet]
        [ActionName("getRatings")]
        public IQueryable<ESRB> GetRatings()
        {
            return db.Ratings;
        }

        // GET: api/ESRBs/5
        [HttpGet]
        [ActionName("getRating")]
        [ResponseType(typeof(ESRB))]
        public async Task<IHttpActionResult> GetESRB(int id)
        {
            ESRB eSRB = await db.Ratings.FindAsync(id);
            if (eSRB == null)
            {
                return NotFound();
            }

            return Ok(eSRB);
        }

        /* //RATINGS ARE NOT EDITABLE

        // PUT: api/ESRBs/5
        [HttpPut]
        [ActionName("updateRating")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutESRB(int id, ESRB eSRB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != eSRB.ESRBID)
            {
                return BadRequest();
            }

            db.Entry(eSRB).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ESRBExists(id))
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

        // POST: api/ESRBs
        [HttpPost]
        [ActionName("insertRating")]
        [ResponseType(typeof(ESRB))]
        public async Task<IHttpActionResult> PostESRB(ESRB eSRB)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Ratings.Add(eSRB);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = eSRB.ESRBID }, eSRB);
        }

        // DELETE: api/ESRBs/5
        [HttpDelete]
        [ActionName("deleteRating")]
        [ResponseType(typeof(ESRB))]
        public async Task<IHttpActionResult> DeleteESRB(int id)
        {
            ESRB eSRB = await db.Ratings.FindAsync(id);
            if (eSRB == null)
            {
                return NotFound();
            }

            db.Ratings.Remove(eSRB);
            await db.SaveChangesAsync();

            return Ok(eSRB);
        }

        */

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ESRBExists(int id)
        {
            return db.Ratings.Count(e => e.ESRBID == id) > 0;
        }
    }
}