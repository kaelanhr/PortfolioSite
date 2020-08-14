using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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
		/// <summary>
		/// Gets or sets blog content.
		/// </summary>
		[Column(TypeName = "text")]
		[Required]
		public string Content { get; set; }

		/// <summary>
		/// Gets or sets the header image for the project.
		/// </summary>
		public string HeaderImagePath { get; set; }

		/// <summary>
		/// Gets or sets the title of the project.
		/// </summary>
		[Required]
		public string Title { get; set; }

		/// <summary>
		/// Gets or sets a value indicating whether the project is highlighted or not.
		/// </summary>
		[Required]
		public bool Highlight { get; set; }

		public string ProjectUrl { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<Project, ProjectDto>();
		}
	}
}