import { LRUCache } from 'lru-cache';

const cache = new LRUCache({
    max: 200,
    ttl: 1000 * 60 * 60 // 1 година
});

export default cache;
