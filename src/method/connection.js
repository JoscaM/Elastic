// const client = require('./connection.js');


module.exports = {
  /*
    * function( client)
    * create index(table)
  */
  async converse(){
    const csvFilePath='./src/method/movies_metadata.csv'
    const csv=require('csvtojson');
    const jsonArray=await csv().fromFile(csvFilePath);
    //console.log(jsonArray);
    return jsonArray;
  },
  createIndex : async function(client){
    return await client.indices.create({index: 'book'},function(err,resp,status) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("create",resp);
      }
    })
  },
  deleteIndex: async function(client,index){
      client.indices.delete({index: index},function(err,resp,status) {
      console.log("delete",resp);
    });
  },
  /*
    * client  : Client
    * data object{index , id(not required), type}
  */
  Indexdata: async function(client,data){
    client.index({
      index: 'film',
      type: data.adult!=='False' ? 'adult' : 'not adult',
      body: data
    },function(err,resp,status) {
        console.log(resp);
    });
  },
  bulkData : async function (client,data){
    let bulkBody = [];
    data.forEach(item => {
      bulkBody.push({
        index: {
          _index: 'game-of-thrones',
          _type:  '_doc',
        }
      });

      bulkBody.push(item);
    });
    const { body: bulkResponse } = await client.bulk({
      refresh: true,
      body: bulkBody
    })
    if (bulkBody.error){
      console.log(bulkBody.error);
      process.exit(1);
    }
  }



}
