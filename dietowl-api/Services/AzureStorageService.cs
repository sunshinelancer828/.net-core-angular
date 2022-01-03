using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using DietOwlApi.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace DietOwlApi.Services
{
    public class AzureStorageService : IBlobService

    {
        private readonly BlobServiceClient _blobClient;
        public AzureStorageService(BlobServiceClient blobClient)
        {
            _blobClient = blobClient;
        }
        public async Task<IEnumerable<string>> AllBlobs(string containerName)
        {
            //allow us to access the data inside the container
            var containerClient = _blobClient.GetBlobContainerClient(containerName);
            var files = new List<string>();
            var blobs = containerClient.GetBlobsAsync();
            await foreach (var item in blobs)
            {
                files.Add(item.Name);
            }
            return files;
        }

        public async Task<bool> DeleteBlob(string name, string containerName)
        {
            //allow us to access the data inside the container
            var containerClient = _blobClient.GetBlobContainerClient(containerName);
            var blobClient = containerClient.GetBlobClient(name);
            return await blobClient.DeleteIfExistsAsync();
        }

        public async Task<string> GetBlob(string name, string containerName)
        {
            //allow us to access the data inside the container
            var containerClient = _blobClient.GetBlobContainerClient(containerName);
            //allow us to access the file inside the container via the file name
            return containerClient.GetBlobClient(name).Uri.AbsoluteUri;
        }

        public async Task<bool> UploadBlob(string name, IFormFile file, string containerName)
        {
            //allow us to access the data inside the container
            var containerClient = _blobClient.GetBlobContainerClient(containerName);
            //create a temp file if it doesnt exist, else replace
            var blobClient = containerClient.GetBlobClient(name);
            var httpHeaders = new BlobHttpHeaders()
            {
                ContentType = file.ContentType
            };
            var res = await blobClient.UploadAsync(file.OpenReadStream(), httpHeaders);
            if (res != null)
                return true;

            return false;
        }
    }
}
