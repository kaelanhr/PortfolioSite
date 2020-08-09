using System;

namespace PersonalSite.Exceptions
{
	/// <summary>
	/// The exception to be thrown when an item validates a unique index.
	/// </summary>
	[Serializable]
	public class DuplicateIndexException : Exception
	{
		private readonly System.Runtime.Serialization.SerializationInfo info;

		/// <summary>
		/// Initializes a new instance of the <see cref="DuplicateIndexException"/> class.
		/// </summary>
		public DuplicateIndexException() : base("Cannot create entity with duplicate id or index")
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="DuplicateIndexException"/> class.
		/// </summary>
		/// <param name="message">The exception message.</param>
		public DuplicateIndexException(string message) : base(message)
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="DuplicateIndexException"/> class.
		/// </summary>
		/// <param name="message">The exception message.</param>
		/// <param name="innerException">The inner exception.</param>
		public DuplicateIndexException(string message, Exception innerException) : base(message, innerException)
		{
		}

		/// <summary>
		/// Initializes a new instance of the <see cref="DuplicateIndexException"/> class.
		/// </summary>
		/// <param name="info">The seralization info.</param>
		/// <param name="context">The streaming context.</param>
		protected DuplicateIndexException(
			System.Runtime.Serialization.SerializationInfo info,
			System.Runtime.Serialization.StreamingContext context) : base(info, context)
		{
			// A constructor is needed for serialization when an
			// exception propagates from a remoting server to the client.
			this.info = info;
		}
	}
}
