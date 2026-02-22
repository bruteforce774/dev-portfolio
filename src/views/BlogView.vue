<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blogStore'

const blogStore = useBlogStore()

onMounted(() => {
    if (blogStore.posts.length === 0) {
        blogStore.fetchPosts()
    }
})
</script>

<template>
    <h1>Blogg</h1>
    <p v-if="blogStore.isLoading">Loading...</p>
    <p v-else-if="blogStore.errorMessage">{{ blogStore.errorMessage }}</p>
    <ul v-else>
        <li v-for="post in blogStore.posts" :key="post.guid">
            <RouterLink :to="`/blog/${post.guid}`">{{ post.title }}</RouterLink>
            <p>{{ post.synopsis }}</p>
        </li>
    </ul>
</template>
