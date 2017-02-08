using GameStoreWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GameStoreWebAPI.ViewModels;

namespace GameStoreWebAPI.DAL.Repositories
{
    interface IPublisherRepository : IDisposable
    {
        IEnumerable<Publisher> GetPublishers();

        IEnumerable<Game> GamesPerPublisher(int id);

        Publisher GetPubByID(int? id);

        Task<Publisher> GetPubAsync(int id);

        void InsertPublisher(Publisher Publisher);

        void DeletePublisher(int PublisherID);

        void UpdatePublisher(Publisher Publisher);

        bool publisherExists(Publisher Publisher);

        void Save();

        Task<Int32> SaveAsync();
    }
}
