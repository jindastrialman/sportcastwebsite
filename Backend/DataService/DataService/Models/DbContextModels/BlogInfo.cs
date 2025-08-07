namespace DataService.Models.DbContextModels
{
    public class BlogInfo : BaseEntity
    {
        public string Title { get; set; }
        public string PictureUrl { get; set; }
        public int ContentId { get; set; }
        public int SportType { get; set; }
        public string Link { get; set; }
        public string BlogType { get; set; }
        public string SeoTitle { get; set; }
        public string SeoDescription { get; set; }
        public int? Priority { get; set; }
        public virtual BlogContent? Content { get; set; }
    }
}
