(function (module) {
	'use strict';

	module
    .constant("Select2Options", {
    	baseSelect2InitOptions: {
    		allowClear: true,
    		minimumResultsForSearch: 6,
    		initSelection: function (element, callback) {
    			var data = { id: element.val(), text: element.val() };
    			callback(data);
    		}
    	},
    	baseSelect2ObjectInitOptions: {
    		allowClear: true,
    		minimumResultsForSearch: 6,
    		initSelection: function (element, callback) {
    			var data = { id: element.val().id, text: element.val().text };
    			callback(data);
    		}
    	}
    })
		.constant('AvailableDepartments', [
				{ id: 10007, text: 'Alt Structures' },
				{ id: 10006, text: 'Binding Authority' },
				{ id: 300, text: 'Directors & Officers Liability' },
				{ id: 1800, text: 'GL ' },
				{ id: 1900, text: 'Professional Liability' },
				{ id: 200, text: 'Property' },
				{ id: 100, text: 'Umbrella/Excess' }
		])
    .constant("LayoutSettingss", {
    	classes: {
    		body: {
    			navbarSidebar: '',
    			navbarSidebarRight: 'sidebar-right',
    			navbarFixed: 'navbar-fixed',
    			navbarFixedSidebarFixed: 'navbar-fixed sidebar-fixed',
    			navbarFixedSidebarRight: 'navbar-fixed sidebar-right',
    			navbarFixedSidebarRightFixed: 'navbar-fixed sidebar-right sidebar-fixed',
    			sidebarRight: 'sidebar-right',
    			sidebarRightFixed: 'sidebar-right sidebar-fixed',
    			blankPage: 'full-width page-condensed'
    		},
    		navbar: {
    			navbar: 'navbar navbar-inverse',
    			navbarFixed: 'navbar navbar-inverse navbar-fixed-top',
    		},
    		sidebar: {
    			sidebar: 'navigation',
    			sidebarLeftIcons: 'navigation navigation-icons-left'
    		}
    	},
    	containers: {
    		navbar: {
    			templateUrl: 'app/views/layout/navbar.tpl.html'
    		},
    		navbarSidebar: {
    			templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    		},
    		sidebar: {
    			templateUrl: 'app/views/layout/sidebar.tpl.html'
    		}
    	},
    	views: {
    		navbars: {
    			'default': 'app/layout/navbars/default.tpl.html'
    		},
    		sidebars: {
    			'default': 'app/layout/navbars/layout-sidebars-default.tpl.html',
    			sidebarOnly: 'app/layout/navbars/layout-sidebars-sidebar-only.tpl.html'
    		},
    		footers: {
    			'default': 'app/layout/navbars/layout-footers-default.tpl.html',
    		},
    		breadcrumbs: {
    			'default': 'app/layout/navbars/layout-breadcrumbs-default.tpl.html',
    		},
    		pageHeaders: {
    			'default': 'app/layout/navbars/layout-page-headers-default.tpl.html',
    		}
    	},
    	presets: {
    		navbarSidebar: {
    			classes: {
    				body: '',
    				navbar: 'navbar navbar-inverse',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarSidebarFixed: {
    			classes: {
    				body: 'sidebar-fixed',
    				navbar: 'navbar navbar-inverse',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarSidebarRight: {
    			classes: {
    				body: 'sidebar-right',
    				navbar: 'navbar navbar-inverse',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarSidebarRightFixed: {
    			classes: {
    				body: 'sidebar-right sidebar-fixed',
    				navbar: 'navbar navbar-inverse',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarFixedSidebar: {
    			classes: {
    				body: 'navbar-fixed',
    				navbar: 'navbar navbar-inverse navbar-fixed-top',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarFixedSidebarFixed: {
    			classes: {
    				body: 'navbar-fixed sidebar-fixed',
    				navbar: 'navbar navbar-inverse navbar-fixed-top',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarFixedSidebarRight: {
    			classes: {
    				body: 'navbar-fixed sidebar-right',
    				navbar: 'navbar navbar-inverse navbar-fixed-top',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarFixedSidebarRightFixed: {
    			classes: {
    				body: 'navbar-fixed sidebar-right sidebar-fixed',
    				navbar: 'navbar navbar-inverse navbar-fixed-top',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar-sidebar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/default.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/default.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbar: {
    			classes: {
    				body: 'full-width',
    				navbar: 'navbar navbar-inverse'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/navbar.tpl.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		navbarFixed: {
    			classes: {
    				body: 'navbar-fixed full-width',
    				navbar: 'navbar navbar-inverse navbar-fixed-top'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/navbar.tpl.html'
    				},
    				navbar: {
    					templateUrl: 'app/views/layout/navbars/with-search-input.html',
    					controller: 'LayoutNavbarCtrl as navbar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		sidebar: {
    			classes: {
    				body: 'sidebar-only',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/sidebar.tpl.html'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/sidebar.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		sidebarFixed: {
    			classes: {
    				body: 'sidebar-only sidebar-fixed',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/sidebar.tpl.html'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/sidebar.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		sidebarRight: {
    			classes: {
    				body: 'sidebar-only sidebar-right',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/sidebar.tpl.html'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/sidebar.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		sidebarRightFixed: {
    			classes: {
    				body: 'sidebar-only sidebar-right sidebar-fixed',
    				sidebar: 'navigation navigation-icons-left'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/sidebar.tpl.html'
    				},
    				sidebar: {
    					templateUrl: 'app/views/layout/sidebars/sidebar.tpl.html',
    					controller: 'LayoutSidebarCtrl as sidebar'
    				},
    				pageHeader: {
    					templateUrl: 'app/views/layout/page-headers/default.tpl.html'
    				},
    				breadcrumbs: {
    					templateUrl: 'app/views/layout/breadcrumbs/default.tpl.html'
    				},
    				footer: {
    					templateUrl: 'app/views/layout/footers/default.tpl.html'
    				}
    			}
    		},
    		error: {
    			classes: {
    				body: 'full-width page-condensed error-page'
    			},
    			views: {
    				container: {
    					templateUrl: 'app/views/layout/error.tpl.html'
    				}
    			}
    		},
    	},
    	screen: {
    		console: true,
    		eventPrefix: "fa",
    		breakpoint: {
    			"lg": 1200,
    			"md": 992,
    			"sm": 768,
    			"xs": 480
    		}
    	}
    })

	.constant("AppSettings", {
		appName: 'RSUI Forms Library',
		appErrorPrefix: '[App Error] ',
		docTitlePrefix: 'RSUI: ',
		version: '1.0.0',
		showToastr: true,
		toggleOffCanvasOnClick: true,
		events: {
			controllerActivateSuccess: 'controller.activateSuccess',
			spinnerToggle: 'spinner.toggle'
		}
	})

	.constant("Utils", {
		keyCodes: {
			backspace: 8,
			tab: 9,
			enter: 13,
			esc: 27,
			space: 32,
			pageup: 33,
			pagedown: 34,
			end: 35,
			Home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			insert: 45,
			del: 46
		}
	})

	.value('$', $);

})(angular.module('app.constants'));
