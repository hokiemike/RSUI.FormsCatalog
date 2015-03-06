using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace RSUI.FormsCatalog.hubs
{
  public class ZipHub : Hub
  {
	public void Hello()
	{
	  Clients.All.hello();
	}

	public void ZipDownloadReady(string url)
	{
	  //Clients.User(HttpContext.Current.User.Identity.Name).zipDownloadReady(url);
	  Clients.All.zipDownloadReady(url);
	}
  }
}