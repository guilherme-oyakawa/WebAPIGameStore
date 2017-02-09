using GameStoreWebAPI.Models.DTO.Copy;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace GameStoreWebAPI.Models
{
    public class Copy
    {
        public Copy()
        {
            this.Available = true;
        }
        public int CopyID { get; set; }

        [ForeignKey("Game")]
        public int GameID { get; set; }

        public bool Available { get; set; }

        public string CopyTitle
        {
            get
            {
                return Game.Title;
            }
        }

        public string Details
        {
            get
            {
                string details = "";
                try
                {
                    details = (this.Game.Title + " (" + this.Game.Publisher.Name + ", " + this.Game.Year.Year + ")");
                }
                catch (NullReferenceException)
                {
                    ;
                }
                return details;
            }
        }

        public CopyDTO toDTO() {
            CopyDTO dto = new CopyDTO() {
                Available = this.Available,
                CopyID = this.CopyID,
                GameID = this.GameID,
                GameTitle = this.Game.Title,
                GameYear = this.Game.Year.Year,


                GenreID = this.Game.GenreID,
                GenreName = this.Game.Genre.Name,

                PublisherID = this.Game.PublisherID,
                PublisherName = this.Game.Publisher.Name
            };
            return dto;
        }

        public virtual Game Game { get; set; }
    }
}