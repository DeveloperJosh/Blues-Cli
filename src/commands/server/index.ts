import express from "express";

const app = express();

export function startServer(port: number) {
    app.get('/', (req, res) => {
        // respond with json
        res.json({ message: 'Hello, World!' });
    });
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}

export default startServer;