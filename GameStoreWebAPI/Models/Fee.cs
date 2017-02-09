using GameStoreWebAPI.Models.DTO.Fee;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models
{
    public class Fee
    {
        [Key]
        public int FeeID { get; set; }

        [ForeignKey("Rental")]
        public int RentalID { get; set; }

        [DataType(DataType.Currency)]
        [Column(TypeName = "money")]
        public decimal Value { get; set; }

        [DefaultValue(false)]
        public bool Paid { get; set; }

        public FeeDTO toDTO() {
            FeeDTO dto = new FeeDTO() {
                FeeID = this.FeeID,
                Value = this.Value,
                Paid = this.Paid,

                RentalID = this.RentalID,
                CopyID = this.Rental.CopyID,
                Title = (this.Rental.Copy.Game.Title +
                                    " (" + this.Rental.Copy.Game.Year.Year +
                                    ", " + this.Rental.Copy.Game.Publisher.Name + ")"),

                Client = this.Rental.Client.FirstMidName + " " + this.Rental.Client.LastName
            };
            return dto;
        }

        public virtual Rental Rental { get; set; }
    }
}