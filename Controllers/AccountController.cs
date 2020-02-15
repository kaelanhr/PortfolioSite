using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PersonalSite.Controllers
{
	[Authorize]
	public class AccountController : Controller
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly SignInManager<IdentityUser> _signInManager;

		private readonly ILogger _logger;

		public AccountController(
			UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = loggerFactory.CreateLogger<AccountController>();
		}

		//
		// GET: /Account/Login
		[HttpGet]
		[AllowAnonymous]
		public IActionResult Login(string returnUrl = null)
		{
			ViewData["ReturnUrl"] = returnUrl;
			return View();
		}

		//
		// POST: /Account/Login
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Login()
		{
			var username = "blah";
			var email = "blah@example.com";
			var password = "password";

			if (ModelState.IsValid)
			{
				// This doesn't count login failures towards account lockout
				// To enable password failures to trigger account lockout, set lockoutOnFailure: true
				var result = await _signInManager.PasswordSignInAsync(email,
					password, false, lockoutOnFailure: false);
				if (result.Succeeded)
				{
					_logger.LogInformation(1, "User logged in.");
					return null;
				}
				if (result.IsLockedOut)
				{
					_logger.LogWarning(2, "User account locked out.");
					return View("Lockout");
				}
				else
				{
					ModelState.AddModelError(string.Empty, "Invalid login attempt.");
					return null;
				}
			}

			// If we got this far, something failed, redisplay form
			return null;
		}

		// POST: /Account/Register
		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> Register()
		{
			var username = "blah";
			var email = "blah@example.com";
			var password = "password";
			if (ModelState.IsValid)
			{
				var user = new IdentityUser
				{
					UserName = email,
					Email = email
				};
				var result = await _userManager.CreateAsync(user, password);
				if (result.Succeeded)
				{
					await _signInManager.SignInAsync(user, isPersistent: false);
					_logger.LogInformation(3, "User created a new account with password.");
					return null;
				}
				// add errors to result
			}

			// If we got this far, something failed, redisplay form
			return null;
		}

		// POST: /Account/LogOut
		[HttpPost]
		[ValidateAntiForgeryToken]
		public async Task<IActionResult> LogOut()
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation(4, "User logged out.");
			return null;
		}
	}
}