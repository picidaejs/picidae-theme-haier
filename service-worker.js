/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/picidae-theme-haier/404.html","583427ffd738fb65a8f70e2eef9ae82f"],["/picidae-theme-haier/PICIDAE_COMMON.js","0b3468c8b6e0de7a9615e674c7b41650"],["/picidae-theme-haier/PICIDAE_ENTRY.js","ea23b33eed284ed99c1d875d68be364a"],["/picidae-theme-haier/api.html","583427ffd738fb65a8f70e2eef9ae82f"],["/picidae-theme-haier/docs.html","583427ffd738fb65a8f70e2eef9ae82f"],["/picidae-theme-haier/docs/__information__.html","09aa02300835c17b31b1015b4b7b4de9"],["/picidae-theme-haier/docs/__information__.js","26f7c8f5776c132d6e98b46da6794d94"],["/picidae-theme-haier/docs/doc-a.html","ca15780be1200618fba56e1d2429cdf3"],["/picidae-theme-haier/docs/doc-a.js","44459e035e581f0f37b58ba5fdf5d0c9"],["/picidae-theme-haier/docs/doc-a_zh.html","c11f5fbd747a8a1834aceec62c637d20"],["/picidae-theme-haier/docs/doc-a_zh.js","8c9c7b38f9ba02fc6a170be01ec76f96"],["/picidae-theme-haier/docs/doc-b.html","74c902951bc07730c933b80f6ec6f23c"],["/picidae-theme-haier/docs/doc-b.js","d17a844fc706e79080a47ee7a29dafa4"],["/picidae-theme-haier/docs/doc-b_zh.html","526ed694994fdfa93787adced4482863"],["/picidae-theme-haier/docs/doc-b_zh.js","fe1393f984bb9272f0b10fcf0a6425b5"],["/picidae-theme-haier/example.html","731b552cb9a08832d7a68f36298ee490"],["/picidae-theme-haier/example.js","10b7678423e3ee2f1e9438c0c796dc7d"],["/picidae-theme-haier/example_zh.html","f42366e0c6ff7a342e55b042e132a2e4"],["/picidae-theme-haier/example_zh.js","1d857074822a568de37c3f5c2d7609b1"],["/picidae-theme-haier/guides/__information__.html","1559b58bdb5e1fb91d6819c511392e97"],["/picidae-theme-haier/guides/__information__.js","9aa64465f79e6f599d45459b5bd3d895"],["/picidae-theme-haier/guides/configuration.html","30238e6d7f131d4e7bb383ae8ef96dcd"],["/picidae-theme-haier/guides/configuration.js","68aa7bf5094f2b7a60a572fe94a4f30d"],["/picidae-theme-haier/guides/configuration_zh.html","15da8710d21e94ba940c39aee30a85c7"],["/picidae-theme-haier/guides/configuration_zh.js","25e4e097b396f7c83910f920467dc36d"],["/picidae-theme-haier/guides/getting-started.html","b71b2d89aea6cad9cde9cc715ab86512"],["/picidae-theme-haier/guides/getting-started.js","eaee767e9f35996d1161289fd8158ecf"],["/picidae-theme-haier/guides/getting-started_zh.html","513c0a828cb87564c62ded171e95a27a"],["/picidae-theme-haier/guides/getting-started_zh.js","3ae3d98b8eed26d43003a73be6967ea7"],["/picidae-theme-haier/guides/installation.html","0dccd1e6a059ebd92fc642a04793821b"],["/picidae-theme-haier/guides/installation.js","2a0cb4e82e4a131c23e0adc8bdd6862c"],["/picidae-theme-haier/guides/installation_zh.html","54406aad5e280c61db412229d959c497"],["/picidae-theme-haier/guides/installation_zh.js","30cd2a06c4f1910197574a88307524e2"],["/picidae-theme-haier/guides/ssr.html","ccbbcb6dd18c62edeeb31213311f5d7b"],["/picidae-theme-haier/guides/ssr.js","92bdb1426b03609e73661c11a41bff9b"],["/picidae-theme-haier/guides/ssr_zh.html","a8244458533e5d6f6ec4501ccf83d3d2"],["/picidae-theme-haier/guides/ssr_zh.js","ab4629143b8f1a2c4a0578364d2fbd97"],["/picidae-theme-haier/help.html","1963a746e31306c541321ae622f49392"],["/picidae-theme-haier/help.js","b576a01bcddda1f9173cecb3abcfde2a"],["/picidae-theme-haier/help_zh.html","15cd678ea36be4f3b3dafe9780ef3bb8"],["/picidae-theme-haier/help_zh.js","6b2eae4c4fde5ee0e11641925f525462"],["/picidae-theme-haier/index.html","ee5359b69c93d529847a125d7947c286"],["/picidae-theme-haier/index.js","11782a68f82a1ffce7fe15b00055a079"],["/picidae-theme-haier/index_zh.html","a97ed070a9d5cb4a3013c8d78ca96533"],["/picidae-theme-haier/index_zh.js","1bd8d85f47978eae5809d0899701ff9c"],["/picidae-theme-haier/style.css","74540cab9b9ffb7782f90412cfe35155"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function (originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  return;
                  // throw new Error('Request for ' + cacheKey + ' returned a ' +
                  //  'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    if (!shouldRespond) {
      shouldRespond = [
        url.replace(/\/*$/, '.html'),
        url.replace(/\/*$/, '/index.html'),
        url
      ].some(function (maybeUrl) {
        if (urlsToCacheKeys.has(maybeUrl)) {
          url = maybeUrl
          return true
        }
      })
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '/picidae-theme-haier/index.html';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







