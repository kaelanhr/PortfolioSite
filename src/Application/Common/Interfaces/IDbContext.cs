using PersonalSite.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace PersonalSite.Application.Common.Interfaces
{
	public interface IDbContext
	{
		/// <summary>
		/// Gets or sets blog post so they can be created with EF.
		/// </summary>
		public DbSet<BlogPost> BlogPost { get; set; }

		/// <summary>
		/// Gets or sets blog post so they can be created with EF.
		/// </summary>
		public DbSet<Blog> Blog { get; set; }

		/// <summary>
		/// Gets or sets site content so they can be created with EF.
		/// </summary>
		public DbSet<SiteContent> SiteContent { get; set; }

		/// <summary>
		/// Gets or sets the project so they can be managed by EF.
		/// </summary>
		public DbSet<Project> Project { get; set; }

		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	}
}
