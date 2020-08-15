using System;
using AutoMapper;
using PersonalSite.Application.Common.Mappings;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Projects.Queries.GetProjects
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class ProjectDto : IMapFrom<Project>
	{

		public Guid Id { get; set; }
		public string Content { get; set; }
		public string HeaderImagePath { get; set; }
		public string Title { get; set; }
		public bool Highlight { get; set; }
		public string ProjectUrl { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<Project, ProjectDto>();
		}
	}
}