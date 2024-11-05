import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
    max: 200,
    ttl: 1000 * 60 * 60 // 1 hour
});

export default cache;
