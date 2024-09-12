using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using AnalyzeLog_Report.Services;
using Microsoft.Extensions.Logging;

namespace AnalyzeLog_Report.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogController : ControllerBase
    {
        private readonly ILogger<LogController> _logger;
        private readonly ILogService _logService;

        public LogController(ILogger<LogController> logger, ILogService logService)
        {
            _logger = logger;
            _logService = logService;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadLogFile(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("Nenhum arquivo enviado.");
                }

                var result = await _logService.ProcessLogFileAsync(file);

                if (result == null)
                {
                    return BadRequest("Erro ao processar o arquivo de log. Resultado é nulo.");
                }

                return Content(result, "application/json");

            }
            catch (Exception ex)
            {
                
                _logger.LogError(ex, "Erro ao processar o arquivo de log.");
                return StatusCode(500, "Erro interno do servidor.");
            }
        }
    }
}
