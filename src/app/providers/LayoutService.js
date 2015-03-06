(function (module) {

	layoutServiceImpl.$inject = ['urlServiceProvider'];
	function layoutServiceImpl(urls) {

		this.classes = {
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
		};
		this.containers = {
			navbar: {
				templateUrl: urls.templateUrlFor('app/views/layout/navbar.tpl.html')
			},
			navbarSidebar: {
				templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
			},
			sidebar: {
				templateUrl: urls.templateUrlFor('app/views/layout/sidebar.tpl.html')
			}
		};
		this.views = {
			navbars: {
				'default': urls.templateUrlFor('app/views/layout/navbars/default.tpl.html')
			},
			sidebars: {
				'default': urls.templateUrlFor('app/views/layout/navbars/layout-sidebars-default.tpl.html'),
				sidebarOnly: urls.templateUrlFor('app/views/layout/navbars/layout-sidebars-sidebar-only.tpl.html')
			},
			footers: {
				'default': urls.templateUrlFor('app/views/layout/navbars/layout-footers-default.tpl.html'),
			},
			breadcrumbs: {
				'default': urls.templateUrlFor('app/views/layout/navbars/layout-breadcrumbs-default.tpl.html'),
			},
			pageHeaders: {
				'default': urls.templateUrlFor('app/views/layout/navbars/layout-page-headers-default.tpl.html'),
			}
		};
		this.presets = {
			navbarSidebar: {
				classes: {
					body: '',
					navbar: 'navbar navbar-inverse',
					sidebar: 'navigation navigation-icons-left'
				},
				views: {
					container: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar-sidebar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/default.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/default.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/navbar.tpl.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/navbar.tpl.html')
					},
					navbar: {
						templateUrl: urls.templateUrlFor('app/views/layout/navbars/with-search-input.html'),
						controller: 'LayoutNavbarCtrl as navbar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/sidebar.tpl.html')
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/sidebar.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/sidebar.tpl.html')
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/sidebar.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/sidebar.tpl.html')
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/sidebar.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
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
						templateUrl: urls.templateUrlFor('app/views/layout/sidebar.tpl.html')
					},
					sidebar: {
						templateUrl: urls.templateUrlFor('app/views/layout/sidebars/sidebar.tpl.html'),
						controller: 'LayoutSidebarCtrl as sidebar'
					},
					pageHeader: {
						templateUrl: urls.templateUrlFor('app/views/layout/page-headers/default.tpl.html')
					},
					breadcrumbs: {
						templateUrl: urls.templateUrlFor('app/views/layout/breadcrumbs/default.tpl.html')
					},
					footer: {
						templateUrl: urls.templateUrlFor('app/views/layout/footers/default.tpl.html')
					}
				}
			},
			error: {
				classes: {
					body: 'full-width page-condensed error-page'
				},
				views: {
					container: {
						templateUrl: urls.templateUrlFor('app/views/layout/error.tpl.html')
					}
				}
			}
		};

		this.$get = function() {
			return {
				presets: {
			
				},

				views: {
				},

				containers: {
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

				classes: {

				}
			}
		}
	}

	module.provider('layoutService', layoutServiceImpl);

})(angular.module('common.providers'));