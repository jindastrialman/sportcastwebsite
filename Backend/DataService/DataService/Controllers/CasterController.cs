using DataService.Models.DbContextModels;
using DataService.Services.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DataService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CasterController : ControllerBase
    {

        private readonly ILogger<CasterController> _logger;
        private readonly DataContext _dataContext;

        public CasterController(ILogger<CasterController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        // GET api/<CommentaryController>/5
        [HttpGet("GetAll")]
        [AllowAnonymous]
        public IEnumerable<Caster> Get()
        {
            return _dataContext.Caster.Where(x => x.IsDeleted == false);
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        public Caster GetCommentary(int Id)
        {
            return _dataContext.Caster.Where(c => c.Id == Id).SingleOrDefault();
        }
        // POST api/<CommentaryController>
        [HttpPost]
        [Authorize(Roles = "1,2,3,4,5,6")]
        public async Task Post([FromBody] Caster value)
        {
            _dataContext.Caster.Add(value);
            await _dataContext.SaveChangesAsync();
        }

        // PUT api/<CommentaryController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Put(int id, [FromBody] Caster value)
        {
            var entity = _dataContext.Caster.Where(m => m.Id == id).SingleOrDefault();
            entity = value;
            await _dataContext.SaveChangesAsync();
        }

        // DELETE api/<CommentaryController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Delete(int id)
        {
            _dataContext.Caster.Where(m => m.Id == id).SingleOrDefault().IsDeleted = true;
            await _dataContext.SaveChangesAsync();
        }
    }
}
