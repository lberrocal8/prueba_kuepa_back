const Message = require("./models/Message");

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('message', async ({ activeUserName, role, text }) => {
      console.log(`Mensaje de ${socket.id}:`, text);
      const messageData = new Message({ activeUserName, role, text, timestamp: new Date() });

      try {
        await messageData.save();
        io.emit("message", messageData);
      } catch (err) {
        console.error("Error guardando mensaje:", err);
      }
    });

    socket.on("getMessages", async () => {
      try {
        const messages = await Message.find().sort({ timestamp: 1 }).limit(50);
        socket.emit("loadMessages", messages);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });
};
