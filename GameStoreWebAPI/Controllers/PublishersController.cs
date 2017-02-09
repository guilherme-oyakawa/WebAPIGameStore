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
using GameStoreWebAPI.DAL.Repositories;
using GameStoreWebAPI.DAL;
using GameStoreWebAPI.Models;

namespace GameStoreWebAPI.Controllers
{
    public class PublishersController : ApiController
    {
        private IPublisherRepository rep;
        //private StoreContext db = new StoreContext();

        public PublishersController() {
            this.rep = new PublisherRepository(new StoreContext());
        }

        // GET: api/Publishers
        [HttpGet]
        [ActionName("getPublishers")]
        public IEnumerable<Publisher> GetPublishers()
        {
            return rep.GetPublishers();
        }

        // GET: api/Publishers/5
        [HttpGet]
        [ActionName("getPublisher")]
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> GetPublisher(int id)
        {
            Publisher publisher = await rep.GetPubAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            return Ok(publisher);
        }
        /*
        //PUBLISHERS ARE NOT EDITABLE
        // PUT: api/Publishers/5
        [HttpPut]
        [ActionName("updatePublisher")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPublisher(int id, Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != publisher.PublisherID)
            {
                return BadRequest();
            }

            rep.UpdatePublisher(publisher);
            //db.Entry(publisher).State = EntityState.Modified;

            try
            {
                await rep.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublisherExists(id))
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
        */

        // POST: api/Publishers
        [HttpPost]
        [ActionName("insertPublisher")]
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> PostPublisher(Publisher publisher)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertPublisher(publisher);
            await rep.SaveAsync();

            return CreatedAtRoute("DefaultApi", new { id = publisher.PublisherID }, publisher);
        }

        // DELETE: api/Publishers/5
        [HttpDelete]
        [ActionName("deletePublisher")]
        [ResponseType(typeof(Publisher))]
        public async Task<IHttpActionResult> DeletePublisher(int id)
        {
            Publisher publisher = await rep.GetPubAsync(id);
            if (publisher == null)
            {
                return NotFound();
            }

            rep.DeletePublisher(id);
            await rep.SaveAsync();

            return Ok(publisher);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PublisherExists(int id)
        {
            return rep.GetPublishers().Count(e => e.PublisherID == id) > 0;
        }
    }
}