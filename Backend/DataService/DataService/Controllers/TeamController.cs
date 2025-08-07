using DataService.Models.DbContextModels;
using DataService.Services.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DataService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamController : ControllerBase
    {
        private readonly ILogger<TeamController> _logger;
        private readonly DataContext _dataContext;

        public TeamController(ILogger<TeamController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        // GET api/<CommentaryController>/5
        [HttpGet("GetAll")]
        [AllowAnonymous]
        public IEnumerable<Team> Get()
        {
            return _dataContext.Team.Where(x => x.IsDeleted == false);
        }
        [HttpGet("{id}")]
        [AllowAnonymous]
        public Team GetCommentary(int Id)
        {
            return _dataContext.Team.Where(c => c.Id == Id).SingleOrDefault();
        }
        // POST api/<CommentaryController>
        [HttpPost]
        [Authorize(Roles = "1,2,3,4,5,6")]
        public async Task Post([FromBody] Team value)
        {
            _dataContext.Team.Add(value);
            await _dataContext.SaveChangesAsync();
        }

        // PUT api/<CommentaryController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Put(int id, [FromBody] Team value)
        {
            var entity = _dataContext.Team.Where(m => m.Id == id).SingleOrDefault();
            entity = value;
            await _dataContext.SaveChangesAsync();
        }

        // DELETE api/<CommentaryController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "2,3,4,5,6")]
        public async Task Delete(int id)
        {
            _dataContext.Team.Where(m => m.Id == id).SingleOrDefault().IsDeleted = true;
            await _dataContext.SaveChangesAsync();
        }
    }
}
