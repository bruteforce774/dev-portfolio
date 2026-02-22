import 'dotenv/config'
import express from 'express'
import { MongoClient } from 'mongodb'
import path from 'path'
import { fileURLToPath } from 'url'

const { MONGODB_URI, DB_NAME = 'blog', PORT = 3000, ADMIN_KEY = 'changeme' } = process.env

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const client = new MongoClient(MONGODB_URI)

const app = express()
app.use(express.static(path.join(__dirname, '..', 'dist')))
app.use(express.json())

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined in environment variables')
    process.exit(1)
}

let db

app.get('/api/posts', async (_req, res) => {
    try {
        const posts = await db.collection('posts').find().toArray()
        res.json(posts)
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        res.status(500).json({ error: 'Failed to fetch posts' })
    }
})

app.get('/api/posts/:id', async (req, res) => {
    try {
        const post = await db.collection('posts').findOne({ guid: req.params.id })
        if (!post) return res.status(404).json({ error: 'Post not found' })
        res.json(post)
    } catch (error) {
        console.error('Failed to fetch post:', error)
        res.status(500).json({ error: 'Failed to fetch post' })
    }
})

app.post('/api/posts', async (req, res) => {
    const key = req.headers['x-admin-key']
    if (key !== ADMIN_KEY) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
        const post = {
            guid: crypto.randomUUID(),
            dateAdded: new Date().toISOString().split('T')[0],
            title: req.body.title,
            synopsis: req.body.synopsis,
            content: req.body.content,
        }
        await db.collection('posts').insertOne(post)
        res.status(201).json(post)
    } catch (error) {
        console.error('Failed to create post:', error)
        res.status(500).json({ error: 'Failed to create post' })
    }
})

app.get('/{*splat}', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'))
})

try {
    await client.connect()
    db = client.db(DB_NAME)
    console.log(`Connected to MongoDB database "${DB_NAME}"`)

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`)
    })
} catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    process.exit(1)
}
