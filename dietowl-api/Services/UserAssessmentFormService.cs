using AzureWebAppLinux.Models;
using DietOwlApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class UserAssessmentFormService
    {
        private readonly IMongoCollection<UserAssessmentFormDTO> _userAssessmentForm;

        public UserAssessmentFormService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _userAssessmentForm = database.GetCollection<UserAssessmentFormDTO>("user-assessment-form");
        }
        public async Task<UserAssessmentFormDTO> Create(UserAssessmentFormDTO userAssessment)
        {
            await _userAssessmentForm.InsertOneAsync(userAssessment);
            return userAssessment;
        }

        public async Task<IList<UserAssessmentFormDTO>> GetAllAssessmentForms()
        {
            List<UserAssessmentFormDTO> userAssessmentForm = await _userAssessmentForm.Find(aft => true).ToListAsync();
            return userAssessmentForm;
        }

        public async Task<UserAssessmentFormDTO> FindById(string userAssessmentId)
        {
            return await _userAssessmentForm.Find(sub => sub._id == userAssessmentId).SingleOrDefaultAsync();
        }
        public async Task<UserAssessmentFormDTO> FindByUserId(string id)
        {
            return await _userAssessmentForm.Find(sub => sub.fkUserId == id).SingleOrDefaultAsync();
        }

        public async Task Update(string id, UserAssessmentFormDTO userAssessment)
        {
            //Do all the necessary validations
            //ValidateTemplate(template);

            userAssessment._id = id;
            await _userAssessmentForm.ReplaceOneAsync(af => af._id == userAssessment._id, userAssessment);
        }
    }
}
