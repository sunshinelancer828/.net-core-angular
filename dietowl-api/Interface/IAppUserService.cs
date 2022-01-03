using AzureWebAppLinux.Models;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AzureWebAppLinux.Services
{
    public interface IAppUserService
    {
        Task ActivateUser(string activationToken);
        Task<AppUserDTO> CreateUser(AppUserDTO user);
        Task Delete(string email);
        Task<AppUserDTO> Find(string email);
        Task GenerateAndSendActivationLink(string email);
        Task<AppUserDTO> Login(string email, string password);
        Task<IList<AppUserDTO>> Read();
        Task Update(AppUserDTO updateUser);
        Task UpdateUser(string id, AppUserDTO user);
        Task<dynamic> FindById(string id);
        Task UploadFile(IFormFile file);
        string DownloadFile(string fileName);
        Task<IList<AppUserDTO>> GetClients(string id);
        Task UploadFileById(string id, IFormFile file);
    }
}