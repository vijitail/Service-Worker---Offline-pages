const cacheName = 'v1';

// Install event
self.addEventListener('install', e => {
    console.log('Service Worker Installed');
    
    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log("Service Worker Caching Files");
                cache.addAll([
                    'index.html',
                    'about.html',
                    'main.css',
                    'main.js'
                ]);
            })
            .then(() => self.skipWaiting())
    );
}); 

// Activate event
self.addEventListener('activate', e => {
    console.log('Service Worker Activated');
    // Remove unwanted cache
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(cacheNames.map(cache => {
                    if(cache !== cacheName) {
                        console.log('Service Worker Clearing Cache'); 
                        return caches.delete(cache);
                    }
                }));
            })
    );
});

// Fetch event
self.addEventListener('fetch', e => {
    console.log('Service Worker Fetching');
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.match(e.request))
    );
});