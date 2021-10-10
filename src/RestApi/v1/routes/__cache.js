const redis = require('redis');
const { promisify } = require('util');

const cacheUri = process.env.REDIS_URI;
const cache = redis.createClient(cacheUri);

function handleCacheGet(collection, key) {
    const promise = promisify(cache.get).bind(cache);

    const keypair = `${collection}:${key}`;

    console.log(`REDIS GET: ${keypair}`);

    return promise(keypair);
}

function handleCacheSet(collection, key, value) {
    const promise = promisify(cache.set).bind(cache);

    const keypair = `${collection}:${key}`;

    console.log(`REDIS SET: ${keypair} -> ${value}`);

    return promise(keypair, JSON.stringify(value));
}

module.exports = {
    handleCacheGet,
    handleCacheSet
}