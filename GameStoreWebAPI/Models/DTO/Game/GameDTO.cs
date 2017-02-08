using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Game {
    public class GameDTO {
        public int GameId;
        public string Title;
        public int Year;
        public string Description;
        public decimal Value;

        public int GenreId;
        public string GenreName;

        public int PublisherId;
        public string PublisherName;

        public int RatingId;
        public string RatingDescription;
    }
}