'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_shiji';

  // add your config here
  config.middleware = ['token'];

  config.security = {
    csrf: {
      ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
    },
    methodnoallow: {
      enable: false
    }, 
    domainWhiteList: [ 'http://ushiji.top' ]
  };
  
  exports.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: 'true'
  };

  config.io = {
    init: { }, // passed to engine.io
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0
    }
  };

  config.knex = {
    default: {
      dialect: 'mysql',
      connection: {
        database: null,
      },
      // connection pool
      pool: { min: 0, max: 5 },
      // acquire connection timeout, millisecond
      acquireConnectionTimeout: 30000,
    },
    app: true,
    agent: false,
    // 单数据库
    client: {
      dialect: 'mysql',
      connection: {
        // host
        host: '127.0.0.1',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'password',
        // database
        database: 'sj',
      }
    }
  };

  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0,
    }
  };

  //手机短信第三方接口配置
  config.sms = {
    sdkappid: 1400053302,
    appkey: '1bcbc126b2dccc9c592d8868eab6c03f',
    singleSmsUrl: 'https://yun.tim.qq.com/v5/tlssmssvr/sendsms',
    multiSmsUrl: 'https://yun.tim.qq.com/v5/tlssmssvr/sendmultisms2',
    smsExpireTime: 120000,
    tplId:63164,
  }

  //JWT TOKEN配置
  config.jwt = {
    key:"1bcbc126b2dccc9c592d8868eab6c03f",
    expiresIn: "7d",
    loginKeepTime: 604800,
  }

  return config;
};
