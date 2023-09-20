const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const uuid = require('uuid')
const db = require('./db')

const app = express()

const PORT = process.env.PORT || 3001

app.use(morgan('dev'))
app.use(bodyParser.json())

app.use(cors({
    origin: ["http://127.0.0.1:5500"],
    credentials: true
}))

app.get('/getComments', async (req, res) => {

    let sql = `SELECT * FROM blog`

    const [response] = await db.execute(sql)
    res.status(200).json({ message: response })

    // res.status(200).json([{
    //     name: 'Aisha',
    //     id: '98h23onsd98hw',
    //     comment: "I am bored"
    // }])
})

app.post('/postComment', async (req, res) => {

    // console.log(req.body)

    const { title, body, author_id } = req.body

    // const { name, id, comment } = req.body

    try {

        // console.log(name)
        // console.log(id)
        // console.log(comment)
        const id = uuid.v4()

        if (!title) throw Error('title must be included')
        if (!body) throw Error('body must be included')
        if (!author_id) throw Error('author must be included')

        let sql = `INSERT INTO blog (ID, TITLE, BODY, AUTHOR_ID) 
        VALUES ("${id}", "${title}", "${body}", "${author_id}")`

        await db.execute(sql)

        res.status(200).json({ message: 'Blog posted successfully' })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }


    //     if (!name) throw Error('Name must be included')
    //     if (!id) throw Error('id must be included')
    //     if (!comment) throw Error('comment must be included')

    //     res.status(200).json({ message: 'Comment posted successfully', data: { name, id, comment } })
    // } catch (error) {
    //     res.status(400).json({ error: error.message })
    // }

})


app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})