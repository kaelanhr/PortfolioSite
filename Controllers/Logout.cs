using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace WebApp1.Areas.Identity.Pages.Account
{
	/// <summary>
	/// Controller for logging users out.
	/// </summary>
	[AllowAnonymous]
	public class Logout
	{
		private readonly ILogger<Logout> _logger;
		private readonly SignInManager<IdentityUser> _signInManager;

		/// <summary>
		/// Initializes a new instance of the <see cref="Logout"/> class.
		/// </summary>
		/// <param name="signInManager">Sign in manager</param>
		/// <param name="logger">Log the user sign out</param>
		public Logout(SignInManager<IdentityUser> signInManager, ILogger<Logout> logger)
		{
			_signInManager = signInManager;
			_logger = logger;
		}

		/// <summary>
		/// Logs the current user out.
		/// </summary>
		/// <returns>The redirect action</returns>
		[HttpPost]
		public async Task<IActionResult> LogoutUserAsync()
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation("User logged out.");
			return null;
		}
	}
}