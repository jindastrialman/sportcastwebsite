using DataService.Models.DbContextModels;
using DataService.Services.Cache.Abstractions;

namespace DataService.Services.Cache
{
    public class ListCacheService<T> : ICacheService<T> where T : BaseEntity
    {
        private List<T> _list;
        private DateTime _lastUpdated;
        public ListCacheService()
        {
            _list = new List<T>();
            _lastUpdated = DateTime.MinValue;
        }
        public ICollection<T> GetAll()
        {
            return _list;
        }
        public void Store(IEnumerable<T> collection)
        {
            _list.Clear();
            _list.AddRange(collection);
            _lastUpdated = DateTime.Now;
        }
        public DateTime LastUpdated { get { return _lastUpdated; } }

    }
}
