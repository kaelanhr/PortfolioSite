using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using PersonalSite.Domain.Entities;

namespace PersonalSite.Application.Services
{
	public class FileService
	{
		private readonly string[] permittedExtensions = { ".jpg", ".png" };

		public bool ValidateFile(IFormFile file)
		{
			var ext = Path.GetExtension(file.FileName).ToLowerInvariant();

			if (!string.IsNullOrEmpty(ext) && permittedExtensions.Contains(ext) && file.Length > 3000000)
			{
				return true;
			}
			return false;
		}

		public UploadedFile ProcessFile(IFormFile file, string containerName)
		{
			return new UploadedFile
			{
				Container = containerName,
				ContentType = file.ContentType,
				FileLength = file.Length,
				FileName = file.FileName,
				Content = file.OpenReadStream()
			};
		}

		public async Task SaveFile(UploadedFile file)
		{
			// set the file path and file name.
			var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.Container);

			if (!Directory.Exists(filePath))
			{
				Directory.CreateDirectory(filePath);
			}

			// save to the file system.
			await using var writeStream = File.OpenWrite(Path.Combine(filePath, file.Id.ToString()));
			await file.Content.CopyToAsync(writeStream);
		}
	}
}
