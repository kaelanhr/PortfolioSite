using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
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
		[Route("/Login")]
		// [ValidateAntiForgeryToken]
		public async Task<IActionResult> LoginAsync(UserModel userModel)
		{
			if (ModelState.IsValid)
			{
				// This doesn't count login failures towards account lockout
				// To enable password failures to trigger account lockout, set lockoutOnFailure: true
				var result = await _signInManager.PasswordSignInAsync(
					userModel.Email,
					userModel.Password,
					isPersistent: false,
					lockoutOnFailure: false);

				if (result.Succeeded)
				{
					_logger.LogInformation(1, "User logged in.");
					return Ok();
				}
				if (result.IsLockedOut)
				{
					_logger.LogWarning(2, "User account locked out.");
					return BadRequest();
				}
				else
				{
					ModelState.AddModelError(string.Empty, "Invalid login attempt.");
					return BadRequest();
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
		// [ValidateAntiForgeryToken]
		[Route("/Logout")]
		public async Task<IActionResult> LogOutAsync()
		{
			await _signInManager.SignOutAsync();
			_logger.LogInformation(4, "User logged out.");
			return Ok();
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