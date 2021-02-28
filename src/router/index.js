import React from "react";

const routes = [
  {
    path: "/connect",
    component: React.lazy(() => import("../components/dashboard/Dashboard"))
  },
  /* {
    path: "/network",
    component: React.lazy(() => import("../components/network/NetworkT")),
    routes: [
      {
        path: "/broadband",
        component: React.lazy(() => import("../components/network/Broadband1")),        
      },
      {
        path: "/broadband1",
        component: React.lazy(() => import("../components/network/Broadband1"))
      },
      {
        path: "/broadband2",
        component: React.lazy(() => import("../components/network/Broadband2"))
      },
      {
        path: "/broadband3",
        component: React.lazy(() => import("../components/network/Broadband3"))
      },
      {
        path: "/wireless",
        component: React.lazy(() => import("../components/network/Wireless"))        
      },
      {
        path: "/wireless1",
        component: React.lazy(() => import("../components/network/Wireless1"))
      },
      {
        path: "/wireless2",
        component: React.lazy(() => import("../components/network/Wireless2"))
      },
      {
        path: "/wireless3",
        component: React.lazy(() => import("../components/network/Wireless3"))
      }
    ]
  }, */
  /* {
    path: "/security",
    component: React.lazy(() => import("../components/security/SecurityT")),
    routes: [
      {
        path: "/firewall",
        component: React.lazy(() => import("../components/security/Firewall"))
      },
      {
        path: "/firewall1",
        component: React.lazy(() => import("../components/security/Firewall1"))
      },
      {
        path: "/firewall2",
        component: React.lazy(() => import("../components/security/Firewall2"))
      },
      {
        path: "/firewall3",
        component: React.lazy(() => import("../components/security/Firewall3"))
      },
      {
        path: "/macfilter",
        component: React.lazy(() => import("../components/security/Macfilter"))
      },
      {
        path: "/macfilter1",
        component: React.lazy(() => import("../components/security/Macfilter1"))
      },
      {
        path: "/macfilter2",
        component: React.lazy(() => import("../components/security/Macfilter2"))
      },
      {
        path: "/macfilter3",
        component: React.lazy(() => import("../components/security/Macfilter3"))
      }
    ]
  } */
];

export default routes;

