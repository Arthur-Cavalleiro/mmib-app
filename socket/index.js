import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: '*' } });
const PORT = 3001

io.on("connection", (socket) => {
  console.log("connection", socket?.id);
});

httpServer.listen(PORT, () => console.log(`socket is listening on PORT: ${PORT}`));
