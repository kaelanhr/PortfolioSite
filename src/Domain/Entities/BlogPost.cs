using System;
using PersonalSite.Domain.Common;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Domain.Entities
{
	public class BlogPost : AbstractModel
	{
		/// <summary>
		/// Gets or sets blog content.
		/// </summary>
		public string Content { get; set; }

		/// <summary>
		/// Gets or sets the header image for the blog.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the blog.
		/// </summary>
		public string Title { get; set; }

		/// <summary>
		/// The header image file content and meta data
		/// </summary>
		public UploadedFile Header { get; set; }

		/// <summary>
		/// The id of the blogs posts header image.
		/// </summary>
		public Guid HeaderImageId { get; set; }

		public Guid BlogId { get; set; }

		public Blog Blog { get; set; }
	}
}