const kafka = require('kafka-node')

const kafkaHost = process.env.KAFKA_HOST || '192.168.1.81'
const kafkaHostPort = process.env.KAFKA_HOST_PORT || '9092'
const kafka_address = kafkaHost + ':' + kafkaHostPort
const client = new kafka.KafkaClient({
  kafkaHost: kafka_address
})

const consumer = new kafka.Consumer(client, [ {topic: "company_price", partition: 0} ], {autoCommit: false})

consumer.on('message', function (message) {
  console.log("got new message: ", message.value)
})

console.log('hello')

