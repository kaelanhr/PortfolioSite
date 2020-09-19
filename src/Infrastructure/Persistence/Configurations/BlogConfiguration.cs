using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Infrastructure.Persistence.Configurations
{
	public class BlogConfiguration : IEntityTypeConfiguration<Blog>
	{
		public void Configure(EntityTypeBuilder<Blog> builder)
		{
			builder
				.HasOne(b => b.Header)
				.WithOne(b => b.Blog)
				.HasForeignKey<Blog>(x => x.HeaderImageId);

		}
	}
}