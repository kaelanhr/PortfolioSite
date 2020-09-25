using System;
using System.Collections.Generic;
using PersonalSite.Domain.Common;

namespace PersonalSite.Domain.Entities
{
	/// <summary>
	/// A blog category which can contain many blog posts.
	/// </summary>
	public class Blog : AbstractModel
	{
		/// <summary>
		/// Gets or sets the header image for the blog.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// The header image file content and meta data
		/// </summary>
		public UploadedFile Header { get; set; }

		/// <summary>
		/// The id of the blogs header image.
		/// </summary>
		public Guid HeaderImageId { get; set; }

		/// <summary>
		/// Gets or sets the title of the blog.
		/// </summary>
		public string Title { get; set; }

		/// <summary>
		/// Gets or sets Blog posts associated with this blog.
		/// </summary>
		public List<BlogPost> BlogPosts { get; set; }
	}
}