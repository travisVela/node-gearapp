import Redis from "ioredis"
import dotenv from "dotenv";
if (process.env.DEVELOPMENT) {
    	dotenv.config()
    }

export const redis = new Redis(process.env.REDIS_URL);
await redis.set('foo', 'bar');