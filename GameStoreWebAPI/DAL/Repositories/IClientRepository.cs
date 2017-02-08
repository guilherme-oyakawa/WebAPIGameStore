using System;
using System.Collections.Generic;
using GameStoreWebAPI.Models;
using GameStoreWebAPI.ViewModels;
using GameStoreWebAPI.Models.DTO.Client;
using System.Threading.Tasks;

namespace GameStoreWebAPI.DAL.Repositories
{
    public interface IClientRepository : IDisposable
    {
        IEnumerable<Client> GetClients();
        IEnumerable<Client> GetActiveClients();
        IEnumerable<Client> GetInactiveClients();
        IEnumerable<Game> AvailableGames(int age);

        Task<Client> GetClientAsync(int id);

        Client GetClientByID(int? ClientID);
        void InsertClient(Client Client);
        void DeleteClient(int ClientID);
        void ActivateClient(int ClientID);
        void UpdateClient(Client Client);
        void Save();
        Task<Int32> SaveAsync();
    }
}