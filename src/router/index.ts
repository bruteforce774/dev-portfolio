import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BlogView from '../views/BlogView.vue'
import BlogPostView from '../views/BlogPostView.vue'
import NewPostView from '../views/NewPostView.vue'
import ProjectListView from '../views/ProjectListView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/blog',
            name: 'blog',
            component: BlogView,
        },
        {
            path: '/blog/new',
            name: 'newPost',
            component: NewPostView,
        },
        {
            path: '/blog/:id',
            name: 'blogPost',
            component: BlogPostView,
        },
        {
          path: '/projects',
          name: 'projects',
          component: ProjectListView
        },
    ],
})

export default router
