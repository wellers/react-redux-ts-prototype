using Microsoft.AspNetCore.Mvc;
using SharedTypes.NET;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Controllers
{
	[ApiController]		
	public class ContactsController : ControllerBase
	{
		private readonly List<Contact> _contacts = new List<Contact>()
		{
			new Contact { Title = "Mr", Forename = "Paul", Surname = "Welbourne" },
			new Contact { Title = "Mr", Forename = "Paul", Surname = "Riding" },
			new Contact { Title = "Mrs", Forename = "Elena", Surname = "Potapova" },
			new Contact { Title = "Mr", Forename = "Mike", Surname = "Lloyd" },
		};

		[HttpPost]	
		[Route("Api/Contacts/GetContacts")]	
		public async Task<GetContactsResponse> GetContacts([FromBody] ContactSearch search)
		{
			var searchResults = await SearchContacts(search.SearchTerm).ConfigureAwait(false);

			return new GetContactsResponse
			{
				Results = searchResults,
				TotalResultCount = searchResults.Count,
				ResultsPerPage = 10
			};
		}

		private async Task<List<Contact>> SearchContacts(string searchTerm)
		{
			//simulate long-running task
			await Task.Delay(3000);

			var term = searchTerm.ToLower();
			return _contacts
				.Where(c => c.Forename.ToLower().Contains(term) || c.Surname.ToLower().Contains(term))
				.ToList();
		}
	}
}
