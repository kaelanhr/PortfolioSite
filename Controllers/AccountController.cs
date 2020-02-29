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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage user accounts login, register, forgot password etc.
	/// </summary>
	[Authorize]
	public class AccountController : Controller
	{
		private readonly UserManager<SiteUser> _userManager;
		private readonly SignInManager<SiteUser> _signInManager;
		private readonly RoleManager<SiteRole> _roleManager;
		private readonly ILogger _logger;

		/// <summary>
		/// Initializes a new instance of the <see cref="AccountController"/> class.
		/// </summary>
		/// <param name="userManager">Identity user manager.</param>
		/// <param name="signInManager">Identity sign in manager.</param>
		/// <param name="roleManager">Identity role manager.</param>
		/// <param name="loggerFactory">Log controller actions.</param>
		public AccountController(
			UserManager<SiteUser> userManager,
			SignInManager<SiteUser> signInManager,
			RoleManager<SiteRole> roleManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_roleManager = roleManager;
			_logger = loggerFactory.CreateLogger<AccountController>();
		}

		/// <summary>
		/// Logs a user in.
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
					var userRolesClaim = (await _userManager.GetRolesAsync(user)).Select(r => new Claim(ClaimTypes.Role, r));

					var claimsIdentity = new ClaimsIdentity(
						CookieAuthenticationDefaults.AuthenticationScheme, ClaimTypes.Name, ClaimTypes.Role);

					claimsIdentity.AddClaim(new Claim("UserId", user.Id.ToString()));
					claimsIdentity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
					claimsIdentity.AddClaims(userRolesClaim);

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
		[HttpGet]
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
		/// <returns>A <see cref="Task{TResult}"/>Determine whether a user is logged in.</returns>
		[HttpGet]
		[Authorize]
		// [ValidateAntiForgeryToken]
		[Route("/Identity/Account/me")]
		public async Task<UserResult> CheckLoginAsync()
		{
			if (User.Identity.IsAuthenticated)
			{
				var user = _userManager.Users.FirstOrDefault(u => u.UserName == User.Identity.Name);

				var userRoleNames = (await _userManager.GetRolesAsync(user)).ToList();
				var userRoles = await _roleManager.Roles.Where(r => userRoleNames.Contains(r.Name)).ToListAsync();
				_logger.LogInformation(4, "Check whether this user is logged in");
				return new UserResult
				{
					Email = user.Email,
					UserName = user.UserName,
					userGroups = userRoles.Select(ur => new UserGroupResult { Name = ur.Name }),
				};
			}

			_logger.LogInformation(4, "User is not authenticated");
			return null;
		}

		/// <summary>
		/// Register a User.
		/// </summary>
		/// <param name="userModel">Required registration model.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[AllowAnonymous]
		// [ValidateAntiForgeryToken]
		[Route("/Identity/Account/Register")]
		public async Task<IActionResult> RegisterUserAsync([FromBody] UserRegistrationModel userModel)
		{
			if (ModelState.IsValid)
			{
				var user = new SiteUser
				{
					UserName = userModel.Username,
					Email = userModel.Email,
				};

				var result = await _userManager.CreateAsync(user, userModel.Password);
				if (result.Succeeded)
				{
					await _userManager.AddToRoleAsync(user, "Member");
					_logger.LogInformation(3, "User created a new account with password.");
					return Ok();
				}

				foreach (var error in result.Errors)
				{
					// we do not reveal whether an email account exists in the system.
					// TODO: find a better way to do this, i do not like relying on a 'string' to check this.
					if (error.Code != "DuplicateEmail")
					{
						ModelState.AddModelError("Errors", error.Description);
					}
				}
			}

			// If we got this far, something failed, return the error
			return new BadRequestObjectResult(ModelState);
		}
	}

	/// <summary>
	/// type returned to the clientside as a user result.
	/// </summary>
	public class UserResult
	{
		/// <summary>
		/// Gets or sets the email of the user.
		/// </summary>
		public string Email { get; set; }

		/// <summary>
		/// Gets or sets username of user.
		/// </summary>
		public string UserName { get; set; }

		/// <summary>
		/// Gets or sets users first name.
		/// </summary>
		public string FirstName { get; set; }

		/// <summary>
		/// Gets or sets users last name.
		/// </summary>
		public string LastName { get; set; }

		public IEnumerable<UserGroupResult> userGroups { get; set; }
	}

	/// <summary>
	/// attributes used for registration.
	/// </summary>
	public class UserRegistrationModel : UserModel
	{
		/// <summary>
		/// Gets or sets required username.
		/// </summary>
		[Required]
		[Display(Name = "Username")]
		public string Username { get; set; }
	}

	public class UserGroupResult
	{
		/// <summary>
		/// Gets or sets the name of the user group.
		/// </summary>
		[Required]
		[Display(Name = "Name")]
		public string Name { get; set; }
	}

	/// <summary>
	/// what is required for minimum user credentials.
	/// </summary>
	public class UserModel
	{
		/// <summary>
		/// Gets or sets password is required.
		/// </summary>
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }

		/// <summary>
		/// Gets or sets required valid email address.
		/// </summary>
		[Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }
	}
}