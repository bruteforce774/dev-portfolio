import { ref } from 'vue'
import { defineStore } from 'pinia'
import { type Post } from '../types'

export const useBlogStore = defineStore('blog', () => {
    const posts = ref<Post[]>([])
    const isLoading = ref(false)
    const errorMessage = ref<string | null>(null)

    const fetchPosts = async () => {
        isLoading.value = true
        errorMessage.value = null
        try {
            const response = await fetch('/api/posts')
            if (!response.ok) throw new Error('Failed to load')
            posts.value = await response.json()
        } catch (error) {
            errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
        } finally {
            isLoading.value = false
        }
    }

    const addPost = async (postData: Partial<Post>) => {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            })
            if (!response.ok) throw new Error('Failed to add post')
            const newPost: Post = await response.json()
            posts.value.push(newPost)
        } catch (error) {
            errorMessage.value = error instanceof Error ? error.message : 'Unknown error'
        }
    }

    const fetchPostById = async (id: string) => {
        isLoading.value = true
        errorMessage.value = null
        try {
            const response = await fetch(`/api/posts/${id}`)
            if (!response.ok) throw new Error('Post not found')
            return await response.json()
        } catch (error) {
            errorMessage.value = error instanceof Error? error.message : 'Unknown error'
            return null
        } finally {
            isLoading.value = false
        }
    }

    return { posts, isLoading, errorMessage, fetchPosts, addPost, fetchPostById }
})
