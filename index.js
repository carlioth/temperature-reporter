const secrets = require('./secrets');
const { LiveApi } = require('telldus-api');
const cron = require('node-cron');
const http = require('http');
const tempId = 14069231;
const adress = 'http://www.temperatur.nu/rapportera.php?hash='
const api = new LiveApi(secrets.tellus);

var job = cron.schedule('*/3 * * * *', function(){
  console.info(new Date().toString(), 'cron job started');  
  api.getSensorInfo(tempId).then((res) => {
    return res["data"][0]["value"];
  }).then((temp) => {
    http.get(adress + secrets.tellus.temperatureHash + temp, function (res) {
      console.log('temperature: ' + temp + ' Statuscode: ' + res.statusCode);
    })
  });
    console.info(new Date().toString(), 'cron job completed');
});

job.start();