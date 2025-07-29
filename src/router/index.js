import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
 
const router = createRouter({
  history: createWebHistory(), //默认hash模式
  routes: [
      { path: '/', component: Home }
    //   {
    //       path: '/about',
    //       component: About,
    //       redirect: '/about/tab1',
    //       children: [
    //           { path: 'tab1', component: Tab1 },
    //           { path: 'tab2', component: Tab2 },
    //       ]
    //   }
  ]
})

export default router
