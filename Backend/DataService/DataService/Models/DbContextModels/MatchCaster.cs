namespace DataService.Models.DbContextModels
{
    public class MatchCaster : BaseEntity
    {
        public int CasterId { get; set; }
        public int MatchId { get; set; }
        public virtual Caster? Caster { get; set; }
    }
}
