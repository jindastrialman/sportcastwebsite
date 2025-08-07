namespace DataService.Models.DbContextModels
{
    public class Match : BaseEntity
    {
        public DateTime MatchStartTime { get; set; } = DateTime.Now;
        public DateTime StartShowTime { get; set; } = DateTime.Now;
        public DateTime EndShowTime { get; set; } = DateTime.Now;
        public string SeoTags { get; set; } = string.Empty;
        public string? SeoTitle { get; set; } = string.Empty;
        public string? SeoDescription { get; set; } = string.Empty;
        public string MediaPlayerUrl { get; set; } = string.Empty;
        public bool IsMatchEnded { get; set; }
        public int MatchType { get; set; } 

        public virtual ICollection<MatchTeam>? MatchTeams { get; set; }

        public virtual ICollection<MatchCaster>? MatchCasters { get; set; }

        public virtual ICollection<Commentary>? Commentaries { get; set; }
    }
}
