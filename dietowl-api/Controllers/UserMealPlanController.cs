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
    public class UserMealPlanController : Controller
    {
        private readonly ILogger<UserMealPlanDTO> _logger;
        private readonly UserMealPlanService _userMealPlanSvc;
        //private readonly ITokenService _tokenService;


        public UserMealPlanController(ILogger<UserMealPlanDTO> logger, UserMealPlanService userMealPlan)
        {
            _logger = logger;
            _userMealPlanSvc = userMealPlan;
        }
        [HttpGet]
        public async Task<dynamic> GetUserMealPlans() => await _userMealPlanSvc.Read();
       /* [HttpGet]
        public async Task<dynamic> GetUserMealPlan([FromBody] UserMealPlanDTO sub) => await _userMealPlanSvc.Find(sub.);*/
        [HttpPost]
        public async Task<dynamic> CreateUserMealPlan([FromBody] UserMealPlanDTO userMealPlan)
        {
            UserMealPlanDTO _meal = new UserMealPlanDTO();
            _meal = userMealPlan;
            await _userMealPlanSvc.CreateUserMealPlan(_meal);
            return
                new
                {
                    message = "User Meal Plan Added..."
                };
        }
        [HttpGet]
        public async Task<UserMealPlanDTO> GetUserMealById(string id)
        {
            return await _userMealPlanSvc.GetUserMealById(id);
        }

       [HttpGet]
        public async Task<UserMealPlanDTO> GetUserMealByUserId(string id)
        {
            return await _userMealPlanSvc.GetUserMealByUserId(id);
        } 
        [HttpPost]
        public dynamic EditUserMeal(string id, [FromBody] UserMealPlanDTO userMeal)
        {
            _userMealPlanSvc.UpdateUserMealPlan(id, userMeal);

            return new
            {
                message = "User Meal Updted Successfully..."
            };
        }

    }
}
