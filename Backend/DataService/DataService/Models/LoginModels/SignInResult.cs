namespace DataService.Models.LoginModels
{
    public class SignInResult
    {
        public bool IsSuccess { get; set; }
        public int PermissionLevel { get; set; }

        public string CookieString { get; set; }
    }
}
