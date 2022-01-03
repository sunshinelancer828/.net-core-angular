using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class UserVitalsDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string fkUserSubscriptionId { get; set; }//string of user-subscription(_id)
        public string fkVitalId { get; set; }//string of vitals(_id)
        public decimal reading { get; set; }
        public DateTime createdOn { get; set; }
        public string notes { get; set; }
    }
}
