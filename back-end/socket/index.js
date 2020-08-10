const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const connection = require('./connection');

async function getMessageHistory(email) {
  const db = await connection();
  const result = await db
    .collection('messages')
    .find({ client: email })
    .toArray();
  return result;
}

async function createRoom(email) {
  const db = await connection();
  const userRoom = await getMessageHistory(email);
  if (userRoom.length === 0)
    await db.collection('messages').insertOne({
      client: email,
      messages: [],
    });
}

async function insertMessage(data) {
  const { text, client, admin } = data;
  const db = await connection();
  await db.collection('messages').updateOne(
    {
      client,
    },
    {
      $set: {
        lastUpdate: new Date(),
      },
      $push: {
        messages: {
          text,
          admin,
          date: new Date(),
        },
      },
    },
  );
}

async function getAllRooms() {
  const db = await connection();
  const data = await db.collection('messages').find().toArray();
  return data.map(msg => ({
    client: msg.client,
    lastUpdate: msg.lastUpdate,
  }));
}

io.on('connection', (socket) => {
  socket.on('get room', (email) => {
    socket.join(email, async () => {
      const messages = await getMessageHistory(email);
      io.to(email).emit('history', messages[0]);
    });
  });

  socket.on('get all rooms', async () => {
    const rooms = await getAllRooms();
    io.emit('all rooms', rooms);
  });

  socket.on('message', async (data) => {
    await createRoom(data.client);
    await insertMessage(data);
    const messages = await getMessageHistory(data.client);
    io.to(data.client).emit('history', messages[0]);
  });
});

module.exports = http;
