// Imports
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
// Importing uuid for uniquely give id to each task
const { v4: uuidv4 } = require('uuid')

// Adding cors for cross origin request
app.use(cors())



// Port 
const PORT = '3000'



// Static middleware
app.use(express.static('../frontend/dist'))

// Array of objects that will contain each task 
const tasks = []

// MiddleWare for bodyParser
app.use(bodyParser.json())
// Main route handler
// app.get('/', (req, res) => {
//     res.send()
// })

// Get request handler for getting every todo element
app.get('/api/v1/tasks', (req, res) => {
    res.status(200).json(tasks)
})


// Creating a new task in todo app
app.post('/api/v1/tasks', (req, res) => {
    const title = req.body.title
    const details = req.body.details
    const date = req.body.date
    const time = req.body.time
    const repeat = req.body.repeat

    let task = {
        id: uuidv4(),
        title: title,
        details: details,
        date: date,
        time: time,
        repeat: repeat
    }
    tasks.push(task)
    res.status(201).json(task)

})

// Delete a Task of given id
app.delete('/api/v1/tasks/:id', (req, res) => {
    const taskId  = req.params.id
    let taskIndex = -1
    for (i=0; i<tasks.length; i++) {
        if(tasks[i].id === taskId) {
            taskIndex = i
            break
        }
    }

    if(taskIndex !== -1) {
        tasks.splice(taskIndex, 1)
        res.status(200).send(tasks)
    } else {
        res.status(404).send("Task not found")
    }

}) 

// Update task 
app.put('/api/v1/tasks/:id', (req, res) => {
    const taskId = req.params.id
    let taskIndex = -1

    const title = req.body.title;
    const details = req.body.details;
    const date = req.body.date;
    const time = req.body.time;
    const repeat = req.body.repeat;
    
    for(i=0; i<tasks.length; i++) {
        if(tasks[i].id === taskId) {
            taskIndex =  i
            break
        }
    }

    if (taskIndex !== -1) {
        tasks[taskIndex].title = title,
        tasks[taskIndex].details = details,
        tasks[taskIndex].date = date,
        tasks[taskIndex].time = time,
        tasks[taskIndex].repeat = repeat,
        res.send("Task Updated")
    } else {
        res.status(404).send("Task not found")
    }

})

// Catch all unmatched route handler
app.use((req, res) => {
    res.status(404).send("Not Found")
})
// Starting the server
app.listen(PORT, () => 
{
    console.log(`Listening at port ${PORT}`)
})
