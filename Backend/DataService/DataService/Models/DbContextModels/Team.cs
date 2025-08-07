namespace DataService.Models.DbContextModels
{
    public class Team : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string TeamLogoUrl { get; set; }
    }
}
