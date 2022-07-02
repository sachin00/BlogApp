const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')

const app = express()

// Connect Database
connectDB()

// Initialising middleware
app.use(express.json({ extended: false }))
app.use(cors())

app.get('/', (req, res) => {
    res.send('API running...')
})

// Define Routes
app.use('/users', require('./routes/users'))
app.use('/blogs', require('./routes/blogs'))
// app.use('/api/profile', require('./routes/api/profile'))
// app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5555
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))