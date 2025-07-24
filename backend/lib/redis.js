import Redis from "ioredis"
import dotenv from "dotenv";
dotenv.config({path: '../.env'})

export const redis = new Redis(process.env.REDIS_URL);
await redis.set('foo', 'bar');