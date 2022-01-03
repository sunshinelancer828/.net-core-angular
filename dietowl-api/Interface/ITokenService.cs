using AzureWebAppLinux.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AzureWebAppLinux.Interface
{
    public interface ITokenService
    {
        string CreateToken(AppUserDTO user);
    }
}
