import express from "express";
import cors from "cors";
import errorRouter from "./routes/errorRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(cors());

const PORT = 3000;

app.use(express.static(__dirname ));
app.use(express.static(__dirname + '/src'));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/main.html');
});

app.use("/application",applicationRouter);

app.use(errorRouter);


app.listen(PORT, () => {
    console.log("Сервер запущен");
});