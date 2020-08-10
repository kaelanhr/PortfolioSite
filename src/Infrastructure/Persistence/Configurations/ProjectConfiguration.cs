using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Infrastructure.Persistence.Configurations
{
	public class ProjectConfiguration : IEntityTypeConfiguration<Project>
	{
		public void Configure(EntityTypeBuilder<Project> builder)
		{
			builder
				.HasIndex(i => i.Title)
				.IsUnique();
		}
	}
}