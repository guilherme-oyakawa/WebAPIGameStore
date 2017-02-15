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
using GameStoreWebAPI.Models.DTO.Fee;
using GameStoreWebAPI.DAL.Repositories;

namespace GameStoreWebAPI.Controllers
{
    public class FeesController : ApiController
    {
        private IFeeRepository rep;
        //private StoreContext db = new StoreContext();
        public FeesController() {
            this.rep = new FeeRepository(new StoreContext());
        }

        // GET: api/Fees
        [HttpGet]
        [ActionName("getFees")]
        public IEnumerable<FeeDTO> GetFees()
        {
            var query = from f in rep.GetFees()
                        select f.toDTO();
            return query;
        }

        // GET: api/Fees/5
        [HttpGet]
        [ActionName("getFee")]
        [ResponseType(typeof(FeeDTO))]
        public async Task<IHttpActionResult> GetFee(int id)
        {
            Fee fee = await rep.GetFeeAsync(id);
            if (fee == null)
            {
                return NotFound();
            }
            return Ok(fee.toDTO());
        }

        // PUT: api/Fees/5
        [HttpPut]
        [ActionName("updateFee")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutFee(int id, Fee fee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != fee.FeeID)
            {
                return BadRequest();
            }

            rep.UpdateFee(fee);
            //db.Entry(fee).State = EntityState.Modified;

            try
            {
                await rep.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FeeExists(id))
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

        [HttpPut]
        [ActionName("payFee")]
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PayFee(int id) {
            Fee fee = await rep.GetFeeAsync(id);
            if(fee == null) {
                return BadRequest();
            }
            fee.Paid = true;
            rep.UpdateFee(fee);
            try {
                await rep.SaveAsync();
            } catch (DbUpdateConcurrencyException) {
                if (!FeeExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Fees
        [HttpPost]
        [ActionName("insertFee")]
        [ResponseType(typeof(Fee))]
        public async Task<IHttpActionResult> PostFee(Fee fee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertFee(fee);
            await rep.SaveAsync();
            return CreatedAtRoute("DefaultApi", new { id = fee.FeeID }, fee);
        }

        // DELETE: api/Fees/5
        [HttpDelete]
        [ActionName("deleteFee")]
        [ResponseType(typeof(FeeDTO))]
        public async Task<IHttpActionResult> DeleteFee(int id)
        {
            Fee fee = await rep.GetFeeAsync(id);
            if (fee == null)
            {
                return NotFound();
            }

            rep.DeleteFee(id);
            await rep.SaveAsync();

            return Ok(fee.toDTO());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FeeExists(int id)
        {
            return rep.GetFees().Count(e => e.FeeID == id) > 0;
        }
    }
}