
using System.ComponentModel.DataAnnotations;

namespace SharedTypes.Types
{
	public class ContactSearch
	{
		public string SearchTerm { get; set; }
		[Required]
		public int PageNumber { get; set; }
	}
}
