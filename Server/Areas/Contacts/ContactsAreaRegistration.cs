using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace Server.Areas.Contacts
{
    public class ContactsAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "Contacts";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
			// WebApi
			RouteTable.Routes.MapHttpRoute(
				name: "ContactsApi",
				routeTemplate: "Api/Contacts/{action}/{id}",
				defaults: new { controller = "ContactsApi", id = RouteParameter.Optional }
			);

			context.MapRoute(
                "Contacts_default",
                "Contacts/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}