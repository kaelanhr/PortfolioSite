using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Infrastructure.Persistence.Configurations
{
	public class UploadedFileConfiguration : IEntityTypeConfiguration<UploadedFile>
	{
		public void Configure(EntityTypeBuilder<UploadedFile> builder)
		{
			builder
				.Property(x => x.Container).IsRequired();
			builder
				.Property(x => x.ContentType).IsRequired();
			builder
				.Property(x => x.FileLength).IsRequired();
			builder
				.Property(x => x.FileName).IsRequired();

			builder.ToTable("__Files");

			builder.Ignore(x => x.Contents);
		}
	}
}