using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace DietOwlApi.Interface
{
    public interface IEmailBackgroundService
    {
        Task SendAllMails(CancellationToken cancellationToken);
    }
}
