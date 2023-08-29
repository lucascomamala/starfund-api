import express from 'express'
import morgan from 'morgan'
import "reflect-metadata"

import { AppDataSource } from './db'

const app = express()
app.use(morgan('dev'))

async function main() {
  try {
    await AppDataSource.initialize()
    app.listen(3001)
    console.log('Server on port', 3001)
  } catch (error) {
    console.log(error)
  }
}

main()
