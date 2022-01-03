using DietOwlApi.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public class FileService : IFileService
    {
        private readonly IUploadFolderSettings _folderSettings;

        public FileService(IUploadFolderSettings settings)
        {
            _folderSettings = settings;
        }

        /// <summary>
        /// Uploads the file to the folder type. 
        /// File names are changed inorder to be saved uniquely in the folders
        /// </summary>
        /// <param name="uploadFile"></param>
        /// <param name="folderType"></param>
        /// <param name="validExtensions"></param>
        /// <returns></returns>
        public async Task<string> SavePostedFile(IFormFile uploadFile, UploadToFolderType folderType, params string[] validExtensions)
        {
            if (uploadFile.Length == 0)
            {
                throw new Exception("Uploaded file has no data");
            }

            if (validExtensions.Length > 0 &&
                !validExtensions.Contains(Path.GetExtension(uploadFile.FileName), StringComparer.OrdinalIgnoreCase))
            {
                throw new Exception("File name has an invalid extension. Expected one of " + string.Join(", ", validExtensions));
            }

            string uploadBasePath = "";
            switch (folderType)
            {
                case UploadToFolderType.Client:
                    uploadBasePath = "Client";
                    break;
                case UploadToFolderType.Temp:
                    uploadBasePath = "Temp";
                    break;
            }
            if (uploadBasePath == "") throw new Exception("Folders unavailable for uploading files. Please contact DietOwl Admin");

            string folderName = Path.Combine("wwwroot","Resources", "Images", uploadBasePath);
            string pathName = Path.Combine(Directory.GetCurrentDirectory(), @"wwwroot\Resources\Images");
            string saveFile = Path.Combine(pathName, GetRandomName(Path.GetExtension(uploadFile.FileName)));
            using (Stream fileStream = new FileStream(saveFile, FileMode.Create))
            {
                await uploadFile.CopyToAsync(fileStream);
            }

            return saveFile;
        }

        public string GetPostedFilePath(string fileName, UploadToFolderType folderType)
        {
            if (string.IsNullOrEmpty(fileName))
            {
                throw new Exception("Invalid filename");
            }

            string uploadBasePath = "";
            switch (folderType)
            {
                case UploadToFolderType.Client:
                    uploadBasePath = _folderSettings.ClientDataRootFolderPath;
                    break;
                case UploadToFolderType.Temp:
                    uploadBasePath = _folderSettings.TempFolderRootPath;
                    break;
            }
            if (uploadBasePath == "") throw new Exception("Folders unavailable for uploading files. Please contact DietOwl Admin");

            string fullFilePath = Path.Combine(uploadBasePath, fileName);

            //Check if file exists
            if (!File.Exists(fullFilePath)) throw new Exception("The file does not exist on the server");

            return fullFilePath;
        }


        /// <summary>
        /// Generates a random name which would be unique.
        /// This can be used as folder name if no extension is passed to it
        /// </summary>
        /// <param name="extension"></param>
        /// <returns></returns>
        public string GetRandomName(string extension = "")
        {
            return Guid.NewGuid() + extension;
        }
    }
    public enum UploadToFolderType
    {
        Client,
        Temp
    }
}
