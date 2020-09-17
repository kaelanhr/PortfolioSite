using PersonalSite.Application.Common.Models;
using System;
using System.Threading.Tasks;

namespace PersonalSite.Application.Common.Interfaces
{
	public interface IIdentityService
	{
		Task<string> GetUserNameAsync(Guid userId);

		Task<(Result Result, Guid UserId)> CreateUserAsync(string userName, string password);

		Task<Result> DeleteUserAsync(Guid userId);
	}
}
