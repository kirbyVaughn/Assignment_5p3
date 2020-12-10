if (!self.define) {
  const e = e => {
      "require" !== e && (e += ".js");
      let c = Promise.resolve();
      return (
        i[e] ||
          (c = new Promise(async c => {
            if ("document" in self) {
              const i = document.createElement("script");
              (i.src = e), document.head.appendChild(i), (i.onload = c);
            } else importScripts(e), c();
          })),
        c.then(() => {
          if (!i[e]) throw new Error(`Module ${e} didn’t register its module`);
          return i[e];
        })
      );
    },
    c = (c, i) => {
      Promise.all(c.map(e)).then(e => i(1 === e.length ? e[0] : e));
    },
    i = { require: Promise.resolve(c) };
  self.define = (c, f, n) => {
    i[c] ||
      (i[c] = Promise.resolve().then(() => {
        let i = {};
        const s = { uri: location.origin + c.slice(1) };
        return Promise.all(
          f.map(c => {
            switch (c) {
              case "exports":
                return i;
              case "module":
                return s;
              default:
                return e(c);
            }
          })
        ).then(e => {
          const c = n(...e);
          return i.default || (i.default = c), i;
        });
      }));
  };
}
define("./service-worker.js", ["./workbox-e170c028"], function(e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "movie-pwa" }),
    self.addEventListener("message", e => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.precacheAndRoute(
      [
        {
          url: "css/app.ae7ab663.css",
          revision: "69d4509b4a93f63fa61bfdd0bd723cad"
        },
        {
          url: "css/vendor.6996375d.css",
          revision: "aa94ade6f4998bac283b5ebe0dfc65cc"
        },
        { url: "favicon.ico", revision: "8b9eb314ff597f6f7c7bf8c7a5f717ec" },
        {
          url: "fonts/Eva-Icons.2f2b9626.woff",
          revision: "a5ee087912cbedb6022426ea0b41f8bd"
        },
        {
          url: "fonts/Eva-Icons.ac165c67.woff2",
          revision: "cae252678f70ff0200acde68a6e74640"
        },
        {
          url: "fonts/KFOkCnqEu92Fr1MmgVxIIzQ.a45108d3.woff",
          revision: "5cb7edfceb233100075dc9a1e12e8da3"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmEU9fBBc-.cea99d3e.woff",
          revision: "87284894879f5b1c229cb49c8ff6decc"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmSU5fBBc-.865f928c.woff",
          revision: "b00849e00f4c2331cddd8ffb44a6720b"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmWUlfBBc-.2267169e.woff",
          revision: "adcde98f1d584de52060ad7b16373da3"
        },
        {
          url: "fonts/KFOlCnqEu92Fr1MmYUtfBBc-.bac8362e.woff",
          revision: "bb1e4dc6333675d11ada2e857e7f95d7"
        },
        {
          url: "fonts/KFOmCnqEu92Fr1Mu4mxM.49ae34d4.woff",
          revision: "60fa3c0614b8fb2f394fa29944c21540"
        },
        {
          url: "fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.3a3e0eb8.woff",
          revision: "2cfd66c1c5370b239746ff14c6d07e73"
        },
        {
          url: "fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.404ad2ff.woff2",
          revision: "61bc143dec7039dd6aac95721ddc4522"
        },
        {
          url: "icons/apple-icon-120x120.png",
          revision: "c9920835d2adb9f6ab6a79a27f220a3a"
        },
        {
          url: "icons/apple-icon-152x152.png",
          revision: "9df9e65a1d2c6df3bd9143666b0e8c63"
        },
        {
          url: "icons/apple-icon-167x167.png",
          revision: "4300c6c136c06abcd781aa18644dd7a3"
        },
        {
          url: "icons/apple-icon-180x180.png",
          revision: "88dbf3d9e8269f1298486d103e22a57c"
        },
        {
          url: "icons/favicon-128x128.png",
          revision: "1be07e62226c8f6a7086f132d9be1642"
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "df5ff7f4728c4ef4b951d46b4136906f"
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "64aa9e88dd6545f64226c1e2230f66cc"
        },
        {
          url: "icons/favicon-96x96.png",
          revision: "d22664397060743b24e8956a5a3fcdec"
        },
        {
          url: "icons/icon-128x128.png",
          revision: "1be07e62226c8f6a7086f132d9be1642"
        },
        {
          url: "icons/icon-192x192.png",
          revision: "a1b423855a450ae7adbd9d2a782e0dfb"
        },
        {
          url: "icons/icon-256x256.png",
          revision: "9f33ebc999e51d0dc2975fc573d53a0b"
        },
        {
          url: "icons/icon-384x384.png",
          revision: "a126be0d50ed682c3129e0b8b31f680a"
        },
        {
          url: "icons/icon-512x512.png",
          revision: "02abd24e7c8638e848d96a6bf78d2c27"
        },
        {
          url: "icons/ms-icon-144x144.png",
          revision: "f256ec55be616f32ae486ab7571eb936"
        },
        {
          url: "icons/safari-pinned-tab.svg",
          revision: "de8107bed7f087fb443d8e36855e7467"
        },
        {
          url: "img/movies.9df5c7f5.jpg",
          revision: "864ca3f71d604c20514c339048102476"
        },
        { url: "index.html", revision: "02d3dcae35756f49b41a051ccd08a85d" },
        {
          url: "js/1.4199bbf8.js",
          revision: "d0cd1b77fe43c5fcfd9b23d21b2aa892"
        },
        {
          url: "js/3.897911e7.js",
          revision: "886b1ea5e0c4976a40b19708739be8a3"
        },
        {
          url: "js/4.ad0abe16.js",
          revision: "35bfa4d6842b4e4f7088cf8a4859e42d"
        },
        {
          url: "js/5.74d4c3bc.js",
          revision: "41c40a6c282149c3d1d05d8710d09cba"
        },
        {
          url: "js/6.de879b5a.js",
          revision: "f0aa127e1a412e09d3c935eb041fc5f5"
        },
        {
          url: "js/app.4c4ad352.js",
          revision: "1b8b09fd5770b780e8f6e24b3eee59d6"
        },
        {
          url: "js/vendor.511ebda2.js",
          revision: "ff2da15af3f34db2bf5a233297d11095"
        },
        { url: "manifest.json", revision: "0639b7c6701a21a16382385de9427c6a" }
      ],
      {}
    ),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        denylist: [/service-worker\.js$/, /workbox-(.)*\.js$/]
      })
    );
});
