using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    //[Authorize]
    public class AssessmentFormTemplateController : ControllerBase
    {
        private readonly ILogger<AssessmentFormDTO> _logger;
        private readonly AssessmentFormTemplateService _assessmentFormSvc;

        public AssessmentFormTemplateController(ILogger<AssessmentFormDTO> logger, AssessmentFormTemplateService assessmentFormService)
        {
            _logger = logger;
            _assessmentFormSvc = assessmentFormService;
        }
        [HttpGet]
        public async Task<dynamic> GetTemplates() => 
            await _assessmentFormSvc.GetAllTemplates();

        [HttpGet]
        public async Task<AssessmentFormDTO> GetTemplateById(string templateId) => 
            await _assessmentFormSvc.FindById(templateId);

        [HttpPost]
        public async Task<dynamic> CreateTemplate([FromBody] AssessmentFormDTO assessmentForm)
        {
            AssessmentFormDTO _asForm = new AssessmentFormDTO();
            _asForm = assessmentForm;
            await _assessmentFormSvc.Create(_asForm);
            return new {
                message="Added Success fully"
            };
        }
        
        [HttpPost]
        public async Task<dynamic> UpdateTemplate(string id, [FromBody] AssessmentFormDTO assessmentForm)
        {
            await _assessmentFormSvc.Update(id, assessmentForm);
            return new
            {
                message = "Updated Success fully"
            };
        }
    }
}
