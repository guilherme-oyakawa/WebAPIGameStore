using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Client {
    public class ClientDTO {
        public int ClientID;
        public string FirstMidName;
        public string LastName;
        public DateTime BirthDate;
        public bool Active;
    }
}