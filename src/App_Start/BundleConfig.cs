using System.Web;
using System.Web.Optimization;
using FluentNHibernate.Conventions.Inspections;

namespace RSUI.FormsCatalog
{
	public class BundleConfig
	{
		// For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
		public static void RegisterBundles(BundleCollection bundles)
		{
			bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
				"~/Scripts/jquery-{version}.js"));

			// Use the development version of Modernizr to develop with and learn from. Then, when you're
			// ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
			bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
				"~/Scripts/modernizr-*"));

			bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
				"~/Scripts/bootstrap.js",
				"~/Scripts/respond.js"));

			bundles.Add(new StyleBundle("~/Content/css").Include(
				"~/Content/bootstrap.css",
				"~/Content/theme/css/londinium-theme.css",
				"~/Content/theme/css/styles.css",
				"~/Content/theme/css/icons.css",
				"~/Content/toastr.css",
				"~/Content/angular-motion.css",
				//"~/Content/css/select2.css",
				//"~/Content/css/select2-bootstrap.css",
				"~/Content/app.css"));

			//bundles.Add(new StyleBundle("~/Content/theme").Include(
			//    "~/Content/bootstrap.css",
			//    "~/Content/site.css"));

			bundles.Add(new ScriptBundle("~/bundles/angular").Include(
			"~/Scripts/angular-loader.js",
			"~/Scripts/angular.js",
			"~/Scripts/angular-ui-router.js",
			"~/Scripts/angular-sanitize.js",
			"~/Scripts/angular-resource.js",
			"~/Scripts/angular-cookies.js",
			"~/Scripts/angular-animate.js",
			"~/Scripts/angular-strap.js",
			"~/Scripts/angular-strap.tpl.js",
			"~/Scripts/angular-ui/ui-bootstrap.js",
			"~/Scripts/angular-ui/ui-bootstrap-tpls.js",
			"~/Scripts/amplify.js",
			"~/Scripts/json2.js"));

			bundles.Add(new ScriptBundle("~/bundles/app").Include(
			"~/app/app.js",
			"~/app/app.modules.js",
			"~/app/app.constants.js",
			"~/app/providers/providers.js",
			"~/app/providers/UiService.js",
			"~/app/providers/UrlService.js",
			"~/app/providers/LayoutService.js")
			.IncludeDirectory("~/app/common", "*.js", true)
			.IncludeDirectory("~/app/account", "*.js", true)
			.IncludeDirectory("~/app/gettingStarted", "*.js", true)
			.IncludeDirectory("~/app/home", "*.js", true)
			.IncludeDirectory("~/app/interface", "*.js", true)
			.IncludeDirectory("~/app/layout", "*.js", true)
			.Include("~/app/app.routes.js"));

			bundles.Add(new ScriptBundle("~/bundles/plugins").Include(
			"~/Scripts/toastr.js",
			"~/Scripts/select2.js",
			"~/Scripts/lodash.js",
			"~/Scripts/jquery.signalR-2.1.0.js",
			"~/Scripts/slimScroll-1.3.0/jquery.slimscroll.js")
			.IncludeDirectory("~/Content/theme/js/plugins", "*.bundle.js", true));

			// Set EnableOptimizations to false for debugging. For more information,
			// visit http://go.microsoft.com/fwlink/?LinkId=301862
			BundleTable.EnableOptimizations = false;
		}
	}
}
