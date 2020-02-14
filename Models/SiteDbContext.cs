using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Models;

namespace ConsoleApp.PostgreSQL
{
	public class SiteDbContext : IdentityDbContext
	{
		public DbSet<BlogPost> Blogs
		{
			get;
			set;
		}

		public SiteDbContext(DbContextOptions<SiteDbContext> options) : base(options)
		{

		}

		public SiteDbContext()
		{
		
		}
	}
}