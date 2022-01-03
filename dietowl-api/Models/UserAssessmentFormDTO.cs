using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class UserAssessmentFormDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string fkUserId { get; set; }
        public AssessmentFormDTO assessmentForm { get; set; }
        public DateTime submittedOn { get; set; }
        public bool isValid { get; set; }
    }
}
