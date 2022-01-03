using DietOwlApi.Interface;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class EmailBackgroundService : BackgroundService
    {
        private readonly IEmailBackgroundService _emailService;
        public EmailBackgroundService(IEmailBackgroundService emailService)
        {
            _emailService = emailService;
        }

        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            await _emailService.SendAllMails(cancellationToken);
        }
    }
}
