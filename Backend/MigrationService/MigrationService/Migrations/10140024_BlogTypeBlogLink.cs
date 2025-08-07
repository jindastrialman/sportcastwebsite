using System.Data;
using ThinkingHome.Migrator.Framework;
using ThinkingHome.Migrator.Framework.Extensions;

[Migration(10140024)]
public class _10140024_BlogTypeBlogLink : Migration
{
    public override void Apply()
    {
        Database.AddColumn("BlogInfo", new Column("BlogType", DbType.String));
        Database.AddColumn("BlogInfo", new Column("Link", DbType.String.WithSize(512)));
    }

    public override void Revert()
    {
        Database.RemoveColumn("BlogInfo", "BlogType");
        Database.RemoveColumn("BlogInfo", "Link");
    }
}