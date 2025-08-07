using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using DataService.Models.LoginModels; // пространство имен UserContext и класса User
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using DataService.Services.DataContext;
using DataService.Models.DbContextModels;
using Microsoft.AspNetCore.Authorization;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.Cryptography;
using System.Text;

namespace AuthApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : Controller
    {
        private DataContext db;
        public LoginController(DataContext context)
        {
            db = context;
        }
        [HttpGet("SignIn")]
        [Authorize(Roles = "0,1,2,3,4,5,6")]
        public bool Login()
        {
            return User.Identity.IsAuthenticated;
        }
        [HttpGet("SignInAdmin")]
        [Authorize(Roles = "3,4,5,6")]
        public bool SignInAdmin()
        {
            return User.Identity.IsAuthenticated;
        }
        [HttpPost("Login")]
        [AllowAnonymous]
        public async Task<DataService.Models.LoginModels.SignInResult> Login(LoginModel model)
        {
            var result = new DataService.Models.LoginModels.SignInResult() { IsSuccess = false };
            if (ModelState.IsValid)
            {
                User user = await db.User.FirstOrDefaultAsync(u => u.Email == model.Email && u.Password == Hash(model.Password));
                if (user != null)
                {
                    await Authenticate(model.Email, (PermissionLevel)user.PermissionLevel); // аутентификация
                    result.IsSuccess = true;
                    result.PermissionLevel = user.PermissionLevel;
                    result.CookieString = Response.Headers["Set-Cookie"];
                    return result;
                }
                ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return result;
        }
        [HttpGet("Register")]
        [Authorize(Roles = "0,1,2,3,4,5,6")]
        public bool Register()
        {
            return User.Identity.IsAuthenticated;
        }
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<DataService.Models.LoginModels.SignInResult> Register(RegisterModel model)
        {
            var result = new DataService.Models.LoginModels.SignInResult() { IsSuccess = false };
            var hashed = Hash(model.Password);
            if (ModelState.IsValid)
            {
                User user = await db.User.FirstOrDefaultAsync(u => u.Email == model.Email);
                if (user == null)
                {
                    // добавляем пользователя в бд
                    db.User.Add(new User { Email = model.Email, Password = Hash(model.Password), PermissionLevel = (int)PermissionLevel.None});
                    await db.SaveChangesAsync();

                    await Authenticate(model.Email, PermissionLevel.Basic); // аутентификация
                    result.IsSuccess = true;
                    result.PermissionLevel = (int)PermissionLevel.Basic;
                    result.CookieString = Response.Headers["Set-Cookie"];
                    return result;
                }
                else
                    ModelState.AddModelError("", "Некорректные логин и(или) пароль");
            }
            return result;
        }

        private async Task Authenticate(string userName, PermissionLevel permission)
        {
            // создаем один claim
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, ((int)permission).ToString())
            };
            // создаем объект ClaimsIdentity
            ClaimsIdentity id = new ClaimsIdentity(claims, "ApplicationCookie", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            // установка аутентификационных куки
            await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(id));
        }

        [HttpPost("Logout")]
        [AllowAnonymous]
        public async Task<bool> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return true;
        }

        private string Hash(string input)
        {
            var hash = new SHA1Managed().ComputeHash(Encoding.UTF8.GetBytes(input));
            return string.Concat(hash.Select(b => b.ToString("x2")));
        }
    }
}
