const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const elasticsearch = require('elasticsearch');
const PORT = 5000;
require('dotenv').config()
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

const method = require('./src/method/connection')
// Use middlewares to set view engine and post json data to the server
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// method.createIndex(client);
// method.deleteIndex(client);
// app.use('/index',method)
async function run(){
  let data = await method.converse();
  let step = data[0].belongs_to_collection
  let st = step.replace(/'/g, '"' )
  // console.log(data[0]);
  // let st = JSON.parse(step)
   method.deleteIndex(client,'game-of-thrones');
  // await method.Indexdata(client,data[2000])
  // await method.bulkData(client,data.slice(0,10))

}
run();

app.listen(PORT, function(){
  console.log('Server is running on Port: ',PORT);
});

// curl -X GET "localhost:9200/_all/_search?q=tag:wow"
