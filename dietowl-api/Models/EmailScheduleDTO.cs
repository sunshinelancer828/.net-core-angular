using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class EmailDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string toEmail { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string subject { get; set; }
        public string body { get; set; }
        public string activationURL { get; set; }
        public DateTime? createdOn { get; set; }
        public bool? messageSentSuccessfully { get; set; }
        public string errorMessage { get; set; }
        public DateTime? sentOn { get; set; }
        public int? retryCount { get; set; }//Max retry count to be fetched from app settings
        public bool suspendEmail { get; set; } //true for not sending

    }
}
