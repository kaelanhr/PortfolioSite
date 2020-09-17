using PersonalSite.Domain.Common;

namespace PersonalSite.Domain.Entities
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class Project : AbstractModel
	{
		/// <summary>
		/// Gets or sets blog content.
		/// </summary>
		public string Content { get; set; }

		/// <summary>
		/// Gets or sets the header image for the project.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the project.
		/// </summary>
		public string Title { get; set; }

		/// <summary>
		/// Gets or sets a value indicating whether the project is highlighted or not.
		/// </summary>
		public bool Highlight { get; set; }

		/// <summary>
		/// Gets or sets the url of a particular projects source code, usually located
		/// on github.
		/// </summary>
		public string ProjectUrl { get; set; }
	}
}