//import type { Store } from '@netlify/blobs';
//import { EditingDataCache } from './editing-data-cache';
//import { EditingData } from './editing-data';
import { debug } from '@sitecore-jss/sitecore-jss';
//import { getStore } from '@netlify/blobs';
import { EditingData, EditingDataCache } from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { RedisClient, redisClient } from 'lib/redis-client';
/**
 * Implementation of editing cache for Netlify deployments
 * Uses Netlify Blobs to store data
 */
export class RedisEditingDataCache implements EditingDataCache {
  protected store: RedisClient;

  constructor() {
    //debug.editing('Netlify blobs...', process.env.NETLIFY_BLOBS_CONTEXT);
    debug.editing('Redis connection...');
    this.store = redisClient;
  }

  set(key: string, editingData: EditingData): Promise<void> {
    debug.editing(`Putting editing data for ${key} into redis cache ...`);
    return new Promise<void>((resolve, reject) => {
      this.store
        .set(key, JSON.stringify(editingData))
        .then(() => {
          debug.editing(`finished setting redis data for ${key}`);
          resolve();
        })
        .catch((err) => reject(err));
    });
  }

  get(key: string): Promise<EditingData | undefined> {
    debug.editing(`Getting editing data for ${key} from redis cache...`);
    return new Promise<EditingData | undefined>((resolve, reject) => {
      this.store
        .get(key)
        .then((entry) => {
          const result = entry ? (JSON.parse(entry) as EditingData) : undefined;
          resolve(result);
        })
        .catch((err) => reject(err))
        .finally(() => this.store.delete(key));
    });
  }
}

/** NetlifyEditingDataCache singleton */
export const redisEditingDataCache = new RedisEditingDataCache();
