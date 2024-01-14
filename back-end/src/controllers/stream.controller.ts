import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { WebSocket,WebSocketServer  } from 'ws';
class StreamController {
    
async streamVideo (req: Request, res: Response) {
    
    const streamId = req.params.streamId;
    
    const filePath = path.join(__dirname,'../../uploads/videos/', streamId);
    
    fs.stat(filePath, (err, stats) => {
        if (err) {
            console.error('An error occurred ', err);
            res.sendStatus(404);
            return;
        }

        const range = req.headers.range;
        if (!range) {
            res.status(400).send('Requires Range header');
            return;
        }

        const videoSize = stats.size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ''));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        const contentLength = end - start + 1;
        const headers = {
            'Content-Range': `bytes ${start}-${end}/${videoSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': contentLength,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, headers);

        const videoStream = fs.createReadStream(filePath, { start, end });
        videoStream.pipe(res);
    });
};


async handleWebSocketConnection(wss: WebSocketServer) {
    const clients = new Map<WebSocket, string>();

    wss.on('connection', (ws) => {

        ws.on('message', (message) => {
            const data = JSON.parse(message.toString());
            if (data.type === 'JOIN') {
                clients.set(ws, data.streamId);
            } else {
                const streamId = clients.get(ws);
                if (streamId) {
                    wss.clients.forEach((client) => {
                        if (client !== ws && client.readyState === client.OPEN && clients.get(client) === streamId) {
                            client.send(message.toString());
                        }
                    });
                }
            }
        });

        ws.on('close', () => {
            clients.delete(ws);
        });
    });
};
}

export default new StreamController();
