using System;
using System.Collections.Generic;
using AutoMapper;
using PersonalSite.Application.Common.Mappings;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Blogs.Queries.GetBlogs
{
	public class BlogDto : IMapFrom<Blog>
	{
		public Guid Id { get; set; }
		public string HeaderImagePath { get; set; }
		public string Title { get; set; }
		public List<BlogPost> BlogPosts { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<Blog, BlogDto>();
		}
	}
}