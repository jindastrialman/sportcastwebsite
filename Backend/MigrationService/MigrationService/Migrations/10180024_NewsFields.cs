using System.Data;
using ThinkingHome.Migrator.Framework;

[Migration(10180024)]
public class _10180024_BlogSportsType : Migration
{
    public override void Apply()
    {
        Database.AddColumn("BlogInfo", new Column("SeoDescription", DbType.String));
        Database.AddColumn("BlogInfo", new Column("SeoTitle", DbType.String));
        Database.AddColumn("BlogInfo", new Column("Priority", DbType.Int32));
    }

    public override void Revert()
    {
        Database.RemoveColumn("BlogInfo", "SeoDescription");
        Database.RemoveColumn("BlogInfo", "SeoTitle");
        Database.RemoveColumn("BlogInfo", "Priority");
    }
}