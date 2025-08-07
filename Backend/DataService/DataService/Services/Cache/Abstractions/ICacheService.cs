using DataService.Models.DbContextModels;

namespace DataService.Services.Cache.Abstractions
{
    public interface ICacheService<T>
        where T : BaseEntity
    {
        public ICollection<T> GetAll();
        public void Store(IEnumerable<T> collection);
        public DateTime LastUpdated { get; }

    }
}
