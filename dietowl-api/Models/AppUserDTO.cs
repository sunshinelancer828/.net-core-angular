using DietOwlApi.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureWebAppLinux.Models
{
    public class AppUserDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }

        [BsonElement("Email")]
        public string email { get; set; }
        public string password { get; set; }
        public byte[] passwordHash { get; set; }
        public byte[] passwordSalt { get; set; }
        public string userType { get; set; }//Type will be SA or DA or CL
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string contact { get; set; }
        public string address { get; set; }
        public string photoPath { get; set; }
        public BusinessDTO business { get; set; } //relevant for only dietitians        
        public bool changePasswordOnFirstLogin { get; set; }//if set, then on first login, user is asked to change his password
        public string generatedGUID { get; set; } //generated for resetting password/activate user
        public DateTime? guidValidTill { get; set; } //generated while creating the GUID
        public bool isUserActivated { get; set; } //user is activated by clicking on link
        public bool isPasswordChanged { get; set; } //checks whether the user has changed his password upon activation, if set
        public List<UserSubscriptionDTO> mySubscriptions { get; set; }//Subscriptions for which user is enrolled
        public List<SubscriptionDTO> subscriptionTemplates { get; set; }//default set of subscriptions set by SA. Dietian can add or modify these subscriptions
        public List<MessagesDTO> messages { get; set; }

        /// <summary>
        /// Assessment form for the client
        /// </summary>
        public List<UserAssessmentFormDTO> assessmentForms { get; set; }
        public bool requireAssessmentToBeFilled { get; set; }
        public string fkLatestAssessmentFormId { get; set; }
        public DateTime? assessmentFormFilledOn { get; set; }


        public string servicedByUser { get; set; } //string of foreign key from users(_id). Empty for SA

    }
    public class BusinessDTO
    {
        public string name { get; set; }
        public string logoPath { get; set; }
        public string description { get; set; }
        public string email { get; set; }
        public string contact { get; set; }
        public string address { get; set; }
    }
}
