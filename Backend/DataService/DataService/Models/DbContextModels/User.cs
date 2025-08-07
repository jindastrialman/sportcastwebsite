namespace DataService.Models.DbContextModels
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public int PermissionLevel { get; set; } 
    }


    public enum PermissionLevel 
    {
        None,
        Basic,
        CommentModerator,
        Moderator,
        Admin,
        TheOwner,
        TheRealOwner
    }
}
