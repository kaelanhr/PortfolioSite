using System;
using PersonalSite.Application.Common;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Blogs.Queries.GetBlogs
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class BlogPostDto : ModelDto<BlogPost>
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

		public Blog Blog { get; set; }


		/// <summary>
		/// Gets or sets the reference of the blog it is referring to.
		/// </summary>
		public Guid BlogId { get; set; }

		public BlogPostDto(BlogPost model)
		{
			//LoadEntity(model);
		}

		public BlogPostDto() { }

		//public ModelDto<BlogPost> LoadEntity(BlogPost model)
		//{
		//	Id = model.Id;
		//	Creation = model.Creation;
		//	LastModified = model.LastModified;
		//	HeaderImagePath = model.HeaderImagePath;
		//	Title = model.Title;
		//	Content = model.Content;
		//	BlogId = model.BlogId;
		//	Blog = model.Blog;
		//	return this;
		//}

		public BlogPost ToEntity()
		{
			return new BlogPost
			{
				Id = Id,
				Creation = Creation,
				LastModified = LastModified,
				Title = Title,
				HeaderImagePath = HeaderImagePath,
				Blog = Blog,
				BlogId = BlogId,
				Content = Content,
			};
		}
	}
}