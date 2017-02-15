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
        public int GameID;
        public string GameTitle;
        public decimal GameValue;

        public decimal RentalFee() {
            DateTime ret = DateTime.Now;
            decimal value = 0;
            if (DateTime.Compare(ret, this.DueDate) > 0) {
                int delay = (ret - this.DueDate).Days;
                value = this.GameValue * delay * 0.1m;
            }
            return value;
        }
    }
}