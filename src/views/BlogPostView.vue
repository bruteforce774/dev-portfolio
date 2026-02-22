<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blogStore'
import { marked } from 'marked'
import type { Post } from '../types'

const route = useRoute()
const blogStore = useBlogStore()
const post = ref<Post | null>(null)

const renderedContent = computed(() => {
    if (!post.value?.content) return ''
    return marked(post.value.content)
})

onMounted(async () => {
    const cached = blogStore.posts.find(p => p.guid === route.params.id)
    if (cached) {
        post.value = cached
    } else {
        post.value = await blogStore.fetchPostById(route.params.id as string)
    }
})
</script>

<template>
    <p v-if="blogStore.isLoading">Loading...</p>
    <p v-else-if="blogStore.errorMessage">{{ blogStore.errorMessage }}</p>
    <article v-else-if="post">
        <h1>{{ post.title }}</h1>
        <p>{{ post.dateAdded }}</p>
        <div v-html="renderedContent"></div>
    </article>
</template>
