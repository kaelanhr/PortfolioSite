using System;
using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Common;
using PersonalSite.Domain.Entities;
using PersonalSite.Infrastructure.Identity;

namespace PersonalSite.Infrastructure.Persistence
{
	/// <summary>
	/// The database context used for the site.
	/// </summary>
	public class SiteDbContext : IdentityDbContext<SiteUser, SiteRole, Guid>, IDbContext
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
		/// Gets or sets the site user so they can be created with EF.
		/// </summary>
		public DbSet<SiteUser> SiteUser { get; set; }

		/// <summary>
		/// Gets or sets the project so they can be managed by EF.
		/// </summary>
		public DbSet<Project> Project { get; set; }

		/// <summary>
		/// Gets or sets the file so they can be managed by EF.
		/// </summary>
		public DbSet<UploadedFile> UploadedFile { get; set; }

		public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
		{
			foreach (var entry in ChangeTracker.Entries<AbstractModel>())
			{
				switch (entry.State)
				{
					case EntityState.Added:
						entry.Entity.Creation = DateTime.Now;
						break;
					case EntityState.Modified:
						entry.Entity.LastModified = DateTime.Now;
						break;
				}
			}

			return base.SaveChangesAsync(cancellationToken);
		}

		/// <inheritdoc/>
		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

			base.OnModelCreating(builder);

			builder.Entity<SiteUser>()
				.HasIndex(u => u.UserName)
				.IsUnique();
		}

		public IDbContextTransaction BeginTransaction()
		{
			return base.Database.BeginTransaction();
		}

		public void Commit()
		{
			base.Database.CommitTransaction();
		}

		public void Rollback()
		{
			base.Database.RollbackTransaction();
		}
	}
}