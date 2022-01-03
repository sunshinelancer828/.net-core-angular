using AzureWebAppLinux.Interface;
using AzureWebAppLinux.Models;
using AzureWebAppLinux.Services;
using DietOwlApi.Interface;
using DietOwlApi.Models;
using DietOwlApi.Services;
using Hangfire;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureWebAppLinux.Controllers
{
    //[Authorize]
    public class AppUserController : ControllerBase
    {
        private readonly ILogger<AppUserController> _logger;
        private readonly IAppUserService _userSvc;
        private readonly ITokenService _tokenService;


        public AppUserController(ILogger<AppUserController> logger,
                                    IAppUserService userService, 
                                    ITokenService tokenService
                                    )
        {
            _logger = logger;
            _userSvc = userService;
            _tokenService = tokenService;
        }
        [HttpGet]
        public async Task<dynamic> GetUsers() =>  await _userSvc.Read();
        [HttpGet]
        public async Task<dynamic> GetClients(string id)
        {
             return await _userSvc.GetClients(id);
        }

        [HttpGet]
        public async Task<dynamic> GetUser(string email) => await _userSvc.Find(email);
        [HttpGet]
        public async Task<dynamic> GetUserById(string id) => await _userSvc.FindById(id);
        [AllowAnonymous]
        [HttpPost]
        public async Task<dynamic> CreateUser([FromBody] AppUserDTO user)
        {
            var loggedInUser = await _userSvc.CreateUser(user);
            await _userSvc.GenerateAndSendActivationLink(loggedInUser.email);

            return
                new
                {
                    user = new { email = user.email, password = user.password },
                    token = _tokenService.CreateToken(loggedInUser)
                };
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task GenerateAndSendActivationLink(string email)
        {
            await _userSvc.GenerateAndSendActivationLink(email);
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task ActivateUser(string activationToken)
        {
            await _userSvc.ActivateUser(activationToken);
        }
        [HttpPost]
        public async Task<dynamic> Update(string id,[FromBody] AppUserDTO user)
        {
            await _userSvc.UpdateUser(id, user);
            return new { 
            message="Updated Successfully..."
            };
        }

        [HttpPost]
        public async Task DeleteUser(string email)
        {
            await _userSvc.Delete(email);
        }

        #region Login
        [AllowAnonymous]
        [HttpPost]
        public async Task<dynamic> Login([FromBody] LoginDTO user)
        {
            var loggedInUser = await _userSvc.Login(user.email, user.password);
            return
                new
                {
                    user = loggedInUser,
                    token = _tokenService.CreateToken(loggedInUser)
                };
        }

        #endregion

        //test
        [AllowAnonymous]
        [HttpPost]
        public async Task UploadFile([FromForm]IFormFile file)
        {
            await _userSvc.UploadFile(file);
        }
        [AllowAnonymous]
        [HttpPost]
        public async Task UploadFileById(string id,[FromForm] IFormFile file)
        {
            await _userSvc.UploadFileById(id,file);
        }
        [AllowAnonymous]
        [HttpGet]
        public FileContentResult DownloadFile(string fileName)
        {
            string fullFilePath = _userSvc.DownloadFile(fileName);
            return File(System.IO.File.ReadAllBytes(fullFilePath), "application/octet-stream", fileName);

        }

    }
}
