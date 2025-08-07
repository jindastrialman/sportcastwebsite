using Microsoft.AspNetCore.Authorization;
using System.Web;
using Microsoft.AspNetCore.Mvc;
using static System.Net.Mime.MediaTypeNames;
using System.Reflection;
using Microsoft.Extensions.FileProviders;

namespace DataService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly ILogger<ImageController> _logger;
        public ImageController(ILogger<ImageController> logger)
        {
            _logger = logger;
        }
        [HttpPost("load")]
        [Authorize(Roles = "3,4,5,6")]
        public async Task<IActionResult> OnPostUploadAsync(IFormFile file)
        {
            if (file.Length > 0)
            {
                var directory = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location),"Images\\");
                Directory.CreateDirectory(directory);

                var filePath = Path.Combine(directory, file.FileName);

                using (var stream = System.IO.File.Create(filePath))
                {
                    await file.CopyToAsync(stream);
                }
            }
            

            // Process uploaded files
            // Don't rely on or trust the FileName property without validation.

            return Ok(new { file.FileName });
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Image(string id)
        {
            var directory = Path.Combine(Path.GetDirectoryName(Assembly.GetEntryAssembly().Location), "Images\\");
            var path = Path.Combine(directory, id); //validate the path for security or use other means to generate the path.
            IFileProvider provider = new PhysicalFileProvider(directory);
            IFileInfo fileInfo = provider.GetFileInfo(id);
            var readStream = fileInfo.CreateReadStream();
            return base.File(readStream, "image/jpeg", id);
        }


    }
}
