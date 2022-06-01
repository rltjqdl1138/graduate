import CONFIG from '../config';
/*
import kafka from 'kafka-node'

const option = {
  kafkaHost: CONFIG.kafka_url,
  connectTimeout: 10000,
  requestTimeout: 30000,

}

const Producer = kafka.Producer;
const client = new kafka.KafkaClient(option);
const producer = new Producer(client);
*/
function logger(logMessage, LogType){
  let messages;
  const timestamp = Number(new Date())
  const {type, topic, message} = logMessage;
  const fullTopic = `${type}.openavatar.${topic}`;
  
  if(typeof message === 'string') {
    messages = message;
  }
  else if(typeof message === 'object'){
    messages = JSON.stringify({timestamp, data:message});
  }
  else {
    return;
  }

  //const payload = [{ messages, topic: fullTopic }]
  //producer.send(payload, (data)=>{
    console.log(`[${fullTopic}]${messages}`);
  //})
}

export default logger;