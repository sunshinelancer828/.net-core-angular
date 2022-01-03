using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class UserMealPlanDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string fkUserId { get; set; } //string data of users(_id)
        public string fkSubscriptionId { get; set; } //string data of user-subscriptions(_id)
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public List<MealPlanDTO> Meals { get; set; }
    }
    public class MealPlanDTO
    {
        public string MealType { get; set; }
        public List<FoodCaloriesDTO> Foods { get; set; }
    }
}
