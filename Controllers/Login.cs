using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PersonalSite.Controllers
{
	[AllowAnonymous]
	public class Login
	{
		private readonly UserManager<IdentityUser> _userManager;
		private readonly SignInManager<IdentityUser> _signInManager;
		private readonly ILogger<Login> _logger;

		public Login(SignInManager<IdentityUser> signInManager,
			ILogger<Login> logger,
			UserManager<IdentityUser> userManager)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = logger;
		}

		public class InputModel
		{
			[Required]
			[EmailAddress]
			public string Email
			{
				get;
				set;
			}

			[Required]
			[DataType(DataType.Password)]
			public string Password
			{
				get;
				set;
			}
		}

		public async Task<IActionResult> LoginAsync(string returnUrl = null)
		{
			var username = "blah";
			var email = "blah@example.com";
			var password = "password";
			if (true)
			{
				// This doesn't count login failures towards account lockout
				// To enable password failures to trigger account lockout, set lockoutOnFailure: true
				var result = await _signInManager.PasswordSignInAsync(email, password, false, lockoutOnFailure: false);
				if (result.Succeeded)
				{
					_logger.LogInformation("User logged in.");
				}
				if (result.RequiresTwoFactor)
				{
					// TODO: Take to 2fa page
				}
				if (result.IsLockedOut)
				{
					_logger.LogWarning("User account locked out.");
					// TODO: redirect to page which says they are locked out
				}
				else
				{
					// TODO: Error in login attempt
				}
			}

			// If we got this far, something failed
			return null;
		}
	}
}