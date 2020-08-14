using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Projects.Queries.GetProjects
{
	public class GetProjectsQuery : IRequest<ProjectsVm>
	{
	}

	public class GetProjectsQueryHandler : IRequestHandler<GetProjectsQuery, ProjectsVm>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetProjectsQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<ProjectsVm> Handle(GetProjectsQuery request, CancellationToken cancellationToken)
		{
			return new ProjectsVm
			{
				Lists = await _context.Project.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
				.OrderBy(t => t.Title)
				.ToListAsync(cancellationToken)
			};
		}
	}
}
