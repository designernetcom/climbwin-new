const __vite__mapDeps = (
  i,
  m = __vite__mapDeps,
  d = m.f ||
    (m.f = [
      "assets/Home-C7lD9O37.js",
      "assets/react-vendor-BZcqWdPG.js",
      "assets/pagination-1w_B3QKn.js",
      "assets/swiper-vendor-DGdr-aSd.js",
      "assets/pagination-B_l4pjL9.css",
      "assets/productService-aSLDQqiR.js",
      "assets/flashSaleService-rXKy4naG.js",
      "assets/ProductCard-Lf-TtJpt.js",
      "assets/notification-vendor-Cj8kC4VE.js",
      "assets/imageHelper-CkcXDVYQ.js",
      "assets/ShimmerProductCard-BA6tv_pV.js",
      "assets/utils-vendor-Dos3PyFQ.js",
      "assets/ui-vendor-C4r8PJBx.js",
      "assets/Products-CEjjgkTk.js",
      "assets/RentProducts-BzD_dcvR.js",
      "assets/BuyProducts-B56q_vSo.js",
      "assets/ProductDetail-LGlrovFv.js",
      "assets/Cart-CljGip_j.js",
      "assets/CheckoutNew-WRhLQF_a.js",
      "assets/Login-C8N1NSMj.js",
      "assets/Register-7EalCsag.js",
      "assets/Dashboard-CMjEis8n.js",
      "assets/Profile-DUNiIVrs.js",
      "assets/Orders-dj1HqMBb.js",
      "assets/OrderDetail-BlhDg1f-.js",
      "assets/Addresses-D-7Ev__f.js",
      "assets/Wishlist-DgurBus-.js",
      "assets/About-BsVr_m1u.js",
      "assets/settingService-BB9Chdtw.js",
      "assets/Contact-BHgHCfkg.js",
      "assets/PaymentSuccess-DHxJIozj.js",
      "assets/PayPalPayment-DkSb63Vt.js",
      "assets/StripePayment-ChJLtFGY.js",
      "assets/VendorProducts-BWfIjpJY.js",
      "assets/Blog-zdEJYfIc.js",
      "assets/blogService-BiyAbuMY.js",
      "assets/BlogDetail-BjFJA96r.js",
      "assets/FlashSale-BpVu3PGl.js",
      "assets/Terms-4PREZ94a.js",
      "assets/HowItWorks-9VrsyKt0.js",
      "assets/Transactions-Dr0g4-bf.js",
      "assets/ApiTest-DGePQRa3.js",
    ]),
) => i.map((i) => d[i]);
var e = Object.defineProperty,
  t = (t, r, a) =>
    ((t, r, a) =>
      r in t
        ? e(t, r, { enumerable: !0, configurable: !0, writable: !0, value: a })
        : (t[r] = a))(t, "symbol" != typeof r ? r + "" : r, a);
import {
  a as r,
  u as a,
  L as n,
  O as s,
  N as o,
  b as i,
  c as l,
  R as c,
  B as d,
} from "./react-vendor-BZcqWdPG.js";
import { Q as u, c as p, k as h } from "./notification-vendor-Cj8kC4VE.js";
import { a as f } from "./utils-vendor-Dos3PyFQ.js";
import { G as m } from "./ui-vendor-C4r8PJBx.js";
!(function () {
  const e = document.createElement("link").relList;
  if (!(e && e.supports && e.supports("modulepreload"))) {
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
      t(e);
    new MutationObserver((e) => {
      for (const r of e)
        if ("childList" === r.type)
          for (const e of r.addedNodes)
            "LINK" === e.tagName && "modulepreload" === e.rel && t(e);
    }).observe(document, { childList: !0, subtree: !0 });
  }
  function t(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = (function (e) {
      const t = {};
      return (
        e.integrity && (t.integrity = e.integrity),
        e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
        "use-credentials" === e.crossOrigin
          ? (t.credentials = "include")
          : "anonymous" === e.crossOrigin
            ? (t.credentials = "omit")
            : (t.credentials = "same-origin"),
        t
      );
    })(e);
    fetch(e.href, t);
  }
})();
var x = { exports: {} },
  g = {},
  y = r,
  v = Symbol.for("react.element"),
  j = Symbol.for("react.fragment"),
  w = Object.prototype.hasOwnProperty,
  b = y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  k = { key: !0, ref: !0, __self: !0, __source: !0 };
function _(e, t, r) {
  var a,
    n = {},
    s = null,
    o = null;
  for (a in (void 0 !== r && (s = "" + r),
  void 0 !== t.key && (s = "" + t.key),
  void 0 !== t.ref && (o = t.ref),
  t))
    w.call(t, a) && !k.hasOwnProperty(a) && (n[a] = t[a]);
  if (e && e.defaultProps)
    for (a in (t = e.defaultProps)) void 0 === n[a] && (n[a] = t[a]);
  return { $$typeof: v, type: e, key: s, ref: o, props: n, _owner: b.current };
}
((g.Fragment = j), (g.jsx = _), (g.jsxs = _), (x.exports = g));
var N = x.exports,
  C = { exports: {} },
  L = {},
  S = r;
var E =
    "function" == typeof Object.is
      ? Object.is
      : function (e, t) {
          return (e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t);
        },
  P = S.useSyncExternalStore,
  O = S.useRef,
  W = S.useEffect,
  A = S.useMemo,
  I = S.useDebugValue;
((L.useSyncExternalStoreWithSelector = function (e, t, r, a, n) {
  var s = O(null);
  if (null === s.current) {
    var o = { hasValue: !1, value: null };
    s.current = o;
  } else o = s.current;
  s = A(
    function () {
      function e(e) {
        if (!l) {
          if (((l = !0), (s = e), (e = a(e)), void 0 !== n && o.hasValue)) {
            var t = o.value;
            if (n(t, e)) return (i = t);
          }
          return (i = e);
        }
        if (((t = i), E(s, e))) return t;
        var r = a(e);
        return void 0 !== n && n(t, r) ? ((s = e), t) : ((s = e), (i = r));
      }
      var s,
        i,
        l = !1,
        c = void 0 === r ? null : r;
      return [
        function () {
          return e(t());
        },
        null === c
          ? void 0
          : function () {
              return e(c());
            },
      ];
    },
    [t, r, a, n],
  );
  var i = P(e, s[0], s[1]);
  return (
    W(
      function () {
        ((o.hasValue = !0), (o.value = i));
      },
      [i],
    ),
    I(i),
    i
  );
}),
  (C.exports = L));
var R = C.exports;
var z = { notify() {}, get: () => [] };
var B = (() =>
    !(
      "undefined" == typeof window ||
      void 0 === window.document ||
      void 0 === window.document.createElement
    ))(),
  M = (() =>
    "undefined" != typeof navigator && "ReactNative" === navigator.product)(),
  T = (() => (B || M ? r.useLayoutEffect : r.useEffect))(),
  V = Symbol.for("react-redux-context"),
  D = "undefined" != typeof globalThis ? globalThis : {};
function F() {
  if (!r.createContext) return {};
  const e = D[V] ?? (D[V] = new Map());
  let t = e.get(r.createContext);
  return (t || ((t = r.createContext(null)), e.set(r.createContext, t)), t);
}
var q = F();
var $ = function (e) {
  const { children: t, context: a, serverState: n, store: s } = e,
    o = r.useMemo(() => {
      const e = (function (e) {
        let t,
          r = z,
          a = 0,
          n = !1;
        function s() {
          l.onStateChange && l.onStateChange();
        }
        function o() {
          (a++,
            t ||
              ((t = e.subscribe(s)),
              (r = (function () {
                let e = null,
                  t = null;
                return {
                  clear() {
                    ((e = null), (t = null));
                  },
                  notify() {
                    (() => {
                      let t = e;
                      for (; t; ) (t.callback(), (t = t.next));
                    })();
                  },
                  get() {
                    const t = [];
                    let r = e;
                    for (; r; ) (t.push(r), (r = r.next));
                    return t;
                  },
                  subscribe(r) {
                    let a = !0;
                    const n = (t = { callback: r, next: null, prev: t });
                    return (
                      n.prev ? (n.prev.next = n) : (e = n),
                      function () {
                        a &&
                          null !== e &&
                          ((a = !1),
                          n.next ? (n.next.prev = n.prev) : (t = n.prev),
                          n.prev ? (n.prev.next = n.next) : (e = n.next));
                      }
                    );
                  },
                };
              })())));
        }
        function i() {
          (a--, t && 0 === a && (t(), (t = void 0), r.clear(), (r = z)));
        }
        const l = {
          addNestedSub: function (e) {
            o();
            const t = r.subscribe(e);
            let a = !1;
            return () => {
              a || ((a = !0), t(), i());
            };
          },
          notifyNestedSubs: function () {
            r.notify();
          },
          handleChangeWrapper: s,
          isSubscribed: function () {
            return n;
          },
          trySubscribe: function () {
            n || ((n = !0), o());
          },
          tryUnsubscribe: function () {
            n && ((n = !1), i());
          },
          getListeners: () => r,
        };
        return l;
      })(s);
      return {
        store: s,
        subscription: e,
        getServerState: n ? () => n : void 0,
      };
    }, [s, n]),
    i = r.useMemo(() => s.getState(), [s]);
  T(() => {
    const { subscription: e } = o;
    return (
      (e.onStateChange = e.notifyNestedSubs),
      e.trySubscribe(),
      i !== s.getState() && e.notifyNestedSubs(),
      () => {
        (e.tryUnsubscribe(), (e.onStateChange = void 0));
      }
    );
  }, [o, i]);
  const l = a || q;
  return r.createElement(l.Provider, { value: o }, t);
};
function H(e = q) {
  return function () {
    return r.useContext(e);
  };
}
var U = H();
function G(e = q) {
  const t = e === q ? U : H(e),
    r = () => {
      const { store: e } = t();
      return e;
    };
  return (Object.assign(r, { withTypes: () => r }), r);
}
var K = G();
function J(e = q) {
  const t = e === q ? K : G(e),
    r = () => t().dispatch;
  return (Object.assign(r, { withTypes: () => r }), r);
}
var X = J(),
  Y = (e, t) => e === t;
function Q(e = q) {
  const t = e === q ? U : H(e),
    a = (e, a = {}) => {
      const { equalityFn: n = Y } =
          "function" == typeof a ? { equalityFn: a } : a,
        s = t(),
        { store: o, subscription: i, getServerState: l } = s;
      r.useRef(!0);
      const c = r.useCallback({ [e.name]: (t) => e(t) }[e.name], [e]),
        d = R.useSyncExternalStoreWithSelector(
          i.addNestedSub,
          o.getState,
          l || o.getState,
          c,
          n,
        );
      return (r.useDebugValue(d), d);
    };
  return (Object.assign(a, { withTypes: () => a }), a);
}
var Z = Q();
const ee = {},
  te = function (e, t, r) {
    let a = Promise.resolve();
    if (t && t.length > 0) {
      document.getElementsByTagName("link");
      const e = document.querySelector("meta[property=csp-nonce]"),
        r =
          (null == e ? void 0 : e.nonce) ||
          (null == e ? void 0 : e.getAttribute("nonce"));
      a = Promise.allSettled(
        t.map((e) => {
          if (
            (e = (function (e) {
              return "/" + e;
            })(e)) in ee
          )
            return;
          ee[e] = !0;
          const t = e.endsWith(".css"),
            a = t ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${e}"]${a}`)) return;
          const n = document.createElement("link");
          return (
            (n.rel = t ? "stylesheet" : "modulepreload"),
            t || (n.as = "script"),
            (n.crossOrigin = ""),
            (n.href = e),
            r && n.setAttribute("nonce", r),
            document.head.appendChild(n),
            t
              ? new Promise((t, r) => {
                  (n.addEventListener("load", t),
                    n.addEventListener("error", () =>
                      r(new Error(`Unable to preload CSS for ${e}`)),
                    ));
                })
              : void 0
          );
        }),
      );
    }
    function n(e) {
      const t = new Event("vite:preloadError", { cancelable: !0 });
      if (((t.payload = e), window.dispatchEvent(t), !t.defaultPrevented))
        throw e;
    }
    return a.then((t) => {
      for (const e of t || []) "rejected" === e.status && n(e.reason);
      return e().catch(n);
    });
  };
