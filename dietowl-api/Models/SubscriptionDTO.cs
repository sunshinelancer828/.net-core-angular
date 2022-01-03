using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class SubscriptionDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string name { get; set; }
        public string subscriptionType { get; set; } //D-Dietitian or C-Client
        public string detail { get; set; }
        public int duration { get; set; }
        public string durationType { get; set; } // D-Days or M-Months or W-Weeks or Q-Quartrly or Y-Yearly
        public decimal amount { get; set; }
        public decimal offerAmount { get; set; }
        public bool isActive { get; set; }
    }
}
