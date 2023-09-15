const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express()

const PORT = process.env.PORT || 3001

app.use(bodyParser.json())

app.get('/getComments', (req, res) => {
    res.status(200).json([{
        name: 'Aisha',
        id: '98h23onsd98hw',
        comment: "I am bored"
    }])
})

app.post('/postComment', (req, res) => {

    // console.log(req.body)

    const { name, id, comment } = req.body

    try {

        // console.log(name)
        // console.log(id)
        // console.log(comment)

        if (!name) throw Error('Name must be included')
        if (!id) throw Error('id must be included')
        if (!comment) throw Error('comment must be included')

        res.status(200).json({ message: 'Comment posted successfully', data: { name, id, comment } })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }

})


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})