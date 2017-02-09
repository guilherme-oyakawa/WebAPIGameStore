using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Game {
    public class GameDTO {
        public int GameID;
        public string Title;
        public int Year;
        public string Description;
        public decimal Value;

        public int GenreID;
        public string GenreName;

        public int PublisherID;
        public string PublisherName;

        public int RatingID;
        public string RatingDescription;
    }
}