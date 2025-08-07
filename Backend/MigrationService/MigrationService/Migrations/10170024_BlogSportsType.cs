using System.Data;
using ThinkingHome.Migrator.Framework;

[Migration(10170024)]
public class _10170024_NewsFields : Migration
{
    public override void Apply()
    {
        Database.AddColumn("BlogInfo", new Column("SportType", DbType.Int32));
    }

    public override void Revert()
    {
        Database.RemoveColumn("BlogInfo", "SportType");
    }
}