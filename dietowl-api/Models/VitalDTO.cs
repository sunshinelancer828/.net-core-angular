using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class VitalDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string name { get; set; }
        public string vitalGroup { get; set; } //Certain vitals can come in groups eg BP has systolic and diastolic.
        public string description { get; set; }
        public string readingsCaptured { get; set; } //D-Daily or W-Weekly or M-Monthly
        public decimal minThreshold { get; set; }
        public decimal maxThreshold { get; set; }
        public bool hasMinThreshold { get; set; }
        public bool hasMaxThreshold { get; set; }
        public bool alertBelowMin { get; set; }
        public bool alertAboveMin { get; set; }
        public bool alertAboveMax { get; set; }
        public bool alertBelowMax { get; set; }

    }
}
