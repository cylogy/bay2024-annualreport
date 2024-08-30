import {
  BasicEditingDataService,
  ServerlessEditingDataService,
} from '@sitecore-jss/sitecore-jss-nextjs/editing';
import { redisEditingDataCache } from './redis-editing-data-cache';

// Override the default editingDataDiskCache with an accessible temp directory
export const myEditingDataCache = redisEditingDataCache;
//export const myEditingDataCache = redisEditingDataCache;

// Override default editingDataService to use myEditingDataDiskCache for BasicEditingDataService
export const myEditingDataService = process.env.VERCEL
  ? new ServerlessEditingDataService()
  : new BasicEditingDataService({
      editingDataCache: myEditingDataCache,
    });
