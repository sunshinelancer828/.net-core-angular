using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class UserMealPlanService
    {
        private readonly IMongoCollection<UserMealPlanDTO> _userMealPlan;

        public UserMealPlanService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userMealPlan = database.GetCollection<UserMealPlanDTO>("user-meal-plans");
        }
        public async Task<UserMealPlanDTO> CreateUserMealPlan(UserMealPlanDTO subscription)
        {
            await _userMealPlan.InsertOneAsync(subscription);
            return subscription;
        }

        public async Task<IList<UserMealPlanDTO>> Read()
        {
            List<UserMealPlanDTO> subscription = await _userMealPlan.Find(subscription => true).ToListAsync();
            return subscription;
        }
        public async Task<UserMealPlanDTO> Find(String id)
        {
            return await _userMealPlan.Find(meal => meal._id == id).SingleOrDefaultAsync();
        }
        public UserMealPlanDTO UpdateUserMealPlan(string id, UserMealPlanDTO editMeal)
        {
            editMeal._id = id;
            _userMealPlan.ReplaceOne(zip => zip._id == editMeal._id, editMeal);
            return editMeal;
        }
       public async Task<UserMealPlanDTO> GetUserMealByUserId(string userId)
        {
            return await _userMealPlan.Find(sub => sub.fkUserId==userId).SingleOrDefaultAsync();
        } 
        public async Task<UserMealPlanDTO> GetUserMealById(string id)
        {
            return await _userMealPlan.Find(sub => sub._id == id).SingleOrDefaultAsync();
        }
    }
}
