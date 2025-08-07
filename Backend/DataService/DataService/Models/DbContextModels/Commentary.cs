namespace DataService.Models.DbContextModels
{
    public class Commentary : BaseEntity
    {
        public string Text { get; set; }
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public int MatchId { get; set; }
        public virtual Match? MatchInfo { get; set; }
    }
}
