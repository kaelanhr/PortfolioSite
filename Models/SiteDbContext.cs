using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Models;

namespace ConsoleApp.PostgreSQL
{
	public class SiteDbContext : IdentityDbContext<IdentityUser>
	{

		public SiteDbContext(DbContextOptions<SiteDbContext> options) : base(options)
		{

		}

		public SiteDbContext()
		{

		}
		public DbSet<BlogPost> Blogs
		{
			get;
			set;
		}
	}
}