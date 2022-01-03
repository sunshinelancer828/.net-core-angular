using DietOwlApi.Models;
using DietOwlApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    
    public class EmailController : ControllerBase
    {
        private readonly EmailService _emailSvc;

        public EmailController(EmailService emailService)
        {
            _emailSvc = emailService;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task SendMail()
        {
            var emails = await _emailSvc.GetUnsentEmails();
            emails.ForEach(async email => { await _emailSvc.SendEmail(email); });
        }
    }
}
