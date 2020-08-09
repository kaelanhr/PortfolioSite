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
using PersonalSite.UserDtos;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Manage user accounts login, register, forgot password etc.
	/// </summary>
	[Authorize]
	public class AccountController : Controller
	{
		private readonly UserManager<SiteUser> _userManager;
		private readonly RoleManager<SiteRole> _roleManager;
		private readonly ILogger _logger;

		/// <summary>
		/// Initializes a new instance of the <see cref="AccountController"/> class.
		/// </summary>
		/// <param name="userManager">Identity user manager.</param>
		/// <param name="roleManager">Identity role manager.</param>
		/// <param name="loggerFactory">Log controller actions.</param>
		public AccountController(
			UserManager<SiteUser> userManager,
			RoleManager<SiteRole> roleManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_logger = loggerFactory.CreateLogger<AccountController>();
		}

		/// <summary>
		/// Logs a user in.
		/// </summary>
		/// <param name="userModel">Object needed to login a user.</param>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		[HttpPost]
		[AllowAnonymous]
		[Route("/Identity/Account/Login")]
		public async Task<IActionResult> LoginAsync([FromBody] UserAuthenticationModel userModel)
		{
			if (ModelState.IsValid)
			{
				// get the user, if the password matches then we can continue on.
				var user = _userManager.Users.SingleOrDefault(u => u.NormalizedEmail == userModel.Email.ToUpper());
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
		[Route("/Identity/Account/Logout")]
		public async Task<IActionResult> LogOutAsync()
		{
			await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
			_logger.LogInformation(4, "User logged out.");
			return Ok();
		}

		/// <summary>
		/// Check a user is logged in.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/>Determine whether a user is logged in.</returns>
		[HttpGet]
		[Authorize]
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
					UserGroups = userRoles.Select(ur => new UserGroupResult { Name = ur.Name }),
				};
			}

			_logger.LogInformation(4, "User is not authenticated");
			return null;
		}
	}
}