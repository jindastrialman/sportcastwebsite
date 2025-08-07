
using DataService.Models.DbContextModels;
using DataService.Services;
using DataService.Services.Cache;
using DataService.Services.Cache.Abstractions;
using DataService.Services.DataContext;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.HttpLogging;
using System.Text.Json.Serialization;

namespace DataService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers().AddJsonOptions(o =>
            {
                o.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddHttpLogging(o => {
                o.LoggingFields = HttpLoggingFields.Duration;
                o.RequestHeaders.Add("sec-ch-ua");
                o.ResponseHeaders.Add("MyResponseHeader");
                o.RequestBodyLogLimit = 4096;
                o.ResponseBodyLogLimit = 4096;
                o.CombineLogs = true;
            });

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options => //CookieAuthenticationOptions
                {
                    options.LoginPath = new PathString("/Account/Login");
                    options.Cookie.SecurePolicy = CookieSecurePolicy.None;
                });
            
            AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

            builder.Services.AddSingleton<ICacheService<Match>, ListCacheService<Match>>();
            builder.Services.AddSingleton<ICacheService<Commentary>, ListCacheService<Commentary>>();
            builder.Services.AddSingleton<ICacheService<BlogInfo>, ListCacheService<BlogInfo>>();
            builder.Services.AddTransient<DataContext>();

            var app = builder.Build();
            app.UseHttpLogging();

            // Configure the HTTP request pipeline.
            app.UseSwagger();
            app.UseSwaggerUI();
            const string IP = "localhost";
            app.UseCors(x => x.AllowAnyHeader()
            .AllowAnyMethod()
            .WithOrigins($"http://{IP}:4200", $"https://{IP}:4200", $"http://{IP}:5000", $"https://{IP}:5001", $"http://{IP}:3000")
            .AllowCredentials()
            .SetIsOriginAllowed(x => true));

            app.UseHttpsRedirection();

            app.UseAuthentication(); 
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
