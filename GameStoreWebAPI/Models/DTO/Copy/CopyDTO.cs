using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Copy {
    public class CopyDTO {
        public bool Available;
        public int CopyID;
        public int GameID;
        public string GameTitle;
        public int GameYear;

        public int PublisherID;
        public string PublisherName;

        public int GenreID;
        public string GenreName;

    }
}