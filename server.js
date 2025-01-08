import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import authRouter from "./routes/authRouter.js"; 
import dotenv from "dotenv";
dotenv.config();


const app = express();


app.use(cors());
app.use(bodyParser.json());


app.use('/login', authRouter); 
app.use('/signup',authRouter);

const Port = 5001;
app.listen(Port, () => {
  console.log(`Backend running at http://localhost:${Port}`);
});
