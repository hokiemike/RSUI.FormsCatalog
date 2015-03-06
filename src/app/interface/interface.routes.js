angular.module('interface.routes', ['ui.router'])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider
		.state('app.interface', {
		  url: '/interface',
		  'abstract': true,
		  data: {
		    security: {
		      auth: false
		    },
		    pageInfo: {
		      title: 'Interface Components' // Strictly used here for breadcrumb even though this state is abstract
		    },
		    breadcrumb: {
		      display: true
		    }
		  }
		})
		.state('app.interface.visuals', {
		  url: '/visuals',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/visuals.tpl.html',
		      controller: 'InterfaceVisualsCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Bootstrap & Jquery UI components',
		        keywords: 'Bootstrap,Jquery UI'
		      },
		      title: 'Visuals & Notifications',
		      description: 'Bootstrap & Jquery UI components'
		    }
		  }
		})
		.state('app.interface.navs', {
		  url: '/navs',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/navs.tpl.html',
		      controller: 'InterfaceNavsCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Navs & Dropdowns',
		        keywords: 'Navs,Dropdowns'
		      },
		      title: 'Navs & Dropdowns',
		      description: 'Bootstrap navs and dropdowns'
		    }
		  }
		})
		.state('app.interface.navbars', {
		  url: '/navbars',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/navbars.tpl.html',
		      controller: 'InterfaceNavbarsCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Bootstrap navbar layouts with options',
		        keywords: 'Bootstrap,Navbar'
		      },
		      title: 'Navbars',
		      description: 'Bootstrap navbar layouts with options'
		    }
		  }
		})
		.state('app.interface.icons', {
		  url: '/icons',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/icons.tpl.html',
		      controller: 'InterfaceIconsCtrl as vm'
		    }
		  },
		  data: {
			classes: {
			  body: 'navbar-fixed sidebar-narrow',
			  navbar: 'navbar navbar-inverse navbar-fixed-top',
			  sidebar: 'navigation navigation-icons-left'
			},
		    pageInfo: {
		      seo: {
		        description: 'Icomoon icons set',
		        keywords: 'Icomoon'
		      },
		      title: 'Icons',
		      description: 'Icomoon icons set'
		    }
		  }
		})
		.state('app.interface.buttons', {
		  url: '/buttons',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/buttons.tpl.html',
		      controller: 'InterfaceButtonsCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Button layouts and options',
		        keywords: 'Buttons'
		      },
		      title: 'Buttons',
		      description: 'Button layouts and options'
		    }
		  }
		})
		.state('app.interface.info-blocks', {
		  url: '/info-blocks',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/info-blocks.tpl.html',
		      controller: 'InterfaceInfoBlocksCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Info and statistic blocks',
		        keywords: 'Info,Statistics'
		      },
		      title: 'Info Blocks',
		      description: 'Info and statistic blocks'
		    }
		  }
		})
		.state('app.interface.panel-options', {
		  url: '/panel-options',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/panel-options.tpl.html',
		      controller: 'InterfacePanelOptionsCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Possible panel heading optional elements',
		        keywords: 'Panels,Headings'
		      },
		      title: 'Panel Options',
		      description: 'Possible panel heading optional elements'
		    }
		  }
		})
		.state('app.interface.calendar', {
		  url: '/calendar',
		  views: {
		    'main-content@app': {
		      templateUrl: '/app/views/interface/calendar.tpl.html',
		      controller: 'InterfaceCalendarCtrl as vm'
		    }
		  },
		  data: {
		    pageInfo: {
		      seo: {
		        description: 'Fullcalendar template example',
		        keywords: 'Calendar'
		      },
		      title: 'Calendar',
		      description: 'Fullcalendar template example'
		    }
		  }
		})
	  .state('app.interface.typography', {
	    url: '/typography',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/interface/typography.tpl.html',
	        controller: 'InterfaceTypographyCtrl as vm'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Headings, lists, code, pre etc.',
	          keywords: 'Headings,Lists,Code,Prettify'
	        },
	        title: 'Typography',
	        description: 'Headings, lists, code, pre etc.'
	      }
	    }
	  })
	  .state('app.interface.media-gallery', {
	    url: '/media-gallery',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/interface/media-gallery.tpl.html',
	        controller: 'InterfaceMediaGalleryCtrl as vm'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Image and video gallery',
	          keywords: 'Image,Video,Gallery'
	        },
	        title: 'Media Gallery',
	        description: 'Image and video gallery'
	      }
	    }
	  })
	  .state('app.interface.page-header-elements', {
	    url: '/page-header-elements',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/interface/page-header-elements.tpl.html',
	        controller: 'InterfacePageHeaderElementsCtrl as vm'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Page header area custom elements',
	          keywords: 'Custom Elements'
	        },
	        title: 'Page Header Elements',
	        description: 'Page header area custom elements'
	      }
	    }
	  })
	  .state('app.interface.content-grid', {
	    url: '/content-grid',
	    views: {
	      'main-content@app': {
	        templateUrl: '/app/views/interface/content-grid.tpl.html',
	        controller: 'InterfaceContentGridCtrl as vm'
	      }
	    },
	    data: {
	      pageInfo: {
	        seo: {
	          description: 'Bootstrap responsive content grid',
	          keywords: 'Bootstrap, Content Grid'
	        },
	        title: 'Content Grid',
	        description: 'Bootstrap responsive content grid'
	      }
	    }
	  });
  }]);