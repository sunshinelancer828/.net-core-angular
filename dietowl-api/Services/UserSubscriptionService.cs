using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class UserSubscriptionService
    {
        private readonly IMongoCollection<UserSubscriptionDTO> _userSubscription;

        public UserSubscriptionService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userSubscription = database.GetCollection<UserSubscriptionDTO>("user-subscriptions");
        } 
        public async Task<UserSubscriptionDTO> CreateUserSub(UserSubscriptionDTO usersubscription)
        {
            await _userSubscription.InsertOneAsync(usersubscription);
            return usersubscription;
        }

        public async Task<IList<UserSubscriptionDTO>> Read()
        {
            List<UserSubscriptionDTO> subscription = await _userSubscription.Find(subscription => true).ToListAsync();
            return subscription;
        }
        public async Task<UserSubscriptionDTO> Find(String name)
        {
            return await _userSubscription.Find(sub => sub.fkUserId == name).SingleOrDefaultAsync();
        }
        public UserSubscriptionDTO UpdateSubscription(string id, UserSubscriptionDTO editSub)
        {
            editSub._id = id;
            _userSubscription.ReplaceOne(zip => zip._id == editSub._id, editSub);
            return editSub;
        }

        public async Task<UserSubscriptionDTO> GetUserSubscriptionById(string id)
        {
            return await _userSubscription.Find(sub => sub._id == id).SingleOrDefaultAsync();
        }
        public async Task<IList<UserSubscriptionDTO>> GetUserSubscriptionByUserId(string id)
        {
            return await _userSubscription.Find(sub => sub.fkUserId == id).ToListAsync();
        }
    }
}
