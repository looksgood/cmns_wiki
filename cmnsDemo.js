'use strict';

const TopSdk = require("./index.js");
const ApiClient = TopSdk.ApiClient;

const options = {
  'appkey': '<your appKey>', // your appKey
  'appsecret': '<your appsecret>', // your appSecret
  'url': 'https://eco.taobao.com/router/rest',
};

const deviceToken = "<your deviceToken>"; // your device

var client = new ApiClient(options);

// 推送消息
pushMsg();

function pushMsg() {
  let msg = {
    action: "com.yunos.cmns.demo", // 应用包名
    /*
    pkgContent: {
      "uri": "tmall://tmallclient/?{\"action\":\"internal:url=tmall://mobile.tmall.com/page/home\"}",
      "package": "com.tmall.wireless"
    },
    */
    customContent: {
      "result": "calendarJson",
      "from": "com.aliyun.cloudapp.runtime"
    }
  };
  let push_request = {
    type: 1,
    msg: JSON.stringify(msg),
    receiver: {
      type: "deviceToken",
      data: [deviceToken]
    }
  };

  client.execute('yunos.service.cmns.coa.message.push', {
      'push_request': push_request
    },
    function(error, response) {
      console.log("====================yunos.service.cmns.coa.message.push=========================")
      if (!error)
        console.log(response);
      else
        console.log(error);
    });
}

// 根据消息ID获取发送情况
//getSendResult();

function getSendResult() {
  client.execute('yunos.service.cmns.coa.messageresult.get', {
    'mid': '123'
  }, function(error, response) {
    console.log("====================yunos.service.cmns.coa.messageresult.get=========================")
    if (!error) console.log(response);
    else console.log(error);
  });
}

// 消息回执查询
//getAck();

function getAck() {
  client.execute('yunos.service.cmns.coa.message.ack', {
    'device_token': deviceToken,
    'mid': '123'
  }, function(error, response) {
    console.log("====================yunos.service.cmns.coa.message.ack=========================")
    if (!error) console.log(response);
    else console.log(error);
  })
}

// 消息撤回
//cancelMsg();

function cancelMsg() {
  client.execute('yunos.service.cmns.coa.message.cancel', {
    'mid': '123'
  }, function(error, response) {
    console.log("====================yunos.service.cmns.coa.message.cancel=========================")
    if (!error) console.log(response);
    else console.log(error);
  })
}