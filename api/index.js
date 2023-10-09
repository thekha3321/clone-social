import express from "express";
import db from './connect.js'
import userRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import likeRouter from './routes/likes.js'
import commentRouter from './routes/comments.js'
import postRouter from './routes/posts.js'
import cors from 'cors'
import cookieParser from "cookie-parser";

const PORT = 8800
const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true)
  next()
})
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000'
}))
app.use(cookieParser())

app.use('/api/users', userRouter)
app.use('/api/auth/', authRouter)
app.use('/api', postRouter)

app.listen(PORT, ()=> {
    console.log(`listening on Port ${PORT}`);
    db.connect((err)=> {
        console.log('database connected!')
      })
})