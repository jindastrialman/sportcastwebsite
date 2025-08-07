using System.Data;
using ThinkingHome.Migrator.Framework;
using ThinkingHome.Migrator.Framework.Extensions;

[Migration(10130024)]
public class _10130024_MatchFields : Migration
{
    public override void Apply()
    {
        Database.AddColumn("Match", new Column("StartShowTime", DbType.DateTime));
        Database.AddColumn("Match", new Column("EndShowTime", DbType.DateTime));
        Database.AddColumn("Match", new Column("SeoTags", DbType.String));
    }

    public override void Revert()
    {
        Database.RemoveColumn("Match", "StartShowTime");
        Database.RemoveColumn("Match", "EndShowTime");
        Database.RemoveColumn("Match", "SeoTags");
    }
}