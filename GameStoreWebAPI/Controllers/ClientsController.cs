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
using GameStoreWebAPI.Models.DTO.Client;
using GameStoreWebAPI.DAL.Repositories;

namespace GameStoreWebAPI.Controllers
{
    public class ClientsController : ApiController {

        private IClientRepository rep;

        public ClientsController() {
            this.rep = new ClientRepository(new StoreContext());
        }
        //private StoreContext db = new StoreContext();

        // GET: api/Clients
        [HttpGet]
        [ActionName("getClients")]
        public IEnumerable<ClientDTO> GetClients() {
            var query = from c in rep.GetClients()
                        select c.toDTO();
            return query;
        }

        [HttpGet]
        [ActionName("getPastClients")]
        public IEnumerable<ClientDTO> GetPastClients() {
            var query = from c in rep.GetInactiveClients()
                        select c.toDTO();
            return query;
        }

        [HttpGet]
        [ActionName("getActiveClients")]
        public IEnumerable<ClientDTO> GetActiveClients() {
            var query = from c in rep.GetActiveClients()
                        select c.toDTO();
            return query;
        }


        // GET: api/Clients/5
        [HttpGet]
        [ResponseType(typeof(ClientDTO))]
        [ActionName("getClient")]
        public async Task<IHttpActionResult> GetClient(int id) {
            var client = await rep.GetClientAsync(id);
            if (client == null) {
                return NotFound();
            }

            return Ok(client.toDTO());
        }

        // PUT: api/Clients/5
        [HttpPut]
        [ActionName("updateClient")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutClient(int id, Client client) {
            if (!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            if (id != client.ClientID) {
                return BadRequest();
            }

            rep.UpdateClient(client);
            //db.Entry(client).State = EntityState.Modified;

            try {
                await rep.SaveAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!ClientExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Clients
        [HttpPost]
        [ActionName("insertClient")]
        [ResponseType(typeof(Client))]
        public async Task<IHttpActionResult> PostClient(Client client)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertClient(client);
            await rep.SaveAsync();

            return CreatedAtRoute("DefaultApi", new { id = client.ClientID }, client);
        }

        // DELETE: api/Clients/5
        [HttpPut]
        [ActionName("deleteClient")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> DeleteClient(int id)
        {
            Client client = await rep.GetClientAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            rep.DeleteClient(id);
            await rep.SaveAsync();
            return Ok();
        }

        [HttpPut]
        [ActionName("activateClient")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> Status(int id) {
            Client client = await rep.GetClientAsync(id);
            if (client == null) {
                return NotFound();
            }
            rep.ActivateClient(id);
            await rep.SaveAsync();
            return Ok();
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClientExists(int id)
        {
            return rep.GetClients().Count(e => e.ClientID == id) > 0;
        }
    }
}