using GameStoreWebAPI.Models.DTO.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;


namespace GameStoreWebAPI.Models
{
    public class Client
    {
        public Client()
        {
            this.Active = true;
        }

        [Key]
        public int ClientID { get; set; }

        [StringLength(50, ErrorMessage = "First name cannot be longer than 50 characters.")]
        [Column("FirstName")]
        [Display(Name = "First Name")]
        public string FirstMidName { get; set; }

        [StringLength(50)]
        [Display(Name ="Last Name")]
        public string LastName { get; set; }

        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "{0:dd/MM/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime BirthDate { get; set; }

        [DefaultValue(true)]
        public bool Active { get; set; }

        public ClientDTO toDTO() {
            ClientDTO dto = new ClientDTO() {
                ClientID = this.ClientID,
                FirstMidName = this.FirstMidName,
                LastName = this.LastName,
                BirthDate = this.BirthDate,
                Active = this.Active
            };

            return dto;
        }

        public virtual ICollection<Rental> Rentals{ get; set; }

        public virtual ICollection<Fee> Fees { get; set; }
    }
}