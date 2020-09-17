using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Application.Common.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace PersonalSite.Infrastructure.Identity
{
	public class IdentityService : IIdentityService
	{
		private readonly UserManager<SiteUser> _userManager;

		public IdentityService(UserManager<SiteUser> userManager)
		{
			_userManager = userManager;
		}

		public async Task<string> GetUserNameAsync(Guid userId)
		{
			var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

			return user.UserName;
		}

		public async Task<(Result Result, Guid UserId)> CreateUserAsync(string userName, string password)
		{
			var user = new SiteUser
			{
				UserName = userName,
				Email = userName,
			};

			var result = await _userManager.CreateAsync(user, password);

			return (result.ToApplicationResult(), user.Id);
		}

		public async Task<Result> DeleteUserAsync(Guid userId)
		{
			var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

			if (user != null)
			{
				return await DeleteUserAsync(user);
			}

			return Result.Success();
		}

		public async Task<Result> DeleteUserAsync(SiteUser user)
		{
			var result = await _userManager.DeleteAsync(user);

			return result.ToApplicationResult();
		}
	}
}
