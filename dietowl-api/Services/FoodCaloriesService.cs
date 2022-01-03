using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class FoodCaloriesService
    {
        private readonly IMongoCollection<FoodCaloriesDTO> _foodCalories;

        public FoodCaloriesService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _foodCalories = database.GetCollection<FoodCaloriesDTO>("food-calories");
        }
        public async Task<FoodCaloriesDTO> CreateFoodCalories(FoodCaloriesDTO food)
        {
            await _foodCalories.InsertOneAsync(food);
            return food;
        }

        public async Task<IList<FoodCaloriesDTO>> Read()
        {
            List<FoodCaloriesDTO> food = await _foodCalories.Find(food => true).ToListAsync();
            return food;
        }
        public async Task<FoodCaloriesDTO> Find(String name)
        {
            return await _foodCalories.Find(food => food._id == name).SingleOrDefaultAsync();
        }
        public FoodCaloriesDTO UpdateFoodCalories(string id, FoodCaloriesDTO editFood)
        {
            editFood._id = id;
            _foodCalories.ReplaceOne(zip => zip._id == editFood._id, editFood);
            return editFood;
        }

        public async Task<FoodCaloriesDTO> GetFoodCaloriesById(string id)
        {
            return await _foodCalories.Find(food => food._id == id).SingleOrDefaultAsync();
        }
        public async Task<FoodCaloriesDTO> GetFoodCaloriesByName(string name)
        {
            return await _foodCalories.Find(food => food.name == name).SingleOrDefaultAsync();
        }
        public async Task<IList<FoodCaloriesDTO>> GetFoodCaloriesByUserId(string id)
        {
            return await _foodCalories.Find(food => food._id == id).ToListAsync();
        }

    }
}
