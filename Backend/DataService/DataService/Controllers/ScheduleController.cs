using DataService.Models.DbContextModels;
using DataService.Services.Cache.Abstractions;
using DataService.Services.Cache.Options;
using DataService.Services.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace DataService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {

        private readonly ILogger<ScheduleController> _logger;
        private readonly DataContext _dataContext;
        private readonly ICacheService<Match> _matchCache;
        private readonly CacheOptions _cacheOptions;

        public ScheduleController(ILogger<ScheduleController> logger, DataContext dataContext, ICacheService<Match> matchCache, IConfiguration Configuration)
        {
            _logger = logger;
            _dataContext = dataContext;
            _matchCache = matchCache;
            _cacheOptions = Configuration.GetSection(CacheOptions.OptionSection).Get<CacheOptions>() ?? new CacheOptions();
        }

        // GET: api/<ScheduleController>
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<Match> GetMatchType(int matchType= -1)
        {

            if (_matchCache.LastUpdated < DateTime.Now.AddMinutes(-_cacheOptions.CacheRefreshMinutesInterval))
            {
                UpdateMatchesCache();
            }

            return matchType == -1 ? _matchCache.GetAll() : _matchCache.GetAll().Where(x => x.MatchType == matchType);
        }

        [HttpGet("GetLast")]
        [Authorize(Roles = "2,3,4,5,6")]
        [AllowAnonymous]
        public IEnumerable<Match> GetLast(int PageSize = 30, int PageCount = 0)
        {
            return _dataContext.Match.Where(x => x.IsDeleted == false)
                .Include("MatchTeams.Team")
                .Include("MatchCasters.Caster")
                .OrderByDescending(c => c.CreatedAt)
                .Skip(PageSize * PageCount)
                .Take(PageSize);
        }
        [HttpGet("UpdateMatchesCache")]
        [Authorize(Roles = "3,4,5,6")]
        public void UpdateMatchesCache() 
        {
            _logger.LogDebug("UpdateMatchesCache called");
            _matchCache.Store(_dataContext.Match
                .Where(x => x.IsDeleted == false)
                .Where(m => m.StartShowTime < DateTime.Now && m.EndShowTime > DateTime.Now && m.IsMatchEnded == false)
                .Include("MatchTeams.Team")
                .Include("MatchCasters.Caster")
                );
        }

        // GET api/<ScheduleController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public Match Get(int id)
        {
            return _dataContext.Match.Where(m => m.Id == id)
                .Include("MatchTeams.Team")
                .Include("MatchCasters.Caster")
                .SingleOrDefault();
        }

        // POST api/<ScheduleController>
        [HttpPost]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Post([FromBody] Match value)
        {
            _dataContext.Match.Add(value);
            await _dataContext.SaveChangesAsync();
        }

        // PUT api/<ScheduleController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Put(int id, [FromBody] Match value)
        {
            var entity = _dataContext.Match.Where(m => m.Id == value.Id).SingleOrDefault();
            entity = value;
            await _dataContext.SaveChangesAsync();
        }

        // DELETE api/<ScheduleController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Delete(int id)
        {
            _dataContext.Match.Where(m => m.Id == id).SingleOrDefault().IsDeleted = true;
            await _dataContext.SaveChangesAsync();
        }
    }
}
