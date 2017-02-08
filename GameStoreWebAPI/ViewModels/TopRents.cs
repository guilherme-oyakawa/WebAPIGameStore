using GameStoreWebAPI.DAL;
using GameStoreWebAPI.DAL.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.ViewModels
{
    public class TopRents
    {
        public string GameDetails{ get; set; }

        public int RentCount { get; set; }
    }
}