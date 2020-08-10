public interface IExceptionHandler
{
	Task InvokeAsync(HttpContext context);
}