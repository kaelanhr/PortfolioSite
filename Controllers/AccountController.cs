using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage user accounts login, register, forgot password etc.
	/// </summary>
	[Authorize]
	public class AccountController : Controller
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly SignInManager<IdentityUser> _signInManager;

		private readonly ILogger _logger;

		/// <summary>
		/// Initializes a new instance of the <see cref="AccountController"/> class.
		/// </summary>
		/// <param name="userManager">Identity user manager.</param>
		/// <param name="signInManager">Identity sign in manager.</param>
		/// <param name="loggerFactory">Log controller actions.</param>
		public AccountController(
			UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = loggerFactory.CreateLogger<AccountController>();
		}

		/// <summary>
		/// Logs a user in
		/// </summary>
		/// <param name="userModel">Object needed to login a user</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[AllowAnonymous]
		[Route("/Identity/Account/Login")]
		// [ValidateAntiForgeryToken]
		public async Task<IActionResult> LoginAsync([FromBody] UserModel userModel)
		{
			if (ModelState.IsValid)
			{
				// get the user, if the password matches then we can continue on.
				var user = _userManager.Users.SingleOrDefault(u => u.Email == userModel.Email);

				if (await _userManager.CheckPasswordAsync(user, userModel.Password))
				{
					// fetch out the roles for a user and embed the roles
					var claims = new List<Claim>
					{
						new Claim(ClaimTypes.Name, userModel.Email),
					};

					var claimsIdentity = new ClaimsIdentity(
						claims, CookieAuthenticationDefaults.AuthenticationScheme);
					var authProperties = new AuthenticationProperties();

					await HttpContext.SignInAsync(
						CookieAuthenticationDefaults.AuthenticationScheme,
						new ClaimsPrincipal(claimsIdentity),
						authProperties);

					_logger.LogInformation(1, "User logged in.");
					return Ok();
				}
			}

			// If we got this far, something failed
			return BadRequest();
		}

		/// <summary>
		/// Logs a particular user out.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		// POST: /Account/LogOut
		[HttpPost]
		[Authorize]
		// [ValidateAntiForgeryToken]
		[Route("/Identity/Account/Logout")]
		public async Task<IActionResult> LogOutAsync()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			_logger.LogInformation(4, "User logged out.");
			return Ok();
		}

		/// <summary>
		/// Check a user is logged in
		/// </summary>
		/// <param name="email">The email of the user</param>
		/// <returns>A <see cref="Task{TResult}"/>Determine whether a user is logged in.</returns>
		// POST: /Account/LogOut
		[HttpGet]
		[Authorize]
		// [ValidateAntiForgeryToken]
		[Route("/Identity/Account/me")]
		public IActionResult CheckLogin()
		{
			if (User.Identity.IsAuthenticated)
			{
				_logger.LogInformation(4, "User is correctly authenticated");
				return Ok();
			}

			_logger.LogInformation(4, "User is not authenticated");
			return Forbid();
		}

		/// <summary>
		/// Register a User.
		/// </summary>
		/// <param name="userModel">Required registration model.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[AllowAnonymous]
		// [ValidateAntiForgeryToken]
		[Route("/Register")]
		public async Task<IActionResult> RegisterUserAsync(UserModel userModel)
		{
			// TODO: Find out where i need to put the validate anti forgery token

			if (ModelState.IsValid)
			{
				var user = new IdentityUser
				{
					UserName = userModel.Email,
					Email = userModel.Email,
				};

				var result = await _userManager.CreateAsync(user, userModel.Password);
				if (result.Succeeded)
				{
					_logger.LogInformation(3, "User created a new account with password.");
					return Ok();
				}

				foreach (var error in result.Errors)
				{
					ModelState.AddModelError("Errors", error.Description);
				}
			}

			// If we got this far, something failed
			return new BadRequestObjectResult(ModelState);
		}
	}

	/// <summary>
	/// attributes used for registration.
	/// </summary>
	public class UserModel
	{
		/// <summary>
		/// Gets or sets required valid email address.
		/// </summary>
		[Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email
		{
			get;
			set;
		}

		/// <summary>
		/// Gets or sets password is required.
		/// </summary>
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password
		{
			get;
			set;
		}
	}
}