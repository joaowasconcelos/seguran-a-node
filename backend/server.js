import express from 'express'
import helmet from 'helmet'
import { tooBusyCheck } from './too-busy.js'
import { rateLimiter } from './rate-limiter.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(tooBusyCheck)
app.use(rateLimiter)
app.use(cors({
  origin: "https://google.com.br"
}))

app.use((req, res, next) => {
  const maxLength = 1024;

  console.log(parseInt(req.headers['content-length']))

  if(req.headers['content-length'] && parseInt(req.headers['content-length']) > maxLength) {
    res.status(413).send("Payload Too large")
  } else {
    next()
  }
})

app.post('/security-route', (req, res) => {
  const { data } = req.body;

  console.log(data)

  setTimeout(() => {
    res.send('Resposta após atraso de 2 segundos');
  }, 2000);
})

app.listen(3000, () => {
  console.log("Server started on port 3000")
})

