using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Models;

namespace ConsoleApp.PostgreSQL
{
	public class SiteDbContext : DbContext
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
		{ }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseNpgsql("User ID=postgres;Password=pass;Server=localhost;Port=5432;Database=my_db;Integrated Security=true; Pooling=true;Command Timeout=0;");
		}
	}
}