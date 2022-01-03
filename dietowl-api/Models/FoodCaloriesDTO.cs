using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class FoodCaloriesDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string name { get; set; }
        public int totalCalories { get; set; }
        public TypeDTO types { get; set; }
    }
    public class TypeDTO
    {
        public string type { get; set; }
        public string portion { get; set; }
        public string portionType { get; set; }
        public int count { get; set; }
    }
}
