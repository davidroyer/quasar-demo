const pages = require
  .context("pages", true, /^\.\/.*\.vue$/)
  .keys()
  .filter(page => page.split("/").length >= 2)
  .map(page => page.slice(2).slice(0, -4));

console.log("PAGES", pages);

async function load(page) {
  const PageComponent = await import(`pages/${page}.vue`);
  return console.log("page component", PageComponent.default);
}

// Standard quasar load function. Only load view once needed
function loadComponent(page) {
  // '@' is aliased to src/pages
  return () => import(`pages/${page}.vue`);
}

function loadLayout(layout) {
  // '@' is aliased to src/layouts
  return () => import(`layouts/${layout}.vue`);
}

// page loading function
function loadPage(page) {
  const pageComponent = load(page);
  console.log("loadPage -> pageComponent", pageComponent);
  const pagePath = pageComponent.routeParam
    ? `/${page}:${pageComponent.routeParam}`
    : page;

  return {
    path: pagePath,
    component: loadComponent(`pages/${page}`)
  };
}

// Standard quasar default will redirect to '/404' route
// Always leave this last one
// routes.push({ path: "*", redirect: "/404" }); // Not found

const routes = [
  {
    path: "/",
    component: loadLayout("MainLayout"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "note/:id", component: loadComponent("Note") }
    ]
  }
];

if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

console.log("routes", routes);
export default routes;
