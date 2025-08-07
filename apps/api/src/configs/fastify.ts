const loggerOpts = {
  dev: {
    level: 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        ignore: 'pid,hostname'
      }
    }
  },
  prod: {
    level: 'info'
  }
};

const appEnv = (function () {
  if (process.env.APP_ENV === 'dev' || process.env.APP_ENV === 'prod') {
    return process.env.APP_ENV;
  }
  return 'dev';
})();

export const fastifyOpts = {
  logger: loggerOpts[appEnv]
};
