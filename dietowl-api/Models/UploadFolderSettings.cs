using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DietOwlApi.Models
{
    public interface IUploadFolderSettings
    {
        string TempFolderRootPath { get; set; }
        int DeleteFilesOlderThanInDays { get; set; }
        string ClientDataRootFolderPath { get; set; }
    }

    public class UploadFolderSettings : IUploadFolderSettings
    {
        public string TempFolderRootPath { get; set; }
        public int DeleteFilesOlderThanInDays { get; set; }
        public string ClientDataRootFolderPath { get; set; }
    }
}
