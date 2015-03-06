using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Extras.CommonServiceLocator;
using Autofac.Integration.WebApi;
using AutoMapper;
using FluentNHibernate.Cfg;
using Microsoft.Practices.ServiceLocation;
using NHibernate;
using NHibernate.Linq;
using RSUI.Common.Autofac;
using RSUI.Common.Data.Entities;
using RSUI.Common.Utils;
using RSUI.FormsCatalog.Controllers.api;
using RSUI.FormsCatalog.Models;
using RSUI.FormsCatalog.Models.ViewModels;

namespace RSUI.FormsCatalog
{
  public class Bootstrapper
  {
    private static IContainer _container;

    public static IContainer Container
    {
      get { return _container; }
      set { _container = value; }
    }

    public static void InitializeIoc()
    {
      var builder = new ContainerBuilder();

      var webAssembly = Assembly.GetAssembly(typeof(MvcApplication));
      var dataAssembly = Assembly.GetAssembly(typeof(Employee));

      var mappings = new List<Action<MappingConfiguration>>
		    {
			    (m) => m.FluentMappings.AddFromAssemblyOf<Employee>(),
			    //(m) => m.HbmMappings.AddFromAssemblyOf<Employee>().AddFromAssemblyOf<AnotherEmployee>()
		    };

      builder.RegisterModule(new FluentNHibernateModule(mappings)
        {
          ConnectionString = AppConfig.GetConnectionString(),
          AssemblyMapper = typeof(Employee).Assembly,
        });

			builder.RegisterType<AccountService>().As<IAccountService>().InstancePerLifetimeScope();

			builder.RegisterAssemblyTypes(dataAssembly)
        .Where(t => t.Name.EndsWith("Service"))
        .AsImplementedInterfaces()
        .SingleInstance();

      builder.RegisterAssemblyTypes(dataAssembly)
        .Where(t => t.Name.EndsWith("Repository"))
        .AsImplementedInterfaces();

      builder.RegisterApiControllers(webAssembly);

      // register the mappers
      builder.RegisterAssemblyTypes(webAssembly)
        .Where(t => t.Name.EndsWith("Mapper"))
        .AsImplementedInterfaces()
        .SingleInstance();

      builder.RegisterAssemblyTypes(webAssembly)
        .Where(t => t.Name.EndsWith("Validator"))
        .AsImplementedInterfaces()
        .SingleInstance();

      builder.RegisterAssemblyTypes(webAssembly)
        .Where(t => t.Name.EndsWith("DataService"))
        .AsImplementedInterfaces()
        .SingleInstance();

      _container = builder.Build();

      ServiceLocator.SetLocatorProvider(() => new AutofacServiceLocator(_container));
      GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(_container);
    }

    public static void InitializeAutoMapper()
    {
    }
  }
}