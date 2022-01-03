using AzureWebAppLinux.Models;
using DietOwlApi.Interface;
using DietOwlApi.Models;
using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace DietOwlApi.Services
{
    public class EmailService : IEmailService
    {
        private readonly IMongoCollection<EmailDTO> _email;

        public EmailService(IDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _email = database.GetCollection<EmailDTO>("emails");
        }
        public async Task<EmailDTO> AddEmailToQueue(EmailDTO emailToBeSent)
        {
            emailToBeSent.createdOn = DateTime.Now;
            emailToBeSent.messageSentSuccessfully = false;
            emailToBeSent.retryCount = 0;
            emailToBeSent.suspendEmail = false;
            await _email.InsertOneAsync(emailToBeSent);
            return emailToBeSent;
        }


        public async Task<List<EmailDTO>> GetUnsentEmails()
        {
            return await _email.Find(emails => (emails.messageSentSuccessfully == false && emails.suspendEmail == false)).ToListAsync();
        }
        public async Task UpdateEmailStatus(EmailDTO sentEmail)
        {
            await _email.ReplaceOneAsync(email => email._id == sentEmail._id, sentEmail);
        }
        public async Task SendAllMails(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                //await SendEmail(new EmailDTO());
                var emails = await GetUnsentEmails();
                emails.ForEach(async email => { await SendEmail(email); });
                Console.WriteLine("The job is being run");
                await Task.Delay(1000 * 5);
            }
        }

        public async Task SendEmail(EmailDTO emailMessage)
        {
            try
            {
                using (var client = new HttpClient())
                {
                    var email = new
                    {
                        subject = emailMessage.subject,
                        from = "noreply@selektial.com",
                        fromName = "DietOwl Support",
                        replyto = "noreply@selektial.com",
                        to = emailMessage.toEmail,
                        body = HttpUtility.UrlEncode(emailMessage.body)
                    };
                    var values = new
                    {
                        ApiKey = "ODgzOTkjIyMyMDIxLTA3LTMwIDEyOjUxOjQ1",
                        requests = new[] { email }
                    };
                    var data = JsonConvert.SerializeObject(values);
                    var content = new StringContent(data, Encoding.UTF8, "application/json");
                    var response = await client.PostAsync("https://api2.juvlon.com/v4/httpSendMail.php", content);
                    var responseString = await response.Content.ReadAsStringAsync();
                }
            }

            catch (Exception ex)
            {
                emailMessage.retryCount += 1;
                emailMessage.errorMessage = ex.Message;
                if (emailMessage.retryCount > 4) emailMessage.suspendEmail = true; //suspend email sending after 3 retries
            }
            finally
            {
                emailMessage.sentOn = DateTime.Now;
                await UpdateEmailStatus(emailMessage);
            }



        }
    }
}
