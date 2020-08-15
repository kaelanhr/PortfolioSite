//using Microsoft.EntityFrameworkCore;
//using Microsoft.EntityFrameworkCore.Metadata.Builders;
//using PersonalSite.Domain.Common;

//namespace PersonalSite.Infrastructure.Persistence.Configurations
//{
//	public class ModelConfiguration : IEntityTypeConfiguration<AbstractModel>
//	{
//		public void Configure(EntityTypeBuilder<AbstractModel> builder)
//		{
//			builder.Property(e => e.Id)
//				.IsRequired();

//			builder.HasIndex(e => e.Id).IsUnique();
//		}
//	}
//}