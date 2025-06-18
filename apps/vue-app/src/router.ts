import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// 自动导入 pages 目录下的所有页面
const pages = import.meta.glob("../src/pages/*.vue");
const dynamicPages = import.meta.glob("../src/pages/**/*.vue");

const routes = [
  ...Object.entries(pages).map(([path, component]) => {
    const name = path.match(/\.\/pages\/(.*)\.vue$/)?.[1];
    return {
      path: name === "index" ? "/" : `/${name}`,
      component,
    };
  }),
  ...Object.entries(dynamicPages).map(([path, component]) => {
    const name = path.match(/\.\/pages\/(.*)\.vue$/)?.[1];
    
    // 处理动态路由，将 [param] 转换为 :param
    const routePath = name?.replace(/\[(.*?)\]/g, ':$1');
    
    return {
      path: `/${routePath}`,
      component,
      props: true, // 启用 props 传递路由参数
    };
  }),
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
