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
using GameStoreWebAPI.Models.DTO.Copy;
using GameStoreWebAPI.ViewModels;
using GameStoreWebAPI.DAL.Repositories;

namespace GameStoreWebAPI.Controllers
{
    public class CopiesController : ApiController
    {
        private ICopyRepository rep;
        //private StoreContext db = new StoreContext();

        public CopiesController() {
            this.rep = new CopyRepository(new StoreContext());
        }

        // GET: api/Copies
        [HttpGet]
        [ActionName("getCopies")]
        public IEnumerable<CopyDTO> GetCopies()
        {
            var query = from c in rep.GetCopies()
                        select c.toDTO();
            return query;
        }

        // GET: api/Copies/5
        [HttpGet]
        [ActionName("getCopy")]
        [ResponseType(typeof(CopyDTO))]
        public async Task<IHttpActionResult> GetCopy(int id)
        {
            Copy copy = await rep.GetCopyAsync(id);
            if (copy == null)
            {
                return NotFound();
            }
            return Ok(copy.toDTO());
        }

        // PUT: api/Copies/5
        [HttpPut]
        [ActionName("editCopy")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutCopy(int id, Copy copy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != copy.CopyID)
            {
                return BadRequest();
            }

            rep.UpdateCopy(copy);
            //db.Entry(copy).State = EntityState.Modified;

            try
            {
                await rep.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CopyExists(id))
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

        // POST: api/Copies
        [HttpPost]
        [ActionName("insertCopy")]
        [ResponseType(typeof(CopyDTO))]
        public async Task<IHttpActionResult> PostCopy(Copy copy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertCopy(copy);
            await rep.SaveAsync();

            return CreatedAtRoute("DefaultApi", new { id = copy.CopyID }, copy.toDTO());
        }

        // DELETE: api/Copies/5
        [HttpDelete]
        [ActionName("deleteCopy")]
        [ResponseType(typeof(CopyDTO))]
        public async Task<IHttpActionResult> DeleteCopy(int id)
        {
            Copy copy = await rep.GetCopyAsync(id);
            if (copy == null)
            {
                return NotFound();
            }

            rep.DeleteCopy(id);
            await rep.SaveAsync();

            return Ok(copy.toDTO());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CopyExists(int id)
        {
            return rep.GetCopies().Count(e => e.CopyID == id) > 0;
        }
    }
}