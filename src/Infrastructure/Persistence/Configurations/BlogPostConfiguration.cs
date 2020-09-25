using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Infrastructure.Persistence.Configurations
{
	public class BlogPostConfiguration : IEntityTypeConfiguration<BlogPost>
	{
		public void Configure(EntityTypeBuilder<BlogPost> builder)
		{
			builder
				.HasOne(p => p.Blog)
				.WithMany(b => b.BlogPosts)
				.IsRequired();

			builder.Property(e => e.Content)
				.HasMaxLength(500)
				.IsRequired();
		}
	}
}