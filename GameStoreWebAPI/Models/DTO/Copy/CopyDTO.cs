using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Copy {
    public class CopyDTO {
        public bool Available;
        public int CopyId;
        public int Gameid;
        public string GameTitle;
        public int GameYear;

        public int PublisherId;
        public string PublisherName;

        public int GenreId;
        public string GenreName;

    }
}