<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const title = ref('')
const synopsis = ref('')
const content = ref('')
const adminKey = ref('')
const error = ref('')

const submit = async () => {
    error.value = ''
    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-admin-key': adminKey.value,
            },
            body: JSON.stringify({
                title: title.value,
                synopsis: synopsis.value,
                content: content.value,
            }),
        })
        if (!response.ok) {
            const data = await response.json()
            throw new Error(data.error || 'Failed to create post')
        }
        const post = await response.json()
        router.push(`/blog/${post.guid}`)
    } catch (e) {
        error.value = e instanceof Error ? e.message : 'Unknown error'
    }
}
</script>

<template>
    <div>
        <h1>Nytt innlegg</h1>
        <p v-if="error">{{ error }}</p>
        <div>
          <input v-model="adminKey" type="password" placeholder="Adminnøkkel" /><br />
          <input v-model="title" placeholder="Tittel" /><br />
          <input v-model="synopsis" placeholder="Oversikt" /><br />
          <textarea v-model="content" placeholder="Innhold (støtte for markdown)" rows="15"></textarea><br />
          <button @click="submit">Publiser</button><br />
        </div>
        <RouterLink to="/blog">Tilbake til blogg</RouterLink>
    </div>
</template>
