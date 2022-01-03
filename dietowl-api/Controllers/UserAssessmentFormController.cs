using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    public class UserAssessmentFormController : Controller
    { 
        private readonly ILogger<UserAssessmentFormDTO> _logger;
        private readonly UserAssessmentFormService _userAssessmentFormSvc;

        public UserAssessmentFormController(ILogger<UserAssessmentFormDTO> logger, UserAssessmentFormService userAssessmentFormService)
        {
            _logger = logger;
            _userAssessmentFormSvc = userAssessmentFormService;
        }
        [HttpGet]
        public async Task<dynamic> GetUserAssessmentForms() =>
            await _userAssessmentFormSvc.GetAllAssessmentForms();

        [HttpGet]
        public async Task<UserAssessmentFormDTO> GetUserAssessementFormById(string templateId) =>
            await _userAssessmentFormSvc.FindById(templateId);

        [HttpGet]
        public async Task<UserAssessmentFormDTO> GetUserAssessementFormByUserId(string userId)
        {
            return await _userAssessmentFormSvc.FindByUserId(userId);
        }

        [HttpPost]
        public async Task<dynamic> CreateUserAssessmentForm([FromBody] UserAssessmentFormDTO userAssessmentForm)
        {
            UserAssessmentFormDTO _asForm = new UserAssessmentFormDTO();
            _asForm = userAssessmentForm;
            await _userAssessmentFormSvc.Create(_asForm);
            return new
            {
                message = "Added Success fully"
            };
        }

        [HttpPost]
        public async Task<dynamic> UpdateUserAssessementForm(string id, [FromBody] UserAssessmentFormDTO userAssessmentForm)
        {
            await _userAssessmentFormSvc.Update(id, userAssessmentForm);
            return new
            {
                message = "Updated Success fully"
            };
        }

    }
}