function re(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var ae = (() =>
    ("function" == typeof Symbol && Symbol.observable) || "@@observable")(),
  ne = () => Math.random().toString(36).substring(7).split("").join("."),
  se = {
    INIT: `@@redux/INIT${ne()}`,
    REPLACE: `@@redux/REPLACE${ne()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${ne()}`,
  };
function oe(e) {
  if ("object" != typeof e || null === e) return !1;
  let t = e;
  for (; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || null === Object.getPrototypeOf(e);
}
function ie(e, t, r) {
  if ("function" != typeof e) throw new Error(re(2));
  if (
    ("function" == typeof t && "function" == typeof r) ||
    ("function" == typeof r && "function" == typeof arguments[3])
  )
    throw new Error(re(0));
  if (
    ("function" == typeof t && void 0 === r && ((r = t), (t = void 0)),
    void 0 !== r)
  ) {
    if ("function" != typeof r) throw new Error(re(1));
    return r(ie)(e, t);
  }
  let a = e,
    n = t,
    s = new Map(),
    o = s,
    i = 0,
    l = !1;
  function c() {
    o === s &&
      ((o = new Map()),
      s.forEach((e, t) => {
        o.set(t, e);
      }));
  }
  function d() {
    if (l) throw new Error(re(3));
    return n;
  }
  function u(e) {
    if ("function" != typeof e) throw new Error(re(4));
    if (l) throw new Error(re(5));
    let t = !0;
    c();
    const r = i++;
    return (
      o.set(r, e),
      function () {
        if (t) {
          if (l) throw new Error(re(6));
          ((t = !1), c(), o.delete(r), (s = null));
        }
      }
    );
  }
  function p(e) {
    if (!oe(e)) throw new Error(re(7));
    if (void 0 === e.type) throw new Error(re(8));
    if ("string" != typeof e.type) throw new Error(re(17));
    if (l) throw new Error(re(9));
    try {
      ((l = !0), (n = a(n, e)));
    } finally {
      l = !1;
    }
    return (
      (s = o).forEach((e) => {
        e();
      }),
      e
    );
  }
  p({ type: se.INIT });
  return {
    dispatch: p,
    subscribe: u,
    getState: d,
    replaceReducer: function (e) {
      if ("function" != typeof e) throw new Error(re(10));
      ((a = e), p({ type: se.REPLACE }));
    },
    [ae]: function () {
      const e = u;
      return {
        subscribe(t) {
          if ("object" != typeof t || null === t) throw new Error(re(11));
          function r() {
            const e = t;
            e.next && e.next(d());
          }
          r();
          return { unsubscribe: e(r) };
        },
        [ae]() {
          return this;
        },
      };
    },
  };
}
function le(e) {
  const t = Object.keys(e),
    r = {};
  for (let o = 0; o < t.length; o++) {
    const a = t[o];
    "function" == typeof e[a] && (r[a] = e[a]);
  }
  const a = Object.keys(r);
  let n;
  try {
    !(function (e) {
      Object.keys(e).forEach((t) => {
        const r = e[t];
        if (void 0 === r(void 0, { type: se.INIT })) throw new Error(re(12));
        if (void 0 === r(void 0, { type: se.PROBE_UNKNOWN_ACTION() }))
          throw new Error(re(13));
      });
    })(r);
  } catch (s) {
    n = s;
  }
  return function (e = {}, t) {
    if (n) throw n;
    let s = !1;
    const o = {};
    for (let n = 0; n < a.length; n++) {
      const i = a[n],
        l = r[i],
        c = e[i],
        d = l(c, t);
      if (void 0 === d) throw (t && t.type, new Error(re(14)));
      ((o[i] = d), (s = s || d !== c));
    }
    return ((s = s || a.length !== Object.keys(e).length), s ? o : e);
  };
}
function ce(...e) {
  return 0 === e.length
    ? (e) => e
    : 1 === e.length
      ? e[0]
      : e.reduce(
          (e, t) =>
            (...r) =>
              e(t(...r)),
        );
}
var de = Symbol.for("immer-nothing"),
  ue = Symbol.for("immer-draftable"),
  pe = Symbol.for("immer-state");
function he(e, ...t) {
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`,
  );
}
var fe = Object,
  me = fe.getPrototypeOf,
  xe = "constructor",
  ge = "prototype",
  ye = "configurable",
  ve = "enumerable",
  je = "writable",
  we = "value",
  be = (e) => !!e && !!e[pe];
function ke(e) {
  var t;
  return (
    !!e &&
    (Ce(e) ||
      We(e) ||
      !!e[ue] ||
      !!(null == (t = e[xe]) ? void 0 : t[ue]) ||
      Ae(e) ||
      Ie(e))
  );
}
var _e = fe[ge][xe].toString(),
  Ne = new WeakMap();
function Ce(e) {
  if (!e || !Re(e)) return !1;
  const t = me(e);
  if (null === t || t === fe[ge]) return !0;
  const r = fe.hasOwnProperty.call(t, xe) && t[xe];
  if (r === Object) return !0;
  if (!ze(r)) return !1;
  let a = Ne.get(r);
  return (
    void 0 === a && ((a = Function.toString.call(r)), Ne.set(r, a)),
    a === _e
  );
}
function Le(e, t, r = !0) {
  if (0 === Se(e)) {
    (r ? Reflect.ownKeys(e) : fe.keys(e)).forEach((r) => {
      t(r, e[r], e);
    });
  } else e.forEach((r, a) => t(a, r, e));
}
function Se(e) {
  const t = e[pe];
  return t ? t.type_ : We(e) ? 1 : Ae(e) ? 2 : Ie(e) ? 3 : 0;
}
var Ee = (e, t, r = Se(e)) =>
    2 === r ? e.has(t) : fe[ge].hasOwnProperty.call(e, t),
  Pe = (e, t, r = Se(e)) => (2 === r ? e.get(t) : e[t]),
  Oe = (e, t, r, a = Se(e)) => {
    2 === a ? e.set(t, r) : 3 === a ? e.add(r) : (e[t] = r);
  };
var We = Array.isArray,
  Ae = (e) => e instanceof Map,
  Ie = (e) => e instanceof Set,
  Re = (e) => "object" == typeof e,
  ze = (e) => "function" == typeof e,
  Be = (e) => "boolean" == typeof e,
  Me = (e) => e.copy_ || e.base_,
  Te = (e) => (e.modified_ ? e.copy_ : e.base_);
function Ve(e, t) {
  if (Ae(e)) return new Map(e);
  if (Ie(e)) return new Set(e);
  if (We(e)) return Array[ge].slice.call(e);
  const r = Ce(e);
  if (!0 === t || ("class_only" === t && !r)) {
    const t = fe.getOwnPropertyDescriptors(e);
    delete t[pe];
    let r = Reflect.ownKeys(t);
    for (let a = 0; a < r.length; a++) {
      const n = r[a],
        s = t[n];
      (!1 === s[je] && ((s[je] = !0), (s[ye] = !0)),
        (s.get || s.set) &&
          (t[n] = { [ye]: !0, [je]: !0, [ve]: s[ve], [we]: e[n] }));
    }
    return fe.create(me(e), t);
  }
  {
    const t = me(e);
    if (null !== t && r) return { ...e };
    const a = fe.create(t);
    return fe.assign(a, e);
  }
}
function De(e, t = !1) {
  return (
    qe(e) ||
      be(e) ||
      !ke(e) ||
      (Se(e) > 1 &&
        fe.defineProperties(e, { set: Fe, add: Fe, clear: Fe, delete: Fe }),
      fe.freeze(e),
      t &&
        Le(
          e,
          (e, t) => {
            De(t, !0);
          },
          !1,
        )),
    e
  );
}
var Fe = {
  [we]: function () {
    he(2);
  },
};
function qe(e) {
  return null === e || !Re(e) || fe.isFrozen(e);
}
var $e = "MapSet",
  He = "Patches",
  Ue = {};
function Ge(e) {
  const t = Ue[e];
  return (t || he(0), t);
}
var Ke,
  Je = () => Ke;
function Xe(e, t) {
  t &&
    ((e.patchPlugin_ = Ge(He)),
    (e.patches_ = []),
    (e.inversePatches_ = []),
    (e.patchListener_ = t));
}
function Ye(e) {
  (Qe(e), e.drafts_.forEach(et), (e.drafts_ = null));
}
function Qe(e) {
  e === Ke && (Ke = e.parent_);
}
var Ze = (e) => {
  return (Ke = {
    drafts_: [],
    parent_: Ke,
    immer_: e,
    canAutoFreeze_: !0,
    unfinalizedDrafts_: 0,
    handledSet_: new Set(),
    processedForPatches_: new Set(),
    mapSetPlugin_: ((t = $e), Ue[t] ? Ge($e) : void 0),
  });
  var t;
};
function et(e) {
  const t = e[pe];
  0 === t.type_ || 1 === t.type_ ? t.revoke_() : (t.revoked_ = !0);
}
function tt(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (void 0 !== e && e !== r) {
    (r[pe].modified_ && (Ye(t), he(4)), ke(e) && (e = rt(t, e)));
    const { patchPlugin_: a } = t;
    a && a.generateReplacementPatches_(r[pe].base_, e, t);
  } else e = rt(t, r);
  return (
    (function (e, t, r = !1) {
      !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && De(t, r);
    })(t, e, !0),
    Ye(t),
    t.patches_ && t.patchListener_(t.patches_, t.inversePatches_),
    e !== de ? e : void 0
  );
}
function rt(e, t) {
  if (qe(t)) return t;
  const r = t[pe];
  if (!r) {
    return lt(t, e.handledSet_, e);
  }
  if (!nt(r, e)) return t;
  if (!r.modified_) return r.base_;
  if (!r.finalized_) {
    const { callbacks_: t } = r;
    if (t)
      for (; t.length > 0; ) {
        t.pop()(e);
      }
    it(r, e);
  }
  return r.copy_;
}
function at(e) {
  ((e.finalized_ = !0), e.scope_.unfinalizedDrafts_--);
}
var nt = (e, t) => e.scope_ === t,
  st = [];
function ot(e, t, r, a) {
  const n = Me(e),
    s = e.type_;
  if (void 0 !== a) {
    if (Pe(n, a, s) === t) return void Oe(n, a, r, s);
  }
  if (!e.draftLocations_) {
    const t = (e.draftLocations_ = new Map());
    Le(n, (e, r) => {
      if (be(r)) {
        const a = t.get(r) || [];
        (a.push(e), t.set(r, a));
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? st;
  for (const i of o) Oe(n, i, r, s);
}
function it(e, t) {
  var r;
  if (
    e.modified_ &&
    !e.finalized_ &&
    (3 === e.type_ || ((null == (r = e.assigned_) ? void 0 : r.size) ?? 0) > 0)
  ) {
    const { patchPlugin_: r } = t;
    if (r) {
      const a = r.getPath(e);
      a && r.generatePatches_(e, a, t);
    }
    at(e);
  }
}
function lt(e, t, r) {
  return (
    (!r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1) ||
      be(e) ||
      t.has(e) ||
      !ke(e) ||
      qe(e) ||
      (t.add(e),
      Le(e, (a, n) => {
        if (be(n)) {
          const t = n[pe];
          if (nt(t, r)) {
            const r = Te(t);
            (Oe(e, a, r, e.type_), at(t));
          }
        } else ke(n) && lt(n, t, r);
      })),
    e
  );
}
var ct = {
    get(e, t) {
      if (t === pe) return e;
      const r = Me(e);
      if (!Ee(r, t, e.type_))
        return (function (e, t, r) {
          var a;
          const n = pt(t, r);
          return n
            ? we in n
              ? n[we]
              : null == (a = n.get)
                ? void 0
                : a.call(e.draft_)
            : void 0;
        })(e, r, t);
      const a = r[t];
      if (e.finalized_ || !ke(a)) return a;
      if (a === ut(e.base_, t)) {
        ft(e);
        const r = 1 === e.type_ ? +t : t,
          n = mt(e.scope_, a, e, r);
        return (e.copy_[r] = n);
      }
      return a;
    },
    has: (e, t) => t in Me(e),
    ownKeys: (e) => Reflect.ownKeys(Me(e)),
    set(e, t, r) {
      const a = pt(Me(e), t);
      if (null == a ? void 0 : a.set) return (a.set.call(e.draft_, r), !0);
      if (!e.modified_) {
        const a = ut(Me(e), t),
          o = null == a ? void 0 : a[pe];
        if (o && o.base_ === r)
          return ((e.copy_[t] = r), e.assigned_.set(t, !1), !0);
        if (
          ((n = r) === (s = a)
            ? 0 !== n || 1 / n == 1 / s
            : n != n && s != s) &&
          (void 0 !== r || Ee(e.base_, t, e.type_))
        )
          return !0;
        (ft(e), ht(e));
      }
      var n, s;
      return (
        (e.copy_[t] === r && (void 0 !== r || t in e.copy_)) ||
          (Number.isNaN(r) && Number.isNaN(e.copy_[t])) ||
          ((e.copy_[t] = r),
          e.assigned_.set(t, !0),
          (function (e, t, r) {
            const { scope_: a } = e;
            if (be(r)) {
              const n = r[pe];
              nt(n, a) &&
                n.callbacks_.push(function () {
                  ft(e);
                  const a = Te(n);
                  ot(e, r, a, t);
                });
            } else
              ke(r) &&
                e.callbacks_.push(function () {
                  const n = Me(e);
                  Pe(n, t, e.type_) === r &&
                    a.drafts_.length > 1 &&
                    !0 === (e.assigned_.get(t) ?? !1) &&
                    e.copy_ &&
                    lt(Pe(e.copy_, t, e.type_), a.handledSet_, a);
                });
          })(e, t, r)),
        !0
      );
    },
    deleteProperty: (e, t) => (
      ft(e),
      void 0 !== ut(e.base_, t) || t in e.base_
        ? (e.assigned_.set(t, !1), ht(e))
        : e.assigned_.delete(t),
      e.copy_ && delete e.copy_[t],
      !0
    ),
    getOwnPropertyDescriptor(e, t) {
      const r = Me(e),
        a = Reflect.getOwnPropertyDescriptor(r, t);
      return a
        ? {
            [je]: !0,
            [ye]: 1 !== e.type_ || "length" !== t,
            [ve]: a[ve],
            [we]: r[t],
          }
        : a;
    },
    defineProperty() {
      he(11);
    },
    getPrototypeOf: (e) => me(e.base_),
    setPrototypeOf() {
      he(12);
    },
  },
  dt = {};
function ut(e, t) {
  const r = e[pe];
  return (r ? Me(r) : e)[t];
}
function pt(e, t) {
  if (!(t in e)) return;
  let r = me(e);
  for (; r; ) {
    const e = Object.getOwnPropertyDescriptor(r, t);
    if (e) return e;
    r = me(r);
  }
}
function ht(e) {
  e.modified_ || ((e.modified_ = !0), e.parent_ && ht(e.parent_));
}
function ft(e) {
  e.copy_ ||
    ((e.assigned_ = new Map()),
    (e.copy_ = Ve(e.base_, e.scope_.immer_.useStrictShallowCopy_)));
}
(Le(ct, (e, t) => {
  dt[e] = function () {
    const e = arguments;
    return ((e[0] = e[0][0]), t.apply(this, e));
  };
}),
  (dt.deleteProperty = function (e, t) {
    return dt.set.call(this, e, t, void 0);
  }),
  (dt.set = function (e, t, r) {
    return ct.set.call(this, e[0], t, r, e[0]);
  }));
function mt(e, t, r, a) {
  const [n, s] = Ae(t)
    ? Ge($e).proxyMap_(t, r)
    : Ie(t)
      ? Ge($e).proxySet_(t, r)
      : (function (e, t) {
          const r = We(e),
            a = {
              type_: r ? 1 : 0,
              scope_: t ? t.scope_ : Je(),
              modified_: !1,
              finalized_: !1,
              assigned_: void 0,
              parent_: t,
              base_: e,
              draft_: null,
              copy_: null,
              revoke_: null,
              isManual_: !1,
              callbacks_: void 0,
            };
          let n = a,
            s = ct;
          r && ((n = [a]), (s = dt));
          const { revoke: o, proxy: i } = Proxy.revocable(n, s);
          return ((a.draft_ = i), (a.revoke_ = o), [i, a]);
        })(t, r);
  return (
    ((null == r ? void 0 : r.scope_) ?? Je()).drafts_.push(n),
    (s.callbacks_ = (null == r ? void 0 : r.callbacks_) ?? []),
    (s.key_ = a),
    r && void 0 !== a
      ? (function (e, t, r) {
          e.callbacks_.push(function (a) {
            var n;
            const s = t;
            if (!s || !nt(s, a)) return;
            null == (n = a.mapSetPlugin_) || n.fixSetContents(s);
            const o = Te(s);
            (ot(e, s.draft_ ?? s, o, r), it(s, a));
          });
        })(r, s, a)
      : s.callbacks_.push(function (e) {
          var t;
          null == (t = e.mapSetPlugin_) || t.fixSetContents(s);
          const { patchPlugin_: r } = e;
          s.modified_ && r && r.generatePatches_(s, [], e);
        }),
    n
  );
}
function xt(e) {
  if (!ke(e) || qe(e)) return e;
  const t = e[pe];
  let r,
    a = !0;
  if (t) {
    if (!t.modified_) return t.base_;
    ((t.finalized_ = !0),
      (r = Ve(e, t.scope_.immer_.useStrictShallowCopy_)),
      (a = t.scope_.immer_.shouldUseStrictIteration()));
  } else r = Ve(e, !0);
  return (
    Le(
      r,
      (e, t) => {
        Oe(r, e, xt(t));
      },
      a,
    ),
    t && (t.finalized_ = !1),
    r
  );
}
var gt = new (class {
  constructor(e) {
    ((this.autoFreeze_ = !0),
      (this.useStrictShallowCopy_ = !1),
      (this.useStrictIteration_ = !1),
      (this.produce = (e, t, r) => {
        if (ze(e) && !ze(t)) {
          const r = t;
          t = e;
          const a = this;
          return function (e = r, ...n) {
            return a.produce(e, (e) => t.call(this, e, ...n));
          };
        }
        let a;
        if ((ze(t) || he(6), void 0 === r || ze(r) || he(7), ke(e))) {
          const n = Ze(this),
            s = mt(n, e, void 0);
          let o = !0;
          try {
            ((a = t(s)), (o = !1));
          } finally {
            o ? Ye(n) : Qe(n);
          }
          return (Xe(n, r), tt(a, n));
        }
        if (!e || !Re(e)) {
          if (
            ((a = t(e)),
            void 0 === a && (a = e),
            a === de && (a = void 0),
            this.autoFreeze_ && De(a, !0),
            r)
          ) {
            const t = [],
              n = [];
            (Ge(He).generateReplacementPatches_(e, a, {
              patches_: t,
              inversePatches_: n,
            }),
              r(t, n));
          }
          return a;
        }
        he(1);
      }),
      (this.produceWithPatches = (e, t) => {
        if (ze(e))
          return (t, ...r) => this.produceWithPatches(t, (t) => e(t, ...r));
        let r, a;
        return [
          this.produce(e, t, (e, t) => {
            ((r = e), (a = t));
          }),
          r,
          a,
        ];
      }),
      Be(null == e ? void 0 : e.autoFreeze) && this.setAutoFreeze(e.autoFreeze),
      Be(null == e ? void 0 : e.useStrictShallowCopy) &&
        this.setUseStrictShallowCopy(e.useStrictShallowCopy),
      Be(null == e ? void 0 : e.useStrictIteration) &&
        this.setUseStrictIteration(e.useStrictIteration));
  }
  createDraft(e) {
    (ke(e) || he(8),
      be(e) &&
        (e = (function (e) {
          be(e) || he(10);
          return xt(e);
        })(e)));
    const t = Ze(this),
      r = mt(t, e, void 0);
    return ((r[pe].isManual_ = !0), Qe(t), r);
  }
  finishDraft(e, t) {
    const r = e && e[pe];
    (r && r.isManual_) || he(9);
    const { scope_: a } = r;
    return (Xe(a, t), tt(void 0, a));
  }
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const a = t[r];
      if (0 === a.path.length && "replace" === a.op) {
        e = a.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const a = Ge(He).applyPatches_;
    return be(e) ? a(e, t) : this.produce(e, (e) => a(e, t));
  }
})().produce;
function yt(e) {
  return ({ dispatch: t, getState: r }) =>
    (a) =>
    (n) =>
      "function" == typeof n ? n(t, r, e) : a(n);
}
var vt = yt(),
  jt = yt,
  wt =
    "undefined" != typeof window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : function () {
          if (0 !== arguments.length)
            return "object" == typeof arguments[0]
              ? ce
              : ce.apply(null, arguments);
        };
function bt(e, t) {
  function r(...r) {
    if (t) {
      let a = t(...r);
      if (!a) throw new Error(qt(0));
      return {
        type: e,
        payload: a.payload,
        ...("meta" in a && { meta: a.meta }),
        ...("error" in a && { error: a.error }),
      };
    }
    return { type: e, payload: r[0] };
  }
  return (
    (r.toString = () => `${e}`),
    (r.type = e),
    (r.match = (t) =>
      (function (e) {
        return oe(e) && "type" in e && "string" == typeof e.type;
      })(t) && t.type === e),
    r
  );
}
var kt = class e extends Array {
  constructor(...t) {
    (super(...t), Object.setPrototypeOf(this, e.prototype));
  }
  static get [Symbol.species]() {
    return e;
  }
  concat(...e) {
    return super.concat.apply(this, e);
  }
  prepend(...t) {
    return 1 === t.length && Array.isArray(t[0])
      ? new e(...t[0].concat(this))
      : new e(...t.concat(this));
  }
};
function _t(e) {
  return ke(e) ? gt(e, () => {}) : e;
}
function Nt(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
var Ct = (e) => (t) => {
    setTimeout(t, e);
  },
  Lt = (e) =>
    function (t) {
      const { autoBatch: r = !0 } = t ?? {};
      let a = new kt(e);
      return (
        r &&
          a.push(
            (
              (e = { type: "raf" }) =>
              (t) =>
              (...r) => {
                const a = t(...r);
                let n = !0,
                  s = !1,
                  o = !1;
                const i = new Set(),
                  l =
                    "tick" === e.type
                      ? queueMicrotask
                      : "raf" === e.type
                        ? "undefined" != typeof window &&
                          window.requestAnimationFrame
                          ? window.requestAnimationFrame
                          : Ct(10)
                        : "callback" === e.type
                          ? e.queueNotification
                          : Ct(e.timeout),
                  c = () => {
                    ((o = !1), s && ((s = !1), i.forEach((e) => e())));
                  };
                return Object.assign({}, a, {
                  subscribe(e) {
                    const t = a.subscribe(() => n && e());
                    return (
                      i.add(e),
                      () => {
                        (t(), i.delete(e));
                      }
                    );
                  },
                  dispatch(e) {
                    var t;
                    try {
                      return (
                        (n = !(null == (t = null == e ? void 0 : e.meta)
                          ? void 0
                          : t.RTK_autoBatch)),
                        (s = !n),
                        s && (o || ((o = !0), l(c))),
                        a.dispatch(e)
                      );
                    } finally {
                      n = !0;
                    }
                  },
                });
              }
            )("object" == typeof r ? r : void 0),
          ),
        a
      );
    };
function St(e) {
  const t = {},
    r = [];
  let a;
  const n = {
    addCase(e, r) {
      const a = "string" == typeof e ? e : e.type;
      if (!a) throw new Error(qt(28));
      if (a in t) throw new Error(qt(29));
      return ((t[a] = r), n);
    },
    addAsyncThunk: (e, a) => (
      a.pending && (t[e.pending.type] = a.pending),
      a.rejected && (t[e.rejected.type] = a.rejected),
      a.fulfilled && (t[e.fulfilled.type] = a.fulfilled),
      a.settled && r.push({ matcher: e.settled, reducer: a.settled }),
      n
    ),
    addMatcher: (e, t) => (r.push({ matcher: e, reducer: t }), n),
    addDefaultCase: (e) => ((a = e), n),
  };
  return (e(n), [t, r, a]);
}
function Et(...e) {
  return (t) =>
    e.some((e) =>
      ((e, t) => {
        return (r = e) && "function" == typeof r.match ? e.match(t) : e(t);
        var r;
      })(e, t),
    );
}
var Pt = ["name", "message", "stack", "code"],
  Ot = class {
    constructor(e, r) {
      (t(this, "_type"), (this.payload = e), (this.meta = r));
    }
  },
  Wt = class {
    constructor(e, r) {
      (t(this, "_type"), (this.payload = e), (this.meta = r));
    }
  },
  At = (e) => {
    if ("object" == typeof e && null !== e) {
      const t = {};
      for (const r of Pt) "string" == typeof e[r] && (t[r] = e[r]);
      return t;
    }
    return { message: String(e) };
  },
  It = "External signal was aborted",
  Rt = (() => {
    function e(e, t, r) {
      const a = bt(e + "/fulfilled", (e, t, r, a) => ({
          payload: e,
          meta: {
            ...(a || {}),
            arg: r,
            requestId: t,
            requestStatus: "fulfilled",
          },
        })),
        n = bt(e + "/pending", (e, t, r) => ({
          payload: void 0,
          meta: {
            ...(r || {}),
            arg: t,
            requestId: e,
            requestStatus: "pending",
          },
        })),
        s = bt(e + "/rejected", (e, t, a, n, s) => ({
          payload: n,
          error: ((r && r.serializeError) || At)(e || "Rejected"),
          meta: {
            ...(s || {}),
            arg: a,
            requestId: t,
            rejectedWithValue: !!n,
            requestStatus: "rejected",
            aborted: "AbortError" === (null == e ? void 0 : e.name),
            condition: "ConditionError" === (null == e ? void 0 : e.name),
          },
        }));
      return Object.assign(
        function (e, { signal: o } = {}) {
          return (i, l, c) => {
            const d = (null == r ? void 0 : r.idGenerator)
                ? r.idGenerator(e)
                : ((e = 21) => {
                    let t = "",
                      r = e;
                    for (; r--; )
                      t +=
                        "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW"[
                          (64 * Math.random()) | 0
                        ];
                    return t;
                  })(),
              u = new AbortController();
            let p, h;
            function f(e) {
              ((h = e), u.abort());
            }
            o &&
              (o.aborted
                ? f(It)
                : o.addEventListener("abort", () => f(It), { once: !0 }));
            const m = (async function () {
              var o, m;
              let x;
              try {
                let s =
                  null == (o = null == r ? void 0 : r.condition)
                    ? void 0
                    : o.call(r, e, { getState: l, extra: c });
                if (
                  (null !== (g = s) &&
                    "object" == typeof g &&
                    "function" == typeof g.then &&
                    (s = await s),
                  !1 === s || u.signal.aborted)
                )
                  throw {
                    name: "ConditionError",
                    message:
                      "Aborted due to condition callback returning false.",
                  };
                const y = new Promise((e, t) => {
                  ((p = () => {
                    t({ name: "AbortError", message: h || "Aborted" });
                  }),
                    u.signal.addEventListener("abort", p, { once: !0 }));
                });
                (i(
                  n(
                    d,
                    e,
                    null == (m = null == r ? void 0 : r.getPendingMeta)
                      ? void 0
                      : m.call(
                          r,
                          { requestId: d, arg: e },
                          { getState: l, extra: c },
                        ),
                  ),
                ),
                  (x = await Promise.race([
                    y,
                    Promise.resolve(
                      t(e, {
                        dispatch: i,
                        getState: l,
                        extra: c,
                        requestId: d,
                        signal: u.signal,
                        abort: f,
                        rejectWithValue: (e, t) => new Ot(e, t),
                        fulfillWithValue: (e, t) => new Wt(e, t),
                      }),
                    ).then((t) => {
                      if (t instanceof Ot) throw t;
                      return t instanceof Wt
                        ? a(t.payload, d, e, t.meta)
                        : a(t, d, e);
                    }),
                  ])));
              } catch (y) {
                x =
                  y instanceof Ot
                    ? s(null, d, e, y.payload, y.meta)
                    : s(y, d, e);
              } finally {
                p && u.signal.removeEventListener("abort", p);
              }
              var g;
              return (
                (r &&
                  !r.dispatchConditionRejection &&
                  s.match(x) &&
                  x.meta.condition) ||
                  i(x),
                x
              );
            })();
            return Object.assign(m, {
              abort: f,
              requestId: d,
              arg: e,
              unwrap: () => m.then(zt),
            });
          };
        },
        {
          pending: n,
          rejected: s,
          fulfilled: a,
          settled: Et(s, a),
          typePrefix: e,
        },
      );
    }
    return ((e.withTypes = () => e), e);
  })();
function zt(e) {
  if (e.meta && e.meta.rejectedWithValue) throw e.payload;
  if (e.error) throw e.error;
  return e.payload;
}
var Bt = Symbol.for("rtk-slice-createasyncthunk");
function Mt(e, t) {
  return `${e}/${t}`;
}
function Tt({ creators: e } = {}) {
  var t;
  const r = null == (t = null == e ? void 0 : e.asyncThunk) ? void 0 : t[Bt];
  return function (e) {
    const { name: t, reducerPath: a = t } = e;
    if (!t) throw new Error(qt(11));
    const n =
        ("function" == typeof e.reducers
          ? e.reducers(
              (function () {
                function e(e, t) {
                  return {
                    _reducerDefinitionType: "asyncThunk",
                    payloadCreator: e,
                    ...t,
                  };
                }
                return (
                  (e.withTypes = () => e),
                  {
                    reducer: (e) =>
                      Object.assign({ [e.name]: (...t) => e(...t) }[e.name], {
                        _reducerDefinitionType: "reducer",
                      }),
                    preparedReducer: (e, t) => ({
                      _reducerDefinitionType: "reducerWithPrepare",
                      prepare: e,
                      reducer: t,
                    }),
                    asyncThunk: e,
                  }
                );
              })(),
            )
          : e.reducers) || {},
      s = Object.keys(n),
      o = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: [],
      },
      i = {
        addCase(e, t) {
          const r = "string" == typeof e ? e : e.type;
          if (!r) throw new Error(qt(12));
          if (r in o.sliceCaseReducersByType) throw new Error(qt(13));
          return ((o.sliceCaseReducersByType[r] = t), i);
        },
        addMatcher: (e, t) => (
          o.sliceMatchers.push({ matcher: e, reducer: t }),
          i
        ),
        exposeAction: (e, t) => ((o.actionCreators[e] = t), i),
        exposeCaseReducer: (e, t) => ((o.sliceCaseReducersByName[e] = t), i),
      };
    function l() {
      const [t = {}, r = [], a] =
          "function" == typeof e.extraReducers
            ? St(e.extraReducers)
            : [e.extraReducers],
        n = { ...t, ...o.sliceCaseReducersByType };
      return (function (e, t) {
        let r,
          [a, n, s] = St(t);
        if ("function" == typeof e) r = () => _t(e());
        else {
          const t = _t(e);
          r = () => t;
        }
        function o(e = r(), t) {
          let o = [
            a[t.type],
            ...n.filter(({ matcher: e }) => e(t)).map(({ reducer: e }) => e),
          ];
          return (
            0 === o.filter((e) => !!e).length && (o = [s]),
            o.reduce((e, r) => {
              if (r) {
                if (be(e)) {
                  const a = r(e, t);
                  return void 0 === a ? e : a;
                }
                if (ke(e)) return gt(e, (e) => r(e, t));
                {
                  const a = r(e, t);
                  if (void 0 === a) {
                    if (null === e) return e;
                    throw Error(
                      "A case reducer on a non-draftable value must not return undefined",
                    );
                  }
                  return a;
                }
              }
              return e;
            }, e)
          );
        }
        return ((o.getInitialState = r), o);
      })(e.initialState, (e) => {
        for (let t in n) e.addCase(t, n[t]);
        for (let t of o.sliceMatchers) e.addMatcher(t.matcher, t.reducer);
        for (let t of r) e.addMatcher(t.matcher, t.reducer);
        a && e.addDefaultCase(a);
      });
    }
    s.forEach((a) => {
      const s = n[a],
        o = {
          reducerName: a,
          type: Mt(t, a),
          createNotation: "function" == typeof e.reducers,
        };
      !(function (e) {
        return "asyncThunk" === e._reducerDefinitionType;
      })(s)
        ? (function ({ type: e, reducerName: t, createNotation: r }, a, n) {
            let s, o;
            if ("reducer" in a) {
              if (
                r &&
                !(function (e) {
                  return "reducerWithPrepare" === e._reducerDefinitionType;
                })(a)
              )
                throw new Error(qt(17));
              ((s = a.reducer), (o = a.prepare));
            } else s = a;
            n.addCase(e, s)
              .exposeCaseReducer(t, s)
              .exposeAction(t, o ? bt(e, o) : bt(e));
          })(o, s, i)
        : (function ({ type: e, reducerName: t }, r, a, n) {
            if (!n) throw new Error(qt(18));
            const {
                payloadCreator: s,
                fulfilled: o,
                pending: i,
                rejected: l,
                settled: c,
                options: d,
              } = r,
              u = n(e, s, d);
            (a.exposeAction(t, u), o && a.addCase(u.fulfilled, o));
            i && a.addCase(u.pending, i);
            l && a.addCase(u.rejected, l);
            c && a.addMatcher(u.settled, c);
            a.exposeCaseReducer(t, {
              fulfilled: o || Ft,
              pending: i || Ft,
              rejected: l || Ft,
              settled: c || Ft,
            });
          })(o, s, i, r);
    });
    const c = (e) => e,
      d = new Map(),
      u = new WeakMap();
    let p;
    function h(e, t) {
      return (p || (p = l()), p(e, t));
    }
    function f() {
      return (p || (p = l()), p.getInitialState());
    }
    function m(t, r = !1) {
      function a(e) {
        let n = e[t];
        return (void 0 === n && r && (n = Nt(u, a, f)), n);
      }
      function n(t = c) {
        const a = Nt(d, r, () => new WeakMap());
        return Nt(a, t, () => {
          const a = {};
          for (const [n, s] of Object.entries(e.selectors ?? {}))
            a[n] = Vt(s, t, () => Nt(u, t, f), r);
          return a;
        });
      }
      return {
        reducerPath: t,
        getSelectors: n,
        get selectors() {
          return n(a);
        },
        selectSlice: a,
      };
    }
    const x = {
      name: t,
      reducer: h,
      actions: o.actionCreators,
      caseReducers: o.sliceCaseReducersByName,
      getInitialState: f,
      ...m(a),
      injectInto(e, { reducerPath: t, ...r } = {}) {
        const n = t ?? a;
        return (
          e.inject({ reducerPath: n, reducer: h }, r),
          { ...x, ...m(n, !0) }
        );
      },
    };
    return x;
  };
}
function Vt(e, t, r, a) {
  function n(n, ...s) {
    let o = t(n);
    return (void 0 === o && a && (o = r()), e(o, ...s));
  }
  return ((n.unwrapped = e), n);
}
var Dt = Tt();
function Ft() {}
function qt(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
const $t = f.create({
  baseURL: "https://climb.rentalgurufurniture.com/api/v1",
  timeout: 3e4,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});
($t.interceptors.request.use(
  (e) => {
    const t = localStorage.getItem("token");
    return (t && (e.headers.Authorization = `Bearer ${t}`), e);
  },
  (e) => Promise.reject(e),
),
  $t.interceptors.response.use(
    (e) => e,
    (e) => {
      var t;
      return (
        e.response || e.request,
        401 === (null == (t = e.response) ? void 0 : t.status) &&
          (localStorage.removeItem("token"),
          localStorage.removeItem("user"),
          (window.location.href = "/login")),
        Promise.reject(e)
      );
    },
  ));
const Ht = async (e) => (await $t.post("/register", e)).data,
  Ut = async (e) => {
    const t = await $t.post("/login", e);
    return (
      t.data.success &&
        (localStorage.setItem("token", t.data.data.token),
        localStorage.setItem("user", JSON.stringify(t.data.data.user))),
      t.data
    );
  },
  Gt = async () => {
    const e = await $t.post("/logout");
    return (
      localStorage.removeItem("token"),
      localStorage.removeItem("user"),
      e.data
    );
  },
  Kt = async () => (await $t.get("/user")).data,
  Jt = async () => (await $t.get("/cart")).data,
  Xt = async (e) => (await $t.post("/cart", e)).data,
  Yt = async (e, t) => (await $t.put(`/cart/${e}`, t)).data,
  Qt = async (e) => (await $t.delete(`/cart/${e}`)).data,
  Zt = async () => (await $t.delete("/cart")).data,
  er = async (e) =>
    (await $t.post("/cart/apply-coupon", { coupon_code: e })).data,
  tr = async () => (await $t.get("/wishlist")).data,
  rr = async (e) => (await $t.post("/wishlist", { product_id: e })).data,
  ar = async (e) => (await $t.delete(`/wishlist/${e}`)).data,
  nr = async (e) => (await $t.post("/wishlist/toggle", { product_id: e })).data,
  sr = async () => (await $t.delete("/wishlist")).data,
  or = {
    getOrders: async () => (await $t.get("/orders")).data,
    getOrder: async (e) => (await $t.get(`/orders/${e}`)).data,
    trackOrder: async (e) =>
      (await $t.post("/orders/track", { invoice_id: e })).data,
    getCheckoutData: async () => (await $t.get("/checkout-data")).data,
    createOrder: async (e) => (await $t.post("/orders", e)).data,
    cancelOrder: async (e) => (await $t.post(`/orders/${e}/cancel`)).data,
  },
  ir = {
    getProductReviews: async (e) =>
      (await $t.get(`/products/${e}/reviews`)).data,
    getUserReviews: async () => (await $t.get("/my-reviews")).data,
    createReview: async (e) => {
      if (e.images) {
        const t = new FormData();
        (t.append("product_id", e.product_id),
          t.append("rating", e.rating),
          t.append("review", e.review),
          e.images &&
            e.images.length > 0 &&
            e.images.forEach((e, r) => {
              t.append("images[]", e);
            }));
        return (
          await $t.post("/reviews", t, {
            headers: { "Content-Type": "multipart/form-data" },
          })
        ).data;
      }
      return (await $t.post("/reviews", e)).data;
    },
    updateReview: async (e, t) => (await $t.put(`/reviews/${e}`, t)).data,
    deleteReview: async (e) => (await $t.delete(`/reviews/${e}`)).data,
  },
  lr = {
    getProfile: async () => (await $t.get("/profile")).data,
    updateProfile: async (e) =>
      (
        await $t.post("/profile", e, {
          headers: { "Content-Type": "multipart/form-data" },
        })
      ).data,
    updatePassword: async (e) => (await $t.post("/profile/password", e)).data,
    getAddresses: async () => (await $t.get("/addresses")).data,
    createAddress: async (e) => (await $t.post("/addresses", e)).data,
    updateAddress: async (e, t) => (await $t.put(`/addresses/${e}`, t)).data,
    deleteAddress: async (e) => (await $t.delete(`/addresses/${e}`)).data,
  },
  cr = {
    getPaymentMethods: async () => (await $t.get("/payment-methods")).data,
    createStripeIntent: async (e) =>
      (await $t.post("/payment/stripe/intent", { order_id: e })).data,
    confirmStripePayment: async (e, t) =>
      (
        await $t.post("/payment/stripe/confirm", {
          order_id: e,
          payment_intent_id: t,
        })
      ).data,
    createPaypalOrder: async (e) =>
      (await $t.post("/payment/paypal/create", { order_id: e })).data,
    confirmPaypalPayment: async (e, t) =>
      (
        await $t.post("/payment/paypal/confirm", {
          order_id: e,
          paypal_order_id: t,
        })
      ).data,
    createRazorpayOrder: async (e) =>
      (await $t.post("/payment/razorpay/create", { order_id: e })).data,
    confirmRazorpayPayment: async (e, t, r, a) =>
      (
        await $t.post("/payment/razorpay/confirm", {
          order_id: e,
          razorpay_payment_id: t,
          razorpay_order_id: r,
          razorpay_signature: a,
        })
      ).data,
    confirmCodPayment: async (e) =>
      (await $t.post("/payment/cod/confirm", { order_id: e })).data,
  },
  dr = Rt("auth/checkAuth", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const e = localStorage.getItem("token"),
        t = localStorage.getItem("user");
      if (e && t) {
        const e = JSON.parse(t);
        try {
          const e = await Kt();
          if (e.success)
            return (
              localStorage.setItem("user", JSON.stringify(e.data)),
              e.data
            );
        } catch (n) {
          return e;
        }
        return e;
      }
      return null;
    } catch (n) {
      return t(
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Authentication failed",
      );
    }
  }),
  ur = Rt("auth/login", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const r = await Ut(e);
      return r.success
        ? (u.success("Login successful!"), r.data.user)
        : t("Login failed");
    } catch (n) {
      const e =
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Login failed";
      return (u.error(e), t(e));
    }
  }),
  pr = Rt("auth/register", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const r = await Ht(e);
      return r.success
        ? (localStorage.setItem("token", r.data.token),
          localStorage.setItem("user", JSON.stringify(r.data.user)),
          u.success("Registration successful!"),
          r.data.user)
        : t("Registration failed");
    } catch (n) {
      const e =
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Registration failed";
      return (u.error(e), t(e));
    }
  }),
  hr = Rt("auth/logout", async (e, { rejectWithValue: t }) => {
    try {
      return (await Gt(), u.info("Logged out successfully"), null);
    } catch (r) {
      return (u.info("Logged out successfully"), null);
    }
  }),
  fr = Dt({
    name: "auth",
    initialState: { user: null, loading: !1, isAuthenticated: !1, error: null },
    reducers: {
      updateUser: (e, t) => {
        ((e.user = t.payload),
          localStorage.setItem("user", JSON.stringify(t.payload)));
      },
      clearError: (e) => {
        e.error = null;
      },
    },
    extraReducers: (e) => {
      e.addCase(dr.pending, (e) => {
        e.loading = !0;
      })
        .addCase(dr.fulfilled, (e, t) => {
          ((e.loading = !1),
            (e.user = t.payload),
            (e.isAuthenticated = !!t.payload));
        })
        .addCase(dr.rejected, (e, t) => {
          ((e.loading = !1),
            (e.user = null),
            (e.isAuthenticated = !1),
            (e.error = t.payload));
        })
        .addCase(ur.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(ur.fulfilled, (e, t) => {
          ((e.loading = !1), (e.user = t.payload), (e.isAuthenticated = !0));
        })
        .addCase(ur.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(pr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(pr.fulfilled, (e, t) => {
          ((e.loading = !1), (e.user = t.payload), (e.isAuthenticated = !0));
        })
        .addCase(pr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(hr.pending, (e) => {
          e.loading = !0;
        })
        .addCase(hr.fulfilled, (e) => {
          ((e.loading = !1), (e.user = null), (e.isAuthenticated = !1));
        })
        .addCase(hr.rejected, (e) => {
          ((e.loading = !1), (e.user = null), (e.isAuthenticated = !1));
        });
    },
  }),
  { updateUser: mr, clearError: xr } = fr.actions,
  gr = fr.reducer,
  yr = Rt("cart/fetchCart", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const e = await Jt();
      return e.success ? e.data : t("Failed to fetch cart");
    } catch (n) {
      return t(
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Failed to fetch cart",
      );
    }
  }),
  vr = Rt("cart/addToCart", async (e, { dispatch: t, rejectWithValue: r }) => {
    var a, n;
    try {
      const a = await Xt(e);
      return a.success
        ? (u.success("Product added to cart!"), t(yr()), a.data)
        : r("Failed to add to cart");
    } catch (s) {
      const e =
        (null == (n = null == (a = s.response) ? void 0 : a.data)
          ? void 0
          : n.message) || "Failed to add to cart";
      return (u.error(e), r(e));
    }
  }),
  jr = Rt(
    "cart/updateCartItem",
    async ({ id: e, qty: t }, { dispatch: r, rejectWithValue: a }) => {
      var n, s;
      try {
        const n = await Yt(e, { qty: t });
        return n.success ? (r(yr()), n.data) : a("Failed to update cart");
      } catch (o) {
        const e =
          (null == (s = null == (n = o.response) ? void 0 : n.data)
            ? void 0
            : s.message) || "Failed to update cart";
        return (u.error(e), a(e));
      }
    },
  ),
  wr = Rt(
    "cart/removeCartItem",
    async (e, { dispatch: t, rejectWithValue: r }) => {
      var a, n;
      try {
        return (await Qt(e)).success
          ? (u.success("Item removed from cart"), t(yr()), e)
          : r("Failed to remove item");
      } catch (s) {
        return (
          u.error("Failed to remove item"),
          r(
            (null == (n = null == (a = s.response) ? void 0 : a.data)
              ? void 0
              : n.message) || "Failed to remove item",
          )
        );
      }
    },
  ),
  br = Rt("cart/clearCart", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      return (await Zt()).success
        ? (u.success("Cart cleared"), null)
        : t("Failed to clear cart");
    } catch (n) {
      return (
        u.error("Failed to clear cart"),
        t(
          (null == (a = null == (r = n.response) ? void 0 : r.data)
            ? void 0
            : a.message) || "Failed to clear cart",
        )
      );
    }
  }),
  kr = Rt("cart/applyCoupon", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const r = await er(e);
      return r.success
        ? (u.success("Coupon applied successfully!"), r.data)
        : t("Invalid coupon code");
    } catch (n) {
      const e =
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Invalid coupon code";
      return (u.error(e), t(e));
    }
  }),
  _r = Dt({
    name: "cart",
    initialState: {
      cart: { items: [], subtotal: 0, total: 0, item_count: 0 },
      loading: !1,
      error: null,
    },
    reducers: {
      clearError: (e) => {
        e.error = null;
      },
    },
    extraReducers: (e) => {
      e.addCase(yr.pending, (e) => {
        e.loading = !0;
      })
        .addCase(yr.fulfilled, (e, t) => {
          ((e.loading = !1), (e.cart = t.payload));
        })
        .addCase(yr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(vr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(vr.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(vr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(jr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(jr.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(jr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(wr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(wr.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(wr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(br.pending, (e) => {
          e.loading = !0;
        })
        .addCase(br.fulfilled, (e) => {
          ((e.loading = !1),
            (e.cart = { items: [], subtotal: 0, total: 0, item_count: 0 }));
        })
        .addCase(br.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(kr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(kr.fulfilled, (e, t) => {
          e.loading = !1;
        })
        .addCase(kr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        });
    },
  }),
  { clearError: Nr } = _r.actions,
  Cr = _r.reducer,
  Lr = Rt("wishlist/fetchWishlist", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      const e = await tr();
      return e.success ? e.data : t("Failed to fetch wishlist");
    } catch (n) {
      return t(
        (null == (a = null == (r = n.response) ? void 0 : r.data)
          ? void 0
          : a.message) || "Failed to fetch wishlist",
      );
    }
  }),
  Sr = Rt(
    "wishlist/addToWishlist",
    async (e, { dispatch: t, rejectWithValue: r }) => {
      var a, n;
      try {
        const a = await rr(e);
        return a.success
          ? (u.success("Added to wishlist!"), t(Lr()), a.data)
          : r("Failed to add to wishlist");
      } catch (s) {
        const e =
          (null == (n = null == (a = s.response) ? void 0 : a.data)
            ? void 0
            : n.message) || "Failed to add to wishlist";
        return (u.error(e), r(e));
      }
    },
  ),
  Er = Rt(
    "wishlist/removeFromWishlist",
    async (e, { dispatch: t, rejectWithValue: r }) => {
      var a, n;
      try {
        return (await ar(e)).success
          ? (u.success("Removed from wishlist"), t(Lr()), e)
          : r("Failed to remove from wishlist");
      } catch (s) {
        return (
          u.error("Failed to remove from wishlist"),
          r(
            (null == (n = null == (a = s.response) ? void 0 : a.data)
              ? void 0
              : n.message) || "Failed to remove from wishlist",
          )
        );
      }
    },
  ),
  Pr = Rt(
    "wishlist/toggleWishlist",
    async (e, { dispatch: t, rejectWithValue: r }) => {
      var a, n;
      try {
        const a = await nr(e);
        if (a.success) {
          const e =
            a.message ||
            (a.in_wishlist ? "Added to wishlist!" : "Removed from wishlist");
          return (u.success(e), t(Lr()), { inWishlist: a.in_wishlist });
        }
        return r("Failed to update wishlist");
      } catch (s) {
        const e =
          (null == (n = null == (a = s.response) ? void 0 : a.data)
            ? void 0
            : n.message) || "Failed to update wishlist";
        return (u.error(e), r(e));
      }
    },
  ),
  Or = Rt("wishlist/clearWishlist", async (e, { rejectWithValue: t }) => {
    var r, a;
    try {
      return (await sr()).success
        ? (u.success("Wishlist cleared"), null)
        : t("Failed to clear wishlist");
    } catch (n) {
      return (
        u.error("Failed to clear wishlist"),
        t(
          (null == (a = null == (r = n.response) ? void 0 : r.data)
            ? void 0
            : a.message) || "Failed to clear wishlist",
        )
      );
    }
  }),
  Wr = Dt({
    name: "wishlist",
    initialState: { wishlist: [], loading: !1, error: null },
    reducers: {
      clearError: (e) => {
        e.error = null;
      },
    },
    extraReducers: (e) => {
      e.addCase(Lr.pending, (e) => {
        e.loading = !0;
      })
        .addCase(Lr.fulfilled, (e, t) => {
          ((e.loading = !1), (e.wishlist = t.payload));
        })
        .addCase(Lr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(Sr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(Sr.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(Sr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(Er.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(Er.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(Er.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(Pr.pending, (e) => {
          ((e.loading = !0), (e.error = null));
        })
        .addCase(Pr.fulfilled, (e) => {
          e.loading = !1;
        })
        .addCase(Pr.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        })
        .addCase(Or.pending, (e) => {
          e.loading = !0;
        })
        .addCase(Or.fulfilled, (e) => {
          ((e.loading = !1), (e.wishlist = []));
        })
        .addCase(Or.rejected, (e, t) => {
          ((e.loading = !1), (e.error = t.payload));
        });
    },
  }),
  { clearError: Ar } = Wr.actions,
  Ir = Wr.reducer,
  Rr = () => {
    const e = X(),
      { user: t, loading: a, isAuthenticated: n, error: s } = Z((e) => e.auth);
    return {
      user: t,
      loading: a,
      isAuthenticated: n,
      error: s,
      login: r.useCallback(
        async (t) => {
          const r = await e(ur(t));
          return ur.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      register: r.useCallback(
        async (t) => {
          const r = await e(pr(t));
          return pr.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      logout: r.useCallback(async () => {
        await e(hr());
      }, [e]),
      updateUser: r.useCallback(
        (t) => {
          e(mr(t));
        },
        [e],
      ),
      checkAuth: r.useCallback(async () => {
        await e(dr());
      }, [e]),
    };
  },
  zr = () => {
    const e = X(),
      { cart: t, loading: a, error: n } = Z((e) => e.cart),
      s = r.useCallback(async () => {
        await e(yr());
      }, [e]),
      o = r.useCallback(
        async (t) => {
          const r = await e(vr(t));
          return vr.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      i = r.useCallback(
        async (t, r) => {
          const a = await e(jr({ id: t, qty: r }));
          return jr.fulfilled.match(a)
            ? { success: !0 }
            : { success: !1, message: a.payload };
        },
        [e],
      ),
      l = r.useCallback(
        async (t) => {
          const r = await e(wr(t));
          return wr.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      c = r.useCallback(async () => {
        const t = await e(br());
        return br.fulfilled.match(t)
          ? { success: !0 }
          : { success: !1, message: t.payload };
      }, [e]),
      d = r.useCallback(
        async (t) => {
          const r = await e(kr(t));
          return kr.fulfilled.match(r)
            ? { success: !0, data: r.payload }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      u = r.useCallback(
        (e, r = "buy") =>
          !(!t || !t.items || 0 === t.items.length) &&
          t.items.some((t) => {
            var a, n;
            const s =
                (null == (a = t.options) ? void 0 : a.product_id) ||
                t.product_id,
              o =
                (null == (n = t.options) ? void 0 : n.is_rental) ||
                t.is_rental ||
                !1;
            return "rent" === r ? s == e && o : s == e && !o;
          }),
        [t],
      );
    return {
      cart: t,
      loading: a,
      error: n,
      fetchCart: s,
      addToCart: o,
      updateCartItem: i,
      removeCartItem: l,
      clearCart: c,
      applyCoupon: d,
      isProductInCart: u,
    };
  },
  Br = () => {
    const e = X(),
      { wishlist: t, loading: a, error: n } = Z((e) => e.wishlist),
      s = r.useCallback(async () => {
        await e(Lr());
      }, [e]),
      o = r.useCallback(
        async (t) => {
          const r = await e(Sr(t));
          return Sr.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      i = r.useCallback(
        async (t) => {
          const r = await e(Er(t));
          return Er.fulfilled.match(r)
            ? { success: !0 }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      l = r.useCallback(
        async (t) => {
          const r = await e(Pr(t));
          return Pr.fulfilled.match(r)
            ? { success: !0, inWishlist: r.payload.inWishlist }
            : { success: !1, message: r.payload };
        },
        [e],
      ),
      c = r.useCallback(async () => {
        const t = await e(Or());
        return Or.fulfilled.match(t)
          ? { success: !0 }
          : { success: !1, message: t.payload };
      }, [e]),
      d = r.useCallback((e) => t.some((t) => t.product_id === e), [t]);
    return {
      wishlist: t,
      loading: a,
      error: n,
      fetchWishlist: s,
      addToWishlist: o,
      removeFromWishlist: i,
      toggleWishlist: l,
      clearWishlist: c,
      isInWishlist: d,
    };
  };
function Mr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "line", attr: { x1: "12", y1: "8", x2: "12", y2: "12" } },
      { tag: "line", attr: { x1: "12", y1: "16", x2: "12.01", y2: "16" } },
    ],
  })(e);
}
function Tr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "19", y1: "12", x2: "5", y2: "12" } },
      { tag: "polyline", attr: { points: "12 19 5 12 12 5" } },
    ],
  })(e);
}
function Vr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "8", r: "7" } },
      {
        tag: "polyline",
        attr: { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" },
      },
    ],
  })(e);
}
function Dr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" },
      },
    ],
  })(e);
}
function Fr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
        },
      },
      { tag: "polyline", attr: { points: "3.27 6.96 12 12.01 20.73 6.96" } },
      { tag: "line", attr: { x1: "12", y1: "22.08", x2: "12", y2: "12" } },
    ],
  })(e);
}
function qr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" },
      },
      { tag: "line", attr: { x1: "16", y1: "2", x2: "16", y2: "6" } },
      { tag: "line", attr: { x1: "8", y1: "2", x2: "8", y2: "6" } },
      { tag: "line", attr: { x1: "3", y1: "10", x2: "21", y2: "10" } },
    ],
  })(e);
}
function $r(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z",
        },
      },
      { tag: "circle", attr: { cx: "12", cy: "13", r: "4" } },
    ],
  })(e);
}
function Hr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M22 11.08V12a10 10 0 1 1-5.93-9.14" } },
      { tag: "polyline", attr: { points: "22 4 12 14.01 9 11.01" } },
    ],
  })(e);
}
function Ur(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [{ tag: "polyline", attr: { points: "20 6 9 17 4 12" } }],
  })(e);
}
function Gr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [{ tag: "polyline", attr: { points: "6 9 12 15 18 9" } }],
  })(e);
}
function Kr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [{ tag: "polyline", attr: { points: "15 18 9 12 15 6" } }],
  })(e);
}
function Jr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [{ tag: "polyline", attr: { points: "9 18 15 12 9 6" } }],
  })(e);
}
function Xr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [{ tag: "polyline", attr: { points: "18 15 12 9 6 15" } }],
  })(e);
}
function Yr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "polyline", attr: { points: "12 6 12 12 16 14" } },
    ],
  })(e);
}
function Qr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" },
      },
      {
        tag: "path",
        attr: { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" },
      },
    ],
  })(e);
}
function Zr(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "1", y: "4", width: "22", height: "16", rx: "2", ry: "2" },
      },
      { tag: "line", attr: { x1: "1", y1: "10", x2: "23", y2: "10" } },
    ],
  })(e);
}
function ea(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "12", y1: "1", x2: "12", y2: "23" } },
      {
        tag: "path",
        attr: { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" },
      },
    ],
  })(e);
}
function ta(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" } },
      { tag: "polyline", attr: { points: "7 10 12 15 17 10" } },
      { tag: "line", attr: { x1: "12", y1: "15", x2: "12", y2: "3" } },
    ],
  })(e);
}
function ra(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" },
      },
    ],
  })(e);
}
function aa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" },
      },
      { tag: "circle", attr: { cx: "12", cy: "12", r: "3" } },
    ],
  })(e);
}
function na(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
        },
      },
    ],
  })(e);
}
function sa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "polygon",
        attr: { points: "22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" },
      },
    ],
  })(e);
}
function oa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "rect", attr: { x: "3", y: "3", width: "7", height: "7" } },
      { tag: "rect", attr: { x: "14", y: "3", width: "7", height: "7" } },
      { tag: "rect", attr: { x: "14", y: "14", width: "7", height: "7" } },
      { tag: "rect", attr: { x: "3", y: "14", width: "7", height: "7" } },
    ],
  })(e);
}
function ia(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M3 18v-6a9 9 0 0 1 18 0v6" } },
      {
        tag: "path",
        attr: {
          d: "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z",
        },
      },
    ],
  })(e);
}
function la(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
        },
      },
    ],
  })(e);
}
function ca(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" },
      },
      { tag: "polyline", attr: { points: "9 22 9 12 15 12 15 22" } },
    ],
  })(e);
}
function da(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "line", attr: { x1: "12", y1: "16", x2: "12", y2: "12" } },
      { tag: "line", attr: { x1: "12", y1: "8", x2: "12.01", y2: "8" } },
    ],
  })(e);
}
function ua(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" },
      },
      {
        tag: "path",
        attr: { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" },
      },
      { tag: "line", attr: { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" } },
    ],
  })(e);
}
function pa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z",
        },
      },
      { tag: "rect", attr: { x: "2", y: "9", width: "4", height: "12" } },
      { tag: "circle", attr: { cx: "4", cy: "4", r: "2" } },
    ],
  })(e);
}
function ha(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "8", y1: "6", x2: "21", y2: "6" } },
      { tag: "line", attr: { x1: "8", y1: "12", x2: "21", y2: "12" } },
      { tag: "line", attr: { x1: "8", y1: "18", x2: "21", y2: "18" } },
      { tag: "line", attr: { x1: "3", y1: "6", x2: "3.01", y2: "6" } },
      { tag: "line", attr: { x1: "3", y1: "12", x2: "3.01", y2: "12" } },
      { tag: "line", attr: { x1: "3", y1: "18", x2: "3.01", y2: "18" } },
    ],
  })(e);
}
function fa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "rect",
        attr: { x: "3", y: "11", width: "18", height: "11", rx: "2", ry: "2" },
      },
      { tag: "path", attr: { d: "M7 11V7a5 5 0 0 1 10 0v4" } },
    ],
  })(e);
}
function ma(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" } },
      { tag: "polyline", attr: { points: "16 17 21 12 16 7" } },
      { tag: "line", attr: { x1: "21", y1: "12", x2: "9", y2: "12" } },
    ],
  })(e);
}
function xa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z",
        },
      },
      { tag: "polyline", attr: { points: "22,6 12,13 2,6" } },
    ],
  })(e);
}
function ga(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" },
      },
      { tag: "circle", attr: { cx: "12", cy: "10", r: "3" } },
    ],
  })(e);
}
function ya(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "15 3 21 3 21 9" } },
      { tag: "polyline", attr: { points: "9 21 3 21 3 15" } },
      { tag: "line", attr: { x1: "21", y1: "3", x2: "14", y2: "10" } },
      { tag: "line", attr: { x1: "3", y1: "21", x2: "10", y2: "14" } },
    ],
  })(e);
}
function va(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "3", y1: "12", x2: "21", y2: "12" } },
      { tag: "line", attr: { x1: "3", y1: "6", x2: "21", y2: "6" } },
      { tag: "line", attr: { x1: "3", y1: "18", x2: "21", y2: "18" } },
    ],
  })(e);
}
function ja(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "16.5", y1: "9.4", x2: "7.5", y2: "4.21" } },
      {
        tag: "path",
        attr: {
          d: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
        },
      },
      { tag: "polyline", attr: { points: "3.27 6.96 12 12.01 20.73 6.96" } },
      { tag: "line", attr: { x1: "12", y1: "22.08", x2: "12", y2: "12" } },
    ],
  })(e);
}
function wa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "19", y1: "5", x2: "5", y2: "19" } },
      { tag: "circle", attr: { cx: "6.5", cy: "6.5", r: "2.5" } },
      { tag: "circle", attr: { cx: "17.5", cy: "17.5", r: "2.5" } },
    ],
  })(e);
}
function ba(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
        },
      },
    ],
  })(e);
}
function ka(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "12", y1: "5", x2: "12", y2: "19" } },
      { tag: "line", attr: { x1: "5", y1: "12", x2: "19", y2: "12" } },
    ],
  })(e);
}
function _a(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "6 9 6 2 18 2 18 9" } },
      {
        tag: "path",
        attr: {
          d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
        },
      },
      { tag: "rect", attr: { x: "6", y: "14", width: "12", height: "8" } },
    ],
  })(e);
}
function Na(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "23 4 23 10 17 10" } },
      { tag: "polyline", attr: { points: "1 20 1 14 7 14" } },
      {
        tag: "path",
        attr: {
          d: "M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15",
        },
      },
    ],
  })(e);
}
function Ca(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "23 4 23 10 17 10" } },
      { tag: "path", attr: { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" } },
    ],
  })(e);
}
function La(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z",
        },
      },
      { tag: "polyline", attr: { points: "17 21 17 13 7 13 7 21" } },
      { tag: "polyline", attr: { points: "7 3 7 8 15 8" } },
    ],
  })(e);
}
function Sa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "11", cy: "11", r: "8" } },
      { tag: "line", attr: { x1: "21", y1: "21", x2: "16.65", y2: "16.65" } },
    ],
  })(e);
}
function Ea(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "22", y1: "2", x2: "11", y2: "13" } },
      { tag: "polygon", attr: { points: "22 2 15 22 11 13 2 9 22 2" } },
    ],
  })(e);
}
function Pa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "3" } },
      {
        tag: "path",
        attr: {
          d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
        },
      },
    ],
  })(e);
}
function Oa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "18", cy: "5", r: "3" } },
      { tag: "circle", attr: { cx: "6", cy: "12", r: "3" } },
      { tag: "circle", attr: { cx: "18", cy: "19", r: "3" } },
      {
        tag: "line",
        attr: { x1: "8.59", y1: "13.51", x2: "15.42", y2: "17.49" },
      },
      {
        tag: "line",
        attr: { x1: "15.41", y1: "6.51", x2: "8.59", y2: "10.49" },
      },
    ],
  })(e);
}
function Wa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
      },
    ],
  })(e);
}
function Aa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: { d: "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" },
      },
      { tag: "line", attr: { x1: "3", y1: "6", x2: "21", y2: "6" } },
      { tag: "path", attr: { d: "M16 10a4 4 0 0 1-8 0" } },
    ],
  })(e);
}
function Ia(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "9", cy: "21", r: "1" } },
      { tag: "circle", attr: { cx: "20", cy: "21", r: "1" } },
      {
        tag: "path",
        attr: {
          d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6",
        },
      },
    ],
  })(e);
}
function Ra(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "polygon",
        attr: {
          points:
            "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",
        },
      },
    ],
  })(e);
}
function za(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z",
        },
      },
      { tag: "line", attr: { x1: "7", y1: "7", x2: "7.01", y2: "7" } },
    ],
  })(e);
}
function Ba(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "3 6 5 6 21 6" } },
      {
        tag: "path",
        attr: {
          d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
        },
      },
      { tag: "line", attr: { x1: "10", y1: "11", x2: "10", y2: "17" } },
      { tag: "line", attr: { x1: "14", y1: "11", x2: "14", y2: "17" } },
    ],
  })(e);
}
function Ma(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polyline", attr: { points: "23 6 13.5 15.5 8.5 10.5 1 18" } },
      { tag: "polyline", attr: { points: "17 6 23 6 23 12" } },
    ],
  })(e);
}
function Ta(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "rect", attr: { x: "1", y: "3", width: "15", height: "13" } },
      { tag: "polygon", attr: { points: "16 8 20 8 23 11 23 16 16 16 16 8" } },
      { tag: "circle", attr: { cx: "5.5", cy: "18.5", r: "2.5" } },
      { tag: "circle", attr: { cx: "18.5", cy: "18.5", r: "2.5" } },
    ],
  })(e);
}
function Va(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "path",
        attr: {
          d: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
        },
      },
    ],
  })(e);
}
function Da(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" } },
      { tag: "polyline", attr: { points: "17 8 12 3 7 8" } },
      { tag: "line", attr: { x1: "12", y1: "3", x2: "12", y2: "15" } },
    ],
  })(e);
}
function Fa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "path", attr: { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" } },
      { tag: "circle", attr: { cx: "12", cy: "7", r: "4" } },
    ],
  })(e);
}
function qa(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "polygon", attr: { points: "23 7 16 12 23 17 23 7" } },
      {
        tag: "rect",
        attr: { x: "1", y: "5", width: "15", height: "14", rx: "2", ry: "2" },
      },
    ],
  })(e);
}
function $a(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "circle", attr: { cx: "12", cy: "12", r: "10" } },
      { tag: "line", attr: { x1: "15", y1: "9", x2: "9", y2: "15" } },
      { tag: "line", attr: { x1: "9", y1: "9", x2: "15", y2: "15" } },
    ],
  })(e);
}
function Ha(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      { tag: "line", attr: { x1: "18", y1: "6", x2: "6", y2: "18" } },
      { tag: "line", attr: { x1: "6", y1: "6", x2: "18", y2: "18" } },
    ],
  })(e);
}
function Ua(e) {
  return m({
    attr: {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    },
    child: [
      {
        tag: "polygon",
        attr: { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" },
      },
    ],
  })(e);
}
const Ga = [
    {
      id: 1,
      name: "Sport Equipment",
      slug: "sport-equipment",
      description: "Sport Equipment",
      icon: oa,
      color: "orange",
      hasSubcategories: !0,
      subcategories: [
        {
          id: 11,
          name: "Sport Goods",
          slug: "sport-goods",
          link: "/products?category=sport-equipment&subcategory=sport-goods",
          description: "Sport Goods",
        },
        {
          id: 12,
          name: "Goalpost and Pole",
          slug: "goalpost-pole",
          link: "/products?category=sport-equipment&subcategory=goalpost-pole",
          description: "Goalpost and Pole",
        },
        {
          id: 13,
          name: "Athletic Equipment",
          slug: "athletic-equipment",
          link: "/products?category=sport-equipment&subcategory=athletic-equipment",
          description: "Athletic Equipment",
        },
        {
          id: 14,
          name: "Gymnastics Apparatus",
          slug: "gymnastics-apparatus",
          link: "/products?category=sport-equipment&subcategory=gymnastics-apparatus",
          description: "Gymnastics Apparatus",
        },
      ],
    },
    {
      id: 2,
      name: "Fitness Equipment",
      slug: "fitness-equipment",
      description: "Fitness Equipment",
      icon: oa,
      color: "orange",
      hasSubcategories: !0,
      subcategories: [
        {
          id: 21,
          name: "Commercial Gym",
          slug: "commercial-gym",
          link: "/products?category=fitness-equipment&subcategory=commercial-gym",
          description: "Commercial Gym",
        },
        {
          id: 22,
          name: "Home Gym",
          slug: "home-gym",
          link: "/products?category=fitness-equipment&subcategory=home-gym",
          description: "Home Gym",
        },
      ],
    },
    {
      id: 3,
      name: "Sportswear",
      slug: "sportswear",
      link: "/products?category=sportswear",
      description: "Sportswear",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 4,
      name: "Sports Shoes",
      slug: "sports-shoes",
      link: "/products?category=sports-shoes",
      description: "Sports Shoes",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 5,
      name: "Open Gym Equipment",
      slug: "open-gym-equipment",
      link: "/products?category=open-gym-equipment",
      description: "Open Gym Equipment",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 6,
      name: "Sports Floorings",
      slug: "sports-floorings",
      link: "/products?category=sports-floorings",
      description: "Sports Floorings",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 7,
      name: "Playground Equipment",
      slug: "playground-equipment",
      link: "/products?category=playground-equipment",
      description: "Playground Equipment",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 8,
      name: "Adventure Equipment",
      slug: "adventure-equipment",
      link: "/products?category=adventure-equipment",
      description: "Adventure Equipment",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
    {
      id: 9,
      name: "Military Obstacle",
      slug: "military-obstacle",
      link: "/products?category=military-obstacle",
      description: "Military Obstacle",
      icon: ja,
      color: "purple",
      hasSubcategories: !1,
    },
  ],
  Ka = () => {
    var e;
    const { isAuthenticated: t, user: s, logout: o } = Rr(),
      { cart: i } = zr(),
      { wishlist: l } = Br(),
      c = a(),
      [d, u] = r.useState(!1),
      [p, h] = r.useState(""),
      [f, m] = r.useState(!1),
      [x, g] = r.useState(!1),
      [y, v] = r.useState(!1),
      [j, w] = r.useState(null),
      [b, k] = r.useState({}),
      _ = r.useRef(null),
      C = r.useRef(null);
    (r.useEffect(() => {
      const e = () => {
        m(window.scrollY > 20);
      };
      return (
        window.addEventListener("scroll", e),
        () => window.removeEventListener("scroll", e)
      );
    }, []),
      r.useEffect(() => {
        u(!1);
      }, [c]),
      r.useEffect(() => {
        const e = (e) => {
            (_.current && !_.current.contains(e.target) && (v(!1), w(null)),
              C.current && !C.current.contains(e.target) && g(!1));
          },
          t = (e) => {
            "Escape" === e.key && (v(!1), w(null), g(!1));
          };
        return (
          document.addEventListener("mousedown", e),
          document.addEventListener("keydown", t),
          () => {
            (document.removeEventListener("mousedown", e),
              document.removeEventListener("keydown", t));
          }
        );
      }, []));
    const L = (e) => {
        (e.preventDefault(), p.trim() && (c(`/products?search=${p}`), h("")));
      },
      S = () => {
        (o(), g(!1));
      },
      E = () => {
        if (!(null == s ? void 0 : s.name)) return "U";
        const e = s.name.split(" ");
        return e.length >= 2
          ? `${e[0][0]}${e[1][0]}`.toUpperCase()
          : s.name[0].toUpperCase();
      };
    return N.jsxs("header", {
      className:
        "sticky top-0 z-50 transition-all duration-300 bg-white border-b " +
        (f ? "shadow-md border-gray-200" : "border-gray-200"),
      children: [
        N.jsx("div", {
          className: "bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white",
          children: N.jsx("div", {
            className: "container-custom py-2",
            children: N.jsxs("div", {
              className: "flex items-center justify-between text-xs md:text-sm",
              children: [
                N.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    N.jsx("span", {
                      className: "hidden md:inline",
                      children: "📞 +91 9767552564",
                    }),
                    N.jsx("span", {
                      className: "hidden lg:inline",
                      children: "📧 info@climbwin.com",
                    }),
                  ],
                }),
                N.jsxs("div", {
                  className: "flex items-center gap-4",
                  children: [
                    N.jsx(n, {
                      to: "/flash-sale",
                      className:
                        "hover:text-[#fbbf24] transition-colors font-medium",
                      children: "🔥 Flash Sale",
                    }),
                    N.jsx(n, {
                      to: "/how-it-works",
                      className:
                        "hidden md:inline hover:text-[#fbbf24] transition-colors",
                      children: "How It Works",
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        N.jsxs("div", {
          className: "container-custom ",
          children: [
            N.jsxs("div", {
              className: "py-3 flex items-center justify-between gap-4",
              children: [
                N.jsx(n, {
                  to: "/",
                  className: "flex-shrink-0 group",
                  onClick: () => u(!1),
                  children: N.jsxs("div", {
                    className: "flex items-center gap-2 md:gap-3",
                    children: [
                      N.jsx("div", {
                        className: "relative h-10 md:h-20 w-auto",
                        children: N.jsx("img", {
                          src: "/cropped-CLIMBwin-Logo-1.png",
                          alt: "RentalGuru Logo",
                          className:
                            "h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300",
                          onError: (e) => {
                            e.target.style.display = "none";
                          },
                        }),
                      }),
                      N.jsxs("div", {
                        className: "hidden sm:flex flex-col leading-tight",
                        children: [
                          N.jsx("span", {
                            className:
                              "text-lg md:text-xl font-bold text-gray-900",
                            children: "CLIMB WIN",
                          }),
                          N.jsx("span", {
                            className: "text-[10px] text-gray-600 -mt-0.5",
                            children: "Conquer New Heights",
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
                N.jsx("form", {
                  onSubmit: L,
                  className: "hidden md:flex flex-1 max-w-2xl mx-4",
                  children: N.jsxs("div", {
                    className: "relative w-full",
                    children: [
                      N.jsx(Sa, {
                        className:
                          "absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400",
                      }),
                      N.jsx("input", {
                        type: "text",
                        placeholder: "Search for products...",
                        value: p,
                        onChange: (e) => h(e.target.value),
                        className:
                          "w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#0f463e] focus:ring-1 focus:ring-[#0f463e] placeholder:text-gray-400",
                      }),
                      N.jsx("button", {
                        type: "submit",
                        className:
                          "absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-[#fbbf24] hover:bg-[#f59e0b] text-gray-900 rounded font-medium text-sm transition-colors",
                        children: "Search",
                      }),
                    ],
                  }),
                }),
                N.jsxs("div", {
                  className: "flex items-center gap-2 md:gap-4",
                  children: [
                    N.jsxs("div", {
                      className: "relative",
                      ref: C,
                      children: [
                        N.jsxs("button", {
                          onClick: () => g(!x),
                          className:
                            "flex items-center gap-2 px-2 md:px-3 py-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900",
                          children: [
                            t && s
                              ? N.jsx("div", {
                                  className:
                                    "w-8 h-8 rounded-full bg-gradient-to-br from-[#0f463e] to-[#1a5f54] flex items-center justify-center text-white text-sm font-bold",
                                  children: E(),
                                })
                              : N.jsx(Fa, { className: "w-5 h-5" }),
                            N.jsx("span", {
                              className: "hidden lg:inline text-sm font-medium",
                              children: t
                                ? null == (e = null == s ? void 0 : s.name)
                                  ? void 0
                                  : e.split(" ")[0]
                                : "Sign In",
                            }),
                            N.jsx(Gr, {
                              className:
                                "w-4 h-4 transition-transform " +
                                (x ? "rotate-180" : ""),
                            }),
                          ],
                        }),
                        x &&
                          N.jsxs(N.Fragment, {
                            children: [
                              N.jsx("div", {
                                className: "fixed inset-0 z-40",
                                onClick: () => g(!1),
                              }),
                              N.jsx("div", {
                                className:
                                  "absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl z-50 overflow-hidden animate-slideDown border border-gray-100",
                                children: t
                                  ? N.jsxs(N.Fragment, {
                                      children: [
                                        N.jsx("div", {
                                          className:
                                            "bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white p-4",
                                          children: N.jsxs("div", {
                                            className:
                                              "flex items-center gap-3",
                                            children: [
                                              N.jsx("div", {
                                                className:
                                                  "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold",
                                                children: E(),
                                              }),
                                              N.jsxs("div", {
                                                children: [
                                                  N.jsx("p", {
                                                    className: "font-semibold",
                                                    children:
                                                      null == s
                                                        ? void 0
                                                        : s.name,
                                                  }),
                                                  N.jsx("p", {
                                                    className:
                                                      "text-sm text-white/80",
                                                    children:
                                                      null == s
                                                        ? void 0
                                                        : s.email,
                                                  }),
                                                ],
                                              }),
                                            ],
                                          }),
                                        }),
                                        N.jsxs("div", {
                                          className: "py-2",
                                          children: [
                                            N.jsxs(n, {
                                              to: "/dashboard",
                                              onClick: () => g(!1),
                                              className:
                                                "flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                                              children: [
                                                N.jsx(oa, {
                                                  className:
                                                    "w-5 h-5 text-gray-500",
                                                }),
                                                N.jsx("span", {
                                                  className: "text-gray-700",
                                                  children: "Dashboard",
                                                }),
                                              ],
                                            }),
                                            N.jsxs(n, {
                                              to: "/dashboard/profile",
                                              onClick: () => g(!1),
                                              className:
                                                "flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                                              children: [
                                                N.jsx(Pa, {
                                                  className:
                                                    "w-5 h-5 text-gray-500",
                                                }),
                                                N.jsx("span", {
                                                  className: "text-gray-700",
                                                  children: "Profile Settings",
                                                }),
                                              ],
                                            }),
                                            N.jsxs(n, {
                                              to: "/dashboard/orders",
                                              onClick: () => g(!1),
                                              className:
                                                "flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                                              children: [
                                                N.jsx(ja, {
                                                  className:
                                                    "w-5 h-5 text-gray-500",
                                                }),
                                                N.jsx("span", {
                                                  className: "text-black-700",
                                                  children: "My Orders",
                                                }),
                                              ],
                                            }),
                                            N.jsx("div", {
                                              className:
                                                "border-t border-gray-100 my-2",
                                            }),
                                            N.jsxs("button", {
                                              onClick: S,
                                              className:
                                                "flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-red-600 w-full",
                                              children: [
                                                N.jsx(ma, {
                                                  className: "w-5 h-5",
                                                }),
                                                N.jsx("span", {
                                                  children: "Logout",
                                                }),
                                              ],
                                            }),
                                          ],
                                        }),
                                      ],
                                    })
                                  : N.jsxs("div", {
                                      className: "py-2",
                                      children: [
                                        N.jsxs(n, {
                                          to: "/login",
                                          onClick: () => g(!1),
                                          className:
                                            "block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700",
                                          children: [
                                            N.jsx("span", {
                                              className: "font-semibold",
                                              children: "Login",
                                            }),
                                            N.jsx("p", {
                                              className:
                                                "text-sm text-gray-500",
                                              children: "Access your account",
                                            }),
                                          ],
                                        }),
                                        N.jsx("div", {
                                          className:
                                            "border-t border-gray-100 my-2",
                                        }),
                                        N.jsxs(n, {
                                          to: "/register",
                                          onClick: () => g(!1),
                                          className:
                                            "block px-4 py-3 hover:bg-gray-50 transition-colors text-gray-700",
                                          children: [
                                            N.jsx("span", {
                                              className: "font-semibold",
                                              children: "Register",
                                            }),
                                            N.jsx("p", {
                                              className:
                                                "text-sm text-gray-500",
                                              children: "Create new account",
                                            }),
                                          ],
                                        }),
                                      ],
                                    }),
                              }),
                            ],
                          }),
                      ],
                    }),
                    N.jsxs(n, {
                      to: "/wishlist",
                      className:
                        "relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900 flex flex-col items-center",
                      children: [
                        N.jsx(la, { className: "w-5 h-5" }),
                        l.length > 0 &&
                          N.jsx("span", {
                            className:
                              "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center",
                            children: l.length,
                          }),
                        N.jsx("span", {
                          className: "hidden lg:block text-xs mt-0.5",
                          children: "Wishlist",
                        }),
                      ],
                    }),
                    N.jsxs(n, {
                      to: "/cart",
                      className:
                        "relative p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900 flex flex-col items-center",
                      children: [
                        N.jsx(Ia, { className: "w-5 h-5" }),
                        i.item_count > 0 &&
                          N.jsx("span", {
                            className:
                              "absolute -top-1 -right-1 bg-[#fbbf24] text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center",
                            children: i.item_count,
                          }),
                        N.jsx("span", {
                          className: "hidden lg:block text-xs mt-0.5",
                          children: "Cart",
                        }),
                      ],
                    }),
                    N.jsx("button", {
                      onClick: () => u(!d),
                      className:
                        "md:hidden p-2 rounded-lg transition-all hover:bg-gray-100 text-gray-900",
                      children: d
                        ? N.jsx(Ha, { className: "w-6 h-6" })
                        : N.jsx(va, { className: "w-6 h-6" }),
                    }),
                  ],
                }),
              ],
            }),
            N.jsx("nav", {
              className: "hidden md:block border-t border-gray-200 py-3",
              children: N.jsxs("ul", {
                className: "flex items-center gap-8",
                children: [
                  N.jsx("li", {
                    children: N.jsxs(n, {
                      to: "/",
                      className:
                        "flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]",
                      children: [N.jsx(ca, { className: "w-4 h-4" }), "Home"],
                    }),
                  }),
                  N.jsxs("li", {
                    className: "relative",
                    ref: _,
                    onMouseEnter: () => v(!0),
                    onMouseLeave: () => {
                      (v(!1), w(null));
                    },
                    children: [
                      N.jsxs("button", {
                        className:
                          "flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]",
                        onClick: () => v(!y),
                        children: [
                          N.jsx(oa, { className: "w-4 h-4" }),
                          "Products",
                          N.jsx(Gr, {
                            className:
                              "w-4 h-4 transition-transform " +
                              (y ? "rotate-180" : ""),
                          }),
                        ],
                      }),
                      y &&
                        N.jsx("div", {
                          className:
                            "absolute left-0 top-full mt-2 bg-white rounded-2xl shadow-2xl p-6 w-64 z-50 animate-slideDown border border-gray-100",
                          children: Ga.map(
                            (e) => (
                              e.icon,
                              e.hasSubcategories && e.subcategories
                                ? N.jsxs(
                                    "div",
                                    {
                                      className: "relative",
                                      onMouseEnter: () => w(e.id),
                                      children: [
                                        N.jsxs("button", {
                                          className:
                                            "flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all group w-full mt-2 first:mt-0",
                                          children: [
                                            N.jsx("div", {
                                              className:
                                                "flex items-center gap-3",
                                              children: N.jsx("div", {
                                                className: "text-left",
                                                children: N.jsx("p", {
                                                  className:
                                                    "font-small font-semibold text-gray-900",
                                                  children: e.name,
                                                }),
                                              }),
                                            }),
                                            N.jsx(Jr, {
                                              className:
                                                "w-4 h-4 text-gray-400",
                                            }),
                                          ],
                                        }),
                                        j === e.id &&
                                          N.jsx("div", {
                                            className:
                                              "absolute left-full top-0 ml-2 bg-white rounded-2xl shadow-2xl p-4 w-56 z-50 animate-slideDown border border-gray-100",
                                            children: e.subcategories.map((e) =>
                                              N.jsx(
                                                n,
                                                {
                                                  to: e.link,
                                                  className:
                                                    "block p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all mt-2 first:mt-0",
                                                  children: N.jsx("p", {
                                                    className:
                                                      " font-small text-gray-900",
                                                    children: e.name,
                                                  }),
                                                },
                                                e.id,
                                              ),
                                            ),
                                          }),
                                      ],
                                    },
                                    e.id,
                                  )
                                : N.jsx(
                                    n,
                                    {
                                      to: e.link,
                                      className:
                                        "flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-[#0f463e]/10 hover:to-[#1a5f54]/10 transition-all group mt-2 first:mt-0",
                                      children: N.jsx("div", {
                                        children: N.jsx("p", {
                                          className:
                                            "font-semibold text-gray-900",
                                          children: e.name,
                                        }),
                                      }),
                                    },
                                    e.id,
                                  )
                            ),
                          ),
                        }),
                    ],
                  }),
                  N.jsx("li", {
                    children: N.jsxs(n, {
                      to: "/about",
                      className:
                        "flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]",
                      children: [N.jsx(da, { className: "w-4 h-4" }), "About"],
                    }),
                  }),
                  N.jsx("li", {
                    children: N.jsxs(n, {
                      to: "/contact",
                      className:
                        "flex items-center gap-2 text-sm font-medium transition-colors text-gray-900 hover:text-[#0f463e]",
                      children: [
                        N.jsx(ba, { className: "w-4 h-4" }),
                        "Contact",
                      ],
                    }),
                  }),
                ],
              }),
            }),
          ],
        }),
        d &&
          N.jsxs(N.Fragment, {
            children: [
              N.jsx("div", {
                className:
                  "fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fadeIn",
                onClick: () => u(!1),
              }),
              N.jsx("div", {
                className:
                  "fixed top-0 right-0 h-full w-80 max-w-full bg-white z-50 md:hidden shadow-2xl animate-slideInRight overflow-y-auto",
                children: N.jsxs("div", {
                  className: "p-6",
                  children: [
                    N.jsx("button", {
                      onClick: () => u(!1),
                      className:
                        "absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors",
                      children: N.jsx(Ha, {
                        className: "w-6 h-6 text-gray-600",
                      }),
                    }),
                    t && s
                      ? N.jsx("div", {
                          className:
                            "bg-gradient-to-r from-[#0f463e] to-[#1a5f54] text-white p-4 rounded-2xl mb-6",
                          children: N.jsxs("div", {
                            className: "flex items-center gap-3",
                            children: [
                              N.jsx("div", {
                                className:
                                  "w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg font-bold",
                                children: E(),
                              }),
                              N.jsxs("div", {
                                children: [
                                  N.jsx("p", {
                                    className: "font-semibold",
                                    children: null == s ? void 0 : s.name,
                                  }),
                                  N.jsx("p", {
                                    className: "text-sm text-white/80",
                                    children: null == s ? void 0 : s.email,
                                  }),
                                ],
                              }),
                            ],
                          }),
                        })
                      : N.jsxs("div", {
                          className: "flex gap-2 mb-6",
                          children: [
                            N.jsx(n, {
                              to: "/login",
                              onClick: () => u(!1),
                              className:
                                "flex-1 py-2 px-4 bg-[#0f463e] text-white rounded-xl text-center font-medium hover:bg-[#1a5f54] transition-colors",
                              children: "Login",
                            }),
                            N.jsx(n, {
                              to: "/register",
                              onClick: () => u(!1),
                              className:
                                "flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-xl text-center font-medium hover:bg-gray-300 transition-colors",
                              children: "Register",
                            }),
                          ],
                        }),
                    N.jsx("form", {
                      onSubmit: L,
                      className: "mb-6",
                      children: N.jsxs("div", {
                        className: "relative",
                        children: [
                          N.jsx("input", {
                            type: "text",
                            placeholder: "Search products...",
                            value: p,
                            onChange: (e) => h(e.target.value),
                            className:
                              "w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0f463e]/30",
                          }),
                          N.jsx("button", {
                            type: "submit",
                            className:
                              "absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#0f463e] text-white rounded-lg hover:bg-[#1a5f54] transition-colors",
                            children: N.jsx(Sa, { className: "w-5 h-5" }),
                          }),
                        ],
                      }),
                    }),
                    N.jsx("nav", {
                      children: N.jsxs("div", {
                        className: "space-y-2",
                        children: [
                          N.jsxs(n, {
                            to: "/",
                            onClick: () => u(!1),
                            className:
                              "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700",
                            children: [
                              N.jsx(ca, {
                                className: "w-5 h-5 text-[#0f463e]",
                              }),
                              N.jsx("span", {
                                className: "font-medium",
                                children: "Home",
                              }),
                            ],
                          }),
                          N.jsxs("div", {
                            className: "pt-2 pb-1",
                            children: [
                              N.jsx("p", {
                                className:
                                  "text-xs font-semibold text-gray-500 uppercase px-3 mb-2",
                                children: "Products",
                              }),
                              Ga.map((e) => {
                                const t = e.icon,
                                  r = (e) =>
                                    ({
                                      blue: "hover:bg-blue-50",
                                      purple: "hover:bg-purple-50",
                                      green: "hover:bg-green-50",
                                      orange: "hover:bg-orange-50",
                                      red: "hover:bg-red-50",
                                      indigo: "hover:bg-indigo-50",
                                    })[e] || "hover:bg-gray-50",
                                  a = {
                                    blue: "text-blue-600",
                                    purple: "text-purple-600",
                                    green: "text-green-600",
                                    orange: "text-orange-600",
                                    red: "text-red-600",
                                    indigo: "text-indigo-600",
                                  };
                                return e.hasSubcategories && e.subcategories
                                  ? N.jsxs(
                                      "div",
                                      {
                                        children: [
                                          N.jsxs("button", {
                                            onClick: () => {
                                              return (
                                                (t = e.id),
                                                void k((e) => ({
                                                  ...e,
                                                  [t]: !e[t],
                                                }))
                                              );
                                              var t;
                                            },
                                            className: `flex items-center justify-between gap-3 p-3 rounded-xl ${r(e.color)} transition-all text-gray-700 w-full`,
                                            children: [
                                              N.jsxs("div", {
                                                className:
                                                  "flex items-center gap-3",
                                                children: [
                                                  N.jsx(t, {
                                                    className: `w-5 h-5 ${a[e.color] || "text-gray-600"}`,
                                                  }),
                                                  N.jsx("span", {
                                                    className: "font-medium",
                                                    children: e.name,
                                                  }),
                                                ],
                                              }),
                                              N.jsx(Gr, {
                                                className:
                                                  "w-4 h-4 transition-transform " +
                                                  (b[e.id] ? "rotate-180" : ""),
                                              }),
                                            ],
                                          }),
                                          b[e.id] &&
                                            N.jsx("div", {
                                              className:
                                                "ml-8 mt-1 space-y-1 animate-slideDown",
                                              children: e.subcategories.map(
                                                (e) =>
                                                  N.jsx(
                                                    n,
                                                    {
                                                      to: e.link,
                                                      onClick: () => u(!1),
                                                      className:
                                                        "block p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600 text-sm",
                                                      children: e.name,
                                                    },
                                                    e.id,
                                                  ),
                                              ),
                                            }),
                                        ],
                                      },
                                      e.id,
                                    )
                                  : N.jsxs(
                                      n,
                                      {
                                        to: e.link,
                                        onClick: () => u(!1),
                                        className: `flex items-center gap-3 p-3 rounded-xl ${r(e.color)} transition-colors text-gray-700`,
                                        children: [
                                          N.jsx(t, {
                                            className: `w-5 h-5 ${a[e.color] || "text-gray-600"}`,
                                          }),
                                          N.jsx("span", {
                                            className: "font-medium",
                                            children: e.name,
                                          }),
                                        ],
                                      },
                                      e.id,
                                    );
                              }),
                            ],
                          }),
                          N.jsxs("div", {
                            className: "border-t border-gray-200 pt-2 mt-2",
                            children: [
                              N.jsxs(n, {
                                to: "/about",
                                onClick: () => u(!1),
                                className:
                                  "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700",
                                children: [
                                  N.jsx(da, {
                                    className: "w-5 h-5 text-[#0f463e]",
                                  }),
                                  N.jsx("span", {
                                    className: "font-medium",
                                    children: "About",
                                  }),
                                ],
                              }),
                              N.jsxs(n, {
                                to: "/contact",
                                onClick: () => u(!1),
                                className:
                                  "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700",
                                children: [
                                  N.jsx(ba, {
                                    className: "w-5 h-5 text-[#0f463e]",
                                  }),
                                  N.jsx("span", {
                                    className: "font-medium",
                                    children: "Contact",
                                  }),
                                ],
                              }),
                            ],
                          }),
                          t &&
                            N.jsx(N.Fragment, {
                              children: N.jsxs("div", {
                                className: "border-t border-gray-200 pt-2 mt-2",
                                children: [
                                  N.jsx("p", {
                                    className:
                                      "text-xs font-semibold text-gray-500 uppercase px-3 mb-2",
                                    children: "Account",
                                  }),
                                  N.jsxs(n, {
                                    to: "/dashboard",
                                    onClick: () => u(!1),
                                    className:
                                      "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700",
                                    children: [
                                      N.jsx(oa, {
                                        className: "w-5 h-5 text-[#0f463e]",
                                      }),
                                      N.jsx("span", {
                                        className: "font-medium",
                                        children: "Dashboard",
                                      }),
                                    ],
                                  }),
                                  N.jsxs(n, {
                                    to: "/dashboard/orders",
                                    onClick: () => u(!1),
                                    className:
                                      "flex items-center gap-3 p-3 rounded-xl hover:bg-gray-100 transition-colors text-gray-700",
                                    children: [
                                      N.jsx(ja, {
                                        className: "w-5 h-5 text-[#0f463e]",
                                      }),
                                      N.jsx("span", {
                                        className: "font-medium",
                                        children: "My Orders",
                                      }),
                                    ],
                                  }),
                                  N.jsxs("button", {
                                    onClick: () => {
                                      (S(), u(!1));
                                    },
                                    className:
                                      "flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 transition-colors text-red-600 w-full",
                                    children: [
                                      N.jsx(ma, { className: "w-5 h-5" }),
                                      N.jsx("span", {
                                        className: "font-medium",
                                        children: "Logout",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
      ],
    });
  },
  Ja = () =>
    N.jsxs("footer", {
      className: "bg-gray-900 text-gray-300 mt-auto",
      children: [
        N.jsx("div", {
          className: "bg-gray-800 border-b border-gray-700",
          children: N.jsx("div", {
            className: "container-custom py-6",
            children: N.jsxs("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-6",
              children: [
                N.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    N.jsx("div", {
                      className:
                        "w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center",
                      children: N.jsx(Ta, {
                        className: "w-6 h-6 text-primary",
                      }),
                    }),
                    N.jsxs("div", {
                      children: [
                        N.jsx("h4", {
                          className: "font-semibold text-white text-sm",
                          children: "Free Delivery",
                        }),
                        N.jsx("p", {
                          className: "text-xs text-gray-400",
                          children: "On all orders",
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    N.jsx("div", {
                      className:
                        "w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center",
                      children: N.jsx(Wa, {
                        className: "w-6 h-6 text-green-500",
                      }),
                    }),
                    N.jsxs("div", {
                      children: [
                        N.jsx("h4", {
                          className: "font-semibold text-white text-sm",
                          children: "Secure Payment",
                        }),
                        N.jsx("p", {
                          className: "text-xs text-gray-400",
                          children: "100% Protected",
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    N.jsx("div", {
                      className:
                        "w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center",
                      children: N.jsx(Zr, {
                        className: "w-6 h-6 text-blue-500",
                      }),
                    }),
                    N.jsxs("div", {
                      children: [
                        N.jsx("h4", {
                          className: "font-semibold text-white text-sm",
                          children: "Easy Returns",
                        }),
                        N.jsx("p", {
                          className: "text-xs text-gray-400",
                          children: "30-day policy",
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  className: "flex items-center gap-3",
                  children: [
                    N.jsx("div", {
                      className:
                        "w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center",
                      children: N.jsx(ia, {
                        className: "w-6 h-6 text-purple-500",
                      }),
                    }),
                    N.jsxs("div", {
                      children: [
                        N.jsx("h4", {
                          className: "font-semibold text-white text-sm",
                          children: "24/7 Support",
                        }),
                        N.jsx("p", {
                          className: "text-xs text-gray-400",
                          children: "Dedicated help",
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          }),
        }),
        N.jsxs("div", {
          className: "container-custom py-12",
          children: [
            N.jsxs("div", {
              className:
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8",
              children: [
                N.jsxs("div", {
                  className: "lg:col-span-2",
                  children: [
                    N.jsxs("div", {
                      className: "flex gap-3 mb-6",
                      children: [
                        N.jsx("a", {
                          href: "#",
                          className:
                            "w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors",
                          children: N.jsx(na, { className: "w-5 h-5" }),
                        }),
                        N.jsx("a", {
                          href: "#",
                          className:
                            "w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors",
                          children: N.jsx(Va, { className: "w-5 h-5" }),
                        }),
                        N.jsx("a", {
                          href: "#",
                          className:
                            "w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors",
                          children: N.jsx(ua, { className: "w-5 h-5" }),
                        }),
                        N.jsx("a", {
                          href: "#",
                          className:
                            "w-10 h-10 rounded-full bg-gray-800 hover:bg-primary flex items-center justify-center transition-colors",
                          children: N.jsx(pa, { className: "w-5 h-5" }),
                        }),
                      ],
                    }),
                    N.jsxs("div", {
                      children: [
                        N.jsx("h4", {
                          className: "text-white font-semibold mb-3 text-sm",
                          children: "Subscribe to Newsletter",
                        }),
                        N.jsxs("div", {
                          className: "flex gap-2",
                          children: [
                            N.jsx("input", {
                              type: "email",
                              placeholder: "Enter your email",
                              className:
                                "flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary text-white placeholder-gray-500",
                            }),
                            N.jsx("button", {
                              className:
                                "px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors text-sm font-medium",
                              children: "Subscribe",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  children: [
                    N.jsx("h3", {
                      className:
                        "text-white font-semibold mb-4 text-sm uppercase tracking-wider",
                      children: "Quick Links",
                    }),
                    N.jsxs("ul", {
                      className: "space-y-2.5",
                      children: [
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Home",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/products",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "All Products",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/about",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "About Us",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/contact",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Contact Us",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/blog",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Blog",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  children: [
                    N.jsx("h3", {
                      className:
                        "text-white font-semibold mb-4 text-sm uppercase tracking-wider",
                      children: "Customer Service",
                    }),
                    N.jsxs("ul", {
                      className: "space-y-2.5",
                      children: [
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/how-it-works",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "How It Works",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/orders",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Track Order",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/dashboard",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "My Account",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/wishlist",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Wishlist",
                          }),
                        }),
                        N.jsx("li", {
                          children: N.jsx(n, {
                            to: "/terms",
                            className:
                              "text-gray-400 hover:text-primary transition-colors text-sm",
                            children: "Terms & Conditions",
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
                N.jsxs("div", {
                  children: [
                    N.jsx("h3", {
                      className:
                        "text-white font-semibold mb-4 text-sm uppercase tracking-wider",
                      children: "Contact Us",
                    }),
                    N.jsxs("ul", {
                      className: "space-y-3",
                      children: [
                        N.jsxs("li", {
                          className: "flex items-start gap-3",
                          children: [
                            N.jsx(ga, {
                              className:
                                "w-5 h-5 text-primary flex-shrink-0 mt-0.5",
                            }),
                            N.jsx("span", {
                              className: "text-gray-400 text-sm",
                              children:
                                "Shop no 28, Jai Ganesh Vishwa Complex, Alandi Rd, Kasturba B, Kasturba Housing Society, Visharant Wadi, Pune, Maharashtra 411015",
                            }),
                          ],
                        }),
                        N.jsxs("li", {
                          className: "flex items-center gap-3",
                          children: [
                            N.jsx(ba, {
                              className: "w-5 h-5 text-primary flex-shrink-0",
                            }),
                            N.jsx("a", {
                              href: "tel:+919767552564",
                              className:
                                "text-gray-400 hover:text-primary transition-colors text-sm",
                              children: "+91 9767552564",
                            }),
                          ],
                        }),
                        N.jsxs("li", {
                          className: "flex items-center gap-3",
                          children: [
                            N.jsx(xa, {
                              className: "w-5 h-5 text-primary flex-shrink-0",
                            }),
                            N.jsx("a", {
                              href: "mailto:support@rentalguru.com",
                              className:
                                "text-gray-400 hover:text-primary transition-colors text-sm",
                              children: "info@climbwin.com",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            N.jsxs("div", {
              className: "border-t border-gray-800 pt-6 mb-6",
              children: [
                N.jsx("h4", {
                  className: "text-white font-semibold mb-3 text-sm",
                  children: "We Accept",
                }),
                N.jsxs("div", {
                  className: "flex flex-wrap items-center gap-3",
                  children: [
                    N.jsx("div", {
                      className:
                        "px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400",
                      children: "Visa",
                    }),
                    N.jsx("div", {
                      className:
                        "px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400",
                      children: "Mastercard",
                    }),
                    N.jsx("div", {
                      className:
                        "px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400",
                      children: "PayPal",
                    }),
                    N.jsx("div", {
                      className:
                        "px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400",
                      children: "Razorpay",
                    }),
                    N.jsx("div", {
                      className:
                        "px-4 py-2 bg-gray-800 rounded border border-gray-700 text-xs font-medium text-gray-400",
                      children: "Cash on Delivery",
                    }),
                  ],
                }),
              ],
            }),
            N.jsxs("div", {
              className:
                "border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400",
              children: [
                N.jsx("p", {
                  children: "© 2025 CLIMB WIN. All Rights Reserved.",
                }),
                N.jsxs("p", {
                  children: [
                    "Design and Developed By",
                    " ",
                    N.jsx("a", {
                      href: "https://netcom-india.com/",
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-white hover:underline",
                      children: "Netcom Business Solutions Pvt Ltd",
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  Xa = () =>
    N.jsxs("div", {
      className: "flex flex-col min-h-screen",
      children: [
        N.jsx(Ka, {}),
        N.jsx("main", { className: "flex-grow", children: N.jsx(s, {}) }),
        N.jsx(Ja, {}),
      ],
    }),
  Ya = ({ children: e }) => {
    const { isAuthenticated: t, loading: r } = Rr();
    return r
      ? N.jsx("div", {
          className: "flex items-center justify-center min-h-screen",
          children: N.jsx("div", { className: "spinner" }),
        })
      : t
        ? e
        : N.jsx(o, { to: "/login", replace: !0 });
  },
  Qa = ({ children: e }) => {
    const t = X(),
      { isAuthenticated: a, loading: n } = Z((e) => e.auth);
    return (
      r.useEffect(() => {
        t(dr());
      }, [t]),
      r.useEffect(() => {
        a && !n && (t(yr()), t(Lr()));
      }, [a, n, t]),
      e
    );
  },
  Za = r.lazy(() =>
    te(
      () => import("./Home-C7lD9O37.js"),
      __vite__mapDeps([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    ),
  ),
  en = r.lazy(() =>
    te(
      () => import("./Products-CEjjgkTk.js"),
      __vite__mapDeps([13, 1, 5, 10, 7, 8, 9, 11, 12]),
    ),
  ),
  tn = r.lazy(() =>
    te(
      () => import("./RentProducts-BzD_dcvR.js"),
      __vite__mapDeps([14, 1, 13, 5, 10, 7, 8, 9, 11, 12]),
    ),
  ),
  rn = r.lazy(() =>
    te(
      () => import("./BuyProducts-B56q_vSo.js"),
      __vite__mapDeps([15, 1, 13, 5, 10, 7, 8, 9, 11, 12]),
    ),
  ),
  an = r.lazy(() =>
    te(
      () => import("./ProductDetail-LGlrovFv.js"),
      __vite__mapDeps([16, 1, 2, 3, 4, 9, 8, 7, 5, 11, 12]),
    ),
  ),
  nn = r.lazy(() =>
    te(
      () => import("./Cart-CljGip_j.js"),
      __vite__mapDeps([17, 1, 9, 8, 11, 12]),
    ),
  ),
  sn = r.lazy(() =>
    te(
      () => import("./CheckoutNew-WRhLQF_a.js"),
      __vite__mapDeps([18, 1, 9, 8, 11, 12]),
    ),
  ),
  on = r.lazy(() =>
    te(
      () => import("./Login-C8N1NSMj.js"),
      __vite__mapDeps([19, 1, 8, 11, 12]),
    ),
  ),
  ln = r.lazy(() =>
    te(
      () => import("./Register-7EalCsag.js"),
      __vite__mapDeps([20, 1, 8, 11, 12]),
    ),
  ),
  cn = r.lazy(() =>
    te(
      () => import("./Dashboard-CMjEis8n.js"),
      __vite__mapDeps([21, 1, 8, 11, 12]),
    ),
  ),
  dn = r.lazy(() =>
    te(
      () => import("./Profile-DUNiIVrs.js"),
      __vite__mapDeps([22, 1, 8, 11, 12]),
    ),
  ),
  un = r.lazy(() =>
    te(
      () => import("./Orders-dj1HqMBb.js"),
      __vite__mapDeps([23, 1, 9, 8, 11, 12]),
    ),
  ),
  pn = r.lazy(() =>
    te(
      () => import("./OrderDetail-BlhDg1f-.js"),
      __vite__mapDeps([24, 1, 9, 8, 11, 12]),
    ),
  ),
  hn = r.lazy(() =>
    te(
      () => import("./Addresses-D-7Ev__f.js"),
      __vite__mapDeps([25, 1, 8, 11, 12]),
    ),
  ),
  fn = r.lazy(() =>
    te(
      () => import("./Wishlist-DgurBus-.js"),
      __vite__mapDeps([26, 1, 7, 8, 9, 11, 12]),
    ),
  ),
  mn = r.lazy(() =>
    te(
      () => import("./About-BsVr_m1u.js"),
      __vite__mapDeps([27, 1, 5, 28, 8, 11, 12]),
    ),
  ),
  xn = r.lazy(() =>
    te(
      () => import("./Contact-BHgHCfkg.js"),
      __vite__mapDeps([29, 1, 8, 11, 12]),
    ),
  ),
  gn = r.lazy(() =>
    te(
      () => import("./PaymentSuccess-DHxJIozj.js"),
      __vite__mapDeps([30, 1, 8, 11, 12]),
    ),
  ),
  yn = r.lazy(() =>
    te(
      () => import("./PayPalPayment-DkSb63Vt.js"),
      __vite__mapDeps([31, 1, 8, 11, 12]),
    ),
  ),
  vn = r.lazy(() =>
    te(
      () => import("./StripePayment-ChJLtFGY.js"),
      __vite__mapDeps([32, 1, 8, 11, 12]),
    ),
  ),
  jn = r.lazy(() =>
    te(
      () => import("./VendorProducts-BWfIjpJY.js"),
      __vite__mapDeps([33, 1, 8, 11, 12]),
    ),
  ),
  wn = r.lazy(() =>
    te(
      () => import("./Blog-zdEJYfIc.js"),
      __vite__mapDeps([34, 1, 35, 8, 11, 12]),
    ),
  ),
  bn = r.lazy(() =>
    te(
      () => import("./BlogDetail-BjFJA96r.js"),
      __vite__mapDeps([36, 1, 35, 8, 11, 12]),
    ),
  ),
  kn = r.lazy(() =>
    te(
      () => import("./FlashSale-BpVu3PGl.js"),
      __vite__mapDeps([37, 1, 6, 7, 8, 9, 11, 12]),
    ),
  ),
  _n = r.lazy(() =>
    te(
      () => import("./Terms-4PREZ94a.js"),
      __vite__mapDeps([38, 1, 28, 8, 11, 12]),
    ),
  ),
  Nn = r.lazy(() =>
    te(
      () => import("./HowItWorks-9VrsyKt0.js"),
      __vite__mapDeps([39, 1, 28, 8, 11, 12]),
    ),
  ),
  Cn = r.lazy(() =>
    te(
      () => import("./Transactions-Dr0g4-bf.js"),
      __vite__mapDeps([40, 1, 8, 11, 12]),
    ),
  ),
  Ln = r.lazy(() =>
    te(
      () => import("./ApiTest-DGePQRa3.js"),
      __vite__mapDeps([41, 1, 5, 8, 11, 12]),
    ),
  ),
  Sn = () =>
    N.jsx("div", {
      className: "min-h-screen flex items-center justify-center bg-gray-50",
      children: N.jsxs("div", {
        className: "text-center",
        children: [
          N.jsx("div", {
            className:
              "inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary",
          }),
          N.jsx("p", {
            className: "mt-4 text-gray-600",
            children: "Loading...",
          }),
        ],
      }),
    });
function En() {
  return N.jsx(Qa, {
    children: N.jsx(r.Suspense, {
      fallback: N.jsx(Sn, {}),
      children: N.jsx(i, {
        children: N.jsxs(l, {
          path: "/",
          element: N.jsx(Xa, {}),
          children: [
            N.jsx(l, { index: !0, element: N.jsx(Za, {}) }),
            N.jsx(l, { path: "products", element: N.jsx(en, {}) }),
            N.jsx(l, { path: "products/rent", element: N.jsx(tn, {}) }),
            N.jsx(l, { path: "products/buy", element: N.jsx(rn, {}) }),
            N.jsx(l, { path: "products/:slug", element: N.jsx(an, {}) }),
            N.jsx(l, { path: "vendors/:id/products", element: N.jsx(jn, {}) }),
            N.jsx(l, { path: "about", element: N.jsx(mn, {}) }),
            N.jsx(l, { path: "contact", element: N.jsx(xn, {}) }),
            N.jsx(l, { path: "blog", element: N.jsx(wn, {}) }),
            N.jsx(l, { path: "blog/:slug", element: N.jsx(bn, {}) }),
            N.jsx(l, { path: "flash-sale", element: N.jsx(kn, {}) }),
            N.jsx(l, { path: "terms", element: N.jsx(_n, {}) }),
            N.jsx(l, { path: "how-it-works", element: N.jsx(Nn, {}) }),
            N.jsx(l, { path: "login", element: N.jsx(on, {}) }),
            N.jsx(l, { path: "register", element: N.jsx(ln, {}) }),
            N.jsx(l, { path: "api-test", element: N.jsx(Ln, {}) }),
            N.jsx(l, {
              path: "cart",
              element: N.jsx(Ya, { children: N.jsx(nn, {}) }),
            }),
            N.jsx(l, {
              path: "checkout",
              element: N.jsx(Ya, { children: N.jsx(sn, {}) }),
            }),
            N.jsx(l, {
              path: "wishlist",
              element: N.jsx(Ya, { children: N.jsx(fn, {}) }),
            }),
            N.jsx(l, {
              path: "payment-success",
              element: N.jsx(Ya, { children: N.jsx(gn, {}) }),
            }),
            N.jsx(l, {
              path: "payment/paypal/:orderId",
              element: N.jsx(Ya, { children: N.jsx(yn, {}) }),
            }),
            N.jsx(l, {
              path: "payment/stripe/:orderId",
              element: N.jsx(Ya, { children: N.jsx(vn, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard",
              element: N.jsx(Ya, { children: N.jsx(cn, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard/profile",
              element: N.jsx(Ya, { children: N.jsx(dn, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard/orders",
              element: N.jsx(Ya, { children: N.jsx(un, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard/orders/:id",
              element: N.jsx(Ya, { children: N.jsx(pn, {}) }),
            }),
            N.jsx(l, {
              path: "orders",
              element: N.jsx(Ya, { children: N.jsx(un, {}) }),
            }),
            N.jsx(l, {
              path: "orders/:id",
              element: N.jsx(Ya, { children: N.jsx(pn, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard/transactions",
              element: N.jsx(Ya, { children: N.jsx(Cn, {}) }),
            }),
            N.jsx(l, {
              path: "dashboard/addresses",
              element: N.jsx(Ya, { children: N.jsx(hn, {}) }),
            }),
          ],
        }),
      }),
    }),
  });
}
const Pn = (function (e) {
  const t = function (e) {
      const {
        thunk: t = !0,
        immutableCheck: r = !0,
        serializableCheck: a = !0,
        actionCreatorCheck: n = !0,
      } = e ?? {};
      let s = new kt();
      return (
        t && ("boolean" == typeof t ? s.push(vt) : s.push(jt(t.extraArgument))),
        s
      );
    },
    {
      reducer: r,
      middleware: a,
      devTools: n = !0,
      preloadedState: s,
      enhancers: o,
    } = e || {};
  let i, l;
  if ("function" == typeof r) i = r;
  else {
    if (!oe(r)) throw new Error(qt(1));
    i = le(r);
  }
  l = "function" == typeof a ? a(t) : t();
  let c = ce;
  n && (c = wt({ trace: !1, ...("object" == typeof n && n) }));
  const d = (function (...e) {
      return (t) => (r, a) => {
        const n = t(r, a);
        let s = () => {
          throw new Error(re(15));
        };
        const o = { getState: n.getState, dispatch: (e, ...t) => s(e, ...t) },
          i = e.map((e) => e(o));
        return ((s = ce(...i)(n.dispatch)), { ...n, dispatch: s });
      };
    })(...l),
    u = Lt(d);
  return ie(i, s, c(...("function" == typeof o ? o(u) : u())));
})({
  reducer: { auth: gr, cart: Cr, wishlist: Ir },
  middleware: (e) =>
    e({
      serializableCheck: {
        ignoredActions: ["auth/login/fulfilled", "auth/register/fulfilled"],
      },
    }),
});
p.createRoot(document.getElementById("root")).render(
  N.jsx(c.StrictMode, {
    children: N.jsx($, {
      store: Pn,
      children: N.jsxs(d, {
        children: [
          N.jsx(En, {}),
          N.jsx(h, {
            position: "top-right",
            autoClose: 3e3,
            hideProgressBar: !1,
            newestOnTop: !0,
            closeOnClick: !0,
            rtl: !1,
            pauseOnFocusLoss: !0,
            draggable: !0,
            pauseOnHover: !0,
            theme: "light",
          }),
        ],
      }),
    }),
  }),
);
export {
  lr as $,
  Ca as A,
  Fr as B,
  qa as C,
  Hr as D,
  Vr as E,
  wa as F,
  Ma as G,
  Ta as H,
  Ia as I,
  la as J,
  Oa as K,
  Va as L,
  na as M,
  Qr as N,
  Wa as O,
  Kr as P,
  Zr as Q,
  qr as R,
  Ba as S,
  or as T,
  cr as U,
  ga as V,
  Ur as W,
  fa as X,
  Aa as Y,
  Yr as Z,
  $a as _,
  $t as a,
  $r as a0,
  ra as a1,
  Fa as a2,
  La as a3,
  ba as a4,
  aa as a5,
  Tr as a6,
  _a as a7,
  ka as a8,
  ia as a9,
  Ea as aa,
  Ua as b,
  za as c,
  Ra as d,
  xa as e,
  sa as f,
  Ha as g,
  ja as h,
  ea as i,
  N as j,
  oa as k,
  ha as l,
  Na as m,
  ta as n,
  Da as o,
  Dr as p,
  Xr as q,
  Gr as r,
  Sa as s,
  Br as t,
  zr as u,
  Rr as v,
  ir as w,
  Jr as x,
  ya as y,
  Mr as z,
};
