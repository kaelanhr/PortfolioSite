using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ConsoleApp.PostgreSQL
{
	public class BloggingContext : DbContext
	{
		public DbSet<Blog> Blogs
		{
			get;
			set;
		}
		public DbSet<Post> Posts
		{
			get;
			set;
		}

		public BloggingContext(DbContextOptions<BloggingContext> options) : base(options)
		{

		}

		public BloggingContext()
		{ }

		protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
		{
			optionsBuilder
				.UseNpgsql("User ID=postgres;Password=pass;Server=localhost;Port=5432;Database=my_db;Integrated Security=true; Pooling=true;Command Timeout=0;");

		}
	}
}