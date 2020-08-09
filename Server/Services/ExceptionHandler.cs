using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace PersonalSite.Services
{
	public class ExceptionHandler
	{
		private readonly RequestDelegate _next;

		public ExceptionHandler(RequestDelegate next)
		{
			_next = next;
		}

		public async Task InvokeAsync(HttpContext context)
		{
			try
			{
				await _next.Invoke(context);
			}
			catch (Exception ex)
			{
				await HandleExceptionAsync(context, ex);
			}
		}

		private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
		{
			var response = context.Response;
			response.ContentType = "application/json";
			await response.WriteAsync(JsonConvert.SerializeObject(new
			{
				error = new
				{
					message = exception.Message,
					exception = exception.GetType().Name,
				},
			}));
		}
	}
}
