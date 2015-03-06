using Microsoft.Owin;
using Owin;
using RSUI.FormsCatalog;

[assembly: OwinStartup(typeof(Startup))]
namespace RSUI.FormsCatalog
{
  public class Startup
  {
	public void Configuration(IAppBuilder app)
	{
	  // Any connection or hub wire up and configuration should go here
	  app.MapSignalR();
	}
  }
}