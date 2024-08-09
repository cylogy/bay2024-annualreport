const { CacheHandler } = require("@neshca/cache-handler");
//import { CacheHandler } from '@neshca/cache-handler/dist';
const { isImplicitTag } = require('@neshca/cache-handler/helpers');
const { createClient, commandOptions } = require('redis');
 
CacheHandler.onCreation(async () => {
  //Always create a Redis client inside the `onCreation` callback.
  const client = createClient({
    url: process.env.REDIS_SERVICE_URL,
    pingInterval: 1000,
    socket: {
       connectTimeout:30000,
    },
  });
 
  // Ignore Redis errors: https://github.com/redis/node-redis?tab=readme-ov-file#events.
  client.on('error', (mesg) => {
    console.log('error message:', process.env.REDIS_SERVICE_URL, mesg) 
  });
 
  await client.connect();
 
  //console.log("codebuild:"+process.env.CODEBUILD_BUILD_NUMBER);
  // Define a timeout for Redis operations.
  const timeoutMs = 30000;
 
  // Define a key prefix for the cache.
  // It is useful to avoid key collisions with other data in Redis,
  // or to delete all cache keys at once by using a pattern.
  const keyPrefix = 'baaqmd:'+ process.env.CODEBUILD_BUILD_NUMBER + ":";
 
  // Define a key for shared tags.
  // You'll see how to use it later in the `revalidateTag` method
  const sharedTagsKey = '_sharedTags_';
 
  // Create an assert function to ensure that the client is ready before using it.
  // When you throw an error in any Handler method,
  // the CacheHandler will use the next available Handler listed in the `handlers` array.
  function assertClientIsReady() {
    if (!client.isReady) {
      console.log("client is not ready");
      throw new Error('Redis client is not ready yet or connection is lost.');
    }
    console.log("Client is ready");
  }
 
  const revalidatedTagsKey = `${keyPrefix}__revalidated_tags__`;
 
  // Create a custom Redis Handler
  const customRedisHandler = {
    // Give the handler a name.
    // It is useful for logging in debug mode.
    name: 'redis-strings-custom',
    // We do not use try/catch blocks in the Handler methods.
    // CacheHandler will handle errors and use the next available Handler.
    //async get(key, implicitTags) {
      async get(key) {
      // Ensure that the client is ready before using it.
      // If the client is not ready, the CacheHandler will use the next available Handler.
      assertClientIsReady();
 
      // Create a new AbortSignal with a timeout for the Redis operation.
      // By default, redis client operations will wait indefinitely.
      const options = commandOptions({ signal: AbortSignal.timeout(timeoutMs) });
 
      //console.log("getkey:"+keyPrefix+key);
      // Get the value from Redis.
      // We use the key prefix to avoid key collisions with other data in Redis.
      const result = await client.get(options, keyPrefix + key);
 
      // If the key does not exist, return null.
      if (!result) {
        //console.log("getkey result is null, return null:"+keyPrefix+key);
        return null;
      }
 
      // Redis stores strings, so we need to parse the JSON.
      const cacheValue = JSON.parse(result);
 
      // If the cache value has no tags, return it early.
      if (!cacheValue) {
        //console.log("getkey cachevalue is null, return null:"+keyPrefix+key);
        return null;
      }
 
      //console.log("returned cachevalue:"+cacheValue);
      // Return the cache value.
      return cacheValue;
    },
    async set(key, cacheHandlerValue) {
      // Ensure that the client is ready before using it.
      assertClientIsReady();
 
      // Create a new AbortSignal with a timeout for the Redis operation.
      const options = commandOptions({ signal: AbortSignal.timeout(timeoutMs) });
 
      //console.log("setoperation:"+keyPrefix+key);
      // Redis stores strings, so we need to stringify the JSON.
      const setOperation = client.set(options, keyPrefix + key, JSON.stringify(cacheHandlerValue));
      //console.log("setoperation sueccessful:"+keyPrefix+key);
      //console.log(JSON.stringify(cacheHandlerValue));

      await Promise.all([setOperation]);
    },
    async revalidateTag(tag) {
      console.log("revalidate tag:"+tag);
      // Ensure that the client is ready before using it.
      assertClientIsReady();
 
      for (let [key, value] of cache) {
        // If the value's tags include the specified tag, delete this entry
        if (value.tags.includes(tag)) {
          client.delete(key)
        }
      }
    },
  };
 
  return {
    // The order of the handlers is important.
    // The CacheHandler will run get methods in the order of the handlers array.
    // Other methods will be run in parallel.
    handlers: [customRedisHandler],
  };
});
 
//export default CacheHandler;
module.exports = CacheHandler;