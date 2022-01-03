using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class BaseURLService
    {
        private readonly IHttpContextAccessor _context;

        public BaseURLService(IHttpContextAccessor context)
        {
            _context = context;
        }

        public string BaseUrl()
        {
            string httpOrHttps = _context.HttpContext.Request.IsHttps ? "https:\\\\" : "http:\\\\";
            return httpOrHttps + _context.HttpContext.Request.Host.Value;
        }
    }
}
