using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    public class UserSubscriptionController : Controller
    {
        private readonly ILogger<UserSubscriptionDTO> _logger;
        private readonly UserSubscriptionService _userSubscriptionSvc;
        //private readonly ITokenService _tokenService;

        public UserSubscriptionController(ILogger<UserSubscriptionDTO> logger, UserSubscriptionService subscriptionService)
        {
            _logger = logger;
            _userSubscriptionSvc = subscriptionService;
        }
        [HttpGet]
        public async Task<dynamic> GetSubscriptions() => await _userSubscriptionSvc.Read(); 
        //[HttpGet]
        //public async Task<dynamic> GetSubscription([FromBody] UserSubscriptionDTO sub) => await _userSubscriptionSvc.Find(sub.name);
        [HttpPost]
        public async Task<dynamic> CreateUserSubscription([FromBody] UserSubscriptionDTO subscription)
        {
            UserSubscriptionDTO _sub = new UserSubscriptionDTO();
            _sub = subscription;
            await _userSubscriptionSvc.CreateUserSub(_sub);
            return
                new
                {
                    message = "Subscription Added..."
                };
        }
        [HttpGet]
        public async Task<UserSubscriptionDTO> GetSubscriptionById(string id)
        {
            return await _userSubscriptionSvc.GetUserSubscriptionById(id);
        }
        [HttpPost]
        public dynamic EditSubscription(string id, [FromBody] UserSubscriptionDTO subscription)
        {
            _userSubscriptionSvc.UpdateSubscription(id, subscription);

            return new
            {
                message = "Subscription Updted Successfully..."
            };
        }
        [HttpGet]
        public async Task<dynamic> GetUserSubscriptionsByUserId(string id)
        {
         return await _userSubscriptionSvc.GetUserSubscriptionByUserId(id);
        }

    }
}
