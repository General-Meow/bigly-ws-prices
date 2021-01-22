const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const kafka = require('kafka-node')
const path = require('path')

const app = express()
const httpServer = http.createServer(app)
const io = socketio(httpServer)
const port = process.env.PORT || 3000


app.use(express.static(path.join(__dirname, '../public')))

app.get('/', (req, resp) => {
  console.log('hello')
  resp.render('index')
})


const kafkaHost = process.env.KAFKA_HOST || '192.168.1.81'
const kafkaHostPort = process.env.KAFKA_HOST_PORT || '9092'
const kafka_address = kafkaHost + ':' + kafkaHostPort
const client = new kafka.KafkaClient({
  kafkaHost: kafka_address
})

const consumer = new kafka.Consumer(client, [ {topic: "company_price", partition: 0, offset: -1} ],
    {groupId: 'ws-client', autoCommit: true})

consumer.on('message', function (message) {
  console.log("got new message: ", message.value)
  io.emit('tick', message.value)
})

//
// io.on('connection', (socket) => {
//   console.log('new user has made a connection')
//
// })
consumer.on('message', function (message) {
  io.emit('tick', message.value)
})

httpServer.listen(port, () => {
  console.log(`Express is now running on port ${port}`)
})

