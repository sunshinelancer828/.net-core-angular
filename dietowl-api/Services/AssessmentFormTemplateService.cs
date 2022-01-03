using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class AssessmentFormTemplateService
    {
        private readonly IMongoCollection<AssessmentFormDTO> _assessmentFormTemplate;

        public AssessmentFormTemplateService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _assessmentFormTemplate = database.GetCollection<AssessmentFormDTO>("assessment-form-templates");
        }
        public async Task<AssessmentFormDTO> Create(AssessmentFormDTO template)
        {
            //check if template name already exists
           // if (FindByName(template.templateName) != null) throw new Exception($"Template name '{template.templateName}' already exist. Please use a different name");

            //Do all the necessary validations
            //ValidateTemplate(template);
           
            await _assessmentFormTemplate.InsertOneAsync(template);
            return template;
        }

        public async Task<IList<AssessmentFormDTO>> GetAllTemplates()
        {
            List<AssessmentFormDTO> assessmentFormTemplate = await _assessmentFormTemplate.Find(aft => true).ToListAsync();
            return assessmentFormTemplate;
        }

        public async Task<AssessmentFormDTO> FindById(string templateId)
        {
            return await _assessmentFormTemplate.Find(sub => sub._id == templateId).SingleOrDefaultAsync();
        }

        public async Task<AssessmentFormDTO> FindByName(string templateName)
        {
            return await _assessmentFormTemplate.Find(sub => sub.templateName == templateName).SingleOrDefaultAsync();
        }

        public async Task Update(string id, AssessmentFormDTO template)
        {
            //Do all the necessary validations
            //ValidateTemplate(template);

            template._id = id;
            await _assessmentFormTemplate.ReplaceOneAsync(af => af._id == template._id, template);
        }

        private void ValidateTemplate(AssessmentFormDTO template)
        {
            List<string> errors = new List<string>();
            if (errors.Count > 0)
            {
                throw new Exception("Please correct the following errors: " + errors.Aggregate((i, j) => i + ", " + j));
            }
        }
    }
}
