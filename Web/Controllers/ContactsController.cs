using Microsoft.AspNetCore.Mvc;
using SharedTypes.NET;
using System.Collections.Generic;
using System.Linq;

namespace Web.Controllers
{
	[ApiController]		
	public class ContactsController : ControllerBase
	{
		private readonly List<Contact> _contacts = new()
		{
			new Contact { Title = "Mr", Forename = "Paul", Surname = "Welbourne" },
			new Contact { Title = "Mr", Forename = "Paul", Surname = "Riding" },
			new Contact { Title = "Mrs", Forename = "Elena", Surname = "Potapova" },
			new Contact { Title = "Mr", Forename = "Mike", Surname = "Lloyd" },
		};

		[HttpPost]	
		[Route("Api/Contacts/GetContacts")]	
		public GetContactsResponse GetContacts([FromBody] ContactSearch search)
		{
			var searchResults = _contacts.Where(c => c.Forename.ToLower().Contains(search.SearchTerm.ToLower())
				|| c.Surname.ToLower().Contains(search.SearchTerm.ToLower())).ToList();

			return new GetContactsResponse
			{
				Results = searchResults,
				TotalResultCount = searchResults.Count,
				ResultsPerPage = 10
			};
		}
	}
}
