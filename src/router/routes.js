import blogRoutes from "./blog-routes";

export default [
  {
    name: "About",
    path: "/about",
    component: (resolve) =>
      require.ensure([], () => resolve(require("@/views/About.vue")), "About"),
  },
  {
    path: "/blog",
    component: (resolve) =>
      require.ensure([], () => resolve(require("@/views/Blog.vue")), "Blog"),
    children: blogRoutes,
  },
  {
    path: "*",
    redirect: "/blog",
  },
];
