using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace DietOwlApi.Services
{
    public interface IFileService
    {
        string GetRandomName(string extension = "");
        Task<string> SavePostedFile(IFormFile uploadFile, UploadToFolderType folderType, params string[] validExtensions);

        string GetPostedFilePath(string fileName, UploadToFolderType folderType);
    }
}