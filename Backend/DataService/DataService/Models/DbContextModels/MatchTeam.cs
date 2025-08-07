namespace DataService.Models.DbContextModels
{
    public class MatchTeam : BaseEntity
    {
        public int TeamId { get; set; }
        public int MatchId { get; set; }
        public virtual Team? Team { get; set; }
    }
}
