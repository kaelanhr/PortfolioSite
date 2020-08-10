using System.ComponentModel.DataAnnotations;
using PersonalSite.Application.Users;

namespace PersonalSite.Application.Users
{
	/// <summary>
	/// attributes used for registration.
	/// </summary>
	public class UserRegistrationModel : UserAuthenticationModel
	{
		/// <summary>
		/// Gets or sets required username.
		/// </summary>
		[Required]
		[Display(Name = "Username")]
		public string Username { get; set; }
	}
}