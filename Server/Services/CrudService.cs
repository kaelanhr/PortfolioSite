using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using PersonalSite.Models;

namespace PersonalSite.Services
{
	/// <summary>
	/// Crud service is used for performing all crud
	/// operations on entities.
	/// </summary>
	public class CrudService
	{
		private readonly ILogger _logger;
		private readonly SiteDbContext _dbContext;
		private readonly UserManager<SiteUser> _userManager;

		/// <summary>
		/// Initializes a new instance of the <see cref="CrudService"/> class.
		/// </summary>
		/// <param name="userManager">The User Manager used.</param>
		/// <param name="dbContext">The dbContext used for this service.</param>
		/// <param name="loggerFactory">The logger factory used.</param>
		public CrudService(
			UserManager<SiteUser> userManager,
			SiteDbContext dbContext,
			ILoggerFactory loggerFactory)
		{
			_dbContext = dbContext;
			_userManager = userManager;
			_logger = loggerFactory.CreateLogger<DataSeedService>();
		}

		/// <summary>
		/// Returns the db set of a given entity.
		/// </summary>
		/// <typeparam name="T">The entity being read.</typeparam>
		/// <returns>An IQueryable dbSet of a particular entity.</returns>
		public IQueryable<T> Get<T>()
			where T : class, IAbstractModel, new()
		{
			return _dbContext.Set<T>();
		}

		/// <summary>
		/// Create an entity of the given type.
		/// </summary>
		/// <typeparam name="T">The type of entity being created.</typeparam>
		/// <param name="entity">The entity being created.</param>
		/// <returns>The entity which was saved.</returns>
		public async Task<T> CreateAsync<T>(T entity)
			where T : class, IAbstractModel, new()
		{
			var dbSet = _dbContext.Set<T>();
			var entitySaved = dbSet.Add(entity).Entity;
			await _dbContext.SaveChangesAsync();
			_logger.LogInformation(4, $"Created a {entity.GetType()} with ID {entity.Id}");
			return entitySaved;
		}

		/// <summary>
		/// update an entity of the given type.
		/// </summary>
		/// <typeparam name="T">The type of entity being created.</typeparam>
		/// <param name="entity">The entity being created.</param>
		/// <returns>The entity which was saved.</returns>
		public async Task<T> UpdateAsync<T>(T entity)
			where T : class, IAbstractModel, new()
		{
			var dbSet = _dbContext.Set<T>();
			var entitySaved = dbSet.Update(entity).Entity;
			await _dbContext.SaveChangesAsync();
			_logger.LogInformation(4, $"Created a {entity.GetType()} with ID {entity.Id}");
			return entitySaved;
		}

		/// <summary>
		/// Delete an entity of the given type.
		/// </summary>
		/// <typeparam name="T">The generic type of the entity being deleted.</typeparam>
		/// <param name="id">The id of the entity being deleted.</param>
		/// <returns>The guid of the entity which has been deleted.</returns>
		public async Task<Guid> DeleteAsync<T>(Guid id)
		where T : class, IAbstractModel
		{
			var dbSet = _dbContext.Set<T>();
			var entity = dbSet.Where(e => e.Id == id);
			dbSet.Remove(entity.First());

			await _dbContext.SaveChangesAsync();
			return id;
		}
	}
}