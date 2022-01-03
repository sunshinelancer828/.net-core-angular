using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    public class FoodCaloriesController : Controller
    {
        private readonly ILogger<FoodCaloriesDTO> _logger;
        private readonly FoodCaloriesService _foodCaloriesSvc;

        public FoodCaloriesController(ILogger<FoodCaloriesDTO> logger, FoodCaloriesService foodCaloriesService)
        {
            _logger = logger;
            _foodCaloriesSvc = foodCaloriesService;
        }
        [HttpGet]
        public async Task<dynamic> GetFoodCalories() =>
            await _foodCaloriesSvc.Read();

        [HttpGet]
        public async Task<FoodCaloriesDTO> GetFoodCaloriesById(string foodId) =>
            await _foodCaloriesSvc.GetFoodCaloriesById(foodId);


        [HttpGet]
        public async Task<FoodCaloriesDTO> GetFoodCaloriesByName(string foodName) =>
            await _foodCaloriesSvc.GetFoodCaloriesByName(foodName);
        [HttpPost]
        public async Task<dynamic> CreateFoodCalories([FromBody] FoodCaloriesDTO food)
        {
            FoodCaloriesDTO _food = new FoodCaloriesDTO();
            _food = food;
            await _foodCaloriesSvc.CreateFoodCalories(_food);
            return new
            {
                message = "Added Success fully"
            };
        }

        [HttpPost]
        public dynamic UpdateFoodCalorie(string id, [FromBody] FoodCaloriesDTO upadateFood)
        {
            _foodCaloriesSvc.UpdateFoodCalories(id, upadateFood);
            return new
            {
                message = "Updated Success fully"
            };
        }
    }
}
