import express from 'express'
import morgan from 'morgan'
import "reflect-metadata"

const app = express()
app.use(morgan('dev'))

app.listen(3001)
console.log('Server on port', 3001)
