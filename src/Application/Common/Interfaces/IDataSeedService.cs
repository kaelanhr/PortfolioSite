using System.Threading.Tasks;

namespace PersonalSite.Application.Common.Interfaces
{

	public interface IDataSeedService
	{
		Task SeedRolesAsync();
		Task SeedUsersAsync();
	}
}