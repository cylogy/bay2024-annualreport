import { createClient, RedisClientType } from 'redis';

export class RedisClient {
  private client: RedisClientType;

  constructor() {
    this.client = createClient({
      url: process.env.REDIS_SERVICE_URL,
      pingInterval: 1000,
      socket: {
        connectTimeout: 30000,
      },
    });

    this.client.on('connect', () => {
      console.log('Connected to Redis');
    });

    this.client.on('error', (err: Error) => {
      console.error('Redis error:', err);
    });

    this.connect();
  }

  private async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (err) {
      console.error('Could not connect to Redis:', err);
    }
  }

  async set(key: string, value: string, expireTime?: number): Promise<string | null> {
    try {
      if (expireTime) {
        return await this.client.set(key, value, {
          EX: expireTime,
        });
      } else {
        return await this.client.set(key, value);
      }
    } catch (err) {
      console.error('Error setting key:', err);
      return null;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (err) {
      console.error('Error getting key:', err);
      return null;
    }
  }

  async delete(key: string): Promise<number> {
    try {
      return await this.client.del(key);
    } catch (err) {
      console.error('Error deleting key:', err);
      return 0;
    }
  }

  async exists(key: string): Promise<number> {
    try {
      return await this.client.exists(key);
    } catch (err) {
      console.error('Error checking if key exists:', err);
      return 0;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.quit();
      console.log('Disconnected from Redis');
    } catch (err) {
      console.error('Error disconnecting from Redis:', err);
    }
  }
}

export const redisClient = new RedisClient();
