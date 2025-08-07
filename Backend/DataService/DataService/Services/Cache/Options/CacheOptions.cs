namespace DataService.Services.Cache.Options
{
    public class CacheOptions
    {
        public static readonly string OptionSection = "CacheOptions";
        public int CachedDaysBefore { get; set; } = 3;
        public int CachedDaysAfter { get; set; } = 3;
        public int CacheRefreshMinutesInterval { get; set; } = 30;
    }
}
