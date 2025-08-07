using System.Data;
using ThinkingHome.Migrator.Framework;
using ThinkingHome.Migrator.Framework.Extensions;

    [Migration(10122024)]
    public class _10122024_Initial : Migration
    {
        public override void Apply()
        {
            AddTables();
            AddForeignKeys();
            AddIndexes();
        }

        public override void Revert()
        {
            RemoveTables();
        }
        private void AddIndexes()
        {
            Database.AddIndex("I_Match_MatchStartTime", false, "Match", "MatchStartTime");
            Database.AddIndex("I_Match_MatchType", false, "Match", "MatchType");

            Database.AddIndex("I_Commentary_MatchId", false, "Commentary", "MatchId");
        }
        private void AddTables() 
        {
            AddBaseTable("Match",
                new Column("IsMatchEnded", DbType.Boolean),
                new Column("MatchStartTime", DbType.DateTime),
                new Column("MediaPlayerUrl", DbType.String.WithSize(400)),
                new Column("MatchType", DbType.Int32)
                );

            AddBaseTable("Caster",
                new Column("Name", DbType.String.WithSize(255)),
                new Column("Surname", DbType.String.WithSize(255))
                );

            AddBaseTable("User",
                new Column("Email", DbType.String.WithSize(255)),
                new Column("PermissionLevel", DbType.Int32),
                new Column("Password", DbType.String.WithSize(255))
                );

            AddBaseTable("Team",
                new Column("Name", DbType.String.WithSize(255)),
                new Column("Description", DbType.String.WithSize(255)),
                new Column("TeamLogoUrl", DbType.String.WithSize(255))
                );

            AddBaseTable("BlogInfo",
                new Column("Title", DbType.String.WithSize(255)),
                new Column("PictureUrl", DbType.String.WithSize(255)),
                new Column("ContentId", DbType.Int32)
                );

            AddBaseTable("BlogContent",
                new Column("TextContent", DbType.String.WithSize(4096)),
                new Column("BlogId", DbType.Int32)
                );

            AddBaseTable("Commentary",
                new Column("Text", DbType.String),
                new Column("UserId", DbType.Int32),
                new Column("MatchId", DbType.Int32)
                );

            AddBaseTable("MatchCaster",
                new Column("CasterId", DbType.Int32),
                new Column("MatchId", DbType.Int32)
                );

            AddBaseTable("MatchTeam",
                new Column("TeamId", DbType.Int32),
                new Column("MatchId", DbType.Int32)
                );
        }
        private void AddForeignKeys()
        {
            Database.AddForeignKey("FK_MatchTeam_TeamId", "MatchTeam", "TeamId", "Team", "Id");
            Database.AddForeignKey("FK_MatchTeam_MatchId", "MatchTeam", "MatchId", "Match", "Id");

            Database.AddForeignKey("FK_MatchCaster_CasterId", "MatchCaster", "CasterId", "Caster", "Id");
            Database.AddForeignKey("FK_MatchCaster_MatchId", "MatchCaster", "MatchId", "Match", "Id");

            Database.AddForeignKey("FK_Commentary_MatchId", "Commentary", "MatchId", "Match", "Id");
            Database.AddForeignKey("FK_Commentary_UserId", "Commentary", "UserId", "User", "Id");
        }
        private void AddBaseTable(string name, params Column[] columns) 
        {
            var ColumnsList = columns.ToList();
            ColumnsList.AddRange(new[]
            {
                new Column("Id", DbType.Int32, ColumnProperty.PrimaryKeyWithIdentity),
                new Column("UpdatedAt", DbType.DateTime),
                new Column("CreatedAt", DbType.DateTime),
                new Column("Version", DbType.Int32),
                new Column("IsDeleted", DbType.Boolean)
            });

            Database.AddTable(name,
                ColumnsList.ToArray());

            Database.AddIndex($"I_{name}_CreatedAt", false, name, "CreatedAt");
        }

        private void RemoveTables()
        {
            Database.RemoveTable("Match");
            Database.RemoveTable("Caster");
            Database.RemoveTable("User");
            Database.RemoveTable("Team");
            Database.RemoveTable("BlogInfo");
            Database.RemoveTable("BlogContent");
            Database.RemoveTable("Text");
            Database.RemoveTable("MatchCaster");
            Database.RemoveTable("MatchTeam");
    }
}