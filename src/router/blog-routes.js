export default [
  {
    path: "",
    redirect: {
      name: "List",
    },
  },
  {
    path: "list",
    name: "List",
    component: (resolve) => require(["@/views/List.vue"], resolve),
  },
  {
    path: "article/:number",
    name: "Article",
    component: (resolve) => require(["@/views/Article.vue"], resolve),
  },
];
