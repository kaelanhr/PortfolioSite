using System;
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
	public class GetBlogByIdQuery : IRequest<BlogDto>
	{
		public Guid Id { get; set; }
	}

	public class GetBlogByIdQueryHandler : IRequestHandler<GetBlogByIdQuery, BlogDto>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetBlogByIdQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<BlogDto> Handle(GetBlogByIdQuery request, CancellationToken cancellationToken)
		{
			return await _context.Blog
			.Where(p => p.Id == request.Id)
			.Include(p => p.BlogPosts)
			.ProjectTo<BlogDto>(_mapper.ConfigurationProvider)
			.OrderBy(t => t.Title)
			.FirstOrDefaultAsync(cancellationToken);
		}
	}
}