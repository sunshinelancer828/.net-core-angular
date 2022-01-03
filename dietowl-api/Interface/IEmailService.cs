using DietOwlApi.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace DietOwlApi.Interface
{
    public interface IEmailService
    {
        Task<EmailDTO> AddEmailToQueue(EmailDTO emailToBeSent);
        Task<List<EmailDTO>> GetUnsentEmails();
        Task SendAllMails(CancellationToken cancellationToken);
        Task SendEmail(EmailDTO emailMessage);
        Task UpdateEmailStatus(EmailDTO sentEmail);
    }
}