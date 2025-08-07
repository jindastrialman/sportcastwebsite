using DataService.Models.DbContextModels;
using DataService.Services.Cache.Abstractions;
using DataService.Services.Cache.Options;
using DataService.Services.DataContext;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers.Cache;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DataService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        // GET: api/<BlogController>
        private readonly ILogger<ScheduleController> _logger;
        private readonly DataContext _dataContext;
        private readonly ICacheService<BlogInfo> _blogCache;
        private readonly CacheOptions _cacheOptions;

        public BlogController(ILogger<ScheduleController> logger, DataContext dataContext, ICacheService<BlogInfo> blogCache, IConfiguration Configuration)
        {
            _logger = logger;
            _dataContext = dataContext;
            _blogCache = blogCache;
            _cacheOptions = Configuration.GetSection(CacheOptions.OptionSection).Get<CacheOptions>() ?? new CacheOptions();
        }

        // GET: api/<ScheduleController>
        [HttpGet]
        [AllowAnonymous]
        public IEnumerable<BlogInfo> Get(int skip = 0, int take = 10, int sportType = -1, string blogType = "0", bool enablePriority = true)
        {

            if (_blogCache.LastUpdated < DateTime.Now.AddMinutes(-_cacheOptions.CacheRefreshMinutesInterval))
            {
                UpdateMatchesCache();
            }
            if (sportType != -1 || take != 10 || skip != 0 || blogType != "0") 
            {
                return _dataContext.BlogInfo
                .OrderByDescending(b => b.CreatedAt.AddHours(enablePriority ? b.Priority ?? 0: 0))
                .Where(b => !b.IsDeleted)
                .Where(b => blogType == "0"? true : b.BlogType == blogType)
                .Where(b => sportType == -1 ? true : b.SportType == sportType)
                .Skip(skip)
                .Take(take);
            }
            return _blogCache.GetAll();
        }

        [HttpGet("UpdateMatchesCache")]
        [Authorize(Roles = "3,4,5,6")]
        public void UpdateMatchesCache()
        {
            _logger.LogDebug("UpdateMatchesCache called");

            var query = _dataContext.BlogInfo
                .OrderByDescending(b => b.CreatedAt.AddHours(b.Priority ?? 0))
                .Where(b => !b.IsDeleted)
                .GroupBy(x => new { x.SportType, x.BlogType })
                .Select(x => x.Take(10).ToList()).ToList().SelectMany(x => x, (x,y) => y);

            _blogCache.Store(query);
        }

        [HttpGet("GetLast")]
        [Authorize(Roles = "3,4,5,6")]
        public IEnumerable<BlogInfo> GetAll(int skip = 0, int take = 30)
        {
            return _dataContext.BlogInfo
                .OrderByDescending(b => b.CreatedAt)
                .Include(b => b.Content)
                .Skip(skip)
                .Take(take);
        }


        // GET api/<ScheduleController>/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public BlogInfo Get(int id)
        {
            return _dataContext.BlogInfo.Where(m => m.Id == id).Include(b => b.Content).SingleOrDefault();
        }

        // POST api/<ScheduleController>
        [HttpPost]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Post([FromBody] BlogInfo value)
        {
            _dataContext.BlogInfo.Add(value);
            await _dataContext.SaveChangesAsync();
        }

        // PUT api/<ScheduleController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Put(int id, [FromBody] BlogInfo value)
        {
            var entity = _dataContext.BlogInfo.Where(m => m.Id == id).SingleOrDefault();
            entity = value;
            await _dataContext.SaveChangesAsync();
        }

        // DELETE api/<ScheduleController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "3,4,5,6")]
        public async Task Delete(int id)
        {
            _dataContext.BlogInfo.Where(m => m.Id == id).ExecuteDelete();
            await _dataContext.SaveChangesAsync();
        }
    }
}
