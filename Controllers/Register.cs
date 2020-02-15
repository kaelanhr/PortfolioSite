using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace PersonalSite.Controllers
{
	/// <summary>
	/// Controller which handles user registration.
	/// </summary>
	[AllowAnonymous]
	public class Register
	{
		private readonly SignInManager<IdentityUser> _signInManager;
		private readonly UserManager<IdentityUser> _userManager;
		private readonly ILogger<Register> _logger;
		private readonly IEmailSender _emailSender;


		/// <summary>
		/// Initializes a new instance of the <see cref="Register"/> class.
		/// </summary>
		/// <param name="userManager">The user manager to be used.</param>
		/// <param name="signInManager">The manager to handle sign-on.</param>
		/// <param name="logger">Logger</param>
		/// <param name="emailSender">handle sending emails for registration.</param>
		public Register(
			UserManager<IdentityUser> userManager,
			SignInManager<IdentityUser> signInManager,
			ILogger<Register> logger,
			IEmailSender emailSender)
		{
			_userManager = userManager;
			_signInManager = signInManager;
			_logger = logger;
			_emailSender = emailSender;
		}

		/// <summary>
		/// Register the user with the credentials provided.
		/// </summary>
		/// <returns>A <see cref="Task{TResult}"/> representing the result of the asynchronous operation.</returns>
		public async Task<IActionResult> RegisterUserAsync()
		{
			var username = "blah";
			var email = "blah@example.com";
			var password = "password";

			if (true)
			{
				var user = new IdentityUser
				{
					UserName = username,
					Email = email,
				};
				var result = await _userManager.CreateAsync(user, password);
				if (result.Succeeded)
				{
					_logger.LogInformation("User created a new account with password.");

					// TODO create email registration confirmation token and Send email to confirm.

					if (_userManager.Options.SignIn.RequireConfirmedAccount)
					{
						// TODO: Redirect to confirm email location
					}
					else
					{
						await _signInManager.SignInAsync(user, isPersistent: false);
					}
				}
				foreach (var error in result.Errors)
				{
					// TODO: add errors
				}
			}

			// If we got this far, something failed, redisplay form
			return null;
		}
	}

	/// <summary>
	/// attributes used for registration.
	/// </summary>
	public class InputModel
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
		[StringLength(100, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password
		{
			get;
			set;
		}
	}
}