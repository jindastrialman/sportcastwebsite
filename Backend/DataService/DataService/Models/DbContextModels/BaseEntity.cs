namespace DataService.Models.DbContextModels
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public int Version { get; set; }
        public bool IsDeleted { get; set; }
    }
}
