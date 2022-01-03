using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class SubscriptionService
    {
        private readonly IMongoCollection<SubscriptionDTO> _subscription;

        public SubscriptionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _subscription = database.GetCollection<SubscriptionDTO>("subscriptions");
        }
        public async Task<SubscriptionDTO> CreateSub(SubscriptionDTO subscription)
        {
            await _subscription.InsertOneAsync(subscription);
            return subscription;
        }

        public async Task<IList<SubscriptionDTO>> Read()
        {
            List<SubscriptionDTO> subscription = await _subscription.Find(subscription => true).ToListAsync();
            return subscription;
        }
        public async Task<SubscriptionDTO> Find(String name)
        {
            return await _subscription.Find(sub => sub.name == name).SingleOrDefaultAsync();
        }
        public SubscriptionDTO UpdateSubscription(string id, SubscriptionDTO editSub)
        {
            editSub._id = id;
            _subscription.ReplaceOne(zip => zip._id == editSub._id, editSub);
            return editSub;
        }
        public async Task<IList<SubscriptionDTO>> GetSubscriptionsByUserType(string userType)
        {
            return await _subscription.Find(sub => sub.subscriptionType == userType).ToListAsync();
        }
        public async Task<SubscriptionDTO> GetSubscriptionById(string id)
        {
            return await _subscription.Find(sub => sub._id == id).SingleOrDefaultAsync();
        }

    }
}
