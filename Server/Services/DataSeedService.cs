using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;

namespace PersonalSite.Services
{
	/// <summary>
	/// Seed users and roles.
	/// </summary>
	public class DataSeedService
	{
		private readonly ILogger _logger;
		private readonly string[] _roleList = { "Admin" };
		private readonly RoleManager<SiteRole> _roleManager;
		private readonly UserManager<SiteUser> _userManager;

		/// <summary>
		/// Initializes a new instance of the <see cref="DataSeedService"/> class.
		/// </summary>
		/// <param name="userManager">The User Manager used.</param>
		/// <param name="signInManager">The Signin Manager used.</param>
		/// <param name="roleManager">The Role Manager used.</param>
		/// <param name="loggerFactory">The Logger Factory.</param>
		public DataSeedService(
			UserManager<SiteUser> userManager,
			RoleManager<SiteRole> roleManager,
			ILoggerFactory loggerFactory)
		{
			_userManager = userManager;
			_roleManager = roleManager;
			_logger = loggerFactory.CreateLogger<DataSeedService>();
		}

		/// <summary>
		/// Seeds all of the default roles.
		/// </summary>
		/// <returns>Asynchronous Task.</returns>
		public async Task SeedRolesAsync()
		{
			foreach (var role in _roleList)
			{
				var roleExist = await _roleManager.RoleExistsAsync(role);
				if (!roleExist)
				{
					// create the roles and seed them to the database: Question 1
					await _roleManager.CreateAsync(new SiteRole(role));
				}
			}
		}

		/// <summary>
		/// Seeds a default user for each of the defined roles.
		/// </summary>
		/// <returns>Asynchronous Task.</returns>
		public async Task SeedUsersAsync()
		{
			// create a default user for each role
			foreach (var role in _roleList)
			{
				var user = new SiteUser
				{
					Email = $"{role}@example.com",
					UserName = role,
				};

				var userExists = await _userManager.FindByEmailAsync($"{role}@example.com");

				// if the user does not exist create them and assign them to role.
				if (userExists is null)
				{
					await _userManager.CreateAsync(user, "password1234");
					await _userManager.AddToRoleAsync(user, role);
					_logger.LogInformation($"Registering {role} user");
				}
				else
				{
					_logger.LogInformation($"Skipping creation of {role} user");
				}
			}
		}
	}
}