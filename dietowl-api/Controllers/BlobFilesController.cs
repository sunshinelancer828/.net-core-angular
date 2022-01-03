using DietOwlApi.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Controllers
{
    
    /// <summary>
    /// Use this as a sample to call from appropriate places to upload files
    /// </summary>
    public class BlobFilesController : ControllerBase
    {
        private readonly IBlobService _blobService;
        public BlobFilesController(IBlobService blobService)
        {
            _blobService = blobService;
        }
        [HttpGet]
        public async Task<IEnumerable<string>> GetAllFiles()
        {
            return await _blobService.AllBlobs("dietowl-sc-dev");
        }
        [HttpGet]
        public async Task<string> GetFile(string fileName)
        {
            if (fileName == null || fileName.Trim().Length == 0) throw new Exception("Invalid file name");

            return await _blobService.GetBlob(fileName, "dietowl-sc-dev");
        }
        [HttpPost]
        public async Task UploadFile(IFormFile file)
        {
            if (file == null || file.Length < 1) return;

            var fileName = Guid.NewGuid() + Path.GetExtension(file.FileName);
            await _blobService.UploadBlob(fileName, file, "dietowl-sc-dev");

        }
        [HttpPost]
        public async Task<bool> DeleteFile(string fileName)
        {
            if (fileName == null || fileName.Trim().Length == 0) return false;
            return await _blobService.DeleteBlob(fileName, "dietowl-sc-dev");

        }
    }
}
