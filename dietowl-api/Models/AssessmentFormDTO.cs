using Microsoft.AspNetCore.Http;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public class AssessmentFormDTO
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string templateName { get; set; }
        public string  description { get; set; }
        public bool isActive { get; set; }
        public List<SectionDTO> sections { get; set; }
    }

    public class SectionDTO
    {
        public string name { get; set; }
        public string description { get; set; }
        /// <summary>
        /// user can configure to show or hide this section
        /// </summary>
        public bool isHidden { get; set; }
        /// <summary>
        /// Order how the sections needs to be displayed
        /// </summary>
        public int order { get; set; }
        public List<QuestionAnswerDTO> questions { get; set; }
    }

    public class QuestionAnswerDTO
    {
        public string name { get; set; }
        public string helpText { get; set; }
        public string questionType { get; set; }
        public List<string> choices { get; set; }
        public bool isRequired { get; set; }

        public List<string> answer { get; set; }
        public IFormFile file { get; set; }//to be used while sending the form
        public string filePath { get; set; }//required for user after submitting
        public DateTime? dateTime { get; set; }
    }

    public enum QuestionType
    {
        ShortAnswer,
        Paragraph,
        MultipleChoice,
        Checkboxes,
        Dropdown,
        FileUpload,
        Date,
        Time
    }
}
