using DataService.Models.DbContextModels;
using Microsoft.EntityFrameworkCore;

namespace DataService.Services.DataContext
{
    public class DataContext : DbContext
    {
        private string _connectionString;
        public DataContext(IConfiguration configuration) : base()
        {
            _connectionString = configuration.GetSection("ConnectionString").Get<string>()
                ?? "Host=localhost;Port=5432;Database=public;Username=dataserviceuser;Password=pgpassword";
            Database.EnsureCreated();
        }
        public DbSet<Caster> Caster { get; set; }
        public DbSet<Team> Team { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Match> Match { get; set; }
        public DbSet<Commentary> Commentary { get; set; }
        public DbSet<BlogContent> BlogContent { get; set; }
        public DbSet<BlogInfo> BlogInfo { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(_connectionString);
        }
    }
}
