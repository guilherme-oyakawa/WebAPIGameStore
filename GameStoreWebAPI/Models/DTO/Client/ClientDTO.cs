using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Client {
    public class ClientDTO {
        public int id;
        public string fmname;
        public string lname;
        public DateTime birth;
        public bool active;
    }
}