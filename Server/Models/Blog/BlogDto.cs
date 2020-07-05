using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PersonalSite.Models
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class BlogDto : ModelDto<Blog>, IModelDto<Blog>
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
			LoadEntity(model);
		}

		public BlogDto() { }

		public ModelDto<Blog> LoadEntity(Blog model)
		{
			Id = model.Id;
			Creation = model.Creation;
			Updated = model.Updated;
			HeaderImagePath = model.HeaderImagePath;
			Title = model.Title;
			BlogPosts = model.BlogPosts;
			return this;
		}

		public Blog ToEntity()
		{
			return new Blog
			{
				Id = Id,
				Creation = Creation,
				Updated = Updated,
				Title = Title,
				HeaderImagePath = HeaderImagePath,
				BlogPosts = BlogPosts,
			};
		}

	}
}