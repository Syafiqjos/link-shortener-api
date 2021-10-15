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

function handleCacheMatch(pattern) {
    const promise = promisify(cache.keys).bind(cache);

    const keypair = pattern;

    console.log(`REDIS KEYS: ${keypair}`);

    return promise(keypair);
}

function handleCacheDelete(collection, key) {
    const promise = promisify(cache.del).bind(cache);

    const keypair = `${collection}:${key}`;

    console.log(`REDIS DEL: ${keypair}`);

    return promise(keypair);
}

module.exports = {
    handleCacheGet,
    handleCacheSet,
    handleCacheMatch,
    handleCacheDelete
}