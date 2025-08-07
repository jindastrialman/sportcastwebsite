using System.Data;
using ThinkingHome.Migrator.Framework;
using ThinkingHome.Migrator.Framework.Extensions;

[Migration(10160025)]
public class _10160025_MatchFields : Migration
{
    public override void Apply()
    {
        Database.AddColumn("Match", new Column("SeoDescription", DbType.String));
        Database.AddColumn("Match", new Column("SeoTitle", DbType.String));
    }

    public override void Revert()
    {
        Database.RemoveColumn("Match", "SeoDescription");
        Database.RemoveColumn("Match", "SeoTitle");
    }
}