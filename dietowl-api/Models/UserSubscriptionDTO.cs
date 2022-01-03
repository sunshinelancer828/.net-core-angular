using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class UserSubscriptionDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string fkUserId { get; set; } //string data of users(_id)
        public SubscriptionDTO subscriptionDetails { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDate { get; set; }
        public bool isActive { get; set; }
        public decimal subscriptionAmount { get; set; }
        public decimal paidAmount { get; set; }
        public string notes { get; set; }
        public List<UserVitalsDTO> vitalReadings { get; set; }
    }
}
