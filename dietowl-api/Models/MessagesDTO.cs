using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class MessagesDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string fkFromUserId { get; set; }//string of foreign key from users(_id)
        public string fkToUserId { get; set; }//string of foreign key from users(_id)
        public string message { get; set; }
        public DateTime sentOn { get; set; }
        public DateTime? readOn { get; set; }
        public bool isDeleted { get; set; }
        public DateTime? deletedOn { get; set; }
    }
}
