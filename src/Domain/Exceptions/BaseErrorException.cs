using System;

namespace PersonalSite.Domain.Exceptions
{
	/// <summary>
	/// The exception to be thrown when an unknown error has occured and
	/// do not want to send back a large stacktrace exception.
	/// </summary>
	[Serializable]
	public class BaseErrorException : Exception
	{
		private readonly System.Runtime.Serialization.SerializationInfo info;

		/// <summary>
		/// Initializes a new instance of the <see cref="BaseErrorException"/> class.
		/// </summary>
		public BaseErrorException() : base("An error occured")
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="BaseErrorException"/> class.
		/// </summary>
		/// <param name="message">The exception message.</param>
		public BaseErrorException(string message) : base(message)
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="BaseErrorException"/> class.
		/// </summary>
		/// <param name="message">The exception message.</param>
		/// <param name="innerException">The inner exception being thrown.</param>
		public BaseErrorException(string message, Exception innerException) : base(message, innerException)
		{
		}


		/// <summary>
		/// Initializes a new instance of the <see cref="BaseErrorException"/> class.
		/// </summary>
		/// <param name="info">The seralization info.</param>
		/// <param name="context">The streaming context.</param>
		protected BaseErrorException(
			System.Runtime.Serialization.SerializationInfo info,
			System.Runtime.Serialization.StreamingContext context) : base(info, context)
		{
			// A constructor is needed for serialization when an
			// exception propagates from a remoting server to the client.
			this.info = info;
		}
	}
}
