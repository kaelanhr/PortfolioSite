using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
	public class BlogConfiguration : IEntityTypeConfiguration<TodoItem>
	{
		public void Configure(EntityTypeBuilder<BlogPost> builder)
		{
			builder.Entity<BlogPost>()
				.HasOne(p => p.Blog)
				.WithMany(b => b.BlogPosts)
				.IsRequired();
		}
	}
}