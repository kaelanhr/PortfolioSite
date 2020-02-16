using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Models;

namespace ConsoleApp.PostgreSQL
{
	/// <summary>
	/// The database context used for the site.
	/// </summary>
	public class SiteDbContext : IdentityDbContext<IdentityUser>
	{
		/// <summary>
		/// Initializes a new instance of the <see cref="SiteDbContext"/> class.
		/// </summary>
		/// <param name="options">options come from DI.</param>
		public SiteDbContext(DbContextOptions<SiteDbContext> options)
			: base(options)
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="SiteDbContext"/> class.
		/// </summary>
		public SiteDbContext()
		{
		}

		/// <summary>
		/// Gets or sets blog post so they can be created with EF.
		/// </summary>
		public DbSet<BlogPost> Blogs
		{
			get;
			set;
		}
	}
}