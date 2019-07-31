using System.ComponentModel.DataAnnotations;

namespace SharedTypes.Types
{
	public class GetContactsResponse
	{
		[Required]
		public Contact[] Results { get; set; }

		[Required]
		public int TotalResultCount { get; set; }

		[Required]
		public int ResultsPerPage { get; set; }
	}
}
