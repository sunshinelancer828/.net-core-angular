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
    /// <summary>
    /// Subscription master which will be added and modified only by Super Admins(SA)
    /// Others will only read from it
    /// </summary>
    public class SubscriptionController : ControllerBase
    {
        private readonly ILogger<SubscriptionDTO> _logger;
        private readonly SubscriptionService _subscriptionSvc;
        //private readonly ITokenService _tokenService;


        public SubscriptionController(ILogger<SubscriptionDTO> logger, SubscriptionService subscriptionService)
        {
            _logger = logger;
            _subscriptionSvc = subscriptionService;
        }
        [HttpGet]
        public async Task<dynamic> GetSubscriptions() => await _subscriptionSvc.Read();
        [HttpGet]
        public async Task<dynamic> GetSubscription([FromBody] SubscriptionDTO sub) => await _subscriptionSvc.Find(sub.name);
        [HttpPost]
        public async Task<dynamic> CreateSubscription([FromBody] SubscriptionDTO subscription)
        {
            SubscriptionDTO _sub = new SubscriptionDTO();
            _sub = subscription;
            await _subscriptionSvc.CreateSub(_sub);
            return
                new
                {
                    message = "Subscription Added..."
                };
        }
        [HttpGet]
        public async Task<SubscriptionDTO> GetSubscriptionById(string id)
        {
            return await _subscriptionSvc.GetSubscriptionById(id);
        }

        [HttpGet]
        public async Task<dynamic> GetSubscriptionsByUserType(string userType)
        {
           return await _subscriptionSvc.GetSubscriptionsByUserType(userType);
        }
        [HttpPost]
        public dynamic EditSubscription(string id, [FromBody] SubscriptionDTO subscription)
        {
            _subscriptionSvc.UpdateSubscription(id, subscription);

            return new
            {
                message = "Subscription Updted Successfully..."
            };
        }


    }
}
