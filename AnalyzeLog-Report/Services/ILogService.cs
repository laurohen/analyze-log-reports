using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;

namespace AnalyzeLog_Report.Services
{
    public interface ILogService
    {
        Task<string> ProcessLogFileAsync(IFormFile file);
    }
}
