using System.ComponentModel.DataAnnotations;

namespace PersonalSite.UserDtos
{
	/// <summary>
	/// what is required for minimum user credentials.
	/// </summary>
	public class UserAuthenticationModel
	{
		/// <summary>
		/// Gets or sets password is required.
		/// </summary>
		[Required]
		[DataType(DataType.Password)]
		[Display(Name = "Password")]
		public string Password { get; set; }

		/// <summary>
		/// Gets or sets required valid email address.
		/// </summary>
		[Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }
	}
}