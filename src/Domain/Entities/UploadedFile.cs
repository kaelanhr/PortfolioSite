using PersonalSite.Domain.Common;

namespace PersonalSite.Domain.Entities
{
	public class UploadedFile : AbstractModel
	{
		/// <summary>
		/// the bucket or folder name it is contained in.
		/// </summary>
		public string Container { get; set; }

		/// <summary>
		/// The original name of the file.
		/// </summary>
		public string FileName { get; set; }

		/// <summary>
		/// The file extension.
		/// </summary>
		public string ContentType { get; set; }

		/// <summary>
		/// The length of the file in bytes.
		/// </summary>
		public long FileLength { get; set; }

		public Blog Blog { get; set; }

		public byte[] Contents { get; set; }
	}
}
