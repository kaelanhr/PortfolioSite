using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PersonalSite.Application.Common;
using PersonalSite.Application.Common.Interfaces;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Projects.Queries.GetProjects
{
	/// <summary>
	/// Everything contained within a single blog post.
	/// </summary>
	public class ProjectDto : ModelDto<Project>, IModelDto<Project>
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

		public ProjectDto(Project model)
		{
			LoadEntity(model);
		}

		public ProjectDto() { }

		public ModelDto<Project> LoadEntity(Project model)
		{
			Id = model.Id;
			Creation = model.Creation;
			LastModified = model.LastModified;
			Content = model.Content;
			HeaderImagePath = model.HeaderImagePath;
			Highlight = model.Highlight;
			ProjectUrl = model.ProjectUrl;
			Title = model.Title;

			return this;
		}

		public Project ToEntity()
		{
			return new Project
			{
				Id = Id,
				Creation = Creation,
				LastModified = LastModified,
				Content = Content,
				HeaderImagePath = HeaderImagePath,
				Highlight = Highlight,
				ProjectUrl = ProjectUrl,
				Title = Title,
			};
		}
	}
}