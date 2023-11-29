import * as session from 'express-session';
import  connectRedis from 'connect-redis';
import {createClient} from "redis";
export const redisClient = createClient({ url: 'redis://localhost:6379'});
redisClient.connect().catch(console.error)
const RedisStore = new connectRedis({
  client:redisClient,
});
RedisStore.on('error', (error) => {
  console.error('Redis connection error:', error);
});
export  const sessionMiddleware=session({
  secret: "NOTHING is IMPOSSIBLE",
  resave: false,
  saveUninitialized: false,
  store:RedisStore,
  cookie: {
    maxAge: 3600000*12,
    httpOnly: true,
    secure: process.env.ENVIRONMENT=='production',
  },
});
