using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Fee {
    public class FeeDTO {
        public int FeeID;
        public decimal Value;
        public bool Paid;

        public int RentalID;
        public int CopyID;
        public string Title;

        public string Client;
    }
}