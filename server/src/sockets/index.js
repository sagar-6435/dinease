module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join restaurant specific rooms
    socket.on('restaurant:join', (restaurantId) => {
      socket.join(`restaurant:${restaurantId}`);
      console.log(`Socket ${socket.id} joined restaurant:${restaurantId}`);
    });

    socket.on('kitchen:join', (restaurantId) => {
      socket.join(`kitchen:${restaurantId}`);
      console.log(`Socket ${socket.id} joined kitchen:${restaurantId}`);
    });

    socket.on('customer:join', (orderId) => {
      socket.join(`order:${orderId}`);
      console.log(`Socket ${socket.id} joined order:${orderId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
