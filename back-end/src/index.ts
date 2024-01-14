import dotenv from 'dotenv';
dotenv.config();
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import errorHandler from './middleWares/errorHandler';
import cors from './config/cors.config'
import bodyParser from 'body-parser';
import limiter from './config/limiterConfig';
import routes from './routes'; // Importing the consolidated routes
import fs from "fs"
import path from 'path';
import { WebSocketServer } from 'ws';
import streamController from "./controllers/stream.controller"

const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors);
app.use(limiter);
app.use(errorHandler);
app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true, 
    directives: {
      "img-src": ["'self'", "https: data: blob:"],
    },
  })
);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Using the consolidated routes
app.use('/api', routes);

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

// General error handler
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const wss = new WebSocketServer({ server });
streamController.handleWebSocketConnection(wss);