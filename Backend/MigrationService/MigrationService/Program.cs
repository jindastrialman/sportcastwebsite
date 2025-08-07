using Serilog;
using Serilog.Extensions.Logging;
using System.Reflection;
using ThinkingHome.Migrator;

var provider = "postgres";
var connectionString = "Host=185.178.44.140;Port=5432;Database=public;Username=dataserviceuser;Password=pgpassword";
var assembly = Assembly.LoadFrom("MigrationService.dll");

var logger = new LoggerConfiguration()
    .WriteTo.Console()
    .CreateLogger();
var microsoftLogger = new SerilogLoggerFactory(logger)
    .CreateLogger("migrator");


using (var migrator = new Migrator(provider, connectionString, assembly, microsoftLogger))
{
    migrator.Migrate(10180024);
}