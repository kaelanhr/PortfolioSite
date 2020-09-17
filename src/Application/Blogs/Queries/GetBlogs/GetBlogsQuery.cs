using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using PersonalSite.Application.Common.Interfaces;

namespace PersonalSite.Application.Blogs.Queries.GetBlogs
{
	public class GetBlogsQuery : IRequest<IEnumerable<BlogDto>>
	{

	}

	public class GetBlogsQueryHandler : IRequestHandler<GetBlogsQuery, IEnumerable<BlogDto>>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetBlogsQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<IEnumerable<BlogDto>> Handle(GetBlogsQuery request, CancellationToken cancellationToken)
		{
			return await _context.Blog.ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
			.OrderBy(t => t.Title)
			.ToListAsync(cancellationToken);
		}
	}
}