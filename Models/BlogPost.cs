


using System.ComponentModel.DataAnnotations;

namespace PersonalSite.Models
{
	public class BlogPost
	{
		[Key]
		public int BlogId
		{
			get;
			set;
		}

		public string Title
		{
			get;
			set;
		}

		public string Content
		{
			get;
			set;
		}

		public string HeaderImagePath
		{
			get;
			set;
		}

	}
}