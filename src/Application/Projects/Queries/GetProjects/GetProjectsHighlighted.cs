using System.Collections.Generic;
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
	public class GetProjectsHighlightedQuery : IRequest<IEnumerable<ProjectDto>>
	{

	}

	public class GetProjectsHighlightedQueryHandler : IRequestHandler<GetProjectsHighlightedQuery, IEnumerable<ProjectDto>>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetProjectsHighlightedQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<IEnumerable<ProjectDto>> Handle(GetProjectsHighlightedQuery request, CancellationToken cancellationToken)
		{
			return await _context
				.Project
				.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
				.Where(p => p.Highlight)
				.ToListAsync(cancellationToken);
		}
	}
}
