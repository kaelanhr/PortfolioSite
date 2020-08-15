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

namespace PersonalSite.Application.BlogPosts.Queries.GetBlogPosts
{
	public class GetBlogPostByIdQuery : IRequest<BlogPostDto>
	{
		public Guid BlogId { get; set; }
	}

	public class GetBlogPostByIdQueryHandler : IRequestHandler<GetBlogPostByIdQuery, BlogPostDto>
	{
		private readonly IDbContext _context;
		private readonly IMapper _mapper;

		public GetBlogPostByIdQueryHandler(IDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		public async Task<BlogPostDto> Handle(GetBlogPostByIdQuery request, CancellationToken cancellationToken)
		{
			return await _context.BlogPost
				.Where(p => p.BlogId == request.BlogId)
				.ProjectTo<BlogPostDto>(_mapper.ConfigurationProvider)
				.FirstOrDefaultAsync(cancellationToken);
		}
	}
}
