using System;
using AutoMapper;
using PersonalSite.Application.Common.Mappings;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.BlogPosts.Queries.GetBlogPosts
{
	public class BlogPostDto : IMapFrom<BlogPost>
	{
		public string Content { get; set; }

		public string HeaderImagePath { get; set; }

		public string Title { get; set; }

		public Blog Blog { get; set; }

		public Guid BlogId { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<BlogPost, BlogPostDto>();
		}
	}
}