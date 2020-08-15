using System.Collections.Generic;
using PersonalSite.Application.Common;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Blogs.Queries.GetBlogs
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class BlogDto : ModelDto<Blog>
	{
		/// <summary>
		/// Gets or sets the header image for the blog.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the blog.
		/// </summary>
		public string Title { get; set; }

		/// <summary>
		/// Gets or sets Blog posts associated with this blog.
		/// </summary>
		public List<BlogPost> BlogPosts { get; set; }

		public BlogDto(Blog model)
		{
			//LoadEntity(model);
		}

		public BlogDto() { }

		//public ModelDto<Blog> LoadEntity(Blog model)
		//{
		//	Id = model.Id;
		//	Creation = model.Creation;
		//	LastModified = model.LastModified;
		//	HeaderImagePath = model.HeaderImagePath;
		//	Title = model.Title;
		//	BlogPosts = model.BlogPosts;
		//	return this;
		//}

		public Blog ToEntity()
		{
			return new Blog
			{
				Id = Id,
				Creation = Creation,
				LastModified = LastModified,
				Title = Title,
				HeaderImagePath = HeaderImagePath,
				BlogPosts = BlogPosts,
			};
		}

	}
}