namespace PersonalSite.Models
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
		/// Gets or sets the title of the blog.
		/// </summary>
		public string Title { get; set; }
	}
}