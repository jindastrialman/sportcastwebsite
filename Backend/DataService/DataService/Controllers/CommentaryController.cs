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
    public class CommentaryController : ControllerBase
    {
        private readonly ILogger<CommentaryController> _logger;
        private readonly DataContext _dataContext;

        public CommentaryController(ILogger<CommentaryController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        // GET api/<CommentaryController>/5
        [HttpGet("MatchId/{MatchId}")]
        [AllowAnonymous]
        public IEnumerable<Commentary> Get(int MatchId, int PageSize = 30, int PageCount = 0)
        {
            return _dataContext.Commentary
                .Where(x => x.IsDeleted==false)
                .Where(c => c.MatchId == MatchId)
                .Include("User")
                .OrderByDescending(c => c.CreatedAt)
                .Skip(PageSize * PageCount)
                .Take(PageSize);
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        public Commentary GetCommentary(int Id)
        {
            return _dataContext.Commentary.Where(c => c.Id == Id).SingleOrDefault();
        }
        [HttpGet("GetLast")]
        [Authorize(Roles = "2,3,4,5,6")]
        public IEnumerable<Commentary> GetCommentary(int PageSize = 30, int PageCount = 0)
        {
            return _dataContext.Commentary
                .Where(x => x.IsDeleted == false)
                .Include("User")
                .OrderByDescending(c => c.CreatedAt)
                .Skip(PageSize * PageCount)
                .Take(PageSize);
        }
        // POST api/<CommentaryController>
        [HttpPost]
        [Authorize(Roles ="1,2,3,4,5,6")]
        public async Task Post([FromBody] Commentary value)
        {
            _dataContext.Commentary.Add(value);
            await _dataContext.SaveChangesAsync();
        }

        // PUT api/<CommentaryController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Put(int id, [FromBody] Commentary value)
        {
            var entity = _dataContext.Commentary.Where(m => m.Id == id).SingleOrDefault();
            entity = value;
            await _dataContext.SaveChangesAsync();
        }

        // DELETE api/<CommentaryController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Delete(int id)
        {
            _dataContext.Commentary.Where(m => m.Id == id).SingleOrDefault().IsDeleted = true;
            await _dataContext.SaveChangesAsync();
        }
    }
}
