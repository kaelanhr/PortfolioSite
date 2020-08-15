using System;
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
	public class GetProjectsQueryById : IRequest<ProjectDto>
	{
		public Guid Id { get; set; }
	}

	public class GetProjectsByIdQueryHandler : IRequestHandler<GetProjectsQueryById, ProjectDto>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetProjectsByIdQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<ProjectDto> Handle(GetProjectsQueryById request, CancellationToken cancellationToken)
		{
			return await _context.Project
				.Where(p => p.Id == request.Id)
				.ProjectTo<ProjectDto>(_mapper.ConfigurationProvider)
				.OrderBy(t => t.Title)
				.FirstOrDefaultAsync(cancellationToken);
		}
	}
}
