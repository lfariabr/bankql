import { RedisPubSub } from 'graphql-redis-subscriptions';
import Redis from 'ioredis';

export function createPubSub() {
  const options = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10), // make sure it's number
    retryStrategy: (times: number) => Math.min(times * 50, 2000),
  };

  return new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
  });
}