using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models.DTO.Rental {
    public class RentalDTO {
        public int RentalID;
        public DateTime LentOn;
        public DateTime DueDate;
        public decimal Price;
        public DateTime? ReturnedOn;

        public int ClientID;
        public string ClientName;

        public int CopyID;
        public string GameTitle;
        
    }
}