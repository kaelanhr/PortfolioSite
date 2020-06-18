using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalSite.Models
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class Project : IAbstractModel
	{
		/// <summary>
		/// Gets or sets blog content.
		/// </summary>
		[Column(TypeName = "text")]
		[Required]
		public string Content { get; set; }

		/// <summary>
		/// Gets or sets the header image for the blog.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the blog.
		/// </summary>
		[Required]
		public string Title { get; set; }

		/// <inheritdoc/>
		[Key]
		public Guid Id { get; set; }
	}
}