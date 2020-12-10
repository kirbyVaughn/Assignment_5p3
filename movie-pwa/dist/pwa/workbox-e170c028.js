define("./workbox-e170c028.js", ["exports"], function(e) {
  "use strict";
  try {
    self["workbox:core:5.1.4"] && _();
  } catch (e) {}
  const t = (e, ...t) => {
    let n = e;
    return t.length > 0 && (n += " :: " + JSON.stringify(t)), n;
  };
  class n extends Error {
    constructor(e, n) {
      super(t(e, n)), (this.name = e), (this.details = n);
    }
  }
  const s = {
      googleAnalytics: "googleAnalytics",
      precache: "precache-v2",
      prefix: "workbox",
      runtime: "runtime",
      suffix: "undefined" != typeof registration ? registration.scope : ""
    },
    r = e => [s.prefix, e, s.suffix].filter(e => e && e.length > 0).join("-"),
    o = e => {
      (e => {
        for (const t of Object.keys(s)) e(t);
      })(t => {
        "string" == typeof e[t] && (s[t] = e[t]);
      });
    },
    i = e => e || r(s.precache);
  const c = e =>
      new URL(String(e), location.href).href.replace(
        new RegExp("^" + location.origin),
        ""
      ),
    a = new Set();
  const u = (e, t) => e.filter(e => t in e),
    h = async ({ request: e, mode: t, plugins: n = [] }) => {
      const s = u(n, "cacheKeyWillBeUsed");
      let r = e;
      for (const e of s)
        (r = await e.cacheKeyWillBeUsed.call(e, { mode: t, request: r })),
          "string" == typeof r && (r = new Request(r));
      return r;
    },
    l = async ({
      cacheName: e,
      request: t,
      event: n,
      matchOptions: s,
      plugins: r = []
    }) => {
      const o = await self.caches.open(e),
        i = await h({ plugins: r, request: t, mode: "read" });
      let c = await o.match(i, s);
      for (const t of r)
        if ("cachedResponseWillBeUsed" in t) {
          const r = t.cachedResponseWillBeUsed;
          c = await r.call(t, {
            cacheName: e,
            event: n,
            matchOptions: s,
            cachedResponse: c,
            request: i
          });
        }
      return c;
    },
    f = async ({
      cacheName: e,
      request: t,
      response: s,
      event: r,
      plugins: o = [],
      matchOptions: i
    }) => {
      const f = await h({ plugins: o, request: t, mode: "write" });
      if (!s) throw new n("cache-put-with-no-response", { url: c(f.url) });
      const w = await (async ({
        request: e,
        response: t,
        event: n,
        plugins: s = []
      }) => {
        let r = t,
          o = !1;
        for (const t of s)
          if ("cacheWillUpdate" in t) {
            o = !0;
            const s = t.cacheWillUpdate;
            if (
              ((r = await s.call(t, { request: e, response: r, event: n })), !r)
            )
              break;
          }
        return o || (r = r && 200 === r.status ? r : void 0), r || null;
      })({ event: r, plugins: o, response: s, request: f });
      if (!w) return;
      const d = await self.caches.open(e),
        p = u(o, "cacheDidUpdate"),
        y =
          p.length > 0
            ? await l({ cacheName: e, matchOptions: i, request: f })
            : null;
      try {
        await d.put(f, w);
      } catch (e) {
        throw ("QuotaExceededError" === e.name &&
          (await (async function() {
            for (const e of a) await e();
          })()),
        e);
      }
      for (const t of p)
        await t.cacheDidUpdate.call(t, {
          cacheName: e,
          event: r,
          oldResponse: y,
          newResponse: w,
          request: f
        });
    },
    w = async ({ request: e, fetchOptions: t, event: s, plugins: r = [] }) => {
      if (
        ("string" == typeof e && (e = new Request(e)),
        s instanceof FetchEvent && s.preloadResponse)
      ) {
        const e = await s.preloadResponse;
        if (e) return e;
      }
      const o = u(r, "fetchDidFail"),
        i = o.length > 0 ? e.clone() : null;
      try {
        for (const t of r)
          if ("requestWillFetch" in t) {
            const n = t.requestWillFetch,
              r = e.clone();
            e = await n.call(t, { request: r, event: s });
          }
      } catch (e) {
        throw new n("plugin-error-request-will-fetch", { thrownError: e });
      }
      const c = e.clone();
      try {
        let n;
        n = "navigate" === e.mode ? await fetch(e) : await fetch(e, t);
        for (const e of r)
          "fetchDidSucceed" in e &&
            (n = await e.fetchDidSucceed.call(e, {
              event: s,
              request: c,
              response: n
            }));
        return n;
      } catch (e) {
        for (const t of o)
          await t.fetchDidFail.call(t, {
            error: e,
            event: s,
            originalRequest: i.clone(),
            request: c.clone()
          });
        throw e;
      }
    };
  let d;
  async function p(e, t) {
    const n = e.clone(),
      s = {
        headers: new Headers(n.headers),
        status: n.status,
        statusText: n.statusText
      },
      r = t ? t(s) : s,
      o = (function() {
        if (void 0 === d) {
          const e = new Response("");
          if ("body" in e)
            try {
              new Response(e.body), (d = !0);
            } catch (e) {
              d = !1;
            }
          d = !1;
        }
        return d;
      })()
        ? n.body
        : await n.blob();
    return new Response(o, r);
  }
  try {
    self["workbox:precaching:5.1.4"] && _();
  } catch (e) {}
  function y(e) {
    if (!e) throw new n("add-to-cache-list-unexpected-type", { entry: e });
    if ("string" == typeof e) {
      const t = new URL(e, location.href);
      return { cacheKey: t.href, url: t.href };
    }
    const { revision: t, url: s } = e;
    if (!s) throw new n("add-to-cache-list-unexpected-type", { entry: e });
    if (!t) {
      const e = new URL(s, location.href);
      return { cacheKey: e.href, url: e.href };
    }
    const r = new URL(s, location.href),
      o = new URL(s, location.href);
    return (
      r.searchParams.set("__WB_REVISION__", t),
      { cacheKey: r.href, url: o.href }
    );
  }
  class g {
    constructor(e) {
      (this.t = i(e)),
        (this.s = new Map()),
        (this.o = new Map()),
        (this.i = new Map());
    }
    addToCacheList(e) {
      const t = [];
      for (const s of e) {
        "string" == typeof s
          ? t.push(s)
          : s && void 0 === s.revision && t.push(s.url);
        const { cacheKey: e, url: r } = y(s),
          o = "string" != typeof s && s.revision ? "reload" : "default";
        if (this.s.has(r) && this.s.get(r) !== e)
          throw new n("add-to-cache-list-conflicting-entries", {
            firstEntry: this.s.get(r),
            secondEntry: e
          });
        if ("string" != typeof s && s.integrity) {
          if (this.i.has(e) && this.i.get(e) !== s.integrity)
            throw new n("add-to-cache-list-conflicting-integrities", {
              url: r
            });
          this.i.set(e, s.integrity);
        }
        if ((this.s.set(r, e), this.o.set(r, o), t.length > 0)) {
          const e = `Workbox is precaching URLs without revision info: ${t.join(
            ", "
          )}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;
          console.warn(e);
        }
      }
    }
    async install({ event: e, plugins: t } = {}) {
      const n = [],
        s = [],
        r = await self.caches.open(this.t),
        o = await r.keys(),
        i = new Set(o.map(e => e.url));
      for (const [e, t] of this.s)
        i.has(t) ? s.push(e) : n.push({ cacheKey: t, url: e });
      const c = n.map(({ cacheKey: n, url: s }) => {
        const r = this.i.get(n),
          o = this.o.get(s);
        return this.u({
          cacheKey: n,
          cacheMode: o,
          event: e,
          integrity: r,
          plugins: t,
          url: s
        });
      });
      await Promise.all(c);
      return { updatedURLs: n.map(e => e.url), notUpdatedURLs: s };
    }
    async activate() {
      const e = await self.caches.open(this.t),
        t = await e.keys(),
        n = new Set(this.s.values()),
        s = [];
      for (const r of t) n.has(r.url) || (await e.delete(r), s.push(r.url));
      return { deletedURLs: s };
    }
    async u({
      cacheKey: e,
      url: t,
      cacheMode: s,
      event: r,
      plugins: o,
      integrity: i
    }) {
      const c = new Request(t, {
        integrity: i,
        cache: s,
        credentials: "same-origin"
      });
      let a,
        u = await w({ event: r, plugins: o, request: c });
      for (const e of o || []) "cacheWillUpdate" in e && (a = e);
      if (
        !(a
          ? await a.cacheWillUpdate({ event: r, request: c, response: u })
          : u.status < 400)
      )
        throw new n("bad-precaching-response", { url: t, status: u.status });
      u.redirected && (u = await p(u)),
        await f({
          event: r,
          plugins: o,
          response: u,
          request: e === t ? c : new Request(e),
          cacheName: this.t,
          matchOptions: { ignoreSearch: !0 }
        });
    }
    getURLsToCacheKeys() {
      return this.s;
    }
    getCachedURLs() {
      return [...this.s.keys()];
    }
    getCacheKeyForURL(e) {
      const t = new URL(e, location.href);
      return this.s.get(t.href);
    }
    async matchPrecache(e) {
      const t = e instanceof Request ? e.url : e,
        n = this.getCacheKeyForURL(t);
      if (n) {
        return (await self.caches.open(this.t)).match(n);
      }
    }
    createHandler(e = !0) {
      return async ({ request: t }) => {
        try {
          const e = await this.matchPrecache(t);
          if (e) return e;
          throw new n("missing-precache-entry", {
            cacheName: this.t,
            url: t instanceof Request ? t.url : t
          });
        } catch (n) {
          if (e) return fetch(t);
          throw n;
        }
      };
    }
    createHandlerBoundToURL(e, t = !0) {
      if (!this.getCacheKeyForURL(e))
        throw new n("non-precached-url", { url: e });
      const s = this.createHandler(t),
        r = new Request(e);
      return () => s({ request: r });
    }
  }
  let R;
  const m = () => (R || (R = new g()), R);
  const q = (e, t) => {
    const n = m().getURLsToCacheKeys();
    for (const s of (function*(
      e,
      {
        ignoreURLParametersMatching: t,
        directoryIndex: n,
        cleanURLs: s,
        urlManipulation: r
      } = {}
    ) {
      const o = new URL(e, location.href);
      (o.hash = ""), yield o.href;
      const i = (function(e, t = []) {
        for (const n of [...e.searchParams.keys()])
          t.some(e => e.test(n)) && e.searchParams.delete(n);
        return e;
      })(o, t);
      if ((yield i.href, n && i.pathname.endsWith("/"))) {
        const e = new URL(i.href);
        (e.pathname += n), yield e.href;
      }
      if (s) {
        const e = new URL(i.href);
        (e.pathname += ".html"), yield e.href;
      }
      if (r) {
        const e = r({ url: o });
        for (const t of e) yield t.href;
      }
    })(e, t)) {
      const e = n.get(s);
      if (e) return e;
    }
  };
  let v = !1;
  function U(e) {
    v ||
      ((({
        ignoreURLParametersMatching: e = [/^utm_/],
        directoryIndex: t = "index.html",
        cleanURLs: n = !0,
        urlManipulation: s
      } = {}) => {
        const r = i();
        self.addEventListener("fetch", o => {
          const i = q(o.request.url, {
            cleanURLs: n,
            directoryIndex: t,
            ignoreURLParametersMatching: e,
            urlManipulation: s
          });
          if (!i) return;
          let c = self.caches
            .open(r)
            .then(e => e.match(i))
            .then(e => e || fetch(i));
          o.respondWith(c);
        });
      })(e),
      (v = !0));
  }
  const L = [],
    x = {
      get: () => L,
      add(e) {
        L.push(...e);
      }
    },
    b = e => {
      const t = m(),
        n = x.get();
      e.waitUntil(
        t.install({ event: e, plugins: n }).catch(e => {
          throw e;
        })
      );
    },
    M = e => {
      const t = m();
      e.waitUntil(t.activate());
    };
  try {
    self["workbox:routing:5.1.4"] && _();
  } catch (e) {}
  const N = e => (e && "object" == typeof e ? e : { handle: e });
  class E {
    constructor(e, t, n = "GET") {
      (this.handler = N(t)), (this.match = e), (this.method = n);
    }
  }
  class O extends E {
    constructor(e, t, n) {
      super(
        ({ url: t }) => {
          const n = e.exec(t.href);
          if (n && (t.origin === location.origin || 0 === n.index))
            return n.slice(1);
        },
        t,
        n
      );
    }
  }
  class K {
    constructor() {
      this.h = new Map();
    }
    get routes() {
      return this.h;
    }
    addFetchListener() {
      self.addEventListener("fetch", e => {
        const { request: t } = e,
          n = this.handleRequest({ request: t, event: e });
        n && e.respondWith(n);
      });
    }
    addCacheListener() {
      self.addEventListener("message", e => {
        if (e.data && "CACHE_URLS" === e.data.type) {
          const { payload: t } = e.data,
            n = Promise.all(
              t.urlsToCache.map(e => {
                "string" == typeof e && (e = [e]);
                const t = new Request(...e);
                return this.handleRequest({ request: t });
              })
            );
          e.waitUntil(n),
            e.ports && e.ports[0] && n.then(() => e.ports[0].postMessage(!0));
        }
      });
    }
    handleRequest({ request: e, event: t }) {
      const n = new URL(e.url, location.href);
      if (!n.protocol.startsWith("http")) return;
      const { params: s, route: r } = this.findMatchingRoute({
        url: n,
        request: e,
        event: t
      });
      let o,
        i = r && r.handler;
      if ((!i && this.l && (i = this.l), i)) {
        try {
          o = i.handle({ url: n, request: e, event: t, params: s });
        } catch (e) {
          o = Promise.reject(e);
        }
        return (
          o instanceof Promise &&
            this.p &&
            (o = o.catch(s => this.p.handle({ url: n, request: e, event: t }))),
          o
        );
      }
    }
    findMatchingRoute({ url: e, request: t, event: n }) {
      const s = this.h.get(t.method) || [];
      for (const r of s) {
        let s;
        const o = r.match({ url: e, request: t, event: n });
        if (o)
          return (
            (s = o),
            ((Array.isArray(o) && 0 === o.length) ||
              (o.constructor === Object && 0 === Object.keys(o).length) ||
              "boolean" == typeof o) &&
              (s = void 0),
            { route: r, params: s }
          );
      }
      return {};
    }
    setDefaultHandler(e) {
      this.l = N(e);
    }
    setCatchHandler(e) {
      this.p = N(e);
    }
    registerRoute(e) {
      this.h.has(e.method) || this.h.set(e.method, []),
        this.h.get(e.method).push(e);
    }
    unregisterRoute(e) {
      if (!this.h.has(e.method))
        throw new n("unregister-route-but-not-found-with-method", {
          method: e.method
        });
      const t = this.h.get(e.method).indexOf(e);
      if (!(t > -1)) throw new n("unregister-route-route-not-registered");
      this.h.get(e.method).splice(t, 1);
    }
  }
  let C;
  const S = () => (
    C || ((C = new K()), C.addFetchListener(), C.addCacheListener()), C
  );
  (e.NavigationRoute = class extends E {
    constructor(e, { allowlist: t = [/./], denylist: n = [] } = {}) {
      super(e => this.g(e), e), (this.R = t), (this.m = n);
    }
    g({ url: e, request: t }) {
      if (t && "navigate" !== t.mode) return !1;
      const n = e.pathname + e.search;
      for (const e of this.m) if (e.test(n)) return !1;
      return !!this.R.some(e => e.test(n));
    }
  }),
    (e.createHandlerBoundToURL = function(e) {
      return m().createHandlerBoundToURL(e);
    }),
    (e.precacheAndRoute = function(e, t) {
      !(function(e) {
        m().addToCacheList(e),
          e.length > 0 &&
            (self.addEventListener("install", b),
            self.addEventListener("activate", M));
      })(e),
        U(t);
    }),
    (e.registerRoute = function(e, t, s) {
      let r;
      if ("string" == typeof e) {
        const n = new URL(e, location.href);
        r = new E(({ url: e }) => e.href === n.href, t, s);
      } else if (e instanceof RegExp) r = new O(e, t, s);
      else if ("function" == typeof e) r = new E(e, t, s);
      else {
        if (!(e instanceof E))
          throw new n("unsupported-route-type", {
            moduleName: "workbox-routing",
            funcName: "registerRoute",
            paramName: "capture"
          });
        r = e;
      }
      return S().registerRoute(r), r;
    }),
    (e.setCacheNameDetails = function(e) {
      o(e);
    });
});
