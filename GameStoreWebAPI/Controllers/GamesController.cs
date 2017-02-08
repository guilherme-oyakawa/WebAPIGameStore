﻿using System;
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
using GameStoreWebAPI.Models.DTO.Game;
using GameStoreWebAPI.DAL.Repositories;

namespace GameStoreWebAPI.Controllers
{
    public class GamesController : ApiController
    {
        //private StoreContext db = new StoreContext();

        private IGameRepository rep;

        public GamesController() {
            this.rep = new GameRepository(new StoreContext());
        }

        // GET: api/Games
        public IEnumerable<GameDTO> GetGames()
        {
            var query = from g in rep.GetGames()
                        select g.toDTO();
            return query;
        }

        // GET: api/Games/5
        [ResponseType(typeof(GameDTO))]
        public async Task<IHttpActionResult> GetGame(int id)
        {
            Game game = await rep.GetGameAsync(id);
            if (game == null)
            {
                return NotFound();
            }

            return Ok(game.toDTO());
        }

        // PUT: api/Games/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutGame(int id, Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != game.GameID)
            {
                return BadRequest();
            }

            rep.UpdateGame(game);
            //db.Entry(game).State = EntityState.Modified;

            try
            {
                await rep.SaveAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GameExists(id))
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

        // POST: api/Games
        [ResponseType(typeof(GameDTO))]
        public async Task<IHttpActionResult> PostGame(Game game)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            rep.InsertGame(game);
            await rep.SaveAsync();
            
            return CreatedAtRoute("DefaultApi", new { id = game.GameID }, game.toDTO());
        }

        // DELETE: api/Games/5
        [ResponseType(typeof(GameDTO))]
        public async Task<IHttpActionResult> DeleteGame(int id)
        {
            Game game = await rep.GetGameAsync(id);
            if (game == null)
            {
                return NotFound();
            }
            rep.DeleteGame(id);
            await rep.SaveAsync();

            return Ok(game.toDTO());
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                rep.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool GameExists(int id)
        {
            return rep.GetGames().Count(e => e.GameID == id) > 0;
        }
    }
}