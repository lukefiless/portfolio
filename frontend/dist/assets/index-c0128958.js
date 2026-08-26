function jS(t,e){for(var n=0;n<e.length;n++){const i=e[n];if(typeof i!="string"&&!Array.isArray(i)){for(const r in i)if(r!=="default"&&!(r in t)){const s=Object.getOwnPropertyDescriptor(i,r);s&&Object.defineProperty(t,r,s.get?s:{enumerable:!0,get:()=>i[r]})}}}return Object.freeze(Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}))}(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();function qS(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var jv={exports:{}},ru={},qv={exports:{}},ot={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var qa=Symbol.for("react.element"),YS=Symbol.for("react.portal"),$S=Symbol.for("react.fragment"),KS=Symbol.for("react.strict_mode"),ZS=Symbol.for("react.profiler"),JS=Symbol.for("react.provider"),QS=Symbol.for("react.context"),e1=Symbol.for("react.forward_ref"),t1=Symbol.for("react.suspense"),n1=Symbol.for("react.memo"),i1=Symbol.for("react.lazy"),Hm=Symbol.iterator;function r1(t){return t===null||typeof t!="object"?null:(t=Hm&&t[Hm]||t["@@iterator"],typeof t=="function"?t:null)}var Yv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},$v=Object.assign,Kv={};function Eo(t,e,n){this.props=t,this.context=e,this.refs=Kv,this.updater=n||Yv}Eo.prototype.isReactComponent={};Eo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Eo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function Zv(){}Zv.prototype=Eo.prototype;function rp(t,e,n){this.props=t,this.context=e,this.refs=Kv,this.updater=n||Yv}var sp=rp.prototype=new Zv;sp.constructor=rp;$v(sp,Eo.prototype);sp.isPureReactComponent=!0;var Gm=Array.isArray,Jv=Object.prototype.hasOwnProperty,op={current:null},Qv={key:!0,ref:!0,__self:!0,__source:!0};function ex(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Jv.call(e,i)&&!Qv.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:qa,type:t,key:s,ref:o,props:r,_owner:op.current}}function s1(t,e){return{$$typeof:qa,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ap(t){return typeof t=="object"&&t!==null&&t.$$typeof===qa}function o1(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Wm=/\/+/g;function Du(t,e){return typeof t=="object"&&t!==null&&t.key!=null?o1(""+t.key):e.toString(36)}function Ql(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case qa:case YS:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+Du(o,0):i,Gm(r)?(n="",t!=null&&(n=t.replace(Wm,"$&/")+"/"),Ql(r,e,n,"",function(c){return c})):r!=null&&(ap(r)&&(r=s1(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(Wm,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",Gm(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+Du(s,a);o+=Ql(s,e,n,l,r)}else if(l=r1(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+Du(s,a++),o+=Ql(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function rl(t,e,n){if(t==null)return t;var i=[],r=0;return Ql(t,i,"","",function(s){return e.call(n,s,r++)}),i}function a1(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var xn={current:null},ec={transition:null},l1={ReactCurrentDispatcher:xn,ReactCurrentBatchConfig:ec,ReactCurrentOwner:op};function tx(){throw Error("act(...) is not supported in production builds of React.")}ot.Children={map:rl,forEach:function(t,e,n){rl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return rl(t,function(){e++}),e},toArray:function(t){return rl(t,function(e){return e})||[]},only:function(t){if(!ap(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ot.Component=Eo;ot.Fragment=$S;ot.Profiler=ZS;ot.PureComponent=rp;ot.StrictMode=KS;ot.Suspense=t1;ot.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=l1;ot.act=tx;ot.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=$v({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=op.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Jv.call(e,l)&&!Qv.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var c=0;c<l;c++)a[c]=arguments[c+2];i.children=a}return{$$typeof:qa,type:t.type,key:r,ref:s,props:i,_owner:o}};ot.createContext=function(t){return t={$$typeof:QS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:JS,_context:t},t.Consumer=t};ot.createElement=ex;ot.createFactory=function(t){var e=ex.bind(null,t);return e.type=t,e};ot.createRef=function(){return{current:null}};ot.forwardRef=function(t){return{$$typeof:e1,render:t}};ot.isValidElement=ap;ot.lazy=function(t){return{$$typeof:i1,_payload:{_status:-1,_result:t},_init:a1}};ot.memo=function(t,e){return{$$typeof:n1,type:t,compare:e===void 0?null:e}};ot.startTransition=function(t){var e=ec.transition;ec.transition={};try{t()}finally{ec.transition=e}};ot.unstable_act=tx;ot.useCallback=function(t,e){return xn.current.useCallback(t,e)};ot.useContext=function(t){return xn.current.useContext(t)};ot.useDebugValue=function(){};ot.useDeferredValue=function(t){return xn.current.useDeferredValue(t)};ot.useEffect=function(t,e){return xn.current.useEffect(t,e)};ot.useId=function(){return xn.current.useId()};ot.useImperativeHandle=function(t,e,n){return xn.current.useImperativeHandle(t,e,n)};ot.useInsertionEffect=function(t,e){return xn.current.useInsertionEffect(t,e)};ot.useLayoutEffect=function(t,e){return xn.current.useLayoutEffect(t,e)};ot.useMemo=function(t,e){return xn.current.useMemo(t,e)};ot.useReducer=function(t,e,n){return xn.current.useReducer(t,e,n)};ot.useRef=function(t){return xn.current.useRef(t)};ot.useState=function(t){return xn.current.useState(t)};ot.useSyncExternalStore=function(t,e,n){return xn.current.useSyncExternalStore(t,e,n)};ot.useTransition=function(){return xn.current.useTransition()};ot.version="18.3.1";qv.exports=ot;var ue=qv.exports;const nx=qS(ue),c1=jS({__proto__:null,default:nx},[ue]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var u1=ue,d1=Symbol.for("react.element"),f1=Symbol.for("react.fragment"),h1=Object.prototype.hasOwnProperty,p1=u1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,m1={key:!0,ref:!0,__self:!0,__source:!0};function ix(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)h1.call(e,i)&&!m1.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:d1,type:t,key:s,ref:o,props:r,_owner:p1.current}}ru.Fragment=f1;ru.jsx=ix;ru.jsxs=ix;jv.exports=ru;var C=jv.exports,Qd={},rx={exports:{}},Bn={},sx={exports:{}},ox={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,W){var $=I.length;I.push(W);e:for(;0<$;){var ee=$-1>>>1,le=I[ee];if(0<r(le,W))I[ee]=W,I[$]=le,$=ee;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var W=I[0],$=I.pop();if($!==W){I[0]=$;e:for(var ee=0,le=I.length,Ye=le>>>1;ee<Ye;){var Pe=2*(ee+1)-1,Ge=I[Pe],J=Pe+1,ce=I[J];if(0>r(Ge,$))J<le&&0>r(ce,Ge)?(I[ee]=ce,I[J]=$,ee=J):(I[ee]=Ge,I[Pe]=$,ee=Pe);else if(J<le&&0>r(ce,$))I[ee]=ce,I[J]=$,ee=J;else break e}}return W}function r(I,W){var $=I.sortIndex-W.sortIndex;return $!==0?$:I.id-W.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],c=[],u=1,f=null,d=3,p=!1,g=!1,S=!1,m=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,v=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function _(I){for(var W=n(c);W!==null;){if(W.callback===null)i(c);else if(W.startTime<=I)i(c),W.sortIndex=W.expirationTime,e(l,W);else break;W=n(c)}}function y(I){if(S=!1,_(I),!g)if(n(l)!==null)g=!0,k(w);else{var W=n(c);W!==null&&B(y,W.startTime-I)}}function w(I,W){g=!1,S&&(S=!1,h(x),x=-1),p=!0;var $=d;try{for(_(W),f=n(l);f!==null&&(!(f.expirationTime>W)||I&&!N());){var ee=f.callback;if(typeof ee=="function"){f.callback=null,d=f.priorityLevel;var le=ee(f.expirationTime<=W);W=t.unstable_now(),typeof le=="function"?f.callback=le:f===n(l)&&i(l),_(W)}else i(l);f=n(l)}if(f!==null)var Ye=!0;else{var Pe=n(c);Pe!==null&&B(y,Pe.startTime-W),Ye=!1}return Ye}finally{f=null,d=$,p=!1}}var E=!1,A=null,x=-1,b=5,R=-1;function N(){return!(t.unstable_now()-R<b)}function U(){if(A!==null){var I=t.unstable_now();R=I;var W=!0;try{W=A(!0,I)}finally{W?H():(E=!1,A=null)}}else E=!1}var H;if(typeof v=="function")H=function(){v(U)};else if(typeof MessageChannel<"u"){var q=new MessageChannel,D=q.port2;q.port1.onmessage=U,H=function(){D.postMessage(null)}}else H=function(){m(U,0)};function k(I){A=I,E||(E=!0,H())}function B(I,W){x=m(function(){I(t.unstable_now())},W)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,k(w))},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):b=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(I){switch(d){case 1:case 2:case 3:var W=3;break;default:W=d}var $=d;d=W;try{return I()}finally{d=$}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(I,W){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var $=d;d=I;try{return W()}finally{d=$}},t.unstable_scheduleCallback=function(I,W,$){var ee=t.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?ee+$:ee):$=ee,I){case 1:var le=-1;break;case 2:le=250;break;case 5:le=1073741823;break;case 4:le=1e4;break;default:le=5e3}return le=$+le,I={id:u++,callback:W,priorityLevel:I,startTime:$,expirationTime:le,sortIndex:-1},$>ee?(I.sortIndex=$,e(c,I),n(l)===null&&I===n(c)&&(S?(h(x),x=-1):S=!0,B(y,$-ee))):(I.sortIndex=le,e(l,I),g||p||(g=!0,k(w))),I},t.unstable_shouldYield=N,t.unstable_wrapCallback=function(I){var W=d;return function(){var $=d;d=W;try{return I.apply(this,arguments)}finally{d=$}}}})(ox);sx.exports=ox;var g1=sx.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var v1=ue,kn=g1;function de(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var ax=new Set,ya={};function hs(t,e){uo(t,e),uo(t+"Capture",e)}function uo(t,e){for(ya[t]=e,t=0;t<e.length;t++)ax.add(e[t])}var ji=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ef=Object.prototype.hasOwnProperty,x1=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Xm={},jm={};function _1(t){return ef.call(jm,t)?!0:ef.call(Xm,t)?!1:x1.test(t)?jm[t]=!0:(Xm[t]=!0,!1)}function y1(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function S1(t,e,n,i){if(e===null||typeof e>"u"||y1(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function _n(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var tn={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){tn[t]=new _n(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];tn[e]=new _n(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){tn[t]=new _n(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){tn[t]=new _n(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){tn[t]=new _n(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){tn[t]=new _n(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){tn[t]=new _n(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){tn[t]=new _n(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){tn[t]=new _n(t,5,!1,t.toLowerCase(),null,!1,!1)});var lp=/[\-:]([a-z])/g;function cp(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(lp,cp);tn[e]=new _n(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(lp,cp);tn[e]=new _n(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(lp,cp);tn[e]=new _n(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){tn[t]=new _n(t,1,!1,t.toLowerCase(),null,!1,!1)});tn.xlinkHref=new _n("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){tn[t]=new _n(t,1,!1,t.toLowerCase(),null,!0,!0)});function up(t,e,n,i){var r=tn.hasOwnProperty(e)?tn[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(S1(e,n,r,i)&&(n=null),i||r===null?_1(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Ji=v1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,sl=Symbol.for("react.element"),Hs=Symbol.for("react.portal"),Gs=Symbol.for("react.fragment"),dp=Symbol.for("react.strict_mode"),tf=Symbol.for("react.profiler"),lx=Symbol.for("react.provider"),cx=Symbol.for("react.context"),fp=Symbol.for("react.forward_ref"),nf=Symbol.for("react.suspense"),rf=Symbol.for("react.suspense_list"),hp=Symbol.for("react.memo"),ur=Symbol.for("react.lazy"),ux=Symbol.for("react.offscreen"),qm=Symbol.iterator;function No(t){return t===null||typeof t!="object"?null:(t=qm&&t[qm]||t["@@iterator"],typeof t=="function"?t:null)}var Pt=Object.assign,Iu;function $o(t){if(Iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Iu=e&&e[1]||""}return`
`+Iu+t}var Uu=!1;function Fu(t,e){if(!t||Uu)return"";Uu=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var i=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){i=c}t.call(e.prototype)}else{try{throw Error()}catch(c){i=c}t()}}catch(c){if(c&&i&&typeof c.stack=="string"){for(var r=c.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{Uu=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?$o(t):""}function M1(t){switch(t.tag){case 5:return $o(t.type);case 16:return $o("Lazy");case 13:return $o("Suspense");case 19:return $o("SuspenseList");case 0:case 2:case 15:return t=Fu(t.type,!1),t;case 11:return t=Fu(t.type.render,!1),t;case 1:return t=Fu(t.type,!0),t;default:return""}}function sf(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Gs:return"Fragment";case Hs:return"Portal";case tf:return"Profiler";case dp:return"StrictMode";case nf:return"Suspense";case rf:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case cx:return(t.displayName||"Context")+".Consumer";case lx:return(t._context.displayName||"Context")+".Provider";case fp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case hp:return e=t.displayName||null,e!==null?e:sf(t.type)||"Memo";case ur:e=t._payload,t=t._init;try{return sf(t(e))}catch{}}return null}function E1(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return sf(e);case 8:return e===dp?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function Cr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function dx(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function w1(t){var e=dx(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ol(t){t._valueTracker||(t._valueTracker=w1(t))}function fx(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=dx(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Sc(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function of(t,e){var n=e.checked;return Pt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Ym(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=Cr(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function hx(t,e){e=e.checked,e!=null&&up(t,"checked",e,!1)}function af(t,e){hx(t,e);var n=Cr(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?lf(t,e.type,n):e.hasOwnProperty("defaultValue")&&lf(t,e.type,Cr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function $m(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function lf(t,e,n){(e!=="number"||Sc(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var Ko=Array.isArray;function to(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Cr(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function cf(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(de(91));return Pt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Km(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(de(92));if(Ko(n)){if(1<n.length)throw Error(de(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:Cr(n)}}function px(t,e){var n=Cr(e.value),i=Cr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function Zm(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function mx(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function uf(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?mx(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var al,gx=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(al=al||document.createElement("div"),al.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=al.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Sa(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var sa={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},T1=["Webkit","ms","Moz","O"];Object.keys(sa).forEach(function(t){T1.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),sa[e]=sa[t]})});function vx(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||sa.hasOwnProperty(t)&&sa[t]?(""+e).trim():e+"px"}function xx(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=vx(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var b1=Pt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function df(t,e){if(e){if(b1[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(de(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(de(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(de(61))}if(e.style!=null&&typeof e.style!="object")throw Error(de(62))}}function ff(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var hf=null;function pp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var pf=null,no=null,io=null;function Jm(t){if(t=Ka(t)){if(typeof pf!="function")throw Error(de(280));var e=t.stateNode;e&&(e=cu(e),pf(t.stateNode,t.type,e))}}function _x(t){no?io?io.push(t):io=[t]:no=t}function yx(){if(no){var t=no,e=io;if(io=no=null,Jm(t),e)for(t=0;t<e.length;t++)Jm(e[t])}}function Sx(t,e){return t(e)}function Mx(){}var Ou=!1;function Ex(t,e,n){if(Ou)return t(e,n);Ou=!0;try{return Sx(t,e,n)}finally{Ou=!1,(no!==null||io!==null)&&(Mx(),yx())}}function Ma(t,e){var n=t.stateNode;if(n===null)return null;var i=cu(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(de(231,e,typeof n));return n}var mf=!1;if(ji)try{var Lo={};Object.defineProperty(Lo,"passive",{get:function(){mf=!0}}),window.addEventListener("test",Lo,Lo),window.removeEventListener("test",Lo,Lo)}catch{mf=!1}function A1(t,e,n,i,r,s,o,a,l){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(u){this.onError(u)}}var oa=!1,Mc=null,Ec=!1,gf=null,C1={onError:function(t){oa=!0,Mc=t}};function R1(t,e,n,i,r,s,o,a,l){oa=!1,Mc=null,A1.apply(C1,arguments)}function P1(t,e,n,i,r,s,o,a,l){if(R1.apply(this,arguments),oa){if(oa){var c=Mc;oa=!1,Mc=null}else throw Error(de(198));Ec||(Ec=!0,gf=c)}}function ps(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function wx(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Qm(t){if(ps(t)!==t)throw Error(de(188))}function N1(t){var e=t.alternate;if(!e){if(e=ps(t),e===null)throw Error(de(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return Qm(r),t;if(s===i)return Qm(r),e;s=s.sibling}throw Error(de(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(de(189))}}if(n.alternate!==i)throw Error(de(190))}if(n.tag!==3)throw Error(de(188));return n.stateNode.current===n?t:e}function Tx(t){return t=N1(t),t!==null?bx(t):null}function bx(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=bx(t);if(e!==null)return e;t=t.sibling}return null}var Ax=kn.unstable_scheduleCallback,e0=kn.unstable_cancelCallback,L1=kn.unstable_shouldYield,D1=kn.unstable_requestPaint,Ft=kn.unstable_now,I1=kn.unstable_getCurrentPriorityLevel,mp=kn.unstable_ImmediatePriority,Cx=kn.unstable_UserBlockingPriority,wc=kn.unstable_NormalPriority,U1=kn.unstable_LowPriority,Rx=kn.unstable_IdlePriority,su=null,Ti=null;function F1(t){if(Ti&&typeof Ti.onCommitFiberRoot=="function")try{Ti.onCommitFiberRoot(su,t,void 0,(t.current.flags&128)===128)}catch{}}var ai=Math.clz32?Math.clz32:B1,O1=Math.log,k1=Math.LN2;function B1(t){return t>>>=0,t===0?32:31-(O1(t)/k1|0)|0}var ll=64,cl=4194304;function Zo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Tc(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Zo(a):(s&=o,s!==0&&(i=Zo(s)))}else o=n&~r,o!==0?i=Zo(o):s!==0&&(i=Zo(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-ai(e),r=1<<n,i|=t[n],e&=~r;return i}function z1(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function V1(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-ai(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=z1(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function vf(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Px(){var t=ll;return ll<<=1,!(ll&4194240)&&(ll=64),t}function ku(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Ya(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ai(e),t[e]=n}function H1(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-ai(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function gp(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-ai(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var pt=0;function Nx(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Lx,vp,Dx,Ix,Ux,xf=!1,ul=[],_r=null,yr=null,Sr=null,Ea=new Map,wa=new Map,fr=[],G1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function t0(t,e){switch(t){case"focusin":case"focusout":_r=null;break;case"dragenter":case"dragleave":yr=null;break;case"mouseover":case"mouseout":Sr=null;break;case"pointerover":case"pointerout":Ea.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":wa.delete(e.pointerId)}}function Do(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Ka(e),e!==null&&vp(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function W1(t,e,n,i,r){switch(e){case"focusin":return _r=Do(_r,t,e,n,i,r),!0;case"dragenter":return yr=Do(yr,t,e,n,i,r),!0;case"mouseover":return Sr=Do(Sr,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return Ea.set(s,Do(Ea.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,wa.set(s,Do(wa.get(s)||null,t,e,n,i,r)),!0}return!1}function Fx(t){var e=qr(t.target);if(e!==null){var n=ps(e);if(n!==null){if(e=n.tag,e===13){if(e=wx(n),e!==null){t.blockedOn=e,Ux(t.priority,function(){Dx(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function tc(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=_f(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);hf=i,n.target.dispatchEvent(i),hf=null}else return e=Ka(n),e!==null&&vp(e),t.blockedOn=n,!1;e.shift()}return!0}function n0(t,e,n){tc(t)&&n.delete(e)}function X1(){xf=!1,_r!==null&&tc(_r)&&(_r=null),yr!==null&&tc(yr)&&(yr=null),Sr!==null&&tc(Sr)&&(Sr=null),Ea.forEach(n0),wa.forEach(n0)}function Io(t,e){t.blockedOn===e&&(t.blockedOn=null,xf||(xf=!0,kn.unstable_scheduleCallback(kn.unstable_NormalPriority,X1)))}function Ta(t){function e(r){return Io(r,t)}if(0<ul.length){Io(ul[0],t);for(var n=1;n<ul.length;n++){var i=ul[n];i.blockedOn===t&&(i.blockedOn=null)}}for(_r!==null&&Io(_r,t),yr!==null&&Io(yr,t),Sr!==null&&Io(Sr,t),Ea.forEach(e),wa.forEach(e),n=0;n<fr.length;n++)i=fr[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<fr.length&&(n=fr[0],n.blockedOn===null);)Fx(n),n.blockedOn===null&&fr.shift()}var ro=Ji.ReactCurrentBatchConfig,bc=!0;function j1(t,e,n,i){var r=pt,s=ro.transition;ro.transition=null;try{pt=1,xp(t,e,n,i)}finally{pt=r,ro.transition=s}}function q1(t,e,n,i){var r=pt,s=ro.transition;ro.transition=null;try{pt=4,xp(t,e,n,i)}finally{pt=r,ro.transition=s}}function xp(t,e,n,i){if(bc){var r=_f(t,e,n,i);if(r===null)Yu(t,e,i,Ac,n),t0(t,i);else if(W1(r,t,e,n,i))i.stopPropagation();else if(t0(t,i),e&4&&-1<G1.indexOf(t)){for(;r!==null;){var s=Ka(r);if(s!==null&&Lx(s),s=_f(t,e,n,i),s===null&&Yu(t,e,i,Ac,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else Yu(t,e,i,null,n)}}var Ac=null;function _f(t,e,n,i){if(Ac=null,t=pp(i),t=qr(t),t!==null)if(e=ps(t),e===null)t=null;else if(n=e.tag,n===13){if(t=wx(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ac=t,null}function Ox(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(I1()){case mp:return 1;case Cx:return 4;case wc:case U1:return 16;case Rx:return 536870912;default:return 16}default:return 16}}var mr=null,_p=null,nc=null;function kx(){if(nc)return nc;var t,e=_p,n=e.length,i,r="value"in mr?mr.value:mr.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return nc=r.slice(t,1<i?1-i:void 0)}function ic(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function dl(){return!0}function i0(){return!1}function zn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?dl:i0,this.isPropagationStopped=i0,this}return Pt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=dl)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=dl)},persist:function(){},isPersistent:dl}),e}var wo={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},yp=zn(wo),$a=Pt({},wo,{view:0,detail:0}),Y1=zn($a),Bu,zu,Uo,ou=Pt({},$a,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Sp,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Uo&&(Uo&&t.type==="mousemove"?(Bu=t.screenX-Uo.screenX,zu=t.screenY-Uo.screenY):zu=Bu=0,Uo=t),Bu)},movementY:function(t){return"movementY"in t?t.movementY:zu}}),r0=zn(ou),$1=Pt({},ou,{dataTransfer:0}),K1=zn($1),Z1=Pt({},$a,{relatedTarget:0}),Vu=zn(Z1),J1=Pt({},wo,{animationName:0,elapsedTime:0,pseudoElement:0}),Q1=zn(J1),eM=Pt({},wo,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),tM=zn(eM),nM=Pt({},wo,{data:0}),s0=zn(nM),iM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function oM(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=sM[t])?!!e[t]:!1}function Sp(){return oM}var aM=Pt({},$a,{key:function(t){if(t.key){var e=iM[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=ic(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?rM[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Sp,charCode:function(t){return t.type==="keypress"?ic(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ic(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),lM=zn(aM),cM=Pt({},ou,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),o0=zn(cM),uM=Pt({},$a,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Sp}),dM=zn(uM),fM=Pt({},wo,{propertyName:0,elapsedTime:0,pseudoElement:0}),hM=zn(fM),pM=Pt({},ou,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),mM=zn(pM),gM=[9,13,27,32],Mp=ji&&"CompositionEvent"in window,aa=null;ji&&"documentMode"in document&&(aa=document.documentMode);var vM=ji&&"TextEvent"in window&&!aa,Bx=ji&&(!Mp||aa&&8<aa&&11>=aa),a0=String.fromCharCode(32),l0=!1;function zx(t,e){switch(t){case"keyup":return gM.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Vx(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ws=!1;function xM(t,e){switch(t){case"compositionend":return Vx(e);case"keypress":return e.which!==32?null:(l0=!0,a0);case"textInput":return t=e.data,t===a0&&l0?null:t;default:return null}}function _M(t,e){if(Ws)return t==="compositionend"||!Mp&&zx(t,e)?(t=kx(),nc=_p=mr=null,Ws=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Bx&&e.locale!=="ko"?null:e.data;default:return null}}var yM={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function c0(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!yM[t.type]:e==="textarea"}function Hx(t,e,n,i){_x(i),e=Cc(e,"onChange"),0<e.length&&(n=new yp("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var la=null,ba=null;function SM(t){Qx(t,0)}function au(t){var e=qs(t);if(fx(e))return t}function MM(t,e){if(t==="change")return e}var Gx=!1;if(ji){var Hu;if(ji){var Gu="oninput"in document;if(!Gu){var u0=document.createElement("div");u0.setAttribute("oninput","return;"),Gu=typeof u0.oninput=="function"}Hu=Gu}else Hu=!1;Gx=Hu&&(!document.documentMode||9<document.documentMode)}function d0(){la&&(la.detachEvent("onpropertychange",Wx),ba=la=null)}function Wx(t){if(t.propertyName==="value"&&au(ba)){var e=[];Hx(e,ba,t,pp(t)),Ex(SM,e)}}function EM(t,e,n){t==="focusin"?(d0(),la=e,ba=n,la.attachEvent("onpropertychange",Wx)):t==="focusout"&&d0()}function wM(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return au(ba)}function TM(t,e){if(t==="click")return au(e)}function bM(t,e){if(t==="input"||t==="change")return au(e)}function AM(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ui=typeof Object.is=="function"?Object.is:AM;function Aa(t,e){if(ui(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!ef.call(e,r)||!ui(t[r],e[r]))return!1}return!0}function f0(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function h0(t,e){var n=f0(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=f0(n)}}function Xx(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?Xx(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function jx(){for(var t=window,e=Sc();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Sc(t.document)}return e}function Ep(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function CM(t){var e=jx(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&Xx(n.ownerDocument.documentElement,n)){if(i!==null&&Ep(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=h0(n,s);var o=h0(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var RM=ji&&"documentMode"in document&&11>=document.documentMode,Xs=null,yf=null,ca=null,Sf=!1;function p0(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Sf||Xs==null||Xs!==Sc(i)||(i=Xs,"selectionStart"in i&&Ep(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ca&&Aa(ca,i)||(ca=i,i=Cc(yf,"onSelect"),0<i.length&&(e=new yp("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Xs)))}function fl(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var js={animationend:fl("Animation","AnimationEnd"),animationiteration:fl("Animation","AnimationIteration"),animationstart:fl("Animation","AnimationStart"),transitionend:fl("Transition","TransitionEnd")},Wu={},qx={};ji&&(qx=document.createElement("div").style,"AnimationEvent"in window||(delete js.animationend.animation,delete js.animationiteration.animation,delete js.animationstart.animation),"TransitionEvent"in window||delete js.transitionend.transition);function lu(t){if(Wu[t])return Wu[t];if(!js[t])return t;var e=js[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in qx)return Wu[t]=e[n];return t}var Yx=lu("animationend"),$x=lu("animationiteration"),Kx=lu("animationstart"),Zx=lu("transitionend"),Jx=new Map,m0="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Nr(t,e){Jx.set(t,e),hs(e,[t])}for(var Xu=0;Xu<m0.length;Xu++){var ju=m0[Xu],PM=ju.toLowerCase(),NM=ju[0].toUpperCase()+ju.slice(1);Nr(PM,"on"+NM)}Nr(Yx,"onAnimationEnd");Nr($x,"onAnimationIteration");Nr(Kx,"onAnimationStart");Nr("dblclick","onDoubleClick");Nr("focusin","onFocus");Nr("focusout","onBlur");Nr(Zx,"onTransitionEnd");uo("onMouseEnter",["mouseout","mouseover"]);uo("onMouseLeave",["mouseout","mouseover"]);uo("onPointerEnter",["pointerout","pointerover"]);uo("onPointerLeave",["pointerout","pointerover"]);hs("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));hs("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));hs("onBeforeInput",["compositionend","keypress","textInput","paste"]);hs("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));hs("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));hs("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Jo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),LM=new Set("cancel close invalid load scroll toggle".split(" ").concat(Jo));function g0(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,P1(i,e,void 0,t),t.currentTarget=null}function Qx(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,c=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;g0(r,a,c),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,c=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;g0(r,a,c),s=l}}}if(Ec)throw t=gf,Ec=!1,gf=null,t}function Mt(t,e){var n=e[bf];n===void 0&&(n=e[bf]=new Set);var i=t+"__bubble";n.has(i)||(e_(e,t,2,!1),n.add(i))}function qu(t,e,n){var i=0;e&&(i|=4),e_(n,t,i,e)}var hl="_reactListening"+Math.random().toString(36).slice(2);function Ca(t){if(!t[hl]){t[hl]=!0,ax.forEach(function(n){n!=="selectionchange"&&(LM.has(n)||qu(n,!1,t),qu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[hl]||(e[hl]=!0,qu("selectionchange",!1,e))}}function e_(t,e,n,i){switch(Ox(e)){case 1:var r=j1;break;case 4:r=q1;break;default:r=xp}n=r.bind(null,e,n,t),r=void 0,!mf||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function Yu(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=qr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Ex(function(){var c=s,u=pp(n),f=[];e:{var d=Jx.get(t);if(d!==void 0){var p=yp,g=t;switch(t){case"keypress":if(ic(n)===0)break e;case"keydown":case"keyup":p=lM;break;case"focusin":g="focus",p=Vu;break;case"focusout":g="blur",p=Vu;break;case"beforeblur":case"afterblur":p=Vu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=r0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=K1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=dM;break;case Yx:case $x:case Kx:p=Q1;break;case Zx:p=hM;break;case"scroll":p=Y1;break;case"wheel":p=mM;break;case"copy":case"cut":case"paste":p=tM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=o0}var S=(e&4)!==0,m=!S&&t==="scroll",h=S?d!==null?d+"Capture":null:d;S=[];for(var v=c,_;v!==null;){_=v;var y=_.stateNode;if(_.tag===5&&y!==null&&(_=y,h!==null&&(y=Ma(v,h),y!=null&&S.push(Ra(v,y,_)))),m)break;v=v.return}0<S.length&&(d=new p(d,g,null,n,u),f.push({event:d,listeners:S}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",d&&n!==hf&&(g=n.relatedTarget||n.fromElement)&&(qr(g)||g[qi]))break e;if((p||d)&&(d=u.window===u?u:(d=u.ownerDocument)?d.defaultView||d.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?qr(g):null,g!==null&&(m=ps(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=c),p!==g)){if(S=r0,y="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(S=o0,y="onPointerLeave",h="onPointerEnter",v="pointer"),m=p==null?d:qs(p),_=g==null?d:qs(g),d=new S(y,v+"leave",p,n,u),d.target=m,d.relatedTarget=_,y=null,qr(u)===c&&(S=new S(h,v+"enter",g,n,u),S.target=_,S.relatedTarget=m,y=S),m=y,p&&g)t:{for(S=p,h=g,v=0,_=S;_;_=Es(_))v++;for(_=0,y=h;y;y=Es(y))_++;for(;0<v-_;)S=Es(S),v--;for(;0<_-v;)h=Es(h),_--;for(;v--;){if(S===h||h!==null&&S===h.alternate)break t;S=Es(S),h=Es(h)}S=null}else S=null;p!==null&&v0(f,d,p,S,!1),g!==null&&m!==null&&v0(f,m,g,S,!0)}}e:{if(d=c?qs(c):window,p=d.nodeName&&d.nodeName.toLowerCase(),p==="select"||p==="input"&&d.type==="file")var w=MM;else if(c0(d))if(Gx)w=bM;else{w=wM;var E=EM}else(p=d.nodeName)&&p.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(w=TM);if(w&&(w=w(t,c))){Hx(f,w,n,u);break e}E&&E(t,d,c),t==="focusout"&&(E=d._wrapperState)&&E.controlled&&d.type==="number"&&lf(d,"number",d.value)}switch(E=c?qs(c):window,t){case"focusin":(c0(E)||E.contentEditable==="true")&&(Xs=E,yf=c,ca=null);break;case"focusout":ca=yf=Xs=null;break;case"mousedown":Sf=!0;break;case"contextmenu":case"mouseup":case"dragend":Sf=!1,p0(f,n,u);break;case"selectionchange":if(RM)break;case"keydown":case"keyup":p0(f,n,u)}var A;if(Mp)e:{switch(t){case"compositionstart":var x="onCompositionStart";break e;case"compositionend":x="onCompositionEnd";break e;case"compositionupdate":x="onCompositionUpdate";break e}x=void 0}else Ws?zx(t,n)&&(x="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(x="onCompositionStart");x&&(Bx&&n.locale!=="ko"&&(Ws||x!=="onCompositionStart"?x==="onCompositionEnd"&&Ws&&(A=kx()):(mr=u,_p="value"in mr?mr.value:mr.textContent,Ws=!0)),E=Cc(c,x),0<E.length&&(x=new s0(x,t,null,n,u),f.push({event:x,listeners:E}),A?x.data=A:(A=Vx(n),A!==null&&(x.data=A)))),(A=vM?xM(t,n):_M(t,n))&&(c=Cc(c,"onBeforeInput"),0<c.length&&(u=new s0("onBeforeInput","beforeinput",null,n,u),f.push({event:u,listeners:c}),u.data=A))}Qx(f,e)})}function Ra(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Cc(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=Ma(t,n),s!=null&&i.unshift(Ra(t,s,r)),s=Ma(t,e),s!=null&&i.push(Ra(t,s,r))),t=t.return}return i}function Es(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function v0(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,c=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&c!==null&&(a=c,r?(l=Ma(n,s),l!=null&&o.unshift(Ra(n,l,a))):r||(l=Ma(n,s),l!=null&&o.push(Ra(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var DM=/\r\n?/g,IM=/\u0000|\uFFFD/g;function x0(t){return(typeof t=="string"?t:""+t).replace(DM,`
`).replace(IM,"")}function pl(t,e,n){if(e=x0(e),x0(t)!==e&&n)throw Error(de(425))}function Rc(){}var Mf=null,Ef=null;function wf(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Tf=typeof setTimeout=="function"?setTimeout:void 0,UM=typeof clearTimeout=="function"?clearTimeout:void 0,_0=typeof Promise=="function"?Promise:void 0,FM=typeof queueMicrotask=="function"?queueMicrotask:typeof _0<"u"?function(t){return _0.resolve(null).then(t).catch(OM)}:Tf;function OM(t){setTimeout(function(){throw t})}function $u(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),Ta(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);Ta(e)}function Mr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function y0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var To=Math.random().toString(36).slice(2),Ei="__reactFiber$"+To,Pa="__reactProps$"+To,qi="__reactContainer$"+To,bf="__reactEvents$"+To,kM="__reactListeners$"+To,BM="__reactHandles$"+To;function qr(t){var e=t[Ei];if(e)return e;for(var n=t.parentNode;n;){if(e=n[qi]||n[Ei]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=y0(t);t!==null;){if(n=t[Ei])return n;t=y0(t)}return e}t=n,n=t.parentNode}return null}function Ka(t){return t=t[Ei]||t[qi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function qs(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(de(33))}function cu(t){return t[Pa]||null}var Af=[],Ys=-1;function Lr(t){return{current:t}}function wt(t){0>Ys||(t.current=Af[Ys],Af[Ys]=null,Ys--)}function St(t,e){Ys++,Af[Ys]=t.current,t.current=e}var Rr={},fn=Lr(Rr),wn=Lr(!1),ns=Rr;function fo(t,e){var n=t.type.contextTypes;if(!n)return Rr;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function Tn(t){return t=t.childContextTypes,t!=null}function Pc(){wt(wn),wt(fn)}function S0(t,e,n){if(fn.current!==Rr)throw Error(de(168));St(fn,e),St(wn,n)}function t_(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(de(108,E1(t)||"Unknown",r));return Pt({},n,i)}function Nc(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rr,ns=fn.current,St(fn,t),St(wn,wn.current),!0}function M0(t,e,n){var i=t.stateNode;if(!i)throw Error(de(169));n?(t=t_(t,e,ns),i.__reactInternalMemoizedMergedChildContext=t,wt(wn),wt(fn),St(fn,t)):wt(wn),St(wn,n)}var ki=null,uu=!1,Ku=!1;function n_(t){ki===null?ki=[t]:ki.push(t)}function zM(t){uu=!0,n_(t)}function Dr(){if(!Ku&&ki!==null){Ku=!0;var t=0,e=pt;try{var n=ki;for(pt=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ki=null,uu=!1}catch(r){throw ki!==null&&(ki=ki.slice(t+1)),Ax(mp,Dr),r}finally{pt=e,Ku=!1}}return null}var $s=[],Ks=0,Lc=null,Dc=0,Gn=[],Wn=0,is=null,zi=1,Vi="";function Hr(t,e){$s[Ks++]=Dc,$s[Ks++]=Lc,Lc=t,Dc=e}function i_(t,e,n){Gn[Wn++]=zi,Gn[Wn++]=Vi,Gn[Wn++]=is,is=t;var i=zi;t=Vi;var r=32-ai(i)-1;i&=~(1<<r),n+=1;var s=32-ai(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,zi=1<<32-ai(e)+r|n<<r|i,Vi=s+t}else zi=1<<s|n<<r|i,Vi=t}function wp(t){t.return!==null&&(Hr(t,1),i_(t,1,0))}function Tp(t){for(;t===Lc;)Lc=$s[--Ks],$s[Ks]=null,Dc=$s[--Ks],$s[Ks]=null;for(;t===is;)is=Gn[--Wn],Gn[Wn]=null,Vi=Gn[--Wn],Gn[Wn]=null,zi=Gn[--Wn],Gn[Wn]=null}var Fn=null,Un=null,Tt=!1,ii=null;function r_(t,e){var n=Xn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function E0(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Fn=t,Un=Mr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Fn=t,Un=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=is!==null?{id:zi,overflow:Vi}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Xn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Fn=t,Un=null,!0):!1;default:return!1}}function Cf(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Rf(t){if(Tt){var e=Un;if(e){var n=e;if(!E0(t,e)){if(Cf(t))throw Error(de(418));e=Mr(n.nextSibling);var i=Fn;e&&E0(t,e)?r_(i,n):(t.flags=t.flags&-4097|2,Tt=!1,Fn=t)}}else{if(Cf(t))throw Error(de(418));t.flags=t.flags&-4097|2,Tt=!1,Fn=t}}}function w0(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Fn=t}function ml(t){if(t!==Fn)return!1;if(!Tt)return w0(t),Tt=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!wf(t.type,t.memoizedProps)),e&&(e=Un)){if(Cf(t))throw s_(),Error(de(418));for(;e;)r_(t,e),e=Mr(e.nextSibling)}if(w0(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(de(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Un=Mr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Un=null}}else Un=Fn?Mr(t.stateNode.nextSibling):null;return!0}function s_(){for(var t=Un;t;)t=Mr(t.nextSibling)}function ho(){Un=Fn=null,Tt=!1}function bp(t){ii===null?ii=[t]:ii.push(t)}var VM=Ji.ReactCurrentBatchConfig;function Fo(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(de(309));var i=n.stateNode}if(!i)throw Error(de(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(de(284));if(!n._owner)throw Error(de(290,t))}return t}function gl(t,e){throw t=Object.prototype.toString.call(e),Error(de(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function T0(t){var e=t._init;return e(t._payload)}function o_(t){function e(h,v){if(t){var _=h.deletions;_===null?(h.deletions=[v],h.flags|=16):_.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h,v){for(h=new Map;v!==null;)v.key!==null?h.set(v.key,v):h.set(v.index,v),v=v.sibling;return h}function r(h,v){return h=br(h,v),h.index=0,h.sibling=null,h}function s(h,v,_){return h.index=_,t?(_=h.alternate,_!==null?(_=_.index,_<v?(h.flags|=2,v):_):(h.flags|=2,v)):(h.flags|=1048576,v)}function o(h){return t&&h.alternate===null&&(h.flags|=2),h}function a(h,v,_,y){return v===null||v.tag!==6?(v=id(_,h.mode,y),v.return=h,v):(v=r(v,_),v.return=h,v)}function l(h,v,_,y){var w=_.type;return w===Gs?u(h,v,_.props.children,y,_.key):v!==null&&(v.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ur&&T0(w)===v.type)?(y=r(v,_.props),y.ref=Fo(h,v,_),y.return=h,y):(y=uc(_.type,_.key,_.props,null,h.mode,y),y.ref=Fo(h,v,_),y.return=h,y)}function c(h,v,_,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==_.containerInfo||v.stateNode.implementation!==_.implementation?(v=rd(_,h.mode,y),v.return=h,v):(v=r(v,_.children||[]),v.return=h,v)}function u(h,v,_,y,w){return v===null||v.tag!==7?(v=ts(_,h.mode,y,w),v.return=h,v):(v=r(v,_),v.return=h,v)}function f(h,v,_){if(typeof v=="string"&&v!==""||typeof v=="number")return v=id(""+v,h.mode,_),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case sl:return _=uc(v.type,v.key,v.props,null,h.mode,_),_.ref=Fo(h,null,v),_.return=h,_;case Hs:return v=rd(v,h.mode,_),v.return=h,v;case ur:var y=v._init;return f(h,y(v._payload),_)}if(Ko(v)||No(v))return v=ts(v,h.mode,_,null),v.return=h,v;gl(h,v)}return null}function d(h,v,_,y){var w=v!==null?v.key:null;if(typeof _=="string"&&_!==""||typeof _=="number")return w!==null?null:a(h,v,""+_,y);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case sl:return _.key===w?l(h,v,_,y):null;case Hs:return _.key===w?c(h,v,_,y):null;case ur:return w=_._init,d(h,v,w(_._payload),y)}if(Ko(_)||No(_))return w!==null?null:u(h,v,_,y,null);gl(h,_)}return null}function p(h,v,_,y,w){if(typeof y=="string"&&y!==""||typeof y=="number")return h=h.get(_)||null,a(v,h,""+y,w);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case sl:return h=h.get(y.key===null?_:y.key)||null,l(v,h,y,w);case Hs:return h=h.get(y.key===null?_:y.key)||null,c(v,h,y,w);case ur:var E=y._init;return p(h,v,_,E(y._payload),w)}if(Ko(y)||No(y))return h=h.get(_)||null,u(v,h,y,w,null);gl(v,y)}return null}function g(h,v,_,y){for(var w=null,E=null,A=v,x=v=0,b=null;A!==null&&x<_.length;x++){A.index>x?(b=A,A=null):b=A.sibling;var R=d(h,A,_[x],y);if(R===null){A===null&&(A=b);break}t&&A&&R.alternate===null&&e(h,A),v=s(R,v,x),E===null?w=R:E.sibling=R,E=R,A=b}if(x===_.length)return n(h,A),Tt&&Hr(h,x),w;if(A===null){for(;x<_.length;x++)A=f(h,_[x],y),A!==null&&(v=s(A,v,x),E===null?w=A:E.sibling=A,E=A);return Tt&&Hr(h,x),w}for(A=i(h,A);x<_.length;x++)b=p(A,h,x,_[x],y),b!==null&&(t&&b.alternate!==null&&A.delete(b.key===null?x:b.key),v=s(b,v,x),E===null?w=b:E.sibling=b,E=b);return t&&A.forEach(function(N){return e(h,N)}),Tt&&Hr(h,x),w}function S(h,v,_,y){var w=No(_);if(typeof w!="function")throw Error(de(150));if(_=w.call(_),_==null)throw Error(de(151));for(var E=w=null,A=v,x=v=0,b=null,R=_.next();A!==null&&!R.done;x++,R=_.next()){A.index>x?(b=A,A=null):b=A.sibling;var N=d(h,A,R.value,y);if(N===null){A===null&&(A=b);break}t&&A&&N.alternate===null&&e(h,A),v=s(N,v,x),E===null?w=N:E.sibling=N,E=N,A=b}if(R.done)return n(h,A),Tt&&Hr(h,x),w;if(A===null){for(;!R.done;x++,R=_.next())R=f(h,R.value,y),R!==null&&(v=s(R,v,x),E===null?w=R:E.sibling=R,E=R);return Tt&&Hr(h,x),w}for(A=i(h,A);!R.done;x++,R=_.next())R=p(A,h,x,R.value,y),R!==null&&(t&&R.alternate!==null&&A.delete(R.key===null?x:R.key),v=s(R,v,x),E===null?w=R:E.sibling=R,E=R);return t&&A.forEach(function(U){return e(h,U)}),Tt&&Hr(h,x),w}function m(h,v,_,y){if(typeof _=="object"&&_!==null&&_.type===Gs&&_.key===null&&(_=_.props.children),typeof _=="object"&&_!==null){switch(_.$$typeof){case sl:e:{for(var w=_.key,E=v;E!==null;){if(E.key===w){if(w=_.type,w===Gs){if(E.tag===7){n(h,E.sibling),v=r(E,_.props.children),v.return=h,h=v;break e}}else if(E.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ur&&T0(w)===E.type){n(h,E.sibling),v=r(E,_.props),v.ref=Fo(h,E,_),v.return=h,h=v;break e}n(h,E);break}else e(h,E);E=E.sibling}_.type===Gs?(v=ts(_.props.children,h.mode,y,_.key),v.return=h,h=v):(y=uc(_.type,_.key,_.props,null,h.mode,y),y.ref=Fo(h,v,_),y.return=h,h=y)}return o(h);case Hs:e:{for(E=_.key;v!==null;){if(v.key===E)if(v.tag===4&&v.stateNode.containerInfo===_.containerInfo&&v.stateNode.implementation===_.implementation){n(h,v.sibling),v=r(v,_.children||[]),v.return=h,h=v;break e}else{n(h,v);break}else e(h,v);v=v.sibling}v=rd(_,h.mode,y),v.return=h,h=v}return o(h);case ur:return E=_._init,m(h,v,E(_._payload),y)}if(Ko(_))return g(h,v,_,y);if(No(_))return S(h,v,_,y);gl(h,_)}return typeof _=="string"&&_!==""||typeof _=="number"?(_=""+_,v!==null&&v.tag===6?(n(h,v.sibling),v=r(v,_),v.return=h,h=v):(n(h,v),v=id(_,h.mode,y),v.return=h,h=v),o(h)):n(h,v)}return m}var po=o_(!0),a_=o_(!1),Ic=Lr(null),Uc=null,Zs=null,Ap=null;function Cp(){Ap=Zs=Uc=null}function Rp(t){var e=Ic.current;wt(Ic),t._currentValue=e}function Pf(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function so(t,e){Uc=t,Ap=Zs=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(En=!0),t.firstContext=null)}function Yn(t){var e=t._currentValue;if(Ap!==t)if(t={context:t,memoizedValue:e,next:null},Zs===null){if(Uc===null)throw Error(de(308));Zs=t,Uc.dependencies={lanes:0,firstContext:t}}else Zs=Zs.next=t;return e}var Yr=null;function Pp(t){Yr===null?Yr=[t]:Yr.push(t)}function l_(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,Pp(e)):(n.next=r.next,r.next=n),e.interleaved=n,Yi(t,i)}function Yi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var dr=!1;function Np(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function c_(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Gi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Er(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,ut&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,Yi(t,n)}return r=i.interleaved,r===null?(e.next=e,Pp(i)):(e.next=r.next,r.next=e),i.interleaved=e,Yi(t,n)}function rc(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gp(t,n)}}function b0(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Fc(t,e,n,i){var r=t.updateQueue;dr=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,c=l.next;l.next=null,o===null?s=c:o.next=c,o=l;var u=t.alternate;u!==null&&(u=u.updateQueue,a=u.lastBaseUpdate,a!==o&&(a===null?u.firstBaseUpdate=c:a.next=c,u.lastBaseUpdate=l))}if(s!==null){var f=r.baseState;o=0,u=c=l=null,a=s;do{var d=a.lane,p=a.eventTime;if((i&d)===d){u!==null&&(u=u.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,S=a;switch(d=e,p=n,S.tag){case 1:if(g=S.payload,typeof g=="function"){f=g.call(p,f,d);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=S.payload,d=typeof g=="function"?g.call(p,f,d):g,d==null)break e;f=Pt({},f,d);break e;case 2:dr=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,d=r.effects,d===null?r.effects=[a]:d.push(a))}else p={eventTime:p,lane:d,tag:a.tag,payload:a.payload,callback:a.callback,next:null},u===null?(c=u=p,l=f):u=u.next=p,o|=d;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;d=a,a=d.next,d.next=null,r.lastBaseUpdate=d,r.shared.pending=null}}while(1);if(u===null&&(l=f),r.baseState=l,r.firstBaseUpdate=c,r.lastBaseUpdate=u,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);ss|=o,t.lanes=o,t.memoizedState=f}}function A0(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(de(191,r));r.call(i)}}}var Za={},bi=Lr(Za),Na=Lr(Za),La=Lr(Za);function $r(t){if(t===Za)throw Error(de(174));return t}function Lp(t,e){switch(St(La,e),St(Na,t),St(bi,Za),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:uf(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=uf(e,t)}wt(bi),St(bi,e)}function mo(){wt(bi),wt(Na),wt(La)}function u_(t){$r(La.current);var e=$r(bi.current),n=uf(e,t.type);e!==n&&(St(Na,t),St(bi,n))}function Dp(t){Na.current===t&&(wt(bi),wt(Na))}var bt=Lr(0);function Oc(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Zu=[];function Ip(){for(var t=0;t<Zu.length;t++)Zu[t]._workInProgressVersionPrimary=null;Zu.length=0}var sc=Ji.ReactCurrentDispatcher,Ju=Ji.ReactCurrentBatchConfig,rs=0,Rt=null,Wt=null,$t=null,kc=!1,ua=!1,Da=0,HM=0;function rn(){throw Error(de(321))}function Up(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ui(t[n],e[n]))return!1;return!0}function Fp(t,e,n,i,r,s){if(rs=s,Rt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,sc.current=t===null||t.memoizedState===null?jM:qM,t=n(i,r),ua){s=0;do{if(ua=!1,Da=0,25<=s)throw Error(de(301));s+=1,$t=Wt=null,e.updateQueue=null,sc.current=YM,t=n(i,r)}while(ua)}if(sc.current=Bc,e=Wt!==null&&Wt.next!==null,rs=0,$t=Wt=Rt=null,kc=!1,e)throw Error(de(300));return t}function Op(){var t=Da!==0;return Da=0,t}function Si(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return $t===null?Rt.memoizedState=$t=t:$t=$t.next=t,$t}function $n(){if(Wt===null){var t=Rt.alternate;t=t!==null?t.memoizedState:null}else t=Wt.next;var e=$t===null?Rt.memoizedState:$t.next;if(e!==null)$t=e,Wt=t;else{if(t===null)throw Error(de(310));Wt=t,t={memoizedState:Wt.memoizedState,baseState:Wt.baseState,baseQueue:Wt.baseQueue,queue:Wt.queue,next:null},$t===null?Rt.memoizedState=$t=t:$t=$t.next=t}return $t}function Ia(t,e){return typeof e=="function"?e(t):e}function Qu(t){var e=$n(),n=e.queue;if(n===null)throw Error(de(311));n.lastRenderedReducer=t;var i=Wt,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,c=s;do{var u=c.lane;if((rs&u)===u)l!==null&&(l=l.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),i=c.hasEagerState?c.eagerState:t(i,c.action);else{var f={lane:u,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};l===null?(a=l=f,o=i):l=l.next=f,Rt.lanes|=u,ss|=u}c=c.next}while(c!==null&&c!==s);l===null?o=i:l.next=a,ui(i,e.memoizedState)||(En=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,Rt.lanes|=s,ss|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ed(t){var e=$n(),n=e.queue;if(n===null)throw Error(de(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);ui(s,e.memoizedState)||(En=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function d_(){}function f_(t,e){var n=Rt,i=$n(),r=e(),s=!ui(i.memoizedState,r);if(s&&(i.memoizedState=r,En=!0),i=i.queue,kp(m_.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||$t!==null&&$t.memoizedState.tag&1){if(n.flags|=2048,Ua(9,p_.bind(null,n,i,r,e),void 0,null),Kt===null)throw Error(de(349));rs&30||h_(n,e,r)}return r}function h_(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function p_(t,e,n,i){e.value=n,e.getSnapshot=i,g_(e)&&v_(t)}function m_(t,e,n){return n(function(){g_(e)&&v_(t)})}function g_(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ui(t,n)}catch{return!0}}function v_(t){var e=Yi(t,1);e!==null&&li(e,t,1,-1)}function C0(t){var e=Si();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ia,lastRenderedState:t},e.queue=t,t=t.dispatch=XM.bind(null,Rt,t),[e.memoizedState,t]}function Ua(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=Rt.updateQueue,e===null?(e={lastEffect:null,stores:null},Rt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function x_(){return $n().memoizedState}function oc(t,e,n,i){var r=Si();Rt.flags|=t,r.memoizedState=Ua(1|e,n,void 0,i===void 0?null:i)}function du(t,e,n,i){var r=$n();i=i===void 0?null:i;var s=void 0;if(Wt!==null){var o=Wt.memoizedState;if(s=o.destroy,i!==null&&Up(i,o.deps)){r.memoizedState=Ua(e,n,s,i);return}}Rt.flags|=t,r.memoizedState=Ua(1|e,n,s,i)}function R0(t,e){return oc(8390656,8,t,e)}function kp(t,e){return du(2048,8,t,e)}function __(t,e){return du(4,2,t,e)}function y_(t,e){return du(4,4,t,e)}function S_(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function M_(t,e,n){return n=n!=null?n.concat([t]):null,du(4,4,S_.bind(null,e,t),n)}function Bp(){}function E_(t,e){var n=$n();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Up(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function w_(t,e){var n=$n();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Up(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function T_(t,e,n){return rs&21?(ui(n,e)||(n=Px(),Rt.lanes|=n,ss|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,En=!0),t.memoizedState=n)}function GM(t,e){var n=pt;pt=n!==0&&4>n?n:4,t(!0);var i=Ju.transition;Ju.transition={};try{t(!1),e()}finally{pt=n,Ju.transition=i}}function b_(){return $n().memoizedState}function WM(t,e,n){var i=Tr(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},A_(t))C_(e,n);else if(n=l_(t,e,n,i),n!==null){var r=gn();li(n,t,i,r),R_(n,e,i)}}function XM(t,e,n){var i=Tr(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(A_(t))C_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,ui(a,o)){var l=e.interleaved;l===null?(r.next=r,Pp(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=l_(t,e,r,i),n!==null&&(r=gn(),li(n,t,i,r),R_(n,e,i))}}function A_(t){var e=t.alternate;return t===Rt||e!==null&&e===Rt}function C_(t,e){ua=kc=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function R_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,gp(t,n)}}var Bc={readContext:Yn,useCallback:rn,useContext:rn,useEffect:rn,useImperativeHandle:rn,useInsertionEffect:rn,useLayoutEffect:rn,useMemo:rn,useReducer:rn,useRef:rn,useState:rn,useDebugValue:rn,useDeferredValue:rn,useTransition:rn,useMutableSource:rn,useSyncExternalStore:rn,useId:rn,unstable_isNewReconciler:!1},jM={readContext:Yn,useCallback:function(t,e){return Si().memoizedState=[t,e===void 0?null:e],t},useContext:Yn,useEffect:R0,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,oc(4194308,4,S_.bind(null,e,t),n)},useLayoutEffect:function(t,e){return oc(4194308,4,t,e)},useInsertionEffect:function(t,e){return oc(4,2,t,e)},useMemo:function(t,e){var n=Si();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Si();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=WM.bind(null,Rt,t),[i.memoizedState,t]},useRef:function(t){var e=Si();return t={current:t},e.memoizedState=t},useState:C0,useDebugValue:Bp,useDeferredValue:function(t){return Si().memoizedState=t},useTransition:function(){var t=C0(!1),e=t[0];return t=GM.bind(null,t[1]),Si().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=Rt,r=Si();if(Tt){if(n===void 0)throw Error(de(407));n=n()}else{if(n=e(),Kt===null)throw Error(de(349));rs&30||h_(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,R0(m_.bind(null,i,s,t),[t]),i.flags|=2048,Ua(9,p_.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Si(),e=Kt.identifierPrefix;if(Tt){var n=Vi,i=zi;n=(i&~(1<<32-ai(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=Da++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=HM++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},qM={readContext:Yn,useCallback:E_,useContext:Yn,useEffect:kp,useImperativeHandle:M_,useInsertionEffect:__,useLayoutEffect:y_,useMemo:w_,useReducer:Qu,useRef:x_,useState:function(){return Qu(Ia)},useDebugValue:Bp,useDeferredValue:function(t){var e=$n();return T_(e,Wt.memoizedState,t)},useTransition:function(){var t=Qu(Ia)[0],e=$n().memoizedState;return[t,e]},useMutableSource:d_,useSyncExternalStore:f_,useId:b_,unstable_isNewReconciler:!1},YM={readContext:Yn,useCallback:E_,useContext:Yn,useEffect:kp,useImperativeHandle:M_,useInsertionEffect:__,useLayoutEffect:y_,useMemo:w_,useReducer:ed,useRef:x_,useState:function(){return ed(Ia)},useDebugValue:Bp,useDeferredValue:function(t){var e=$n();return Wt===null?e.memoizedState=t:T_(e,Wt.memoizedState,t)},useTransition:function(){var t=ed(Ia)[0],e=$n().memoizedState;return[t,e]},useMutableSource:d_,useSyncExternalStore:f_,useId:b_,unstable_isNewReconciler:!1};function ti(t,e){if(t&&t.defaultProps){e=Pt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Nf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Pt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var fu={isMounted:function(t){return(t=t._reactInternals)?ps(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=gn(),r=Tr(t),s=Gi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Er(t,s,r),e!==null&&(li(e,t,r,i),rc(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=gn(),r=Tr(t),s=Gi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Er(t,s,r),e!==null&&(li(e,t,r,i),rc(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=gn(),i=Tr(t),r=Gi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Er(t,r,i),e!==null&&(li(e,t,i,n),rc(e,t,i))}};function P0(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!Aa(n,i)||!Aa(r,s):!0}function P_(t,e,n){var i=!1,r=Rr,s=e.contextType;return typeof s=="object"&&s!==null?s=Yn(s):(r=Tn(e)?ns:fn.current,i=e.contextTypes,s=(i=i!=null)?fo(t,r):Rr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=fu,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function N0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&fu.enqueueReplaceState(e,e.state,null)}function Lf(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},Np(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Yn(s):(s=Tn(e)?ns:fn.current,r.context=fo(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(Nf(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&fu.enqueueReplaceState(r,r.state,null),Fc(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function go(t,e){try{var n="",i=e;do n+=M1(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function td(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Df(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var $M=typeof WeakMap=="function"?WeakMap:Map;function N_(t,e,n){n=Gi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){Vc||(Vc=!0,Gf=i),Df(t,e)},n}function L_(t,e,n){n=Gi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Df(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Df(t,e),typeof i!="function"&&(wr===null?wr=new Set([this]):wr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function L0(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new $M;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=cE.bind(null,t,e,n),e.then(t,t))}function D0(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function I0(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Gi(-1,1),e.tag=2,Er(n,e,1))),n.lanes|=1),t)}var KM=Ji.ReactCurrentOwner,En=!1;function mn(t,e,n,i){e.child=t===null?a_(e,null,n,i):po(e,t.child,n,i)}function U0(t,e,n,i,r){n=n.render;var s=e.ref;return so(e,r),i=Fp(t,e,n,i,s,r),n=Op(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,$i(t,e,r)):(Tt&&n&&wp(e),e.flags|=1,mn(t,e,i,r),e.child)}function F0(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!qp(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,D_(t,e,s,i,r)):(t=uc(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:Aa,n(o,i)&&t.ref===e.ref)return $i(t,e,r)}return e.flags|=1,t=br(s,i),t.ref=e.ref,t.return=e,e.child=t}function D_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(Aa(s,i)&&t.ref===e.ref)if(En=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(En=!0);else return e.lanes=t.lanes,$i(t,e,r)}return If(t,e,n,i,r)}function I_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},St(Qs,Ln),Ln|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,St(Qs,Ln),Ln|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,St(Qs,Ln),Ln|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,St(Qs,Ln),Ln|=i;return mn(t,e,r,n),e.child}function U_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function If(t,e,n,i,r){var s=Tn(n)?ns:fn.current;return s=fo(e,s),so(e,r),n=Fp(t,e,n,i,s,r),i=Op(),t!==null&&!En?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,$i(t,e,r)):(Tt&&i&&wp(e),e.flags|=1,mn(t,e,n,r),e.child)}function O0(t,e,n,i,r){if(Tn(n)){var s=!0;Nc(e)}else s=!1;if(so(e,r),e.stateNode===null)ac(t,e),P_(e,n,i),Lf(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Yn(c):(c=Tn(n)?ns:fn.current,c=fo(e,c));var u=n.getDerivedStateFromProps,f=typeof u=="function"||typeof o.getSnapshotBeforeUpdate=="function";f||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==c)&&N0(e,o,i,c),dr=!1;var d=e.memoizedState;o.state=d,Fc(e,i,o,r),l=e.memoizedState,a!==i||d!==l||wn.current||dr?(typeof u=="function"&&(Nf(e,n,u,i),l=e.memoizedState),(a=dr||P0(e,n,a,i,d,l,c))?(f||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=c,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,c_(t,e),a=e.memoizedProps,c=e.type===e.elementType?a:ti(e.type,a),o.props=c,f=e.pendingProps,d=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Yn(l):(l=Tn(n)?ns:fn.current,l=fo(e,l));var p=n.getDerivedStateFromProps;(u=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==f||d!==l)&&N0(e,o,i,l),dr=!1,d=e.memoizedState,o.state=d,Fc(e,i,o,r);var g=e.memoizedState;a!==f||d!==g||wn.current||dr?(typeof p=="function"&&(Nf(e,n,p,i),g=e.memoizedState),(c=dr||P0(e,n,c,i,d,g,l)||!1)?(u||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=c):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),i=!1)}return Uf(t,e,n,i,s,r)}function Uf(t,e,n,i,r,s){U_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&M0(e,n,!1),$i(t,e,s);i=e.stateNode,KM.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=po(e,t.child,null,s),e.child=po(e,null,a,s)):mn(t,e,a,s),e.memoizedState=i.state,r&&M0(e,n,!0),e.child}function F_(t){var e=t.stateNode;e.pendingContext?S0(t,e.pendingContext,e.pendingContext!==e.context):e.context&&S0(t,e.context,!1),Lp(t,e.containerInfo)}function k0(t,e,n,i,r){return ho(),bp(r),e.flags|=256,mn(t,e,n,i),e.child}var Ff={dehydrated:null,treeContext:null,retryLane:0};function Of(t){return{baseLanes:t,cachePool:null,transitions:null}}function O_(t,e,n){var i=e.pendingProps,r=bt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),St(bt,r&1),t===null)return Rf(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=mu(o,i,0,null),t=ts(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Of(n),e.memoizedState=Ff,t):zp(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return ZM(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=br(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=br(a,s):(s=ts(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Of(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Ff,i}return s=t.child,t=s.sibling,i=br(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function zp(t,e){return e=mu({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function vl(t,e,n,i){return i!==null&&bp(i),po(e,t.child,null,n),t=zp(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function ZM(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=td(Error(de(422))),vl(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=mu({mode:"visible",children:i.children},r,0,null),s=ts(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&po(e,t.child,null,o),e.child.memoizedState=Of(o),e.memoizedState=Ff,s);if(!(e.mode&1))return vl(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(de(419)),i=td(s,i,void 0),vl(t,e,o,i)}if(a=(o&t.childLanes)!==0,En||a){if(i=Kt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,Yi(t,r),li(i,t,r,-1))}return jp(),i=td(Error(de(421))),vl(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=uE.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,Un=Mr(r.nextSibling),Fn=e,Tt=!0,ii=null,t!==null&&(Gn[Wn++]=zi,Gn[Wn++]=Vi,Gn[Wn++]=is,zi=t.id,Vi=t.overflow,is=e),e=zp(e,i.children),e.flags|=4096,e)}function B0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),Pf(t.return,e,n)}function nd(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function k_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(mn(t,e,i.children,n),i=bt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&B0(t,n,e);else if(t.tag===19)B0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(St(bt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Oc(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),nd(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Oc(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}nd(e,!0,n,null,s);break;case"together":nd(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function ac(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function $i(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ss|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(de(153));if(e.child!==null){for(t=e.child,n=br(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=br(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function JM(t,e,n){switch(e.tag){case 3:F_(e),ho();break;case 5:u_(e);break;case 1:Tn(e.type)&&Nc(e);break;case 4:Lp(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;St(Ic,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(St(bt,bt.current&1),e.flags|=128,null):n&e.child.childLanes?O_(t,e,n):(St(bt,bt.current&1),t=$i(t,e,n),t!==null?t.sibling:null);St(bt,bt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return k_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),St(bt,bt.current),i)break;return null;case 22:case 23:return e.lanes=0,I_(t,e,n)}return $i(t,e,n)}var B_,kf,z_,V_;B_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};kf=function(){};z_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,$r(bi.current);var s=null;switch(n){case"input":r=of(t,r),i=of(t,i),s=[];break;case"select":r=Pt({},r,{value:void 0}),i=Pt({},i,{value:void 0}),s=[];break;case"textarea":r=cf(t,r),i=cf(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=Rc)}df(n,i);var o;n=null;for(c in r)if(!i.hasOwnProperty(c)&&r.hasOwnProperty(c)&&r[c]!=null)if(c==="style"){var a=r[c];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(ya.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in i){var l=i[c];if(a=r!=null?r[c]:void 0,i.hasOwnProperty(c)&&l!==a&&(l!=null||a!=null))if(c==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(c,n)),n=l;else c==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(c,l)):c==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(c,""+l):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(ya.hasOwnProperty(c)?(l!=null&&c==="onScroll"&&Mt("scroll",t),s||a===l||(s=[])):(s=s||[]).push(c,l))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};V_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Oo(t,e){if(!Tt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function sn(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function QM(t,e,n){var i=e.pendingProps;switch(Tp(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return sn(e),null;case 1:return Tn(e.type)&&Pc(),sn(e),null;case 3:return i=e.stateNode,mo(),wt(wn),wt(fn),Ip(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ml(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,ii!==null&&(jf(ii),ii=null))),kf(t,e),sn(e),null;case 5:Dp(e);var r=$r(La.current);if(n=e.type,t!==null&&e.stateNode!=null)z_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(de(166));return sn(e),null}if(t=$r(bi.current),ml(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[Ei]=e,i[Pa]=s,t=(e.mode&1)!==0,n){case"dialog":Mt("cancel",i),Mt("close",i);break;case"iframe":case"object":case"embed":Mt("load",i);break;case"video":case"audio":for(r=0;r<Jo.length;r++)Mt(Jo[r],i);break;case"source":Mt("error",i);break;case"img":case"image":case"link":Mt("error",i),Mt("load",i);break;case"details":Mt("toggle",i);break;case"input":Ym(i,s),Mt("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},Mt("invalid",i);break;case"textarea":Km(i,s),Mt("invalid",i)}df(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&pl(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&pl(i.textContent,a,t),r=["children",""+a]):ya.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&Mt("scroll",i)}switch(n){case"input":ol(i),$m(i,s,!0);break;case"textarea":ol(i),Zm(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=Rc)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=mx(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[Ei]=e,t[Pa]=i,B_(t,e,!1,!1),e.stateNode=t;e:{switch(o=ff(n,i),n){case"dialog":Mt("cancel",t),Mt("close",t),r=i;break;case"iframe":case"object":case"embed":Mt("load",t),r=i;break;case"video":case"audio":for(r=0;r<Jo.length;r++)Mt(Jo[r],t);r=i;break;case"source":Mt("error",t),r=i;break;case"img":case"image":case"link":Mt("error",t),Mt("load",t),r=i;break;case"details":Mt("toggle",t),r=i;break;case"input":Ym(t,i),r=of(t,i),Mt("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=Pt({},i,{value:void 0}),Mt("invalid",t);break;case"textarea":Km(t,i),r=cf(t,i),Mt("invalid",t);break;default:r=i}df(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?xx(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&gx(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&Sa(t,l):typeof l=="number"&&Sa(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(ya.hasOwnProperty(s)?l!=null&&s==="onScroll"&&Mt("scroll",t):l!=null&&up(t,s,l,o))}switch(n){case"input":ol(t),$m(t,i,!1);break;case"textarea":ol(t),Zm(t);break;case"option":i.value!=null&&t.setAttribute("value",""+Cr(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?to(t,!!i.multiple,s,!1):i.defaultValue!=null&&to(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=Rc)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return sn(e),null;case 6:if(t&&e.stateNode!=null)V_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(de(166));if(n=$r(La.current),$r(bi.current),ml(e)){if(i=e.stateNode,n=e.memoizedProps,i[Ei]=e,(s=i.nodeValue!==n)&&(t=Fn,t!==null))switch(t.tag){case 3:pl(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&pl(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[Ei]=e,e.stateNode=i}return sn(e),null;case 13:if(wt(bt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Tt&&Un!==null&&e.mode&1&&!(e.flags&128))s_(),ho(),e.flags|=98560,s=!1;else if(s=ml(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(de(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(de(317));s[Ei]=e}else ho(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;sn(e),s=!1}else ii!==null&&(jf(ii),ii=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||bt.current&1?Xt===0&&(Xt=3):jp())),e.updateQueue!==null&&(e.flags|=4),sn(e),null);case 4:return mo(),kf(t,e),t===null&&Ca(e.stateNode.containerInfo),sn(e),null;case 10:return Rp(e.type._context),sn(e),null;case 17:return Tn(e.type)&&Pc(),sn(e),null;case 19:if(wt(bt),s=e.memoizedState,s===null)return sn(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Oo(s,!1);else{if(Xt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Oc(t),o!==null){for(e.flags|=128,Oo(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return St(bt,bt.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ft()>vo&&(e.flags|=128,i=!0,Oo(s,!1),e.lanes=4194304)}else{if(!i)if(t=Oc(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Oo(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!Tt)return sn(e),null}else 2*Ft()-s.renderingStartTime>vo&&n!==1073741824&&(e.flags|=128,i=!0,Oo(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ft(),e.sibling=null,n=bt.current,St(bt,i?n&1|2:n&1),e):(sn(e),null);case 22:case 23:return Xp(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?Ln&1073741824&&(sn(e),e.subtreeFlags&6&&(e.flags|=8192)):sn(e),null;case 24:return null;case 25:return null}throw Error(de(156,e.tag))}function eE(t,e){switch(Tp(e),e.tag){case 1:return Tn(e.type)&&Pc(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return mo(),wt(wn),wt(fn),Ip(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Dp(e),null;case 13:if(wt(bt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(de(340));ho()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return wt(bt),null;case 4:return mo(),null;case 10:return Rp(e.type._context),null;case 22:case 23:return Xp(),null;case 24:return null;default:return null}}var xl=!1,ln=!1,tE=typeof WeakSet=="function"?WeakSet:Set,Re=null;function Js(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Dt(t,e,i)}else n.current=null}function Bf(t,e,n){try{n()}catch(i){Dt(t,e,i)}}var z0=!1;function nE(t,e){if(Mf=bc,t=jx(),Ep(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,c=0,u=0,f=t,d=null;t:for(;;){for(var p;f!==n||r!==0&&f.nodeType!==3||(a=o+r),f!==s||i!==0&&f.nodeType!==3||(l=o+i),f.nodeType===3&&(o+=f.nodeValue.length),(p=f.firstChild)!==null;)d=f,f=p;for(;;){if(f===t)break t;if(d===n&&++c===r&&(a=o),d===s&&++u===i&&(l=o),(p=f.nextSibling)!==null)break;f=d,d=f.parentNode}f=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ef={focusedElem:t,selectionRange:n},bc=!1,Re=e;Re!==null;)if(e=Re,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,Re=t;else for(;Re!==null;){e=Re;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var S=g.memoizedProps,m=g.memoizedState,h=e.stateNode,v=h.getSnapshotBeforeUpdate(e.elementType===e.type?S:ti(e.type,S),m);h.__reactInternalSnapshotBeforeUpdate=v}break;case 3:var _=e.stateNode.containerInfo;_.nodeType===1?_.textContent="":_.nodeType===9&&_.documentElement&&_.removeChild(_.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(de(163))}}catch(y){Dt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,Re=t;break}Re=e.return}return g=z0,z0=!1,g}function da(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Bf(e,n,s)}r=r.next}while(r!==i)}}function hu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function zf(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function H_(t){var e=t.alternate;e!==null&&(t.alternate=null,H_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[Ei],delete e[Pa],delete e[bf],delete e[kM],delete e[BM])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function G_(t){return t.tag===5||t.tag===3||t.tag===4}function V0(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||G_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Vf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Rc));else if(i!==4&&(t=t.child,t!==null))for(Vf(t,e,n),t=t.sibling;t!==null;)Vf(t,e,n),t=t.sibling}function Hf(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Hf(t,e,n),t=t.sibling;t!==null;)Hf(t,e,n),t=t.sibling}var Jt=null,ni=!1;function nr(t,e,n){for(n=n.child;n!==null;)W_(t,e,n),n=n.sibling}function W_(t,e,n){if(Ti&&typeof Ti.onCommitFiberUnmount=="function")try{Ti.onCommitFiberUnmount(su,n)}catch{}switch(n.tag){case 5:ln||Js(n,e);case 6:var i=Jt,r=ni;Jt=null,nr(t,e,n),Jt=i,ni=r,Jt!==null&&(ni?(t=Jt,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Jt.removeChild(n.stateNode));break;case 18:Jt!==null&&(ni?(t=Jt,n=n.stateNode,t.nodeType===8?$u(t.parentNode,n):t.nodeType===1&&$u(t,n),Ta(t)):$u(Jt,n.stateNode));break;case 4:i=Jt,r=ni,Jt=n.stateNode.containerInfo,ni=!0,nr(t,e,n),Jt=i,ni=r;break;case 0:case 11:case 14:case 15:if(!ln&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Bf(n,e,o),r=r.next}while(r!==i)}nr(t,e,n);break;case 1:if(!ln&&(Js(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){Dt(n,e,a)}nr(t,e,n);break;case 21:nr(t,e,n);break;case 22:n.mode&1?(ln=(i=ln)||n.memoizedState!==null,nr(t,e,n),ln=i):nr(t,e,n);break;default:nr(t,e,n)}}function H0(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new tE),e.forEach(function(i){var r=dE.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Kn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Jt=a.stateNode,ni=!1;break e;case 3:Jt=a.stateNode.containerInfo,ni=!0;break e;case 4:Jt=a.stateNode.containerInfo,ni=!0;break e}a=a.return}if(Jt===null)throw Error(de(160));W_(s,o,r),Jt=null,ni=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(c){Dt(r,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)X_(e,t),e=e.sibling}function X_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Kn(e,t),gi(t),i&4){try{da(3,t,t.return),hu(3,t)}catch(S){Dt(t,t.return,S)}try{da(5,t,t.return)}catch(S){Dt(t,t.return,S)}}break;case 1:Kn(e,t),gi(t),i&512&&n!==null&&Js(n,n.return);break;case 5:if(Kn(e,t),gi(t),i&512&&n!==null&&Js(n,n.return),t.flags&32){var r=t.stateNode;try{Sa(r,"")}catch(S){Dt(t,t.return,S)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&hx(r,s),ff(a,o);var c=ff(a,s);for(o=0;o<l.length;o+=2){var u=l[o],f=l[o+1];u==="style"?xx(r,f):u==="dangerouslySetInnerHTML"?gx(r,f):u==="children"?Sa(r,f):up(r,u,f,c)}switch(a){case"input":af(r,s);break;case"textarea":px(r,s);break;case"select":var d=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?to(r,!!s.multiple,p,!1):d!==!!s.multiple&&(s.defaultValue!=null?to(r,!!s.multiple,s.defaultValue,!0):to(r,!!s.multiple,s.multiple?[]:"",!1))}r[Pa]=s}catch(S){Dt(t,t.return,S)}}break;case 6:if(Kn(e,t),gi(t),i&4){if(t.stateNode===null)throw Error(de(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(S){Dt(t,t.return,S)}}break;case 3:if(Kn(e,t),gi(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Ta(e.containerInfo)}catch(S){Dt(t,t.return,S)}break;case 4:Kn(e,t),gi(t);break;case 13:Kn(e,t),gi(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(Gp=Ft())),i&4&&H0(t);break;case 22:if(u=n!==null&&n.memoizedState!==null,t.mode&1?(ln=(c=ln)||u,Kn(e,t),ln=c):Kn(e,t),gi(t),i&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!u&&t.mode&1)for(Re=t,u=t.child;u!==null;){for(f=Re=u;Re!==null;){switch(d=Re,p=d.child,d.tag){case 0:case 11:case 14:case 15:da(4,d,d.return);break;case 1:Js(d,d.return);var g=d.stateNode;if(typeof g.componentWillUnmount=="function"){i=d,n=d.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(S){Dt(i,n,S)}}break;case 5:Js(d,d.return);break;case 22:if(d.memoizedState!==null){W0(f);continue}}p!==null?(p.return=d,Re=p):W0(f)}u=u.sibling}e:for(u=null,f=t;;){if(f.tag===5){if(u===null){u=f;try{r=f.stateNode,c?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=f.stateNode,l=f.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=vx("display",o))}catch(S){Dt(t,t.return,S)}}}else if(f.tag===6){if(u===null)try{f.stateNode.nodeValue=c?"":f.memoizedProps}catch(S){Dt(t,t.return,S)}}else if((f.tag!==22&&f.tag!==23||f.memoizedState===null||f===t)&&f.child!==null){f.child.return=f,f=f.child;continue}if(f===t)break e;for(;f.sibling===null;){if(f.return===null||f.return===t)break e;u===f&&(u=null),f=f.return}u===f&&(u=null),f.sibling.return=f.return,f=f.sibling}}break;case 19:Kn(e,t),gi(t),i&4&&H0(t);break;case 21:break;default:Kn(e,t),gi(t)}}function gi(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(G_(n)){var i=n;break e}n=n.return}throw Error(de(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(Sa(r,""),i.flags&=-33);var s=V0(t);Hf(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=V0(t);Vf(t,a,o);break;default:throw Error(de(161))}}catch(l){Dt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function iE(t,e,n){Re=t,j_(t)}function j_(t,e,n){for(var i=(t.mode&1)!==0;Re!==null;){var r=Re,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||xl;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||ln;a=xl;var c=ln;if(xl=o,(ln=l)&&!c)for(Re=r;Re!==null;)o=Re,l=o.child,o.tag===22&&o.memoizedState!==null?X0(r):l!==null?(l.return=o,Re=l):X0(r);for(;s!==null;)Re=s,j_(s),s=s.sibling;Re=r,xl=a,ln=c}G0(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,Re=s):G0(t)}}function G0(t){for(;Re!==null;){var e=Re;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:ln||hu(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!ln)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:ti(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&A0(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}A0(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var u=c.memoizedState;if(u!==null){var f=u.dehydrated;f!==null&&Ta(f)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(de(163))}ln||e.flags&512&&zf(e)}catch(d){Dt(e,e.return,d)}}if(e===t){Re=null;break}if(n=e.sibling,n!==null){n.return=e.return,Re=n;break}Re=e.return}}function W0(t){for(;Re!==null;){var e=Re;if(e===t){Re=null;break}var n=e.sibling;if(n!==null){n.return=e.return,Re=n;break}Re=e.return}}function X0(t){for(;Re!==null;){var e=Re;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{hu(4,e)}catch(l){Dt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){Dt(e,r,l)}}var s=e.return;try{zf(e)}catch(l){Dt(e,s,l)}break;case 5:var o=e.return;try{zf(e)}catch(l){Dt(e,o,l)}}}catch(l){Dt(e,e.return,l)}if(e===t){Re=null;break}var a=e.sibling;if(a!==null){a.return=e.return,Re=a;break}Re=e.return}}var rE=Math.ceil,zc=Ji.ReactCurrentDispatcher,Vp=Ji.ReactCurrentOwner,qn=Ji.ReactCurrentBatchConfig,ut=0,Kt=null,zt=null,en=0,Ln=0,Qs=Lr(0),Xt=0,Fa=null,ss=0,pu=0,Hp=0,fa=null,Mn=null,Gp=0,vo=1/0,Oi=null,Vc=!1,Gf=null,wr=null,_l=!1,gr=null,Hc=0,ha=0,Wf=null,lc=-1,cc=0;function gn(){return ut&6?Ft():lc!==-1?lc:lc=Ft()}function Tr(t){return t.mode&1?ut&2&&en!==0?en&-en:VM.transition!==null?(cc===0&&(cc=Px()),cc):(t=pt,t!==0||(t=window.event,t=t===void 0?16:Ox(t.type)),t):1}function li(t,e,n,i){if(50<ha)throw ha=0,Wf=null,Error(de(185));Ya(t,n,i),(!(ut&2)||t!==Kt)&&(t===Kt&&(!(ut&2)&&(pu|=n),Xt===4&&hr(t,en)),bn(t,i),n===1&&ut===0&&!(e.mode&1)&&(vo=Ft()+500,uu&&Dr()))}function bn(t,e){var n=t.callbackNode;V1(t,e);var i=Tc(t,t===Kt?en:0);if(i===0)n!==null&&e0(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&e0(n),e===1)t.tag===0?zM(j0.bind(null,t)):n_(j0.bind(null,t)),FM(function(){!(ut&6)&&Dr()}),n=null;else{switch(Nx(i)){case 1:n=mp;break;case 4:n=Cx;break;case 16:n=wc;break;case 536870912:n=Rx;break;default:n=wc}n=ey(n,q_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function q_(t,e){if(lc=-1,cc=0,ut&6)throw Error(de(327));var n=t.callbackNode;if(oo()&&t.callbackNode!==n)return null;var i=Tc(t,t===Kt?en:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Gc(t,i);else{e=i;var r=ut;ut|=2;var s=$_();(Kt!==t||en!==e)&&(Oi=null,vo=Ft()+500,es(t,e));do try{aE();break}catch(a){Y_(t,a)}while(1);Cp(),zc.current=s,ut=r,zt!==null?e=0:(Kt=null,en=0,e=Xt)}if(e!==0){if(e===2&&(r=vf(t),r!==0&&(i=r,e=Xf(t,r))),e===1)throw n=Fa,es(t,0),hr(t,i),bn(t,Ft()),n;if(e===6)hr(t,i);else{if(r=t.current.alternate,!(i&30)&&!sE(r)&&(e=Gc(t,i),e===2&&(s=vf(t),s!==0&&(i=s,e=Xf(t,s))),e===1))throw n=Fa,es(t,0),hr(t,i),bn(t,Ft()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(de(345));case 2:Gr(t,Mn,Oi);break;case 3:if(hr(t,i),(i&130023424)===i&&(e=Gp+500-Ft(),10<e)){if(Tc(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){gn(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Tf(Gr.bind(null,t,Mn,Oi),e);break}Gr(t,Mn,Oi);break;case 4:if(hr(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-ai(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=Ft()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*rE(i/1960))-i,10<i){t.timeoutHandle=Tf(Gr.bind(null,t,Mn,Oi),i);break}Gr(t,Mn,Oi);break;case 5:Gr(t,Mn,Oi);break;default:throw Error(de(329))}}}return bn(t,Ft()),t.callbackNode===n?q_.bind(null,t):null}function Xf(t,e){var n=fa;return t.current.memoizedState.isDehydrated&&(es(t,e).flags|=256),t=Gc(t,e),t!==2&&(e=Mn,Mn=n,e!==null&&jf(e)),t}function jf(t){Mn===null?Mn=t:Mn.push.apply(Mn,t)}function sE(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!ui(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function hr(t,e){for(e&=~Hp,e&=~pu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ai(e),i=1<<n;t[n]=-1,e&=~i}}function j0(t){if(ut&6)throw Error(de(327));oo();var e=Tc(t,0);if(!(e&1))return bn(t,Ft()),null;var n=Gc(t,e);if(t.tag!==0&&n===2){var i=vf(t);i!==0&&(e=i,n=Xf(t,i))}if(n===1)throw n=Fa,es(t,0),hr(t,e),bn(t,Ft()),n;if(n===6)throw Error(de(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Gr(t,Mn,Oi),bn(t,Ft()),null}function Wp(t,e){var n=ut;ut|=1;try{return t(e)}finally{ut=n,ut===0&&(vo=Ft()+500,uu&&Dr())}}function os(t){gr!==null&&gr.tag===0&&!(ut&6)&&oo();var e=ut;ut|=1;var n=qn.transition,i=pt;try{if(qn.transition=null,pt=1,t)return t()}finally{pt=i,qn.transition=n,ut=e,!(ut&6)&&Dr()}}function Xp(){Ln=Qs.current,wt(Qs)}function es(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,UM(n)),zt!==null)for(n=zt.return;n!==null;){var i=n;switch(Tp(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Pc();break;case 3:mo(),wt(wn),wt(fn),Ip();break;case 5:Dp(i);break;case 4:mo();break;case 13:wt(bt);break;case 19:wt(bt);break;case 10:Rp(i.type._context);break;case 22:case 23:Xp()}n=n.return}if(Kt=t,zt=t=br(t.current,null),en=Ln=e,Xt=0,Fa=null,Hp=pu=ss=0,Mn=fa=null,Yr!==null){for(e=0;e<Yr.length;e++)if(n=Yr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}Yr=null}return t}function Y_(t,e){do{var n=zt;try{if(Cp(),sc.current=Bc,kc){for(var i=Rt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}kc=!1}if(rs=0,$t=Wt=Rt=null,ua=!1,Da=0,Vp.current=null,n===null||n.return===null){Xt=1,Fa=e,zt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=en,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var c=l,u=a,f=u.tag;if(!(u.mode&1)&&(f===0||f===11||f===15)){var d=u.alternate;d?(u.updateQueue=d.updateQueue,u.memoizedState=d.memoizedState,u.lanes=d.lanes):(u.updateQueue=null,u.memoizedState=null)}var p=D0(o);if(p!==null){p.flags&=-257,I0(p,o,a,s,e),p.mode&1&&L0(s,c,e),e=p,l=c;var g=e.updateQueue;if(g===null){var S=new Set;S.add(l),e.updateQueue=S}else g.add(l);break e}else{if(!(e&1)){L0(s,c,e),jp();break e}l=Error(de(426))}}else if(Tt&&a.mode&1){var m=D0(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),I0(m,o,a,s,e),bp(go(l,a));break e}}s=l=go(l,a),Xt!==4&&(Xt=2),fa===null?fa=[s]:fa.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var h=N_(s,l,e);b0(s,h);break e;case 1:a=l;var v=s.type,_=s.stateNode;if(!(s.flags&128)&&(typeof v.getDerivedStateFromError=="function"||_!==null&&typeof _.componentDidCatch=="function"&&(wr===null||!wr.has(_)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=L_(s,a,e);b0(s,y);break e}}s=s.return}while(s!==null)}Z_(n)}catch(w){e=w,zt===n&&n!==null&&(zt=n=n.return);continue}break}while(1)}function $_(){var t=zc.current;return zc.current=Bc,t===null?Bc:t}function jp(){(Xt===0||Xt===3||Xt===2)&&(Xt=4),Kt===null||!(ss&268435455)&&!(pu&268435455)||hr(Kt,en)}function Gc(t,e){var n=ut;ut|=2;var i=$_();(Kt!==t||en!==e)&&(Oi=null,es(t,e));do try{oE();break}catch(r){Y_(t,r)}while(1);if(Cp(),ut=n,zc.current=i,zt!==null)throw Error(de(261));return Kt=null,en=0,Xt}function oE(){for(;zt!==null;)K_(zt)}function aE(){for(;zt!==null&&!L1();)K_(zt)}function K_(t){var e=Q_(t.alternate,t,Ln);t.memoizedProps=t.pendingProps,e===null?Z_(t):zt=e,Vp.current=null}function Z_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=eE(n,e),n!==null){n.flags&=32767,zt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Xt=6,zt=null;return}}else if(n=QM(n,e,Ln),n!==null){zt=n;return}if(e=e.sibling,e!==null){zt=e;return}zt=e=t}while(e!==null);Xt===0&&(Xt=5)}function Gr(t,e,n){var i=pt,r=qn.transition;try{qn.transition=null,pt=1,lE(t,e,n,i)}finally{qn.transition=r,pt=i}return null}function lE(t,e,n,i){do oo();while(gr!==null);if(ut&6)throw Error(de(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(de(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(H1(t,s),t===Kt&&(zt=Kt=null,en=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||_l||(_l=!0,ey(wc,function(){return oo(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=qn.transition,qn.transition=null;var o=pt;pt=1;var a=ut;ut|=4,Vp.current=null,nE(t,n),X_(n,t),CM(Ef),bc=!!Mf,Ef=Mf=null,t.current=n,iE(n),D1(),ut=a,pt=o,qn.transition=s}else t.current=n;if(_l&&(_l=!1,gr=t,Hc=r),s=t.pendingLanes,s===0&&(wr=null),F1(n.stateNode),bn(t,Ft()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(Vc)throw Vc=!1,t=Gf,Gf=null,t;return Hc&1&&t.tag!==0&&oo(),s=t.pendingLanes,s&1?t===Wf?ha++:(ha=0,Wf=t):ha=0,Dr(),null}function oo(){if(gr!==null){var t=Nx(Hc),e=qn.transition,n=pt;try{if(qn.transition=null,pt=16>t?16:t,gr===null)var i=!1;else{if(t=gr,gr=null,Hc=0,ut&6)throw Error(de(331));var r=ut;for(ut|=4,Re=t.current;Re!==null;){var s=Re,o=s.child;if(Re.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var c=a[l];for(Re=c;Re!==null;){var u=Re;switch(u.tag){case 0:case 11:case 15:da(8,u,s)}var f=u.child;if(f!==null)f.return=u,Re=f;else for(;Re!==null;){u=Re;var d=u.sibling,p=u.return;if(H_(u),u===c){Re=null;break}if(d!==null){d.return=p,Re=d;break}Re=p}}}var g=s.alternate;if(g!==null){var S=g.child;if(S!==null){g.child=null;do{var m=S.sibling;S.sibling=null,S=m}while(S!==null)}}Re=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,Re=o;else e:for(;Re!==null;){if(s=Re,s.flags&2048)switch(s.tag){case 0:case 11:case 15:da(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,Re=h;break e}Re=s.return}}var v=t.current;for(Re=v;Re!==null;){o=Re;var _=o.child;if(o.subtreeFlags&2064&&_!==null)_.return=o,Re=_;else e:for(o=v;Re!==null;){if(a=Re,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:hu(9,a)}}catch(w){Dt(a,a.return,w)}if(a===o){Re=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,Re=y;break e}Re=a.return}}if(ut=r,Dr(),Ti&&typeof Ti.onPostCommitFiberRoot=="function")try{Ti.onPostCommitFiberRoot(su,t)}catch{}i=!0}return i}finally{pt=n,qn.transition=e}}return!1}function q0(t,e,n){e=go(n,e),e=N_(t,e,1),t=Er(t,e,1),e=gn(),t!==null&&(Ya(t,1,e),bn(t,e))}function Dt(t,e,n){if(t.tag===3)q0(t,t,n);else for(;e!==null;){if(e.tag===3){q0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(wr===null||!wr.has(i))){t=go(n,t),t=L_(e,t,1),e=Er(e,t,1),t=gn(),e!==null&&(Ya(e,1,t),bn(e,t));break}}e=e.return}}function cE(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=gn(),t.pingedLanes|=t.suspendedLanes&n,Kt===t&&(en&n)===n&&(Xt===4||Xt===3&&(en&130023424)===en&&500>Ft()-Gp?es(t,0):Hp|=n),bn(t,e)}function J_(t,e){e===0&&(t.mode&1?(e=cl,cl<<=1,!(cl&130023424)&&(cl=4194304)):e=1);var n=gn();t=Yi(t,e),t!==null&&(Ya(t,e,n),bn(t,n))}function uE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),J_(t,n)}function dE(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(de(314))}i!==null&&i.delete(e),J_(t,n)}var Q_;Q_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||wn.current)En=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return En=!1,JM(t,e,n);En=!!(t.flags&131072)}else En=!1,Tt&&e.flags&1048576&&i_(e,Dc,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;ac(t,e),t=e.pendingProps;var r=fo(e,fn.current);so(e,n),r=Fp(null,e,i,t,r,n);var s=Op();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tn(i)?(s=!0,Nc(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,Np(e),r.updater=fu,e.stateNode=r,r._reactInternals=e,Lf(e,i,t,n),e=Uf(null,e,i,!0,s,n)):(e.tag=0,Tt&&s&&wp(e),mn(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(ac(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=hE(i),t=ti(i,t),r){case 0:e=If(null,e,i,t,n);break e;case 1:e=O0(null,e,i,t,n);break e;case 11:e=U0(null,e,i,t,n);break e;case 14:e=F0(null,e,i,ti(i.type,t),n);break e}throw Error(de(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ti(i,r),If(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ti(i,r),O0(t,e,i,r,n);case 3:e:{if(F_(e),t===null)throw Error(de(387));i=e.pendingProps,s=e.memoizedState,r=s.element,c_(t,e),Fc(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=go(Error(de(423)),e),e=k0(t,e,i,n,r);break e}else if(i!==r){r=go(Error(de(424)),e),e=k0(t,e,i,n,r);break e}else for(Un=Mr(e.stateNode.containerInfo.firstChild),Fn=e,Tt=!0,ii=null,n=a_(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(ho(),i===r){e=$i(t,e,n);break e}mn(t,e,i,n)}e=e.child}return e;case 5:return u_(e),t===null&&Rf(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,wf(i,r)?o=null:s!==null&&wf(i,s)&&(e.flags|=32),U_(t,e),mn(t,e,o,n),e.child;case 6:return t===null&&Rf(e),null;case 13:return O_(t,e,n);case 4:return Lp(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=po(e,null,i,n):mn(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ti(i,r),U0(t,e,i,r,n);case 7:return mn(t,e,e.pendingProps,n),e.child;case 8:return mn(t,e,e.pendingProps.children,n),e.child;case 12:return mn(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,St(Ic,i._currentValue),i._currentValue=o,s!==null)if(ui(s.value,o)){if(s.children===r.children&&!wn.current){e=$i(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=Gi(-1,n&-n),l.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var u=c.pending;u===null?l.next=l:(l.next=u.next,u.next=l),c.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),Pf(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(de(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),Pf(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}mn(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,so(e,n),r=Yn(r),i=i(r),e.flags|=1,mn(t,e,i,n),e.child;case 14:return i=e.type,r=ti(i,e.pendingProps),r=ti(i.type,r),F0(t,e,i,r,n);case 15:return D_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:ti(i,r),ac(t,e),e.tag=1,Tn(i)?(t=!0,Nc(e)):t=!1,so(e,n),P_(e,i,r),Lf(e,i,r,n),Uf(null,e,i,!0,t,n);case 19:return k_(t,e,n);case 22:return I_(t,e,n)}throw Error(de(156,e.tag))};function ey(t,e){return Ax(t,e)}function fE(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xn(t,e,n,i){return new fE(t,e,n,i)}function qp(t){return t=t.prototype,!(!t||!t.isReactComponent)}function hE(t){if(typeof t=="function")return qp(t)?1:0;if(t!=null){if(t=t.$$typeof,t===fp)return 11;if(t===hp)return 14}return 2}function br(t,e){var n=t.alternate;return n===null?(n=Xn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function uc(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")qp(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Gs:return ts(n.children,r,s,e);case dp:o=8,r|=8;break;case tf:return t=Xn(12,n,e,r|2),t.elementType=tf,t.lanes=s,t;case nf:return t=Xn(13,n,e,r),t.elementType=nf,t.lanes=s,t;case rf:return t=Xn(19,n,e,r),t.elementType=rf,t.lanes=s,t;case ux:return mu(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case lx:o=10;break e;case cx:o=9;break e;case fp:o=11;break e;case hp:o=14;break e;case ur:o=16,i=null;break e}throw Error(de(130,t==null?t:typeof t,""))}return e=Xn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function ts(t,e,n,i){return t=Xn(7,t,i,e),t.lanes=n,t}function mu(t,e,n,i){return t=Xn(22,t,i,e),t.elementType=ux,t.lanes=n,t.stateNode={isHidden:!1},t}function id(t,e,n){return t=Xn(6,t,null,e),t.lanes=n,t}function rd(t,e,n){return e=Xn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function pE(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ku(0),this.expirationTimes=ku(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ku(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Yp(t,e,n,i,r,s,o,a,l){return t=new pE(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Xn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Np(s),t}function mE(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Hs,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function ty(t){if(!t)return Rr;t=t._reactInternals;e:{if(ps(t)!==t||t.tag!==1)throw Error(de(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tn(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(de(171))}if(t.tag===1){var n=t.type;if(Tn(n))return t_(t,n,e)}return e}function ny(t,e,n,i,r,s,o,a,l){return t=Yp(n,i,!0,t,r,s,o,a,l),t.context=ty(null),n=t.current,i=gn(),r=Tr(n),s=Gi(i,r),s.callback=e??null,Er(n,s,r),t.current.lanes=r,Ya(t,r,i),bn(t,i),t}function gu(t,e,n,i){var r=e.current,s=gn(),o=Tr(r);return n=ty(n),e.context===null?e.context=n:e.pendingContext=n,e=Gi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Er(r,e,o),t!==null&&(li(t,r,o,s),rc(t,r,o)),o}function Wc(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Y0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function $p(t,e){Y0(t,e),(t=t.alternate)&&Y0(t,e)}function gE(){return null}var iy=typeof reportError=="function"?reportError:function(t){console.error(t)};function Kp(t){this._internalRoot=t}vu.prototype.render=Kp.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(de(409));gu(t,e,null,null)};vu.prototype.unmount=Kp.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;os(function(){gu(null,t,null,null)}),e[qi]=null}};function vu(t){this._internalRoot=t}vu.prototype.unstable_scheduleHydration=function(t){if(t){var e=Ix();t={blockedOn:null,target:t,priority:e};for(var n=0;n<fr.length&&e!==0&&e<fr[n].priority;n++);fr.splice(n,0,t),n===0&&Fx(t)}};function Zp(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function xu(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function $0(){}function vE(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var c=Wc(o);s.call(c)}}var o=ny(e,i,t,0,null,!1,!1,"",$0);return t._reactRootContainer=o,t[qi]=o.current,Ca(t.nodeType===8?t.parentNode:t),os(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var c=Wc(l);a.call(c)}}var l=Yp(t,0,!1,null,null,!1,!1,"",$0);return t._reactRootContainer=l,t[qi]=l.current,Ca(t.nodeType===8?t.parentNode:t),os(function(){gu(e,l,n,i)}),l}function _u(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Wc(o);a.call(l)}}gu(e,o,t,r)}else o=vE(n,e,t,r,i);return Wc(o)}Lx=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Zo(e.pendingLanes);n!==0&&(gp(e,n|1),bn(e,Ft()),!(ut&6)&&(vo=Ft()+500,Dr()))}break;case 13:os(function(){var i=Yi(t,1);if(i!==null){var r=gn();li(i,t,1,r)}}),$p(t,1)}};vp=function(t){if(t.tag===13){var e=Yi(t,134217728);if(e!==null){var n=gn();li(e,t,134217728,n)}$p(t,134217728)}};Dx=function(t){if(t.tag===13){var e=Tr(t),n=Yi(t,e);if(n!==null){var i=gn();li(n,t,e,i)}$p(t,e)}};Ix=function(){return pt};Ux=function(t,e){var n=pt;try{return pt=t,e()}finally{pt=n}};pf=function(t,e,n){switch(e){case"input":if(af(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=cu(i);if(!r)throw Error(de(90));fx(i),af(i,r)}}}break;case"textarea":px(t,n);break;case"select":e=n.value,e!=null&&to(t,!!n.multiple,e,!1)}};Sx=Wp;Mx=os;var xE={usingClientEntryPoint:!1,Events:[Ka,qs,cu,_x,yx,Wp]},ko={findFiberByHostInstance:qr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},_E={bundleType:ko.bundleType,version:ko.version,rendererPackageName:ko.rendererPackageName,rendererConfig:ko.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ji.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Tx(t),t===null?null:t.stateNode},findFiberByHostInstance:ko.findFiberByHostInstance||gE,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var yl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!yl.isDisabled&&yl.supportsFiber)try{su=yl.inject(_E),Ti=yl}catch{}}Bn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=xE;Bn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Zp(e))throw Error(de(200));return mE(t,e,null,n)};Bn.createRoot=function(t,e){if(!Zp(t))throw Error(de(299));var n=!1,i="",r=iy;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Yp(t,1,!1,null,null,n,!1,i,r),t[qi]=e.current,Ca(t.nodeType===8?t.parentNode:t),new Kp(e)};Bn.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(de(188)):(t=Object.keys(t).join(","),Error(de(268,t)));return t=Tx(e),t=t===null?null:t.stateNode,t};Bn.flushSync=function(t){return os(t)};Bn.hydrate=function(t,e,n){if(!xu(e))throw Error(de(200));return _u(null,t,e,!0,n)};Bn.hydrateRoot=function(t,e,n){if(!Zp(t))throw Error(de(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=iy;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ny(e,null,t,1,n??null,r,!1,s,o),t[qi]=e.current,Ca(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new vu(e)};Bn.render=function(t,e,n){if(!xu(e))throw Error(de(200));return _u(null,t,e,!1,n)};Bn.unmountComponentAtNode=function(t){if(!xu(t))throw Error(de(40));return t._reactRootContainer?(os(function(){_u(null,null,t,!1,function(){t._reactRootContainer=null,t[qi]=null})}),!0):!1};Bn.unstable_batchedUpdates=Wp;Bn.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!xu(n))throw Error(de(200));if(t==null||t._reactInternals===void 0)throw Error(de(38));return _u(t,e,n,!1,i)};Bn.version="18.3.1-next-f1338f8080-20240426";function ry(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ry)}catch(t){console.error(t)}}ry(),rx.exports=Bn;var yE=rx.exports,K0=yE;Qd.createRoot=K0.createRoot,Qd.hydrateRoot=K0.hydrateRoot;/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function Oa(){return Oa=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},Oa.apply(this,arguments)}var vr;(function(t){t.Pop="POP",t.Push="PUSH",t.Replace="REPLACE"})(vr||(vr={}));const Z0="popstate";function SE(t){t===void 0&&(t={});function e(i,r){let{pathname:s,search:o,hash:a}=i.location;return qf("",{pathname:s,search:o,hash:a},r.state&&r.state.usr||null,r.state&&r.state.key||"default")}function n(i,r){return typeof r=="string"?r:Xc(r)}return EE(e,n,null,t)}function Vt(t,e){if(t===!1||t===null||typeof t>"u")throw new Error(e)}function sy(t,e){if(!t){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}function ME(){return Math.random().toString(36).substr(2,8)}function J0(t,e){return{usr:t.state,key:t.key,idx:e}}function qf(t,e,n,i){return n===void 0&&(n=null),Oa({pathname:typeof t=="string"?t:t.pathname,search:"",hash:""},typeof e=="string"?bo(e):e,{state:n,key:e&&e.key||i||ME()})}function Xc(t){let{pathname:e="/",search:n="",hash:i=""}=t;return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),i&&i!=="#"&&(e+=i.charAt(0)==="#"?i:"#"+i),e}function bo(t){let e={};if(t){let n=t.indexOf("#");n>=0&&(e.hash=t.substr(n),t=t.substr(0,n));let i=t.indexOf("?");i>=0&&(e.search=t.substr(i),t=t.substr(0,i)),t&&(e.pathname=t)}return e}function EE(t,e,n,i){i===void 0&&(i={});let{window:r=document.defaultView,v5Compat:s=!1}=i,o=r.history,a=vr.Pop,l=null,c=u();c==null&&(c=0,o.replaceState(Oa({},o.state,{idx:c}),""));function u(){return(o.state||{idx:null}).idx}function f(){a=vr.Pop;let m=u(),h=m==null?null:m-c;c=m,l&&l({action:a,location:S.location,delta:h})}function d(m,h){a=vr.Push;let v=qf(S.location,m,h);n&&n(v,m),c=u()+1;let _=J0(v,c),y=S.createHref(v);try{o.pushState(_,"",y)}catch(w){if(w instanceof DOMException&&w.name==="DataCloneError")throw w;r.location.assign(y)}s&&l&&l({action:a,location:S.location,delta:1})}function p(m,h){a=vr.Replace;let v=qf(S.location,m,h);n&&n(v,m),c=u();let _=J0(v,c),y=S.createHref(v);o.replaceState(_,"",y),s&&l&&l({action:a,location:S.location,delta:0})}function g(m){let h=r.location.origin!=="null"?r.location.origin:r.location.href,v=typeof m=="string"?m:Xc(m);return v=v.replace(/ $/,"%20"),Vt(h,"No window.location.(origin|href) available to create URL for href: "+v),new URL(v,h)}let S={get action(){return a},get location(){return t(r,o)},listen(m){if(l)throw new Error("A history only accepts one active listener");return r.addEventListener(Z0,f),l=m,()=>{r.removeEventListener(Z0,f),l=null}},createHref(m){return e(r,m)},createURL:g,encodeLocation(m){let h=g(m);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:d,replace:p,go(m){return o.go(m)}};return S}var Q0;(function(t){t.data="data",t.deferred="deferred",t.redirect="redirect",t.error="error"})(Q0||(Q0={}));function wE(t,e,n){return n===void 0&&(n="/"),TE(t,e,n,!1)}function TE(t,e,n,i){let r=typeof e=="string"?bo(e):e,s=Jp(r.pathname||"/",n);if(s==null)return null;let o=oy(t);bE(o);let a=null;for(let l=0;a==null&&l<o.length;++l){let c=OE(s);a=UE(o[l],c,i)}return a}function oy(t,e,n,i){e===void 0&&(e=[]),n===void 0&&(n=[]),i===void 0&&(i="");let r=(s,o,a)=>{let l={relativePath:a===void 0?s.path||"":a,caseSensitive:s.caseSensitive===!0,childrenIndex:o,route:s};l.relativePath.startsWith("/")&&(Vt(l.relativePath.startsWith(i),'Absolute route path "'+l.relativePath+'" nested under path '+('"'+i+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),l.relativePath=l.relativePath.slice(i.length));let c=Ar([i,l.relativePath]),u=n.concat(l);s.children&&s.children.length>0&&(Vt(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+c+'".')),oy(s.children,e,u,c)),!(s.path==null&&!s.index)&&e.push({path:c,score:DE(c,s.index),routesMeta:u})};return t.forEach((s,o)=>{var a;if(s.path===""||!((a=s.path)!=null&&a.includes("?")))r(s,o);else for(let l of ay(s.path))r(s,o,l)}),e}function ay(t){let e=t.split("/");if(e.length===0)return[];let[n,...i]=e,r=n.endsWith("?"),s=n.replace(/\?$/,"");if(i.length===0)return r?[s,""]:[s];let o=ay(i.join("/")),a=[];return a.push(...o.map(l=>l===""?s:[s,l].join("/"))),r&&a.push(...o),a.map(l=>t.startsWith("/")&&l===""?"/":l)}function bE(t){t.sort((e,n)=>e.score!==n.score?n.score-e.score:IE(e.routesMeta.map(i=>i.childrenIndex),n.routesMeta.map(i=>i.childrenIndex)))}const AE=/^:[\w-]+$/,CE=3,RE=2,PE=1,NE=10,LE=-2,eg=t=>t==="*";function DE(t,e){let n=t.split("/"),i=n.length;return n.some(eg)&&(i+=LE),e&&(i+=RE),n.filter(r=>!eg(r)).reduce((r,s)=>r+(AE.test(s)?CE:s===""?PE:NE),i)}function IE(t,e){return t.length===e.length&&t.slice(0,-1).every((i,r)=>i===e[r])?t[t.length-1]-e[e.length-1]:0}function UE(t,e,n){n===void 0&&(n=!1);let{routesMeta:i}=t,r={},s="/",o=[];for(let a=0;a<i.length;++a){let l=i[a],c=a===i.length-1,u=s==="/"?e:e.slice(s.length)||"/",f=tg({path:l.relativePath,caseSensitive:l.caseSensitive,end:c},u),d=l.route;if(!f&&c&&n&&!i[i.length-1].route.index&&(f=tg({path:l.relativePath,caseSensitive:l.caseSensitive,end:!1},u)),!f)return null;Object.assign(r,f.params),o.push({params:r,pathname:Ar([s,f.pathname]),pathnameBase:VE(Ar([s,f.pathnameBase])),route:d}),f.pathnameBase!=="/"&&(s=Ar([s,f.pathnameBase]))}return o}function tg(t,e){typeof t=="string"&&(t={path:t,caseSensitive:!1,end:!0});let[n,i]=FE(t.path,t.caseSensitive,t.end),r=e.match(n);if(!r)return null;let s=r[0],o=s.replace(/(.)\/+$/,"$1"),a=r.slice(1);return{params:i.reduce((c,u,f)=>{let{paramName:d,isOptional:p}=u;if(d==="*"){let S=a[f]||"";o=s.slice(0,s.length-S.length).replace(/(.)\/+$/,"$1")}const g=a[f];return p&&!g?c[d]=void 0:c[d]=(g||"").replace(/%2F/g,"/"),c},{}),pathname:s,pathnameBase:o,pattern:t}}function FE(t,e,n){e===void 0&&(e=!1),n===void 0&&(n=!0),sy(t==="*"||!t.endsWith("*")||t.endsWith("/*"),'Route path "'+t+'" will be treated as if it were '+('"'+t.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+t.replace(/\*$/,"/*")+'".'));let i=[],r="^"+t.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(o,a,l)=>(i.push({paramName:a,isOptional:l!=null}),l?"/?([^\\/]+)?":"/([^\\/]+)"));return t.endsWith("*")?(i.push({paramName:"*"}),r+=t==="*"||t==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):n?r+="\\/*$":t!==""&&t!=="/"&&(r+="(?:(?=\\/|$))"),[new RegExp(r,e?void 0:"i"),i]}function OE(t){try{return t.split("/").map(e=>decodeURIComponent(e).replace(/\//g,"%2F")).join("/")}catch(e){return sy(!1,'The URL path "'+t+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+e+").")),t}}function Jp(t,e){if(e==="/")return t;if(!t.toLowerCase().startsWith(e.toLowerCase()))return null;let n=e.endsWith("/")?e.length-1:e.length,i=t.charAt(n);return i&&i!=="/"?null:t.slice(n)||"/"}function kE(t,e){e===void 0&&(e="/");let{pathname:n,search:i="",hash:r=""}=typeof t=="string"?bo(t):t;return{pathname:n?n.startsWith("/")?n:BE(n,e):e,search:HE(i),hash:GE(r)}}function BE(t,e){let n=e.replace(/\/+$/,"").split("/");return t.split("/").forEach(r=>{r===".."?n.length>1&&n.pop():r!=="."&&n.push(r)}),n.length>1?n.join("/"):"/"}function sd(t,e,n,i){return"Cannot include a '"+t+"' character in a manually specified "+("`to."+e+"` field ["+JSON.stringify(i)+"].  Please separate it out to the ")+("`to."+n+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function zE(t){return t.filter((e,n)=>n===0||e.route.path&&e.route.path.length>0)}function ly(t,e){let n=zE(t);return e?n.map((i,r)=>r===n.length-1?i.pathname:i.pathnameBase):n.map(i=>i.pathnameBase)}function cy(t,e,n,i){i===void 0&&(i=!1);let r;typeof t=="string"?r=bo(t):(r=Oa({},t),Vt(!r.pathname||!r.pathname.includes("?"),sd("?","pathname","search",r)),Vt(!r.pathname||!r.pathname.includes("#"),sd("#","pathname","hash",r)),Vt(!r.search||!r.search.includes("#"),sd("#","search","hash",r)));let s=t===""||r.pathname==="",o=s?"/":r.pathname,a;if(o==null)a=n;else{let f=e.length-1;if(!i&&o.startsWith("..")){let d=o.split("/");for(;d[0]==="..";)d.shift(),f-=1;r.pathname=d.join("/")}a=f>=0?e[f]:"/"}let l=kE(r,a),c=o&&o!=="/"&&o.endsWith("/"),u=(s||o===".")&&n.endsWith("/");return!l.pathname.endsWith("/")&&(c||u)&&(l.pathname+="/"),l}const Ar=t=>t.join("/").replace(/\/\/+/g,"/"),VE=t=>t.replace(/\/+$/,"").replace(/^\/*/,"/"),HE=t=>!t||t==="?"?"":t.startsWith("?")?t:"?"+t,GE=t=>!t||t==="#"?"":t.startsWith("#")?t:"#"+t;function WE(t){return t!=null&&typeof t.status=="number"&&typeof t.statusText=="string"&&typeof t.internal=="boolean"&&"data"in t}const uy=["post","put","patch","delete"];new Set(uy);const XE=["get",...uy];new Set(XE);/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function ka(){return ka=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},ka.apply(this,arguments)}const Qp=ue.createContext(null),jE=ue.createContext(null),ms=ue.createContext(null),yu=ue.createContext(null),gs=ue.createContext({outlet:null,matches:[],isDataRoute:!1}),dy=ue.createContext(null);function qE(t,e){let{relative:n}=e===void 0?{}:e;Ja()||Vt(!1);let{basename:i,navigator:r}=ue.useContext(ms),{hash:s,pathname:o,search:a}=py(t,{relative:n}),l=o;return i!=="/"&&(l=o==="/"?i:Ar([i,o])),r.createHref({pathname:l,search:a,hash:s})}function Ja(){return ue.useContext(yu)!=null}function Ir(){return Ja()||Vt(!1),ue.useContext(yu).location}function fy(t){ue.useContext(ms).static||ue.useLayoutEffect(t)}function hy(){let{isDataRoute:t}=ue.useContext(gs);return t?ow():YE()}function YE(){Ja()||Vt(!1);let t=ue.useContext(Qp),{basename:e,future:n,navigator:i}=ue.useContext(ms),{matches:r}=ue.useContext(gs),{pathname:s}=Ir(),o=JSON.stringify(ly(r,n.v7_relativeSplatPath)),a=ue.useRef(!1);return fy(()=>{a.current=!0}),ue.useCallback(function(c,u){if(u===void 0&&(u={}),!a.current)return;if(typeof c=="number"){i.go(c);return}let f=cy(c,JSON.parse(o),s,u.relative==="path");t==null&&e!=="/"&&(f.pathname=f.pathname==="/"?e:Ar([e,f.pathname])),(u.replace?i.replace:i.push)(f,u.state,u)},[e,i,o,s,t])}function py(t,e){let{relative:n}=e===void 0?{}:e,{future:i}=ue.useContext(ms),{matches:r}=ue.useContext(gs),{pathname:s}=Ir(),o=JSON.stringify(ly(r,i.v7_relativeSplatPath));return ue.useMemo(()=>cy(t,JSON.parse(o),s,n==="path"),[t,o,s,n])}function $E(t,e){return KE(t,e)}function KE(t,e,n,i){Ja()||Vt(!1);let{navigator:r}=ue.useContext(ms),{matches:s}=ue.useContext(gs),o=s[s.length-1],a=o?o.params:{};o&&o.pathname;let l=o?o.pathnameBase:"/";o&&o.route;let c=Ir(),u;if(e){var f;let m=typeof e=="string"?bo(e):e;l==="/"||(f=m.pathname)!=null&&f.startsWith(l)||Vt(!1),u=m}else u=c;let d=u.pathname||"/",p=d;if(l!=="/"){let m=l.replace(/^\//,"").split("/");p="/"+d.replace(/^\//,"").split("/").slice(m.length).join("/")}let g=wE(t,{pathname:p}),S=tw(g&&g.map(m=>Object.assign({},m,{params:Object.assign({},a,m.params),pathname:Ar([l,r.encodeLocation?r.encodeLocation(m.pathname).pathname:m.pathname]),pathnameBase:m.pathnameBase==="/"?l:Ar([l,r.encodeLocation?r.encodeLocation(m.pathnameBase).pathname:m.pathnameBase])})),s,n,i);return e&&S?ue.createElement(yu.Provider,{value:{location:ka({pathname:"/",search:"",hash:"",state:null,key:"default"},u),navigationType:vr.Pop}},S):S}function ZE(){let t=sw(),e=WE(t)?t.status+" "+t.statusText:t instanceof Error?t.message:JSON.stringify(t),n=t instanceof Error?t.stack:null,r={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"},s=null;return ue.createElement(ue.Fragment,null,ue.createElement("h2",null,"Unexpected Application Error!"),ue.createElement("h3",{style:{fontStyle:"italic"}},e),n?ue.createElement("pre",{style:r},n):null,s)}const JE=ue.createElement(ZE,null);class QE extends ue.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){console.error("React Router caught the following error during render",e,n)}render(){return this.state.error!==void 0?ue.createElement(gs.Provider,{value:this.props.routeContext},ue.createElement(dy.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function ew(t){let{routeContext:e,match:n,children:i}=t,r=ue.useContext(Qp);return r&&r.static&&r.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(r.staticContext._deepestRenderedBoundaryId=n.route.id),ue.createElement(gs.Provider,{value:e},i)}function tw(t,e,n,i){var r;if(e===void 0&&(e=[]),n===void 0&&(n=null),i===void 0&&(i=null),t==null){var s;if(!n)return null;if(n.errors)t=n.matches;else if((s=i)!=null&&s.v7_partialHydration&&e.length===0&&!n.initialized&&n.matches.length>0)t=n.matches;else return null}let o=t,a=(r=n)==null?void 0:r.errors;if(a!=null){let u=o.findIndex(f=>f.route.id&&(a==null?void 0:a[f.route.id])!==void 0);u>=0||Vt(!1),o=o.slice(0,Math.min(o.length,u+1))}let l=!1,c=-1;if(n&&i&&i.v7_partialHydration)for(let u=0;u<o.length;u++){let f=o[u];if((f.route.HydrateFallback||f.route.hydrateFallbackElement)&&(c=u),f.route.id){let{loaderData:d,errors:p}=n,g=f.route.loader&&d[f.route.id]===void 0&&(!p||p[f.route.id]===void 0);if(f.route.lazy||g){l=!0,c>=0?o=o.slice(0,c+1):o=[o[0]];break}}}return o.reduceRight((u,f,d)=>{let p,g=!1,S=null,m=null;n&&(p=a&&f.route.id?a[f.route.id]:void 0,S=f.route.errorElement||JE,l&&(c<0&&d===0?(aw("route-fallback",!1),g=!0,m=null):c===d&&(g=!0,m=f.route.hydrateFallbackElement||null)));let h=e.concat(o.slice(0,d+1)),v=()=>{let _;return p?_=S:g?_=m:f.route.Component?_=ue.createElement(f.route.Component,null):f.route.element?_=f.route.element:_=u,ue.createElement(ew,{match:f,routeContext:{outlet:u,matches:h,isDataRoute:n!=null},children:_})};return n&&(f.route.ErrorBoundary||f.route.errorElement||d===0)?ue.createElement(QE,{location:n.location,revalidation:n.revalidation,component:S,error:p,children:v(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):v()},null)}var my=function(t){return t.UseBlocker="useBlocker",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t}(my||{}),jc=function(t){return t.UseBlocker="useBlocker",t.UseLoaderData="useLoaderData",t.UseActionData="useActionData",t.UseRouteError="useRouteError",t.UseNavigation="useNavigation",t.UseRouteLoaderData="useRouteLoaderData",t.UseMatches="useMatches",t.UseRevalidator="useRevalidator",t.UseNavigateStable="useNavigate",t.UseRouteId="useRouteId",t}(jc||{});function nw(t){let e=ue.useContext(Qp);return e||Vt(!1),e}function iw(t){let e=ue.useContext(jE);return e||Vt(!1),e}function rw(t){let e=ue.useContext(gs);return e||Vt(!1),e}function gy(t){let e=rw(),n=e.matches[e.matches.length-1];return n.route.id||Vt(!1),n.route.id}function sw(){var t;let e=ue.useContext(dy),n=iw(jc.UseRouteError),i=gy(jc.UseRouteError);return e!==void 0?e:(t=n.errors)==null?void 0:t[i]}function ow(){let{router:t}=nw(my.UseNavigateStable),e=gy(jc.UseNavigateStable),n=ue.useRef(!1);return fy(()=>{n.current=!0}),ue.useCallback(function(r,s){s===void 0&&(s={}),n.current&&(typeof r=="number"?t.navigate(r):t.navigate(r,ka({fromRouteId:e},s)))},[t,e])}const ng={};function aw(t,e,n){!e&&!ng[t]&&(ng[t]=!0)}function lw(t,e){t==null||t.v7_startTransition,(t==null?void 0:t.v7_relativeSplatPath)===void 0&&(!e||e.v7_relativeSplatPath),e&&(e.v7_fetcherPersist,e.v7_normalizeFormMethod,e.v7_partialHydration,e.v7_skipActionErrorRevalidation)}function zs(t){Vt(!1)}function cw(t){let{basename:e="/",children:n=null,location:i,navigationType:r=vr.Pop,navigator:s,static:o=!1,future:a}=t;Ja()&&Vt(!1);let l=e.replace(/^\/*/,"/"),c=ue.useMemo(()=>({basename:l,navigator:s,static:o,future:ka({v7_relativeSplatPath:!1},a)}),[l,a,s,o]);typeof i=="string"&&(i=bo(i));let{pathname:u="/",search:f="",hash:d="",state:p=null,key:g="default"}=i,S=ue.useMemo(()=>{let m=Jp(u,l);return m==null?null:{location:{pathname:m,search:f,hash:d,state:p,key:g},navigationType:r}},[l,u,f,d,p,g,r]);return S==null?null:ue.createElement(ms.Provider,{value:c},ue.createElement(yu.Provider,{children:n,value:S}))}function uw(t){let{children:e,location:n}=t;return $E(Yf(e),n)}new Promise(()=>{});function Yf(t,e){e===void 0&&(e=[]);let n=[];return ue.Children.forEach(t,(i,r)=>{if(!ue.isValidElement(i))return;let s=[...e,r];if(i.type===ue.Fragment){n.push.apply(n,Yf(i.props.children,s));return}i.type!==zs&&Vt(!1),!i.props.index||!i.props.children||Vt(!1);let o={id:i.props.id||s.join("-"),caseSensitive:i.props.caseSensitive,element:i.props.element,Component:i.props.Component,index:i.props.index,path:i.props.path,loader:i.props.loader,action:i.props.action,errorElement:i.props.errorElement,ErrorBoundary:i.props.ErrorBoundary,hasErrorBoundary:i.props.ErrorBoundary!=null||i.props.errorElement!=null,shouldRevalidate:i.props.shouldRevalidate,handle:i.props.handle,lazy:i.props.lazy};i.props.children&&(o.children=Yf(i.props.children,s)),n.push(o)}),n}/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function $f(){return $f=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t},$f.apply(this,arguments)}function dw(t,e){if(t==null)return{};var n={},i=Object.keys(t),r,s;for(s=0;s<i.length;s++)r=i[s],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function fw(t){return!!(t.metaKey||t.altKey||t.ctrlKey||t.shiftKey)}function hw(t,e){return t.button===0&&(!e||e==="_self")&&!fw(t)}const pw=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],mw="6";try{window.__reactRouterVersion=mw}catch{}const gw="startTransition",ig=c1[gw];function vw(t){let{basename:e,children:n,future:i,window:r}=t,s=ue.useRef();s.current==null&&(s.current=SE({window:r,v5Compat:!0}));let o=s.current,[a,l]=ue.useState({action:o.action,location:o.location}),{v7_startTransition:c}=i||{},u=ue.useCallback(f=>{c&&ig?ig(()=>l(f)):l(f)},[l,c]);return ue.useLayoutEffect(()=>o.listen(u),[o,u]),ue.useEffect(()=>lw(i),[i]),ue.createElement(cw,{basename:e,children:n,location:a.location,navigationType:a.action,navigator:o,future:i})}const xw=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",_w=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Kf=ue.forwardRef(function(e,n){let{onClick:i,relative:r,reloadDocument:s,replace:o,state:a,target:l,to:c,preventScrollReset:u,viewTransition:f}=e,d=dw(e,pw),{basename:p}=ue.useContext(ms),g,S=!1;if(typeof c=="string"&&_w.test(c)&&(g=c,xw))try{let _=new URL(window.location.href),y=c.startsWith("//")?new URL(_.protocol+c):new URL(c),w=Jp(y.pathname,p);y.origin===_.origin&&w!=null?c=w+y.search+y.hash:S=!0}catch{}let m=qE(c,{relative:r}),h=yw(c,{replace:o,state:a,target:l,preventScrollReset:u,relative:r,viewTransition:f});function v(_){i&&i(_),_.defaultPrevented||h(_)}return ue.createElement("a",$f({},d,{href:g||m,onClick:S||s?i:v,ref:n,target:l}))});var rg;(function(t){t.UseScrollRestoration="useScrollRestoration",t.UseSubmit="useSubmit",t.UseSubmitFetcher="useSubmitFetcher",t.UseFetcher="useFetcher",t.useViewTransitionState="useViewTransitionState"})(rg||(rg={}));var sg;(function(t){t.UseFetcher="useFetcher",t.UseFetchers="useFetchers",t.UseScrollRestoration="useScrollRestoration"})(sg||(sg={}));function yw(t,e){let{target:n,replace:i,state:r,preventScrollReset:s,relative:o,viewTransition:a}=e===void 0?{}:e,l=hy(),c=Ir(),u=py(t,{relative:o});return ue.useCallback(f=>{if(hw(f,n)){f.preventDefault();let d=i!==void 0?i:Xc(c)===Xc(u);l(t,{replace:d,state:r,preventScrollReset:s,relative:o,viewTransition:a})}},[c,l,u,i,r,n,t,s,o,a])}/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Sw={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mw=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),Ot=(t,e)=>{const n=ue.forwardRef(({color:i="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:o,className:a="",children:l,...c},u)=>ue.createElement("svg",{ref:u,...Sw,width:r,height:r,stroke:i,strokeWidth:o?Number(s)*24/Number(r):s,className:["lucide",`lucide-${Mw(t)}`,a].join(" "),...c},[...e.map(([f,d])=>ue.createElement(f,d)),...Array.isArray(l)?l:[l]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ew=Ot("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ww=Ot("Calendar",[["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",ry:"2",key:"eu3xkr"}],["line",{x1:"16",x2:"16",y1:"2",y2:"6",key:"m3sa8f"}],["line",{x1:"8",x2:"8",y1:"2",y2:"6",key:"18kwsl"}],["line",{x1:"3",x2:"21",y1:"10",y2:"10",key:"xt86sb"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tw=Ot("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bw=Ot("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Aw=Ot("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cw=Ot("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rw=Ot("Github",[["path",{d:"M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4",key:"tonef"}],["path",{d:"M9 18c-4.51 2-5-2-7-2",key:"9comsn"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pw=Ot("Globe",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20",key:"13o1zl"}],["path",{d:"M2 12h20",key:"9i4pu4"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nw=Ot("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vy=Ot("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lw=Ot("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dw=Ot("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iw=Ot("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Uw=Ot("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fw=Ot("Repeat",[["path",{d:"m17 2 4 4-4 4",key:"nntrym"}],["path",{d:"M3 11v-1a4 4 0 0 1 4-4h14",key:"84bu3i"}],["path",{d:"m7 22-4-4 4-4",key:"1wqhfi"}],["path",{d:"M21 13v1a4 4 0 0 1-4 4H3",key:"1rx37r"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ow=Ot("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kw=Ot("Shuffle",[["path",{d:"M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.7-1.1 2-1.7 3.3-1.7H22",key:"1wmou1"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 6h1.9c1.5 0 2.9.9 3.6 2.2",key:"10bdb2"}],["path",{d:"M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8",key:"vgxac0"}],["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bw=Ot("SkipBack",[["polygon",{points:"19 20 9 12 19 4 19 20",key:"o2sva"}],["line",{x1:"5",x2:"5",y1:"19",y2:"5",key:"1ocqjk"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zw=Ot("SkipForward",[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vw=Ot("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.294.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hw=Ot("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]),xy=ue.createContext(void 0),_y=()=>{const t=ue.useContext(xy);if(t===void 0)throw new Error("useDarkMode must be used within a DarkModeProvider");return t},Gw=({children:t})=>{const[e,n]=ue.useState(()=>{const r=localStorage.getItem("darkMode");return r!==null?JSON.parse(r):window.matchMedia("(prefers-color-scheme: dark)").matches});ue.useEffect(()=>{localStorage.setItem("darkMode",JSON.stringify(e)),e?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")},[e]);const i=()=>{n(r=>!r)};return C.jsx(xy.Provider,{value:{isDarkMode:e,toggleDarkMode:i},children:t})},Ww=({label:t,path:e,isActive:n})=>C.jsxs(Kf,{to:e,className:"flex flex-col items-center group",children:[C.jsxs("div",{className:`
        relative w-8 h-8 rounded-full border-2 transition-all duration-300 cursor-pointer
        ${n?"border-orange-400 bg-white dark:bg-gray-800 shadow-sm":"border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500"}
        group-hover:scale-105
      `,children:[C.jsx("div",{className:"absolute inset-1 rounded-full bg-gray-200 dark:bg-gray-600"}),C.jsx("div",{className:`
          absolute w-0.5 h-3 top-0 left-1/2 transform -translate-x-1/2 -translate-y-0.5
          transition-all duration-300 origin-bottom
          ${n?"bg-orange-400":"bg-gray-400"}
        `})]}),C.jsx("span",{className:`
        mt-1 text-xs font-medium transition-all duration-300
        ${n?"text-gray-900 dark:text-white":"text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"}
      `,children:t})]}),Xw=()=>{const t=Ir(),[e,n]=ue.useState(!1),{isDarkMode:i,toggleDarkMode:r}=_y(),s=[{label:"Home",path:"/"},{label:"About",path:"/about"},{label:"Projects",path:"/projects"},{label:"Contact",path:"/contact"}];return C.jsx("div",{className:"fixed bottom-0 left-0 right-0 bg-gray-100/80 backdrop-blur-sm z-40 shadow-lg",style:{backgroundColor:i?"rgba(31, 41, 55, 0.8)":void 0},children:C.jsx("div",{className:"max-w-7xl mx-auto px-6 py-3",children:C.jsxs("div",{className:"flex items-center justify-between",children:[C.jsx("div",{className:"flex items-center space-x-6",children:s.map(o=>C.jsx(Ww,{label:o.label,path:o.path,isActive:t.pathname===o.path},o.path))}),C.jsxs("div",{className:"flex items-center space-x-4",children:[C.jsx("button",{className:"text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:C.jsx(kw,{size:16})}),C.jsx("button",{className:"text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:C.jsx(Bw,{size:18})}),C.jsx("button",{onClick:()=>n(!e),className:"w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-full flex items-center justify-center hover:scale-110 transition-transform",children:e?C.jsx(Dw,{size:14,className:"text-white"}):C.jsx(Uw,{size:14,className:"text-white ml-0.5"})}),C.jsx("button",{className:"text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:C.jsx(zw,{size:18})}),C.jsx("button",{className:"text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:C.jsx(Fw,{size:16})})]}),C.jsxs("div",{className:"flex items-center space-x-4",children:[C.jsx("button",{className:"text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors",children:C.jsx(Hw,{size:16})}),C.jsx("div",{className:"w-16 h-1 bg-gray-200 dark:bg-gray-600 rounded-full",children:C.jsx("div",{className:"w-3/4 h-full bg-gray-400 dark:bg-gray-400 rounded-full"})}),C.jsx("button",{onClick:r,className:"p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110",title:i?"Switch to light mode":"Switch to dark mode",children:i?C.jsx(Vw,{size:16,className:"text-yellow-500"}):C.jsx(Lw,{size:16,className:"text-gray-600"})}),C.jsx("div",{className:"text-gray-400 dark:text-gray-500 text-xs",children:"2025 Luke Files"})]})]})})})},jw=()=>{const t=Ir();return ue.useEffect(()=>{t.pathname!=="/projects"&&window.scrollTo({top:0,left:0,behavior:"auto"})},[t.pathname]),null},qw=()=>{const t=hy(),e=n=>{t(`/projects?project=${n}`,{state:{targetIndex:n},replace:!1})};return C.jsxs("div",{children:[C.jsxs("section",{className:"relative h-96 md:h-[500px] overflow-hidden",children:[C.jsxs("div",{className:"absolute inset-0",children:[C.jsx("img",{src:"/images/luke-beach-banner.jpg",alt:"Luke Files on the beach",className:"w-full h-full object-cover"}),C.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"})]}),C.jsx("div",{className:"relative h-full flex items-end",children:C.jsx("div",{className:"w-full pb-8 pl-8 md:pl-16",children:C.jsxs("div",{className:"flex items-end space-x-6",children:[C.jsx("div",{className:"w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white",children:C.jsx("img",{src:"/images/luke-profile.png",alt:"Luke Files",className:"w-full h-full object-cover"})}),C.jsxs("div",{className:"text-white text-left",children:[C.jsx("h1",{className:"text-5xl md:text-7xl font-bold mb-3",children:"Luke Files"}),C.jsx("p",{className:"text-xl md:text-3xl text-gray-200 mb-4",children:"Software Engineer"})]})]})})})]}),C.jsx("section",{className:"section-padding bg-white dark:bg-gray-900",children:C.jsxs("div",{className:"container-max-width",children:[C.jsx("div",{className:"flex items-center justify-between mb-8",children:C.jsx("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white",children:"Projects"})}),C.jsxs("div",{className:"space-y-3",children:[C.jsxs("div",{className:"flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",children:[C.jsxs("div",{className:"relative w-12 h-12 flex-shrink-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"Multi-Threaded Scheduler",className:"w-full h-full object-contain"}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full"})]}),C.jsxs("div",{className:"flex-1 min-w-0",children:[C.jsx("button",{onClick:()=>e(0),className:"block group-hover:text-blue-600 transition-colors text-left w-full",children:C.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors",children:"Multi-Threaded Scheduler"})}),C.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 truncate",children:"Multithreaded C++ scheduler that simulates CPU scheduling algorithms"})]}),C.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2025"})]}),C.jsxs("div",{className:"flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",children:[C.jsxs("div",{className:"relative w-12 h-12 flex-shrink-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"Virtual Memory And Page Replacement Simulator",className:"w-full h-full object-contain"}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-500 rounded-full"})]}),C.jsxs("div",{className:"flex-1 min-w-0",children:[C.jsx("button",{onClick:()=>e(1),className:"block group-hover:text-green-600 transition-colors text-left w-full",children:C.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-green-600 transition-colors",children:"Virtual Memory And Page Replacement Simulator"})}),C.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 truncate",children:"A C++ virtual memory simulator utilizing multi-level page tables"})]}),C.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2025"})]}),C.jsxs("div",{className:"flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",children:[C.jsxs("div",{className:"relative w-12 h-12 flex-shrink-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"Restaurant Scheduling Simulator",className:"w-full h-full object-contain"}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-yellow-500 rounded-full"})]}),C.jsxs("div",{className:"flex-1 min-w-0",children:[C.jsx("button",{onClick:()=>e(2),className:"block group-hover:text-yellow-600 transition-colors text-left w-full",children:C.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors",children:"Restaurant Scheduling Simulator"})}),C.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 truncate",children:"A multithreaded C++ simulator that schedules robot consumers and producers"})]}),C.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2025"})]}),C.jsxs("div",{className:"flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",children:[C.jsxs("div",{className:"relative w-12 h-12 flex-shrink-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"SDSU AI Basketball Scouting",className:"w-full h-full object-contain"}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-red-500 rounded-full"})]}),C.jsxs("div",{className:"flex-1 min-w-0",children:[C.jsx("button",{onClick:()=>e(3),className:"block group-hover:text-red-600 transition-colors text-left w-full",children:C.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-red-600 transition-colors",children:"SDSU AI Basketball Scouting"})}),C.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 truncate",children:"An AI-powered scouting tool"})]}),C.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2023"})]}),C.jsxs("div",{className:"flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group cursor-pointer",children:[C.jsxs("div",{className:"relative w-12 h-12 flex-shrink-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"What's The Move in SD",className:"w-full h-full object-contain"}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full"})]}),C.jsxs("div",{className:"flex-1 min-w-0",children:[C.jsx("button",{onClick:()=>e(4),className:"block group-hover:text-purple-600 transition-colors text-left w-full",children:C.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors",children:"What's The Move in SD"})}),C.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-300 truncate",children:"A full stack Spring Boot application that scrapes and visualizes local events"})]}),C.jsx("div",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2024"})]})]}),C.jsx("div",{className:"mt-8 text-center",children:C.jsxs(Kf,{to:"/projects",className:"inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors",children:["View All Projects",C.jsx(Ew,{className:"ml-2 h-5 w-5"})]})})]})}),C.jsx("div",{className:"container-max-width px-4 md:px-6 lg:px-8",children:C.jsx("div",{className:"border-t border-gray-200 dark:border-gray-700"})}),C.jsx("section",{className:"section-padding",children:C.jsxs("div",{className:"container-max-width",children:[C.jsxs("div",{className:"text-center mb-16",children:[C.jsx("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-4",children:"What I Do"}),C.jsx("p",{className:"text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto",children:"I specialize in building modern web applications with cutting-edge technologies"})]}),C.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[C.jsxs("div",{className:"music-card text-center",children:[C.jsx("div",{className:"bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",children:C.jsx(bw,{className:"h-8 w-8 text-gray-700 dark:text-gray-300"})}),C.jsx("h3",{className:"text-xl font-semibold mb-2 text-gray-900 dark:text-white",children:"Embedded Systems"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Linux, UNIX, Docker, C++, Python"})]}),C.jsxs("div",{className:"music-card text-center",children:[C.jsx("div",{className:"bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",children:C.jsx(Aw,{className:"h-8 w-8 text-gray-700 dark:text-gray-300"})}),C.jsx("h3",{className:"text-xl font-semibold mb-2 text-gray-900 dark:text-white",children:"Backend Development"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Node.js, Django, MongoDB, and RESTful API design"})]}),C.jsxs("div",{className:"music-card text-center",children:[C.jsx("div",{className:"bg-gray-100 dark:bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4",children:C.jsx(Pw,{className:"h-8 w-8 text-gray-700 dark:text-gray-300"})}),C.jsx("h3",{className:"text-xl font-semibold mb-2 text-gray-900 dark:text-white",children:"Front End Development"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"React, TypeScript, Tailwind CSS, JavaScript, HTML, CSS"})]})]})]})}),C.jsx("section",{className:"bg-gray-50 dark:bg-gray-800 section-padding",children:C.jsxs("div",{className:"container-max-width text-center",children:[C.jsx("h2",{className:"text-3xl font-bold text-gray-900 dark:text-white mb-4",children:"Ready to work together?"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto",children:"Let's discuss your project and see how I can help bring your ideas to life"}),C.jsx(Kf,{to:"/contact",className:"btn-primary",children:"Start a Conversation"})]})})]})},Yw=()=>C.jsx("div",{className:"section-padding",children:C.jsx("div",{className:"container-max-width",children:C.jsxs("div",{className:"max-w-4xl mx-auto",children:[C.jsx("div",{className:"text-center mb-16",children:C.jsx("h1",{className:"text-4xl font-bold text-gray-900 dark:text-white mb-4",children:"About Me"})}),C.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16",children:[C.jsxs("div",{children:[C.jsx("h2",{className:"text-2xl font-semibold mb-6 dark:text-white",children:"My Story"}),C.jsxs("div",{className:"space-y-4 text-gray-600 dark:text-gray-300",children:[C.jsx("p",{children:"I'm a passionate full-stack developer with over 3 years of experience building web applications. My journey started with a curiosity about how websites work, and it has evolved into a deep love for creating digital experiences that make a difference."}),C.jsx("p",{children:"I specialize in modern JavaScript frameworks, particularly React and Node.js, and I'm always eager to learn new technologies and improve my skills. I believe in writing clean, maintainable code and following best practices."}),C.jsx("p",{children:"If I am not coding, you can find me playing guitar, surfing, or working with World Computing Organization to create and design new projects."})]})]}),C.jsxs("div",{className:"bg-gray-50 dark:bg-gray-800 p-8 rounded-lg",children:[C.jsx("h3",{className:"text-xl font-semibold mb-6 dark:text-white",children:"Personal Info"}),C.jsxs("div",{className:"space-y-4",children:[C.jsxs("div",{className:"flex items-center",children:[C.jsx(vy,{className:"h-5 w-5 text-primary-600 mr-3"}),C.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"San Diego, CA"})]}),C.jsxs("div",{className:"flex items-center",children:[C.jsx(ww,{className:"h-5 w-5 text-primary-600 mr-3"}),C.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Available for work"})]})]}),C.jsx("div",{className:"mt-8",children:C.jsxs("a",{href:"/lfiles_resume.pdf",download:"Luke_Files_Resume.pdf",className:"btn-primary inline-flex items-center",children:[C.jsx(Cw,{className:"mr-2 h-5 w-5"}),"Download Resume"]})})]})]}),C.jsxs("div",{className:"mb-16",children:[C.jsx("h2",{className:"text-2xl font-semibold mb-8 text-center dark:text-white",children:"Skills & Technologies"}),C.jsx("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-6",children:["Python","Java","C++","React","TypeScript","JavaScript","Tailwind CSS","Git","Docker","AWS","Django","Figma"].map(t=>C.jsx("div",{className:"bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center",children:C.jsx("span",{className:"font-medium text-gray-800 dark:text-gray-200",children:t})},t))})]}),C.jsxs("div",{className:"text-center",children:[C.jsx("h2",{className:"text-2xl font-semibold mb-6 dark:text-white",children:"Education & Experience"}),C.jsxs("div",{className:"space-y-6",children:[C.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm",children:[C.jsx("h3",{className:"text-xl font-semibold mb-2 dark:text-white",children:"Computer Science, B.S."}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-2",children:"San Diego State University"}),C.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2023 - 2026"})]}),C.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm",children:[C.jsx("h3",{className:"text-xl font-semibold mb-2 dark:text-white",children:"College Instructor / IT Intern"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-2",children:"Sage Oak Charter School"}),C.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2023 - Present"})]}),C.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm",children:[C.jsx("h3",{className:"text-xl font-semibold mb-2 dark:text-white",children:"Secretary"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-2",children:"World Computing Organization"}),C.jsx("p",{className:"text-sm text-gray-500 dark:text-gray-400",children:"2025 - Present"})]})]})]})]})})}),$w=()=>{const t=Ir(),[e,n]=ue.useState(0),i=ue.useRef([]),r=ue.useRef(0),s=ue.useRef(!1),{isDarkMode:o}=_y(),a=[{id:1,title:"Multi-Threaded Scheduler",shortDescription:"Multithreaded C++ scheduler that simulates CPU scheduling algorithms",fullDescription:"This project simulates SPU process scheduling using multithreaded C++ and POSIX threads. It visualizes how processes move between CPU and I/O bursts under different strategies.",technologies:["C++","POSIX Threading","UNIX"],githubUrl:"https://github.com/lukefiless/multi-threaded-scheduling",liveUrl:"https://example.com",category:"Operating Systems",year:"2025",color:"bg-blue-500"},{id:2,title:"Virtual Memory And Page Replacement Simulator",shortDescription:"A C++ virtual memory simulator utilizing multi-level page tables",fullDescription:"A simulator for page replacement algorithms using C++ and multi-level page tables. It processes binary memory traces and perfors virtual-to-physical address translation.",technologies:["C++","POSIX Threading","UNIX"],githubUrl:"https://github.com/lukefiless/multilevel-table-paging",liveUrl:"https://example.com",category:"Operating Systems",year:"2025",color:"bg-green-500"},{id:3,title:"Restaurant Scheduling Simulator",shortDescription:"A multithreaded C++ simulator that schedules robot consumers and producers.",fullDescription:"This simulation models restaurant seating management using the producer-consumer paradigm, where greeter robots enqueue requests and server robots process concurrently.",technologies:["C++","POSIX Threads","UNIX"],githubUrl:"https://github.com/lukefiless/producer-consumer-system",liveUrl:"https://example.com",category:"Operating Systems",year:"2025",color:"bg-yellow-500"},{id:4,title:"SDSU AI Basketball Scouting",shortDescription:"An AI-powered scouting tool",fullDescription:"Working with SDSU World Computing Organization, this is an AI-powered scouting tool that analyzes SDSU basketball games and provides insights on player performance and team strategies.",technologies:["Python","HTML","Figma"],githubUrl:"https://github.com/WorldComputingSDSU/AztecBBallScouting",liveUrl:"https://example.com",category:"AI and Machine Learning",year:"2023",color:"bg-red-500"},{id:5,title:"What's The Move in SD",shortDescription:"A full stack Spring Boot application that scrapes and visualizes local events.",fullDescription:"This project combines a Spring Boot REST backend with a Google Maps-driven frontend to display real-time events scraped from multiple sources.",technologies:["Spring Boot","JavaScript","Java","Google Maps API"],githubUrl:"https://github.com/lukefiless/Whats-The-Move-in-San-Diego",liveUrl:"https://example.com",category:"Full Stack Web Application",year:"2024",color:"bg-purple-500"},{id:6,title:"Newtonian Gravity Simulator",shortDescription:"A Unity-based N-body physics sandbox",fullDescription:"This project visualizes Newtonian gravitational mechanics by simulating the interaction of multiple celestial bodies in 3D space.",technologies:["C#","Unity Studio"],githubUrl:"https://github.com/lukefiless/NewtonianGravitySimulation",liveUrl:"https://example.com",category:"3D Simulation",year:"2024",color:"bg-indigo-500"}],l=a[e];return ue.useEffect(()=>{const c=t.state;let u=typeof(c==null?void 0:c.targetIndex)=="number"?c.targetIndex:NaN;if(Number.isNaN(u)){const p=new URLSearchParams(window.location.search).get("project"),g=p!==null?parseInt(p,10):NaN;Number.isNaN(g)||(u=g)}!Number.isNaN(u)&&i.current[u]&&!s.current?(requestAnimationFrame(()=>{var d;(d=i.current[u])==null||d.scrollIntoView({behavior:"auto",block:"center"})}),n(u),s.current=!0,window.history.replaceState({},document.title,window.location.pathname)):s.current||(s.current=!0);const f=()=>{const d=window.scrollY+window.innerHeight/2;for(let p=0;p<i.current.length;p++){const g=i.current[p];if(g){const S=g.getBoundingClientRect(),m=S.top+window.scrollY,h=m+S.height;if(d>=m&&d<h){n(p);break}}}};return window.addEventListener("scroll",f),f(),()=>{window.removeEventListener("scroll",f)}},[t,a.length]),ue.useEffect(()=>(r.current>0&&window.scrollTo(0,r.current),()=>{r.current=window.scrollY}),[]),C.jsxs("div",{className:"min-h-screen",children:[C.jsxs("div",{className:"fixed left-0 top-0 w-1/2 h-screen flex flex-col px-12 lg:px-16 z-10",style:{backgroundColor:o?"#111827":"#f9fafb"},children:[C.jsx("div",{className:"pt-16 pb-8",children:C.jsxs("span",{className:"text-sm text-gray-500",children:[String(e+1).padStart(2,"0")," /"," ",String(a.length).padStart(2,"0")]})}),C.jsxs("div",{className:"pb-2",children:[C.jsx("div",{className:"mb-4",children:C.jsx("h1",{className:"text-4xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight",children:l.title})}),C.jsxs("div",{className:"max-w-lg",children:[C.jsx("div",{className:"mb-4",children:C.jsx("span",{className:`inline-block px-3 py-1 rounded-full text-sm font-medium text-white ${l.color}`,children:l.category})}),C.jsx("p",{className:"text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed",children:l.fullDescription}),C.jsxs("div",{className:"mb-8",children:[C.jsx("h3",{className:"text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider",children:"Technology Stack"}),C.jsx("div",{className:"flex flex-wrap gap-2",children:l.technologies.map((c,u)=>C.jsx("span",{className:"bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium",children:c},u))})]}),C.jsx("div",{className:"flex space-x-4 mb-8",children:C.jsxs("a",{href:l.githubUrl,target:"_blank",rel:"noopener noreferrer",className:"btn-primary inline-flex items-center",children:[C.jsx(Rw,{className:"w-5 h-5 mr-2"}),"View Code"]})}),C.jsxs("div",{className:"flex items-center text-gray-400 dark:text-gray-500 text-sm",children:[C.jsx(Tw,{className:"w-4 h-4 mr-2"}),C.jsx("span",{children:"Scroll to explore more projects"})]})]})]})]}),C.jsxs("div",{className:"absolute right-0 top-0 w-1/2 pr-16",style:{backgroundColor:o?"#111827":"#f9fafb"},children:[a.map((c,u)=>C.jsx("div",{ref:f=>i.current[u]=f,className:"h-screen flex items-center justify-center relative","data-project-index":u,children:C.jsxs("div",{className:"relative w-[500px] h-96 flex items-center justify-center group cursor-pointer -ml-8",style:{transform:"translateX(-95px)"},children:[C.jsxs("div",{className:"relative w-96 h-96 rounded-lg shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-500 ease-out group-hover:-translate-x-6 z-10",style:{backgroundColor:u===0||u===1||u===2||u===3||u===4||u===5?"transparent":o?"#374151":"#111827",backgroundImage:u===0?"url('/images/projects/clock.jpg')":u===1?"url('/images/projects/pager.png')":u===2?"url('/images/projects/robot.jpg')":u===3?"url('/images/projects/sdsu.jpeg')":u===4?"url('/images/projects/sd.png')":u===5?"url('/images/projects/orbit.jpg')":"none",backgroundSize:u===0||u===1||u===2||u===3||u===4||u===5?"cover":"auto",backgroundPosition:"center",backgroundRepeat:"no-repeat"},children:[C.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"}),C.jsx("div",{className:"absolute inset-0 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",style:{boxShadow:"0 0 30px rgba(0,0,0,0.3)"}})]}),C.jsxs("div",{className:"absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] transition-transform duration-500 ease-out group-hover:translate-x-6 group-hover:scale-105 z-0",children:[C.jsx("img",{src:"/images/vinyl-record.svg",alt:"Vinyl Record",className:"w-full h-full object-contain transition-all duration-500",style:{backgroundColor:"transparent"}}),C.jsx("div",{className:"absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 group-hover:shadow-xl",children:C.jsx("span",{className:"text-lg font-bold text-gray-900",children:String(u+1).padStart(2,"0")})}),C.jsx("div",{className:`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${c.color} rounded-full shadow-lg transition-all duration-500 group-hover:shadow-xl`})]})]})},c.id)),C.jsx("footer",{className:"px-8 pt-12 pb-36",style:{backgroundColor:o?"#111827":"#f9fafb"},children:C.jsxs("p",{className:"mx-auto max-w-2xl text-center text-xs leading-relaxed",style:{color:o?"#9ca3af":"#6b7280"},children:["3D character model:"," ",C.jsx("a",{href:"https://sketchfab.com/3d-models/cartoon-office-worker-92fc38f1cbcc41d1933d0d1e9e117a6a",target:"_blank",rel:"noopener noreferrer",className:"underline underline-offset-2 hover:opacity-80",children:"“Cartoon office worker”"})," ","by"," ",C.jsx("a",{href:"https://sketchfab.com/DaniloRocha",target:"_blank",rel:"noopener noreferrer",className:"underline underline-offset-2 hover:opacity-80",children:"DaniloRocha"}),", licensed under"," ",C.jsx("a",{href:"https://creativecommons.org/licenses/by/4.0/",target:"_blank",rel:"noopener noreferrer",className:"underline underline-offset-2 hover:opacity-80",children:"CC BY 4.0"}),"."]})})]}),C.jsx("div",{className:"fixed right-8 top-1/2 transform -translate-y-1/2 space-y-3 z-20",children:a.map((c,u)=>C.jsx("button",{onClick:()=>{const f=i.current[u];f&&f.scrollIntoView({behavior:"auto"})},className:`w-3 h-3 rounded-full transition-all duration-300 ${u===e?"bg-gray-900 scale-125":"bg-gray-300 hover:bg-gray-500"}`},u))})]})};function yy(t,e){return function(){return t.apply(e,arguments)}}const{toString:Kw}=Object.prototype,{getPrototypeOf:em}=Object,{iterator:Su,toStringTag:Sy}=Symbol,Mu=(t=>e=>{const n=Kw.call(e);return t[n]||(t[n]=n.slice(8,-1).toLowerCase())})(Object.create(null)),fi=t=>(t=t.toLowerCase(),e=>Mu(e)===t),Eu=t=>e=>typeof e===t,{isArray:Ao}=Array,Ba=Eu("undefined");function Qa(t){return t!==null&&!Ba(t)&&t.constructor!==null&&!Ba(t.constructor)&&An(t.constructor.isBuffer)&&t.constructor.isBuffer(t)}const My=fi("ArrayBuffer");function Zw(t){let e;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?e=ArrayBuffer.isView(t):e=t&&t.buffer&&My(t.buffer),e}const Jw=Eu("string"),An=Eu("function"),Ey=Eu("number"),el=t=>t!==null&&typeof t=="object",Qw=t=>t===!0||t===!1,dc=t=>{if(Mu(t)!=="object")return!1;const e=em(t);return(e===null||e===Object.prototype||Object.getPrototypeOf(e)===null)&&!(Sy in t)&&!(Su in t)},eT=t=>{if(!el(t)||Qa(t))return!1;try{return Object.keys(t).length===0&&Object.getPrototypeOf(t)===Object.prototype}catch{return!1}},tT=fi("Date"),nT=fi("File"),iT=fi("Blob"),rT=fi("FileList"),sT=t=>el(t)&&An(t.pipe),oT=t=>{let e;return t&&(typeof FormData=="function"&&t instanceof FormData||An(t.append)&&((e=Mu(t))==="formdata"||e==="object"&&An(t.toString)&&t.toString()==="[object FormData]"))},aT=fi("URLSearchParams"),[lT,cT,uT,dT]=["ReadableStream","Request","Response","Headers"].map(fi),fT=t=>t.trim?t.trim():t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"");function tl(t,e,{allOwnKeys:n=!1}={}){if(t===null||typeof t>"u")return;let i,r;if(typeof t!="object"&&(t=[t]),Ao(t))for(i=0,r=t.length;i<r;i++)e.call(null,t[i],i,t);else{if(Qa(t))return;const s=n?Object.getOwnPropertyNames(t):Object.keys(t),o=s.length;let a;for(i=0;i<o;i++)a=s[i],e.call(null,t[a],a,t)}}function wy(t,e){if(Qa(t))return null;e=e.toLowerCase();const n=Object.keys(t);let i=n.length,r;for(;i-- >0;)if(r=n[i],e===r.toLowerCase())return r;return null}const Kr=(()=>typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:global)(),Ty=t=>!Ba(t)&&t!==Kr;function Zf(){const{caseless:t}=Ty(this)&&this||{},e={},n=(i,r)=>{const s=t&&wy(e,r)||r;dc(e[s])&&dc(i)?e[s]=Zf(e[s],i):dc(i)?e[s]=Zf({},i):Ao(i)?e[s]=i.slice():e[s]=i};for(let i=0,r=arguments.length;i<r;i++)arguments[i]&&tl(arguments[i],n);return e}const hT=(t,e,n,{allOwnKeys:i}={})=>(tl(e,(r,s)=>{n&&An(r)?t[s]=yy(r,n):t[s]=r},{allOwnKeys:i}),t),pT=t=>(t.charCodeAt(0)===65279&&(t=t.slice(1)),t),mT=(t,e,n,i)=>{t.prototype=Object.create(e.prototype,i),t.prototype.constructor=t,Object.defineProperty(t,"super",{value:e.prototype}),n&&Object.assign(t.prototype,n)},gT=(t,e,n,i)=>{let r,s,o;const a={};if(e=e||{},t==null)return e;do{for(r=Object.getOwnPropertyNames(t),s=r.length;s-- >0;)o=r[s],(!i||i(o,t,e))&&!a[o]&&(e[o]=t[o],a[o]=!0);t=n!==!1&&em(t)}while(t&&(!n||n(t,e))&&t!==Object.prototype);return e},vT=(t,e,n)=>{t=String(t),(n===void 0||n>t.length)&&(n=t.length),n-=e.length;const i=t.indexOf(e,n);return i!==-1&&i===n},xT=t=>{if(!t)return null;if(Ao(t))return t;let e=t.length;if(!Ey(e))return null;const n=new Array(e);for(;e-- >0;)n[e]=t[e];return n},_T=(t=>e=>t&&e instanceof t)(typeof Uint8Array<"u"&&em(Uint8Array)),yT=(t,e)=>{const i=(t&&t[Su]).call(t);let r;for(;(r=i.next())&&!r.done;){const s=r.value;e.call(t,s[0],s[1])}},ST=(t,e)=>{let n;const i=[];for(;(n=t.exec(e))!==null;)i.push(n);return i},MT=fi("HTMLFormElement"),ET=t=>t.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,function(n,i,r){return i.toUpperCase()+r}),og=(({hasOwnProperty:t})=>(e,n)=>t.call(e,n))(Object.prototype),wT=fi("RegExp"),by=(t,e)=>{const n=Object.getOwnPropertyDescriptors(t),i={};tl(n,(r,s)=>{let o;(o=e(r,s,t))!==!1&&(i[s]=o||r)}),Object.defineProperties(t,i)},TT=t=>{by(t,(e,n)=>{if(An(t)&&["arguments","caller","callee"].indexOf(n)!==-1)return!1;const i=t[n];if(An(i)){if(e.enumerable=!1,"writable"in e){e.writable=!1;return}e.set||(e.set=()=>{throw Error("Can not rewrite read-only method '"+n+"'")})}})},bT=(t,e)=>{const n={},i=r=>{r.forEach(s=>{n[s]=!0})};return Ao(t)?i(t):i(String(t).split(e)),n},AT=()=>{},CT=(t,e)=>t!=null&&Number.isFinite(t=+t)?t:e;function RT(t){return!!(t&&An(t.append)&&t[Sy]==="FormData"&&t[Su])}const PT=t=>{const e=new Array(10),n=(i,r)=>{if(el(i)){if(e.indexOf(i)>=0)return;if(Qa(i))return i;if(!("toJSON"in i)){e[r]=i;const s=Ao(i)?[]:{};return tl(i,(o,a)=>{const l=n(o,r+1);!Ba(l)&&(s[a]=l)}),e[r]=void 0,s}}return i};return n(t,0)},NT=fi("AsyncFunction"),LT=t=>t&&(el(t)||An(t))&&An(t.then)&&An(t.catch),Ay=((t,e)=>t?setImmediate:e?((n,i)=>(Kr.addEventListener("message",({source:r,data:s})=>{r===Kr&&s===n&&i.length&&i.shift()()},!1),r=>{i.push(r),Kr.postMessage(n,"*")}))(`axios@${Math.random()}`,[]):n=>setTimeout(n))(typeof setImmediate=="function",An(Kr.postMessage)),DT=typeof queueMicrotask<"u"?queueMicrotask.bind(Kr):typeof process<"u"&&process.nextTick||Ay,IT=t=>t!=null&&An(t[Su]),K={isArray:Ao,isArrayBuffer:My,isBuffer:Qa,isFormData:oT,isArrayBufferView:Zw,isString:Jw,isNumber:Ey,isBoolean:Qw,isObject:el,isPlainObject:dc,isEmptyObject:eT,isReadableStream:lT,isRequest:cT,isResponse:uT,isHeaders:dT,isUndefined:Ba,isDate:tT,isFile:nT,isBlob:iT,isRegExp:wT,isFunction:An,isStream:sT,isURLSearchParams:aT,isTypedArray:_T,isFileList:rT,forEach:tl,merge:Zf,extend:hT,trim:fT,stripBOM:pT,inherits:mT,toFlatObject:gT,kindOf:Mu,kindOfTest:fi,endsWith:vT,toArray:xT,forEachEntry:yT,matchAll:ST,isHTMLForm:MT,hasOwnProperty:og,hasOwnProp:og,reduceDescriptors:by,freezeMethods:TT,toObjectSet:bT,toCamelCase:ET,noop:AT,toFiniteNumber:CT,findKey:wy,global:Kr,isContextDefined:Ty,isSpecCompliantForm:RT,toJSONObject:PT,isAsyncFn:NT,isThenable:LT,setImmediate:Ay,asap:DT,isIterable:IT};function Qe(t,e,n,i,r){Error.call(this),Error.captureStackTrace?Error.captureStackTrace(this,this.constructor):this.stack=new Error().stack,this.message=t,this.name="AxiosError",e&&(this.code=e),n&&(this.config=n),i&&(this.request=i),r&&(this.response=r,this.status=r.status?r.status:null)}K.inherits(Qe,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:K.toJSONObject(this.config),code:this.code,status:this.status}}});const Cy=Qe.prototype,Ry={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED","ERR_NOT_SUPPORT","ERR_INVALID_URL"].forEach(t=>{Ry[t]={value:t}});Object.defineProperties(Qe,Ry);Object.defineProperty(Cy,"isAxiosError",{value:!0});Qe.from=(t,e,n,i,r,s)=>{const o=Object.create(Cy);return K.toFlatObject(t,o,function(l){return l!==Error.prototype},a=>a!=="isAxiosError"),Qe.call(o,t.message,e,n,i,r),o.cause=t,o.name=t.name,s&&Object.assign(o,s),o};const UT=null;function Jf(t){return K.isPlainObject(t)||K.isArray(t)}function Py(t){return K.endsWith(t,"[]")?t.slice(0,-2):t}function ag(t,e,n){return t?t.concat(e).map(function(r,s){return r=Py(r),!n&&s?"["+r+"]":r}).join(n?".":""):e}function FT(t){return K.isArray(t)&&!t.some(Jf)}const OT=K.toFlatObject(K,{},null,function(e){return/^is[A-Z]/.test(e)});function wu(t,e,n){if(!K.isObject(t))throw new TypeError("target must be an object");e=e||new FormData,n=K.toFlatObject(n,{metaTokens:!0,dots:!1,indexes:!1},!1,function(S,m){return!K.isUndefined(m[S])});const i=n.metaTokens,r=n.visitor||u,s=n.dots,o=n.indexes,l=(n.Blob||typeof Blob<"u"&&Blob)&&K.isSpecCompliantForm(e);if(!K.isFunction(r))throw new TypeError("visitor must be a function");function c(g){if(g===null)return"";if(K.isDate(g))return g.toISOString();if(K.isBoolean(g))return g.toString();if(!l&&K.isBlob(g))throw new Qe("Blob is not supported. Use a Buffer instead.");return K.isArrayBuffer(g)||K.isTypedArray(g)?l&&typeof Blob=="function"?new Blob([g]):Buffer.from(g):g}function u(g,S,m){let h=g;if(g&&!m&&typeof g=="object"){if(K.endsWith(S,"{}"))S=i?S:S.slice(0,-2),g=JSON.stringify(g);else if(K.isArray(g)&&FT(g)||(K.isFileList(g)||K.endsWith(S,"[]"))&&(h=K.toArray(g)))return S=Py(S),h.forEach(function(_,y){!(K.isUndefined(_)||_===null)&&e.append(o===!0?ag([S],y,s):o===null?S:S+"[]",c(_))}),!1}return Jf(g)?!0:(e.append(ag(m,S,s),c(g)),!1)}const f=[],d=Object.assign(OT,{defaultVisitor:u,convertValue:c,isVisitable:Jf});function p(g,S){if(!K.isUndefined(g)){if(f.indexOf(g)!==-1)throw Error("Circular reference detected in "+S.join("."));f.push(g),K.forEach(g,function(h,v){(!(K.isUndefined(h)||h===null)&&r.call(e,h,K.isString(v)?v.trim():v,S,d))===!0&&p(h,S?S.concat(v):[v])}),f.pop()}}if(!K.isObject(t))throw new TypeError("data must be an object");return p(t),e}function lg(t){const e={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+","%00":"\0"};return encodeURIComponent(t).replace(/[!'()~]|%20|%00/g,function(i){return e[i]})}function tm(t,e){this._pairs=[],t&&wu(t,this,e)}const Ny=tm.prototype;Ny.append=function(e,n){this._pairs.push([e,n])};Ny.toString=function(e){const n=e?function(i){return e.call(this,i,lg)}:lg;return this._pairs.map(function(r){return n(r[0])+"="+n(r[1])},"").join("&")};function kT(t){return encodeURIComponent(t).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}function Ly(t,e,n){if(!e)return t;const i=n&&n.encode||kT;K.isFunction(n)&&(n={serialize:n});const r=n&&n.serialize;let s;if(r?s=r(e,n):s=K.isURLSearchParams(e)?e.toString():new tm(e,n).toString(i),s){const o=t.indexOf("#");o!==-1&&(t=t.slice(0,o)),t+=(t.indexOf("?")===-1?"?":"&")+s}return t}class BT{constructor(){this.handlers=[]}use(e,n,i){return this.handlers.push({fulfilled:e,rejected:n,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1}eject(e){this.handlers[e]&&(this.handlers[e]=null)}clear(){this.handlers&&(this.handlers=[])}forEach(e){K.forEach(this.handlers,function(i){i!==null&&e(i)})}}const cg=BT,Dy={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},zT=typeof URLSearchParams<"u"?URLSearchParams:tm,VT=typeof FormData<"u"?FormData:null,HT=typeof Blob<"u"?Blob:null,GT={isBrowser:!0,classes:{URLSearchParams:zT,FormData:VT,Blob:HT},protocols:["http","https","file","blob","url","data"]},nm=typeof window<"u"&&typeof document<"u",Qf=typeof navigator=="object"&&navigator||void 0,WT=nm&&(!Qf||["ReactNative","NativeScript","NS"].indexOf(Qf.product)<0),XT=(()=>typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&typeof self.importScripts=="function")(),jT=nm&&window.location.href||"http://localhost",qT=Object.freeze(Object.defineProperty({__proto__:null,hasBrowserEnv:nm,hasStandardBrowserEnv:WT,hasStandardBrowserWebWorkerEnv:XT,navigator:Qf,origin:jT},Symbol.toStringTag,{value:"Module"})),cn={...qT,...GT};function YT(t,e){return wu(t,new cn.classes.URLSearchParams,{visitor:function(n,i,r,s){return cn.isNode&&K.isBuffer(n)?(this.append(i,n.toString("base64")),!1):s.defaultVisitor.apply(this,arguments)},...e})}function $T(t){return K.matchAll(/\w+|\[(\w*)]/g,t).map(e=>e[0]==="[]"?"":e[1]||e[0])}function KT(t){const e={},n=Object.keys(t);let i;const r=n.length;let s;for(i=0;i<r;i++)s=n[i],e[s]=t[s];return e}function Iy(t){function e(n,i,r,s){let o=n[s++];if(o==="__proto__")return!0;const a=Number.isFinite(+o),l=s>=n.length;return o=!o&&K.isArray(r)?r.length:o,l?(K.hasOwnProp(r,o)?r[o]=[r[o],i]:r[o]=i,!a):((!r[o]||!K.isObject(r[o]))&&(r[o]=[]),e(n,i,r[o],s)&&K.isArray(r[o])&&(r[o]=KT(r[o])),!a)}if(K.isFormData(t)&&K.isFunction(t.entries)){const n={};return K.forEachEntry(t,(i,r)=>{e($T(i),r,n,0)}),n}return null}function ZT(t,e,n){if(K.isString(t))try{return(e||JSON.parse)(t),K.trim(t)}catch(i){if(i.name!=="SyntaxError")throw i}return(n||JSON.stringify)(t)}const im={transitional:Dy,adapter:["xhr","http","fetch"],transformRequest:[function(e,n){const i=n.getContentType()||"",r=i.indexOf("application/json")>-1,s=K.isObject(e);if(s&&K.isHTMLForm(e)&&(e=new FormData(e)),K.isFormData(e))return r?JSON.stringify(Iy(e)):e;if(K.isArrayBuffer(e)||K.isBuffer(e)||K.isStream(e)||K.isFile(e)||K.isBlob(e)||K.isReadableStream(e))return e;if(K.isArrayBufferView(e))return e.buffer;if(K.isURLSearchParams(e))return n.setContentType("application/x-www-form-urlencoded;charset=utf-8",!1),e.toString();let a;if(s){if(i.indexOf("application/x-www-form-urlencoded")>-1)return YT(e,this.formSerializer).toString();if((a=K.isFileList(e))||i.indexOf("multipart/form-data")>-1){const l=this.env&&this.env.FormData;return wu(a?{"files[]":e}:e,l&&new l,this.formSerializer)}}return s||r?(n.setContentType("application/json",!1),ZT(e)):e}],transformResponse:[function(e){const n=this.transitional||im.transitional,i=n&&n.forcedJSONParsing,r=this.responseType==="json";if(K.isResponse(e)||K.isReadableStream(e))return e;if(e&&K.isString(e)&&(i&&!this.responseType||r)){const o=!(n&&n.silentJSONParsing)&&r;try{return JSON.parse(e)}catch(a){if(o)throw a.name==="SyntaxError"?Qe.from(a,Qe.ERR_BAD_RESPONSE,this,null,this.response):a}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:cn.classes.FormData,Blob:cn.classes.Blob},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*","Content-Type":void 0}}};K.forEach(["delete","get","head","post","put","patch"],t=>{im.headers[t]={}});const rm=im,JT=K.toObjectSet(["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"]),QT=t=>{const e={};let n,i,r;return t&&t.split(`
`).forEach(function(o){r=o.indexOf(":"),n=o.substring(0,r).trim().toLowerCase(),i=o.substring(r+1).trim(),!(!n||e[n]&&JT[n])&&(n==="set-cookie"?e[n]?e[n].push(i):e[n]=[i]:e[n]=e[n]?e[n]+", "+i:i)}),e},ug=Symbol("internals");function Bo(t){return t&&String(t).trim().toLowerCase()}function fc(t){return t===!1||t==null?t:K.isArray(t)?t.map(fc):String(t)}function eb(t){const e=Object.create(null),n=/([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;let i;for(;i=n.exec(t);)e[i[1]]=i[2];return e}const tb=t=>/^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(t.trim());function od(t,e,n,i,r){if(K.isFunction(i))return i.call(this,e,n);if(r&&(e=n),!!K.isString(e)){if(K.isString(i))return e.indexOf(i)!==-1;if(K.isRegExp(i))return i.test(e)}}function nb(t){return t.trim().toLowerCase().replace(/([a-z\d])(\w*)/g,(e,n,i)=>n.toUpperCase()+i)}function ib(t,e){const n=K.toCamelCase(" "+e);["get","set","has"].forEach(i=>{Object.defineProperty(t,i+n,{value:function(r,s,o){return this[i].call(this,e,r,s,o)},configurable:!0})})}class Tu{constructor(e){e&&this.set(e)}set(e,n,i){const r=this;function s(a,l,c){const u=Bo(l);if(!u)throw new Error("header name must be a non-empty string");const f=K.findKey(r,u);(!f||r[f]===void 0||c===!0||c===void 0&&r[f]!==!1)&&(r[f||l]=fc(a))}const o=(a,l)=>K.forEach(a,(c,u)=>s(c,u,l));if(K.isPlainObject(e)||e instanceof this.constructor)o(e,n);else if(K.isString(e)&&(e=e.trim())&&!tb(e))o(QT(e),n);else if(K.isObject(e)&&K.isIterable(e)){let a={},l,c;for(const u of e){if(!K.isArray(u))throw TypeError("Object iterator must return a key-value pair");a[c=u[0]]=(l=a[c])?K.isArray(l)?[...l,u[1]]:[l,u[1]]:u[1]}o(a,n)}else e!=null&&s(n,e,i);return this}get(e,n){if(e=Bo(e),e){const i=K.findKey(this,e);if(i){const r=this[i];if(!n)return r;if(n===!0)return eb(r);if(K.isFunction(n))return n.call(this,r,i);if(K.isRegExp(n))return n.exec(r);throw new TypeError("parser must be boolean|regexp|function")}}}has(e,n){if(e=Bo(e),e){const i=K.findKey(this,e);return!!(i&&this[i]!==void 0&&(!n||od(this,this[i],i,n)))}return!1}delete(e,n){const i=this;let r=!1;function s(o){if(o=Bo(o),o){const a=K.findKey(i,o);a&&(!n||od(i,i[a],a,n))&&(delete i[a],r=!0)}}return K.isArray(e)?e.forEach(s):s(e),r}clear(e){const n=Object.keys(this);let i=n.length,r=!1;for(;i--;){const s=n[i];(!e||od(this,this[s],s,e,!0))&&(delete this[s],r=!0)}return r}normalize(e){const n=this,i={};return K.forEach(this,(r,s)=>{const o=K.findKey(i,s);if(o){n[o]=fc(r),delete n[s];return}const a=e?nb(s):String(s).trim();a!==s&&delete n[s],n[a]=fc(r),i[a]=!0}),this}concat(...e){return this.constructor.concat(this,...e)}toJSON(e){const n=Object.create(null);return K.forEach(this,(i,r)=>{i!=null&&i!==!1&&(n[r]=e&&K.isArray(i)?i.join(", "):i)}),n}[Symbol.iterator](){return Object.entries(this.toJSON())[Symbol.iterator]()}toString(){return Object.entries(this.toJSON()).map(([e,n])=>e+": "+n).join(`
`)}getSetCookie(){return this.get("set-cookie")||[]}get[Symbol.toStringTag](){return"AxiosHeaders"}static from(e){return e instanceof this?e:new this(e)}static concat(e,...n){const i=new this(e);return n.forEach(r=>i.set(r)),i}static accessor(e){const i=(this[ug]=this[ug]={accessors:{}}).accessors,r=this.prototype;function s(o){const a=Bo(o);i[a]||(ib(r,o),i[a]=!0)}return K.isArray(e)?e.forEach(s):s(e),this}}Tu.accessor(["Content-Type","Content-Length","Accept","Accept-Encoding","User-Agent","Authorization"]);K.reduceDescriptors(Tu.prototype,({value:t},e)=>{let n=e[0].toUpperCase()+e.slice(1);return{get:()=>t,set(i){this[n]=i}}});K.freezeMethods(Tu);const ci=Tu;function ad(t,e){const n=this||rm,i=e||n,r=ci.from(i.headers);let s=i.data;return K.forEach(t,function(a){s=a.call(n,s,r.normalize(),e?e.status:void 0)}),r.normalize(),s}function Uy(t){return!!(t&&t.__CANCEL__)}function Co(t,e,n){Qe.call(this,t??"canceled",Qe.ERR_CANCELED,e,n),this.name="CanceledError"}K.inherits(Co,Qe,{__CANCEL__:!0});function Fy(t,e,n){const i=n.config.validateStatus;!n.status||!i||i(n.status)?t(n):e(new Qe("Request failed with status code "+n.status,[Qe.ERR_BAD_REQUEST,Qe.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))}function rb(t){const e=/^([-+\w]{1,25})(:?\/\/|:)/.exec(t);return e&&e[1]||""}function sb(t,e){t=t||10;const n=new Array(t),i=new Array(t);let r=0,s=0,o;return e=e!==void 0?e:1e3,function(l){const c=Date.now(),u=i[s];o||(o=c),n[r]=l,i[r]=c;let f=s,d=0;for(;f!==r;)d+=n[f++],f=f%t;if(r=(r+1)%t,r===s&&(s=(s+1)%t),c-o<e)return;const p=u&&c-u;return p?Math.round(d*1e3/p):void 0}}function ob(t,e){let n=0,i=1e3/e,r,s;const o=(c,u=Date.now())=>{n=u,r=null,s&&(clearTimeout(s),s=null),t(...c)};return[(...c)=>{const u=Date.now(),f=u-n;f>=i?o(c,u):(r=c,s||(s=setTimeout(()=>{s=null,o(r)},i-f)))},()=>r&&o(r)]}const qc=(t,e,n=3)=>{let i=0;const r=sb(50,250);return ob(s=>{const o=s.loaded,a=s.lengthComputable?s.total:void 0,l=o-i,c=r(l),u=o<=a;i=o;const f={loaded:o,total:a,progress:a?o/a:void 0,bytes:l,rate:c||void 0,estimated:c&&a&&u?(a-o)/c:void 0,event:s,lengthComputable:a!=null,[e?"download":"upload"]:!0};t(f)},n)},dg=(t,e)=>{const n=t!=null;return[i=>e[0]({lengthComputable:n,total:t,loaded:i}),e[1]]},fg=t=>(...e)=>K.asap(()=>t(...e)),ab=cn.hasStandardBrowserEnv?((t,e)=>n=>(n=new URL(n,cn.origin),t.protocol===n.protocol&&t.host===n.host&&(e||t.port===n.port)))(new URL(cn.origin),cn.navigator&&/(msie|trident)/i.test(cn.navigator.userAgent)):()=>!0,lb=cn.hasStandardBrowserEnv?{write(t,e,n,i,r,s){const o=[t+"="+encodeURIComponent(e)];K.isNumber(n)&&o.push("expires="+new Date(n).toGMTString()),K.isString(i)&&o.push("path="+i),K.isString(r)&&o.push("domain="+r),s===!0&&o.push("secure"),document.cookie=o.join("; ")},read(t){const e=document.cookie.match(new RegExp("(^|;\\s*)("+t+")=([^;]*)"));return e?decodeURIComponent(e[3]):null},remove(t){this.write(t,"",Date.now()-864e5)}}:{write(){},read(){return null},remove(){}};function cb(t){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(t)}function ub(t,e){return e?t.replace(/\/?\/$/,"")+"/"+e.replace(/^\/+/,""):t}function Oy(t,e,n){let i=!cb(e);return t&&(i||n==!1)?ub(t,e):e}const hg=t=>t instanceof ci?{...t}:t;function as(t,e){e=e||{};const n={};function i(c,u,f,d){return K.isPlainObject(c)&&K.isPlainObject(u)?K.merge.call({caseless:d},c,u):K.isPlainObject(u)?K.merge({},u):K.isArray(u)?u.slice():u}function r(c,u,f,d){if(K.isUndefined(u)){if(!K.isUndefined(c))return i(void 0,c,f,d)}else return i(c,u,f,d)}function s(c,u){if(!K.isUndefined(u))return i(void 0,u)}function o(c,u){if(K.isUndefined(u)){if(!K.isUndefined(c))return i(void 0,c)}else return i(void 0,u)}function a(c,u,f){if(f in e)return i(c,u);if(f in t)return i(void 0,c)}const l={url:s,method:s,data:s,baseURL:o,transformRequest:o,transformResponse:o,paramsSerializer:o,timeout:o,timeoutMessage:o,withCredentials:o,withXSRFToken:o,adapter:o,responseType:o,xsrfCookieName:o,xsrfHeaderName:o,onUploadProgress:o,onDownloadProgress:o,decompress:o,maxContentLength:o,maxBodyLength:o,beforeRedirect:o,transport:o,httpAgent:o,httpsAgent:o,cancelToken:o,socketPath:o,responseEncoding:o,validateStatus:a,headers:(c,u,f)=>r(hg(c),hg(u),f,!0)};return K.forEach(Object.keys({...t,...e}),function(u){const f=l[u]||r,d=f(t[u],e[u],u);K.isUndefined(d)&&f!==a||(n[u]=d)}),n}const ky=t=>{const e=as({},t);let{data:n,withXSRFToken:i,xsrfHeaderName:r,xsrfCookieName:s,headers:o,auth:a}=e;e.headers=o=ci.from(o),e.url=Ly(Oy(e.baseURL,e.url,e.allowAbsoluteUrls),t.params,t.paramsSerializer),a&&o.set("Authorization","Basic "+btoa((a.username||"")+":"+(a.password?unescape(encodeURIComponent(a.password)):"")));let l;if(K.isFormData(n)){if(cn.hasStandardBrowserEnv||cn.hasStandardBrowserWebWorkerEnv)o.setContentType(void 0);else if((l=o.getContentType())!==!1){const[c,...u]=l?l.split(";").map(f=>f.trim()).filter(Boolean):[];o.setContentType([c||"multipart/form-data",...u].join("; "))}}if(cn.hasStandardBrowserEnv&&(i&&K.isFunction(i)&&(i=i(e)),i||i!==!1&&ab(e.url))){const c=r&&s&&lb.read(s);c&&o.set(r,c)}return e},db=typeof XMLHttpRequest<"u",fb=db&&function(t){return new Promise(function(n,i){const r=ky(t);let s=r.data;const o=ci.from(r.headers).normalize();let{responseType:a,onUploadProgress:l,onDownloadProgress:c}=r,u,f,d,p,g;function S(){p&&p(),g&&g(),r.cancelToken&&r.cancelToken.unsubscribe(u),r.signal&&r.signal.removeEventListener("abort",u)}let m=new XMLHttpRequest;m.open(r.method.toUpperCase(),r.url,!0),m.timeout=r.timeout;function h(){if(!m)return;const _=ci.from("getAllResponseHeaders"in m&&m.getAllResponseHeaders()),w={data:!a||a==="text"||a==="json"?m.responseText:m.response,status:m.status,statusText:m.statusText,headers:_,config:t,request:m};Fy(function(A){n(A),S()},function(A){i(A),S()},w),m=null}"onloadend"in m?m.onloadend=h:m.onreadystatechange=function(){!m||m.readyState!==4||m.status===0&&!(m.responseURL&&m.responseURL.indexOf("file:")===0)||setTimeout(h)},m.onabort=function(){m&&(i(new Qe("Request aborted",Qe.ECONNABORTED,t,m)),m=null)},m.onerror=function(){i(new Qe("Network Error",Qe.ERR_NETWORK,t,m)),m=null},m.ontimeout=function(){let y=r.timeout?"timeout of "+r.timeout+"ms exceeded":"timeout exceeded";const w=r.transitional||Dy;r.timeoutErrorMessage&&(y=r.timeoutErrorMessage),i(new Qe(y,w.clarifyTimeoutError?Qe.ETIMEDOUT:Qe.ECONNABORTED,t,m)),m=null},s===void 0&&o.setContentType(null),"setRequestHeader"in m&&K.forEach(o.toJSON(),function(y,w){m.setRequestHeader(w,y)}),K.isUndefined(r.withCredentials)||(m.withCredentials=!!r.withCredentials),a&&a!=="json"&&(m.responseType=r.responseType),c&&([d,g]=qc(c,!0),m.addEventListener("progress",d)),l&&m.upload&&([f,p]=qc(l),m.upload.addEventListener("progress",f),m.upload.addEventListener("loadend",p)),(r.cancelToken||r.signal)&&(u=_=>{m&&(i(!_||_.type?new Co(null,t,m):_),m.abort(),m=null)},r.cancelToken&&r.cancelToken.subscribe(u),r.signal&&(r.signal.aborted?u():r.signal.addEventListener("abort",u)));const v=rb(r.url);if(v&&cn.protocols.indexOf(v)===-1){i(new Qe("Unsupported protocol "+v+":",Qe.ERR_BAD_REQUEST,t));return}m.send(s||null)})},hb=(t,e)=>{const{length:n}=t=t?t.filter(Boolean):[];if(e||n){let i=new AbortController,r;const s=function(c){if(!r){r=!0,a();const u=c instanceof Error?c:this.reason;i.abort(u instanceof Qe?u:new Co(u instanceof Error?u.message:u))}};let o=e&&setTimeout(()=>{o=null,s(new Qe(`timeout ${e} of ms exceeded`,Qe.ETIMEDOUT))},e);const a=()=>{t&&(o&&clearTimeout(o),o=null,t.forEach(c=>{c.unsubscribe?c.unsubscribe(s):c.removeEventListener("abort",s)}),t=null)};t.forEach(c=>c.addEventListener("abort",s));const{signal:l}=i;return l.unsubscribe=()=>K.asap(a),l}},pb=hb,mb=function*(t,e){let n=t.byteLength;if(!e||n<e){yield t;return}let i=0,r;for(;i<n;)r=i+e,yield t.slice(i,r),i=r},gb=async function*(t,e){for await(const n of vb(t))yield*mb(n,e)},vb=async function*(t){if(t[Symbol.asyncIterator]){yield*t;return}const e=t.getReader();try{for(;;){const{done:n,value:i}=await e.read();if(n)break;yield i}}finally{await e.cancel()}},pg=(t,e,n,i)=>{const r=gb(t,e);let s=0,o,a=l=>{o||(o=!0,i&&i(l))};return new ReadableStream({async pull(l){try{const{done:c,value:u}=await r.next();if(c){a(),l.close();return}let f=u.byteLength;if(n){let d=s+=f;n(d)}l.enqueue(new Uint8Array(u))}catch(c){throw a(c),c}},cancel(l){return a(l),r.return()}},{highWaterMark:2})},bu=typeof fetch=="function"&&typeof Request=="function"&&typeof Response=="function",By=bu&&typeof ReadableStream=="function",xb=bu&&(typeof TextEncoder=="function"?(t=>e=>t.encode(e))(new TextEncoder):async t=>new Uint8Array(await new Response(t).arrayBuffer())),zy=(t,...e)=>{try{return!!t(...e)}catch{return!1}},_b=By&&zy(()=>{let t=!1;const e=new Request(cn.origin,{body:new ReadableStream,method:"POST",get duplex(){return t=!0,"half"}}).headers.has("Content-Type");return t&&!e}),mg=64*1024,eh=By&&zy(()=>K.isReadableStream(new Response("").body)),Yc={stream:eh&&(t=>t.body)};bu&&(t=>{["text","arrayBuffer","blob","formData","stream"].forEach(e=>{!Yc[e]&&(Yc[e]=K.isFunction(t[e])?n=>n[e]():(n,i)=>{throw new Qe(`Response type '${e}' is not supported`,Qe.ERR_NOT_SUPPORT,i)})})})(new Response);const yb=async t=>{if(t==null)return 0;if(K.isBlob(t))return t.size;if(K.isSpecCompliantForm(t))return(await new Request(cn.origin,{method:"POST",body:t}).arrayBuffer()).byteLength;if(K.isArrayBufferView(t)||K.isArrayBuffer(t))return t.byteLength;if(K.isURLSearchParams(t)&&(t=t+""),K.isString(t))return(await xb(t)).byteLength},Sb=async(t,e)=>{const n=K.toFiniteNumber(t.getContentLength());return n??yb(e)},Mb=bu&&(async t=>{let{url:e,method:n,data:i,signal:r,cancelToken:s,timeout:o,onDownloadProgress:a,onUploadProgress:l,responseType:c,headers:u,withCredentials:f="same-origin",fetchOptions:d}=ky(t);c=c?(c+"").toLowerCase():"text";let p=pb([r,s&&s.toAbortSignal()],o),g;const S=p&&p.unsubscribe&&(()=>{p.unsubscribe()});let m;try{if(l&&_b&&n!=="get"&&n!=="head"&&(m=await Sb(u,i))!==0){let w=new Request(e,{method:"POST",body:i,duplex:"half"}),E;if(K.isFormData(i)&&(E=w.headers.get("content-type"))&&u.setContentType(E),w.body){const[A,x]=dg(m,qc(fg(l)));i=pg(w.body,mg,A,x)}}K.isString(f)||(f=f?"include":"omit");const h="credentials"in Request.prototype;g=new Request(e,{...d,signal:p,method:n.toUpperCase(),headers:u.normalize().toJSON(),body:i,duplex:"half",credentials:h?f:void 0});let v=await fetch(g,d);const _=eh&&(c==="stream"||c==="response");if(eh&&(a||_&&S)){const w={};["status","statusText","headers"].forEach(b=>{w[b]=v[b]});const E=K.toFiniteNumber(v.headers.get("content-length")),[A,x]=a&&dg(E,qc(fg(a),!0))||[];v=new Response(pg(v.body,mg,A,()=>{x&&x(),S&&S()}),w)}c=c||"text";let y=await Yc[K.findKey(Yc,c)||"text"](v,t);return!_&&S&&S(),await new Promise((w,E)=>{Fy(w,E,{data:y,headers:ci.from(v.headers),status:v.status,statusText:v.statusText,config:t,request:g})})}catch(h){throw S&&S(),h&&h.name==="TypeError"&&/Load failed|fetch/i.test(h.message)?Object.assign(new Qe("Network Error",Qe.ERR_NETWORK,t,g),{cause:h.cause||h}):Qe.from(h,h&&h.code,t,g)}}),th={http:UT,xhr:fb,fetch:Mb};K.forEach(th,(t,e)=>{if(t){try{Object.defineProperty(t,"name",{value:e})}catch{}Object.defineProperty(t,"adapterName",{value:e})}});const gg=t=>`- ${t}`,Eb=t=>K.isFunction(t)||t===null||t===!1,Vy={getAdapter:t=>{t=K.isArray(t)?t:[t];const{length:e}=t;let n,i;const r={};for(let s=0;s<e;s++){n=t[s];let o;if(i=n,!Eb(n)&&(i=th[(o=String(n)).toLowerCase()],i===void 0))throw new Qe(`Unknown adapter '${o}'`);if(i)break;r[o||"#"+s]=i}if(!i){const s=Object.entries(r).map(([a,l])=>`adapter ${a} `+(l===!1?"is not supported by the environment":"is not available in the build"));let o=e?s.length>1?`since :
`+s.map(gg).join(`
`):" "+gg(s[0]):"as no adapter specified";throw new Qe("There is no suitable adapter to dispatch the request "+o,"ERR_NOT_SUPPORT")}return i},adapters:th};function ld(t){if(t.cancelToken&&t.cancelToken.throwIfRequested(),t.signal&&t.signal.aborted)throw new Co(null,t)}function vg(t){return ld(t),t.headers=ci.from(t.headers),t.data=ad.call(t,t.transformRequest),["post","put","patch"].indexOf(t.method)!==-1&&t.headers.setContentType("application/x-www-form-urlencoded",!1),Vy.getAdapter(t.adapter||rm.adapter)(t).then(function(i){return ld(t),i.data=ad.call(t,t.transformResponse,i),i.headers=ci.from(i.headers),i},function(i){return Uy(i)||(ld(t),i&&i.response&&(i.response.data=ad.call(t,t.transformResponse,i.response),i.response.headers=ci.from(i.response.headers))),Promise.reject(i)})}const Hy="1.11.0",Au={};["object","boolean","number","function","string","symbol"].forEach((t,e)=>{Au[t]=function(i){return typeof i===t||"a"+(e<1?"n ":" ")+t}});const xg={};Au.transitional=function(e,n,i){function r(s,o){return"[Axios v"+Hy+"] Transitional option '"+s+"'"+o+(i?". "+i:"")}return(s,o,a)=>{if(e===!1)throw new Qe(r(o," has been removed"+(n?" in "+n:"")),Qe.ERR_DEPRECATED);return n&&!xg[o]&&(xg[o]=!0,console.warn(r(o," has been deprecated since v"+n+" and will be removed in the near future"))),e?e(s,o,a):!0}};Au.spelling=function(e){return(n,i)=>(console.warn(`${i} is likely a misspelling of ${e}`),!0)};function wb(t,e,n){if(typeof t!="object")throw new Qe("options must be an object",Qe.ERR_BAD_OPTION_VALUE);const i=Object.keys(t);let r=i.length;for(;r-- >0;){const s=i[r],o=e[s];if(o){const a=t[s],l=a===void 0||o(a,s,t);if(l!==!0)throw new Qe("option "+s+" must be "+l,Qe.ERR_BAD_OPTION_VALUE);continue}if(n!==!0)throw new Qe("Unknown option "+s,Qe.ERR_BAD_OPTION)}}const hc={assertOptions:wb,validators:Au},vi=hc.validators;class $c{constructor(e){this.defaults=e||{},this.interceptors={request:new cg,response:new cg}}async request(e,n){try{return await this._request(e,n)}catch(i){if(i instanceof Error){let r={};Error.captureStackTrace?Error.captureStackTrace(r):r=new Error;const s=r.stack?r.stack.replace(/^.+\n/,""):"";try{i.stack?s&&!String(i.stack).endsWith(s.replace(/^.+\n.+\n/,""))&&(i.stack+=`
`+s):i.stack=s}catch{}}throw i}}_request(e,n){typeof e=="string"?(n=n||{},n.url=e):n=e||{},n=as(this.defaults,n);const{transitional:i,paramsSerializer:r,headers:s}=n;i!==void 0&&hc.assertOptions(i,{silentJSONParsing:vi.transitional(vi.boolean),forcedJSONParsing:vi.transitional(vi.boolean),clarifyTimeoutError:vi.transitional(vi.boolean)},!1),r!=null&&(K.isFunction(r)?n.paramsSerializer={serialize:r}:hc.assertOptions(r,{encode:vi.function,serialize:vi.function},!0)),n.allowAbsoluteUrls!==void 0||(this.defaults.allowAbsoluteUrls!==void 0?n.allowAbsoluteUrls=this.defaults.allowAbsoluteUrls:n.allowAbsoluteUrls=!0),hc.assertOptions(n,{baseUrl:vi.spelling("baseURL"),withXsrfToken:vi.spelling("withXSRFToken")},!0),n.method=(n.method||this.defaults.method||"get").toLowerCase();let o=s&&K.merge(s.common,s[n.method]);s&&K.forEach(["delete","get","head","post","put","patch","common"],g=>{delete s[g]}),n.headers=ci.concat(o,s);const a=[];let l=!0;this.interceptors.request.forEach(function(S){typeof S.runWhen=="function"&&S.runWhen(n)===!1||(l=l&&S.synchronous,a.unshift(S.fulfilled,S.rejected))});const c=[];this.interceptors.response.forEach(function(S){c.push(S.fulfilled,S.rejected)});let u,f=0,d;if(!l){const g=[vg.bind(this),void 0];for(g.unshift(...a),g.push(...c),d=g.length,u=Promise.resolve(n);f<d;)u=u.then(g[f++],g[f++]);return u}d=a.length;let p=n;for(f=0;f<d;){const g=a[f++],S=a[f++];try{p=g(p)}catch(m){S.call(this,m);break}}try{u=vg.call(this,p)}catch(g){return Promise.reject(g)}for(f=0,d=c.length;f<d;)u=u.then(c[f++],c[f++]);return u}getUri(e){e=as(this.defaults,e);const n=Oy(e.baseURL,e.url,e.allowAbsoluteUrls);return Ly(n,e.params,e.paramsSerializer)}}K.forEach(["delete","get","head","options"],function(e){$c.prototype[e]=function(n,i){return this.request(as(i||{},{method:e,url:n,data:(i||{}).data}))}});K.forEach(["post","put","patch"],function(e){function n(i){return function(s,o,a){return this.request(as(a||{},{method:e,headers:i?{"Content-Type":"multipart/form-data"}:{},url:s,data:o}))}}$c.prototype[e]=n(),$c.prototype[e+"Form"]=n(!0)});const pc=$c;class sm{constructor(e){if(typeof e!="function")throw new TypeError("executor must be a function.");let n;this.promise=new Promise(function(s){n=s});const i=this;this.promise.then(r=>{if(!i._listeners)return;let s=i._listeners.length;for(;s-- >0;)i._listeners[s](r);i._listeners=null}),this.promise.then=r=>{let s;const o=new Promise(a=>{i.subscribe(a),s=a}).then(r);return o.cancel=function(){i.unsubscribe(s)},o},e(function(s,o,a){i.reason||(i.reason=new Co(s,o,a),n(i.reason))})}throwIfRequested(){if(this.reason)throw this.reason}subscribe(e){if(this.reason){e(this.reason);return}this._listeners?this._listeners.push(e):this._listeners=[e]}unsubscribe(e){if(!this._listeners)return;const n=this._listeners.indexOf(e);n!==-1&&this._listeners.splice(n,1)}toAbortSignal(){const e=new AbortController,n=i=>{e.abort(i)};return this.subscribe(n),e.signal.unsubscribe=()=>this.unsubscribe(n),e.signal}static source(){let e;return{token:new sm(function(r){e=r}),cancel:e}}}const Tb=sm;function bb(t){return function(n){return t.apply(null,n)}}function Ab(t){return K.isObject(t)&&t.isAxiosError===!0}const nh={Continue:100,SwitchingProtocols:101,Processing:102,EarlyHints:103,Ok:200,Created:201,Accepted:202,NonAuthoritativeInformation:203,NoContent:204,ResetContent:205,PartialContent:206,MultiStatus:207,AlreadyReported:208,ImUsed:226,MultipleChoices:300,MovedPermanently:301,Found:302,SeeOther:303,NotModified:304,UseProxy:305,Unused:306,TemporaryRedirect:307,PermanentRedirect:308,BadRequest:400,Unauthorized:401,PaymentRequired:402,Forbidden:403,NotFound:404,MethodNotAllowed:405,NotAcceptable:406,ProxyAuthenticationRequired:407,RequestTimeout:408,Conflict:409,Gone:410,LengthRequired:411,PreconditionFailed:412,PayloadTooLarge:413,UriTooLong:414,UnsupportedMediaType:415,RangeNotSatisfiable:416,ExpectationFailed:417,ImATeapot:418,MisdirectedRequest:421,UnprocessableEntity:422,Locked:423,FailedDependency:424,TooEarly:425,UpgradeRequired:426,PreconditionRequired:428,TooManyRequests:429,RequestHeaderFieldsTooLarge:431,UnavailableForLegalReasons:451,InternalServerError:500,NotImplemented:501,BadGateway:502,ServiceUnavailable:503,GatewayTimeout:504,HttpVersionNotSupported:505,VariantAlsoNegotiates:506,InsufficientStorage:507,LoopDetected:508,NotExtended:510,NetworkAuthenticationRequired:511};Object.entries(nh).forEach(([t,e])=>{nh[e]=t});const Cb=nh;function Gy(t){const e=new pc(t),n=yy(pc.prototype.request,e);return K.extend(n,pc.prototype,e,{allOwnKeys:!0}),K.extend(n,e,null,{allOwnKeys:!0}),n.create=function(r){return Gy(as(t,r))},n}const Gt=Gy(rm);Gt.Axios=pc;Gt.CanceledError=Co;Gt.CancelToken=Tb;Gt.isCancel=Uy;Gt.VERSION=Hy;Gt.toFormData=wu;Gt.AxiosError=Qe;Gt.Cancel=Gt.CanceledError;Gt.all=function(e){return Promise.all(e)};Gt.spread=bb;Gt.isAxiosError=Ab;Gt.mergeConfig=as;Gt.AxiosHeaders=ci;Gt.formToJSON=t=>Iy(K.isHTMLForm(t)?new FormData(t):t);Gt.getAdapter=Vy.getAdapter;Gt.HttpStatusCode=Cb;Gt.default=Gt;const Rb=Gt,Pb=()=>{const[t,e]=ue.useState({name:"",email:"",subject:"",message:""}),[n,i]=ue.useState(!1),[r,s]=ue.useState(null),o=l=>{e({...t,[l.target.name]:l.target.value}),r&&s(null)},a=async l=>{var c,u;l.preventDefault(),i(!0),s(null);try{await Rb.post("/api/contact",t),s({type:"success",text:"Message sent successfully! I'll get back to you soon."}),e({name:"",email:"",subject:"",message:""})}catch(f){s({type:"error",text:((u=(c=f.response)==null?void 0:c.data)==null?void 0:u.message)||"Failed to send message. Please try again."})}finally{i(!1)}};return C.jsx("div",{className:"section-padding",children:C.jsx("div",{className:"container-max-width",children:C.jsxs("div",{className:"max-w-4xl mx-auto",children:[C.jsxs("div",{className:"text-center mb-16",children:[C.jsx("h1",{className:"text-4xl font-bold text-gray-900 dark:text-white mb-4",children:"Get In Touch"}),C.jsx("p",{className:"text-lg text-gray-600 dark:text-gray-300",children:"Have a project in mind or just want to chat? I'd love to hear from you!"})]}),C.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12",children:[C.jsxs("div",{children:[C.jsx("h2",{className:"text-2xl font-semibold mb-8 dark:text-white",children:"Contact Information"}),C.jsxs("div",{className:"space-y-6",children:[C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"bg-primary-100 p-3 rounded-full mr-4",children:C.jsx(Nw,{className:"h-6 w-6 text-primary-600"})}),C.jsxs("div",{children:[C.jsx("h3",{className:"font-semibold dark:text-white",children:"Email"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"lukedfiles@gmail.com"})]})]}),C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"bg-primary-100 p-3 rounded-full mr-4",children:C.jsx(Iw,{className:"h-6 w-6 text-primary-600"})}),C.jsxs("div",{children:[C.jsx("h3",{className:"font-semibold dark:text-white",children:"Phone"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"+1 (951) 219-9145"})]})]}),C.jsxs("div",{className:"flex items-center",children:[C.jsx("div",{className:"bg-primary-100 p-3 rounded-full mr-4",children:C.jsx(vy,{className:"h-6 w-6 text-primary-600"})}),C.jsxs("div",{children:[C.jsx("h3",{className:"font-semibold dark:text-white",children:"Location"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"San Diego, CA"})]})]})]}),C.jsxs("div",{className:"mt-8",children:[C.jsx("h3",{className:"text-lg font-semibold mb-4 dark:text-white",children:"Let's Connect"}),C.jsx("p",{className:"text-gray-600 dark:text-gray-300 mb-4",children:"I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to say hello, feel free to reach out!"}),C.jsxs("div",{className:"flex space-x-4",children:[C.jsxs("a",{href:"https://github.com/lukefiless",className:"text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",children:[C.jsx("span",{className:"sr-only",children:"GitHub"}),C.jsx("svg",{className:"h-6 w-6",fill:"currentColor",viewBox:"0 0 24 24",children:C.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})]}),C.jsxs("a",{href:"https://www.linkedin.com/in/luke-files/",className:"text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors",children:[C.jsx("span",{className:"sr-only",children:"LinkedIn"}),C.jsx("svg",{className:"h-6 w-6",fill:"currentColor",viewBox:"0 0 24 24",children:C.jsx("path",{d:"M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"})})]})]})]})]}),C.jsxs("div",{children:[C.jsx("h2",{className:"text-2xl font-semibold mb-8 dark:text-white",children:"Send a Message"}),C.jsxs("form",{onSubmit:a,className:"space-y-6",children:[C.jsxs("div",{children:[C.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Name"}),C.jsx("input",{type:"text",id:"name",name:"name",value:t.name,onChange:o,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"})]}),C.jsxs("div",{children:[C.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Email"}),C.jsx("input",{type:"email",id:"email",name:"email",value:t.email,onChange:o,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"})]}),C.jsxs("div",{children:[C.jsx("label",{htmlFor:"subject",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Subject"}),C.jsx("input",{type:"text",id:"subject",name:"subject",value:t.subject,onChange:o,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"})]}),C.jsxs("div",{children:[C.jsx("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Message"}),C.jsx("textarea",{id:"message",name:"message",rows:5,value:t.message,onChange:o,required:!0,className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"})]}),r&&C.jsx("div",{className:`p-4 rounded-lg ${r.type==="success"?"bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200":"bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200"}`,children:r.text}),C.jsxs("button",{type:"submit",disabled:n,className:"btn-primary w-full inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed",children:[C.jsx(Ow,{className:"mr-2 h-5 w-5"}),n?"Sending...":"Send Message"]})]})]})]})]})})})};/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const om="185",Nb=0,_g=1,Lb=2,mc=1,Wy=2,Qo=3,Pr=0,vn=1,Bi=2,Wi=0,ao=1,ih=2,yg=3,Sg=4,Db=5,Xr=100,Ib=101,Ub=102,Fb=103,Ob=104,kb=200,Bb=201,zb=202,Vb=203,rh=204,sh=205,Hb=206,Gb=207,Wb=208,Xb=209,jb=210,qb=211,Yb=212,$b=213,Kb=214,oh=0,ah=1,lh=2,xo=3,ch=4,uh=5,dh=6,fh=7,am=0,Zb=1,Jb=2,Ai=0,Xy=1,jy=2,qy=3,lm=4,Yy=5,$y=6,Ky=7,Zy=300,ls=301,_o=302,cd=303,ud=304,Cu=306,hh=1e3,Hi=1001,ph=1002,Qt=1003,Qb=1004,Sl=1005,un=1006,dd=1007,Zr=1008,In=1009,Jy=1010,Qy=1011,za=1012,cm=1013,Ri=1014,si=1015,Ki=1016,um=1017,dm=1018,Va=1020,eS=35902,tS=35899,nS=1021,iS=1022,oi=1023,Zi=1026,Jr=1027,fm=1028,hm=1029,cs=1030,pm=1031,mm=1033,gc=33776,vc=33777,xc=33778,_c=33779,mh=35840,gh=35841,vh=35842,xh=35843,_h=36196,yh=37492,Sh=37496,Mh=37488,Eh=37489,Kc=37490,wh=37491,Th=37808,bh=37809,Ah=37810,Ch=37811,Rh=37812,Ph=37813,Nh=37814,Lh=37815,Dh=37816,Ih=37817,Uh=37818,Fh=37819,Oh=37820,kh=37821,Bh=36492,zh=36494,Vh=36495,Hh=36283,Gh=36284,Zc=36285,Wh=36286,eA=3200,Jc=0,tA=1,pr="",Sn="srgb",Qc="srgb-linear",eu="linear",ht="srgb",ws=7680,Mg=519,nA=512,iA=513,rA=514,gm=515,sA=516,oA=517,vm=518,aA=519,Eg=35044,wg=35048,Tg="300 es",wi=2e3,Ha=2001;function lA(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function tu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function cA(){const t=tu("canvas");return t.style.display="block",t}const bg={};function Ag(...t){const e="THREE."+t.shift();console.log(e,...t)}function rS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Xe(...t){t=rS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function lt(...t){t=rS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function lo(...t){const e=t.join(" ");e in bg||(bg[e]=!0,Xe(...t))}function uA(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const dA={[oh]:ah,[lh]:dh,[ch]:fh,[xo]:uh,[ah]:oh,[dh]:lh,[fh]:ch,[uh]:xo};class vs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const on=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Cg=1234567;const pa=Math.PI/180,Ga=180/Math.PI;function xs(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(on[t&255]+on[t>>8&255]+on[t>>16&255]+on[t>>24&255]+"-"+on[e&255]+on[e>>8&255]+"-"+on[e>>16&15|64]+on[e>>24&255]+"-"+on[n&63|128]+on[n>>8&255]+"-"+on[n>>16&255]+on[n>>24&255]+on[i&255]+on[i>>8&255]+on[i>>16&255]+on[i>>24&255]).toLowerCase()}function rt(t,e,n){return Math.max(e,Math.min(n,t))}function xm(t,e){return(t%e+e)%e}function fA(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)}function hA(t,e,n){return t!==e?(n-t)/(e-t):0}function ma(t,e,n){return(1-n)*t+n*e}function pA(t,e,n,i){return ma(t,e,1-Math.exp(-n*i))}function mA(t,e=1){return e-Math.abs(xm(t,e*2)-e)}function gA(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*(3-2*t))}function vA(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e),t*t*t*(t*(t*6-15)+10))}function xA(t,e){return t+Math.floor(Math.random()*(e-t+1))}function _A(t,e){return t+Math.random()*(e-t)}function yA(t){return t*(.5-Math.random())}function SA(t){t!==void 0&&(Cg=t);let e=Cg+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function MA(t){return t*pa}function EA(t){return t*Ga}function wA(t){return(t&t-1)===0&&t!==0}function TA(t){return Math.pow(2,Math.ceil(Math.log(t)/Math.LN2))}function bA(t){return Math.pow(2,Math.floor(Math.log(t)/Math.LN2))}function AA(t,e,n,i,r){const s=Math.cos,o=Math.sin,a=s(n/2),l=o(n/2),c=s((e+i)/2),u=o((e+i)/2),f=s((e-i)/2),d=o((e-i)/2),p=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":t.set(a*u,l*f,l*d,a*c);break;case"YZY":t.set(l*d,a*u,l*f,a*c);break;case"ZXZ":t.set(l*f,l*d,a*u,a*c);break;case"XZX":t.set(a*u,l*g,l*p,a*c);break;case"YXY":t.set(l*p,a*u,l*g,a*c);break;case"ZYZ":t.set(l*g,l*p,a*u,a*c);break;default:Xe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function Vs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function hn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Et={DEG2RAD:pa,RAD2DEG:Ga,generateUUID:xs,clamp:rt,euclideanModulo:xm,mapLinear:fA,inverseLerp:hA,lerp:ma,damp:pA,pingpong:mA,smoothstep:gA,smootherstep:vA,randInt:xA,randFloat:_A,randFloatSpread:yA,seededRandom:SA,degToRad:MA,radToDeg:EA,isPowerOfTwo:wA,ceilPowerOfTwo:TA,floorPowerOfTwo:bA,setQuaternionFromProperEuler:AA,normalize:hn,denormalize:Vs},Cm=class Cm{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=rt(this.x,e.x,n.x),this.y=rt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=rt(this.x,e,n),this.y=rt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Cm.prototype.isVector2=!0;let xe=Cm;class _s{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],c=i[r+1],u=i[r+2],f=i[r+3],d=s[o+0],p=s[o+1],g=s[o+2],S=s[o+3];if(f!==S||l!==d||c!==p||u!==g){let m=l*d+c*p+u*g+f*S;m<0&&(d=-d,p=-p,g=-g,S=-S,m=-m);let h=1-a;if(m<.9995){const v=Math.acos(m),_=Math.sin(v);h=Math.sin(h*v)/_,a=Math.sin(a*v)/_,l=l*h+d*a,c=c*h+p*a,u=u*h+g*a,f=f*h+S*a}else{l=l*h+d*a,c=c*h+p*a,u=u*h+g*a,f=f*h+S*a;const v=1/Math.sqrt(l*l+c*c+u*u+f*f);l*=v,c*=v,u*=v,f*=v}}e[n]=l,e[n+1]=c,e[n+2]=u,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],c=i[r+2],u=i[r+3],f=s[o],d=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+u*f+l*p-c*d,e[n+1]=l*g+u*d+c*f-a*p,e[n+2]=c*g+u*p+a*d-l*f,e[n+3]=u*g-a*f-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),u=a(r/2),f=a(s/2),d=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*u*f+c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f-d*p*g;break;case"YXZ":this._x=d*u*f+c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f+d*p*g;break;case"ZXY":this._x=d*u*f-c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f-d*p*g;break;case"ZYX":this._x=d*u*f-c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f+d*p*g;break;case"YZX":this._x=d*u*f+c*p*g,this._y=c*p*f+d*u*g,this._z=c*u*g-d*p*f,this._w=c*u*f-d*p*g;break;case"XZY":this._x=d*u*f-c*p*g,this._y=c*p*f-d*u*g,this._z=c*u*g+d*p*f,this._w=c*u*f+d*p*g;break;default:Xe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],c=n[2],u=n[6],f=n[10],d=i+a+f;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(s-c)*p,this._z=(o-r)*p}else if(i>a&&i>f){const p=2*Math.sqrt(1+i-a-f);this._w=(u-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+c)/p}else if(a>f){const p=2*Math.sqrt(1+a-i-f);this._w=(s-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+u)/p}else{const p=2*Math.sqrt(1+f-i-a);this._w=(o-r)/p,this._x=(s+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(rt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,c=n._z,u=n._w;return this._x=i*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-i*c,this._z=s*u+o*c+i*l-r*a,this._w=o*u-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(i=-i,r=-r,s=-s,o=-o,a=-a);let l=1-n;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,n=Math.sin(n*c)/u,this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+r*n,this._z=this._z*l+s*n,this._w=this._w*l+o*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Rm=class Rm{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Rg.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Rg.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),u=2*(a*n-s*r),f=2*(s*i-o*n);return this.x=n+l*c+o*f-a*u,this.y=i+l*u+a*c-s*f,this.z=r+l*f+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=rt(this.x,e.x,n.x),this.y=rt(this.y,e.y,n.y),this.z=rt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=rt(this.x,e,n),this.y=rt(this.y,e,n),this.z=rt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fd.copy(this).projectOnVector(e),this.sub(fd)}reflect(e){return this.sub(fd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(rt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Rm.prototype.isVector3=!0;let F=Rm;const fd=new F,Rg=new _s,Pm=class Pm{constructor(e,n,i,r,s,o,a,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c)}set(e,n,i,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=n,u[4]=s,u[5]=l,u[6]=i,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],u=i[4],f=i[7],d=i[2],p=i[5],g=i[8],S=r[0],m=r[3],h=r[6],v=r[1],_=r[4],y=r[7],w=r[2],E=r[5],A=r[8];return s[0]=o*S+a*v+l*w,s[3]=o*m+a*_+l*E,s[6]=o*h+a*y+l*A,s[1]=c*S+u*v+f*w,s[4]=c*m+u*_+f*E,s[7]=c*h+u*y+f*A,s[2]=d*S+p*v+g*w,s[5]=d*m+p*_+g*E,s[8]=d*h+p*y+g*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return n*o*u-n*a*c-i*s*u+i*a*l+r*s*c-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=u*o-a*c,d=a*l-u*s,p=c*s-o*l,g=n*f+i*d+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return e[0]=f*S,e[1]=(r*c-u*i)*S,e[2]=(a*i-r*o)*S,e[3]=d*S,e[4]=(u*n-r*l)*S,e[5]=(r*s-a*n)*S,e[6]=p*S,e[7]=(i*l-c*n)*S,e[8]=(o*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+n,0,0,1),this}scale(e,n){return lo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(hd.makeScale(e,n)),this}rotate(e){return lo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(hd.makeRotation(-e)),this}translate(e,n){return lo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(hd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Pm.prototype.isMatrix3=!0;let Ke=Pm;const hd=new Ke,Pg=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ng=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function CA(){const t={enabled:!0,workingColorSpace:Qc,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ht&&(r.r=Xi(r.r),r.g=Xi(r.g),r.b=Xi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(r.r=co(r.r),r.g=co(r.g),r.b=co(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===pr?eu:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return lo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return lo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Qc]:{primaries:e,whitePoint:i,transfer:eu,toXYZ:Pg,fromXYZ:Ng,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Sn},outputColorSpaceConfig:{drawingBufferColorSpace:Sn}},[Sn]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:Pg,fromXYZ:Ng,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Sn}}}),t}const at=CA();function Xi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function co(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ts;class RA{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ts===void 0&&(Ts=tu("canvas")),Ts.width=e.width,Ts.height=e.height;const r=Ts.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ts}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=tu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Xi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Xi(n[i]/255)*255):n[i]=Xi(n[i]);return{data:n,width:e.width,height:e.height}}else return Xe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let PA=0;class _m{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:PA++}),this.uuid=xs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(pd(r[o].image)):s.push(pd(r[o]))}else s=pd(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function pd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?RA.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Xe("Texture: Unable to serialize Texture."),{})}let NA=0;const md=new F;class dn extends vs{constructor(e=dn.DEFAULT_IMAGE,n=dn.DEFAULT_MAPPING,i=Hi,r=Hi,s=un,o=Zr,a=oi,l=In,c=dn.DEFAULT_ANISOTROPY,u=pr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:NA++}),this.uuid=xs(),this.name="",this.source=new _m(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new xe(0,0),this.repeat=new xe(1,1),this.center=new xe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(md).x}get height(){return this.source.getSize(md).y}get depth(){return this.source.getSize(md).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Xe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Xe(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Zy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case hh:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case ph:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case hh:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case ph:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=Zy;dn.DEFAULT_ANISOTROPY=1;const Nm=class Nm{constructor(e=0,n=0,i=0,r=1){this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,c=l[0],u=l[4],f=l[8],d=l[1],p=l[5],g=l[9],S=l[2],m=l[6],h=l[10];if(Math.abs(u-d)<.01&&Math.abs(f-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+d)<.1&&Math.abs(f+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const _=(c+1)/2,y=(p+1)/2,w=(h+1)/2,E=(u+d)/4,A=(f+S)/4,x=(g+m)/4;return _>y&&_>w?_<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(_),r=E/i,s=A/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=E/r,s=x/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=x/s),this.set(i,r,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(f-S)*(f-S)+(d-u)*(d-u));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(f-S)/v,this.z=(d-u)/v,this.w=Math.acos((c+p+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=rt(this.x,e.x,n.x),this.y=rt(this.y,e.y,n.y),this.z=rt(this.z,e.z,n.z),this.w=rt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=rt(this.x,e,n),this.y=rt(this.y,e,n),this.z=rt(this.z,e,n),this.w=rt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(rt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Nm.prototype.isVector4=!0;let At=Nm;class LA extends vs{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:un,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new At(0,0,e,n),this.scissorTest=!1,this.viewport=new At(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new dn(r),o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:un,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new _m(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ci extends LA{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class sS extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class DA extends dn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const iu=class iu{constructor(e,n,i,r,s,o,a,l,c,u,f,d,p,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,c,u,f,d,p,g,S,m)}set(e,n,i,r,s,o,a,l,c,u,f,d,p,g,S,m){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=r,h[1]=s,h[5]=o,h[9]=a,h[13]=l,h[2]=c,h[6]=u,h[10]=f,h[14]=d,h[3]=p,h[7]=g,h[11]=S,h[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new iu().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,r=1/bs.setFromMatrixColumn(e,0).length(),s=1/bs.setFromMatrixColumn(e,1).length(),o=1/bs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const d=o*u,p=o*f,g=a*u,S=a*f;n[0]=l*u,n[4]=-l*f,n[8]=c,n[1]=p+g*c,n[5]=d-S*c,n[9]=-a*l,n[2]=S-d*c,n[6]=g+p*c,n[10]=o*l}else if(e.order==="YXZ"){const d=l*u,p=l*f,g=c*u,S=c*f;n[0]=d+S*a,n[4]=g*a-p,n[8]=o*c,n[1]=o*f,n[5]=o*u,n[9]=-a,n[2]=p*a-g,n[6]=S+d*a,n[10]=o*l}else if(e.order==="ZXY"){const d=l*u,p=l*f,g=c*u,S=c*f;n[0]=d-S*a,n[4]=-o*f,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*u,n[9]=S-d*a,n[2]=-o*c,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const d=o*u,p=o*f,g=a*u,S=a*f;n[0]=l*u,n[4]=g*c-p,n[8]=d*c+S,n[1]=l*f,n[5]=S*c+d,n[9]=p*c-g,n[2]=-c,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const d=o*l,p=o*c,g=a*l,S=a*c;n[0]=l*u,n[4]=S-d*f,n[8]=g*f+p,n[1]=f,n[5]=o*u,n[9]=-a*u,n[2]=-c*u,n[6]=p*f+g,n[10]=d-S*f}else if(e.order==="XZY"){const d=o*l,p=o*c,g=a*l,S=a*c;n[0]=l*u,n[4]=-f,n[8]=c*u,n[1]=d*f+S,n[5]=o*u,n[9]=p*f-g,n[2]=g*f-p,n[6]=a*u,n[10]=S*f+d}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(IA,e,UA)}lookAt(e,n,i){const r=this.elements;return Pn.subVectors(e,n),Pn.lengthSq()===0&&(Pn.z=1),Pn.normalize(),ir.crossVectors(i,Pn),ir.lengthSq()===0&&(Math.abs(i.z)===1?Pn.x+=1e-4:Pn.z+=1e-4,Pn.normalize(),ir.crossVectors(i,Pn)),ir.normalize(),Ml.crossVectors(Pn,ir),r[0]=ir.x,r[4]=Ml.x,r[8]=Pn.x,r[1]=ir.y,r[5]=Ml.y,r[9]=Pn.y,r[2]=ir.z,r[6]=Ml.z,r[10]=Pn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],u=i[1],f=i[5],d=i[9],p=i[13],g=i[2],S=i[6],m=i[10],h=i[14],v=i[3],_=i[7],y=i[11],w=i[15],E=r[0],A=r[4],x=r[8],b=r[12],R=r[1],N=r[5],U=r[9],H=r[13],q=r[2],D=r[6],k=r[10],B=r[14],I=r[3],W=r[7],$=r[11],ee=r[15];return s[0]=o*E+a*R+l*q+c*I,s[4]=o*A+a*N+l*D+c*W,s[8]=o*x+a*U+l*k+c*$,s[12]=o*b+a*H+l*B+c*ee,s[1]=u*E+f*R+d*q+p*I,s[5]=u*A+f*N+d*D+p*W,s[9]=u*x+f*U+d*k+p*$,s[13]=u*b+f*H+d*B+p*ee,s[2]=g*E+S*R+m*q+h*I,s[6]=g*A+S*N+m*D+h*W,s[10]=g*x+S*U+m*k+h*$,s[14]=g*b+S*H+m*B+h*ee,s[3]=v*E+_*R+y*q+w*I,s[7]=v*A+_*N+y*D+w*W,s[11]=v*x+_*U+y*k+w*$,s[15]=v*b+_*H+y*B+w*ee,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],f=e[6],d=e[10],p=e[14],g=e[3],S=e[7],m=e[11],h=e[15],v=l*p-c*d,_=a*p-c*f,y=a*d-l*f,w=o*p-c*u,E=o*d-l*u,A=o*f-a*u;return n*(S*v-m*_+h*y)-i*(g*v-m*w+h*E)+r*(g*_-S*w+h*A)-s*(g*y-S*E+m*A)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[1],o=e[5],a=e[9],l=e[2],c=e[6],u=e[10];return n*(o*u-a*c)-i*(s*u-a*l)+r*(s*c-o*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],f=e[9],d=e[10],p=e[11],g=e[12],S=e[13],m=e[14],h=e[15],v=n*a-i*o,_=n*l-r*o,y=n*c-s*o,w=i*l-r*a,E=i*c-s*a,A=r*c-s*l,x=u*S-f*g,b=u*m-d*g,R=u*h-p*g,N=f*m-d*S,U=f*h-p*S,H=d*h-p*m,q=v*H-_*U+y*N+w*R-E*b+A*x;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/q;return e[0]=(a*H-l*U+c*N)*D,e[1]=(r*U-i*H-s*N)*D,e[2]=(S*A-m*E+h*w)*D,e[3]=(d*E-f*A-p*w)*D,e[4]=(l*R-o*H-c*b)*D,e[5]=(n*H-r*R+s*b)*D,e[6]=(m*y-g*A-h*_)*D,e[7]=(u*A-d*y+p*_)*D,e[8]=(o*U-a*R+c*x)*D,e[9]=(i*R-n*U-s*x)*D,e[10]=(g*E-S*y+h*v)*D,e[11]=(f*y-u*E-p*v)*D,e[12]=(a*b-o*N-l*x)*D,e[13]=(n*N-i*b+r*x)*D,e[14]=(S*_-g*w-m*v)*D,e[15]=(u*w-f*_+d*v)*D,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+i,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,c=s+s,u=o+o,f=a+a,d=s*c,p=s*u,g=s*f,S=o*u,m=o*f,h=a*f,v=l*c,_=l*u,y=l*f,w=i.x,E=i.y,A=i.z;return r[0]=(1-(S+h))*w,r[1]=(p+y)*w,r[2]=(g-_)*w,r[3]=0,r[4]=(p-y)*E,r[5]=(1-(d+h))*E,r[6]=(m+v)*E,r[7]=0,r[8]=(g+_)*A,r[9]=(m-v)*A,r[10]=(1-(d+S))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let o=bs.set(r[0],r[1],r[2]).length();const a=bs.set(r[4],r[5],r[6]).length(),l=bs.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Zn.copy(this);const c=1/o,u=1/a,f=1/l;return Zn.elements[0]*=c,Zn.elements[1]*=c,Zn.elements[2]*=c,Zn.elements[4]*=u,Zn.elements[5]*=u,Zn.elements[6]*=u,Zn.elements[8]*=f,Zn.elements[9]*=f,Zn.elements[10]*=f,n.setFromRotationMatrix(Zn),i.x=o,i.y=a,i.z=l,this}makePerspective(e,n,i,r,s,o,a=wi,l=!1){const c=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),p=(i+r)/(i-r);let g,S;if(l)g=s/(o-s),S=o*s/(o-s);else if(a===wi)g=-(o+s)/(o-s),S=-2*o*s/(o-s);else if(a===Ha)g=-o/(o-s),S=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=wi,l=!1){const c=this.elements,u=2/(n-e),f=2/(i-r),d=-(n+e)/(n-e),p=-(i+r)/(i-r);let g,S;if(l)g=1/(o-s),S=o/(o-s);else if(a===wi)g=-2/(o-s),S=-(o+s)/(o-s);else if(a===Ha)g=-1/(o-s),S=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};iu.prototype.isMatrix4=!0;let ft=iu;const bs=new F,Zn=new ft,IA=new F(0,0,0),UA=new F(1,1,1),ir=new F,Ml=new F,Pn=new F,Lg=new ft,Dg=new _s;class di{constructor(e=0,n=0,i=0,r=di.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],f=r[2],d=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(rt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-rt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(rt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-rt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(rt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-rt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,p),this._y=0);break;default:Xe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Lg.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lg,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Dg.setFromEuler(this),this.setFromQuaternion(Dg,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}di.DEFAULT_ORDER="XYZ";class oS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let FA=0;const Ig=new F,As=new _s,Li=new ft,El=new F,zo=new F,OA=new F,kA=new _s,Ug=new F(1,0,0),Fg=new F(0,1,0),Og=new F(0,0,1),kg={type:"added"},BA={type:"removed"},Cs={type:"childadded",child:null},gd={type:"childremoved",child:null};class Zt extends vs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:FA++}),this.uuid=xs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zt.DEFAULT_UP.clone();const e=new F,n=new di,i=new _s,r=new F(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ft},normalMatrix:{value:new Ke}}),this.matrix=new ft,this.matrixWorld=new ft,this.matrixAutoUpdate=Zt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new oS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return As.setFromAxisAngle(e,n),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,n){return As.setFromAxisAngle(e,n),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Ug,e)}rotateY(e){return this.rotateOnAxis(Fg,e)}rotateZ(e){return this.rotateOnAxis(Og,e)}translateOnAxis(e,n){return Ig.copy(e).applyQuaternion(this.quaternion),this.position.add(Ig.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Ug,e)}translateY(e){return this.translateOnAxis(Fg,e)}translateZ(e){return this.translateOnAxis(Og,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Li.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?El.copy(e):El.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),zo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Li.lookAt(zo,El,this.up):Li.lookAt(El,zo,this.up),this.quaternion.setFromRotationMatrix(Li),r&&(Li.extractRotation(r.matrixWorld),As.setFromRotationMatrix(Li),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(kg),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(BA),gd.child=e,this.dispatchEvent(gd),gd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Li.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Li.multiply(e.parent.matrixWorld)),e.applyMatrix4(Li),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(kg),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,e,OA),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(zo,kA,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let o=0,a=s.length;o<a;o++)s[o].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),f=o(e.shapes),d=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Zt.DEFAULT_UP=new F(0,1,0);Zt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Bt extends Zt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const zA={type:"move"};class vd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const S of e.hand.values()){const m=n.getJointPose(S,i),h=this._getHandJoint(c,S);m!==null&&(h.matrix.fromArray(m.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=m.radius),h.visible=m!==null}const u=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],d=u.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(zA)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Bt;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const aS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rr={h:0,s:0,l:0},wl={h:0,s:0,l:0};function xd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Ve{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Sn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=at.workingColorSpace){return this.r=e,this.g=n,this.b=i,at.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=at.workingColorSpace){if(e=xm(e,1),n=rt(n,0,1),i=rt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=xd(o,s,e+1/3),this.g=xd(o,s,e),this.b=xd(o,s,e-1/3)}return at.colorSpaceToWorking(this,r),this}setStyle(e,n=Sn){function i(s){s!==void 0&&parseFloat(s)<1&&Xe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Xe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);Xe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Sn){const i=aS[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Xe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=co(e.r),this.g=co(e.g),this.b=co(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Sn){return at.workingToColorSpace(an.copy(this),e),Math.round(rt(an.r*255,0,255))*65536+Math.round(rt(an.g*255,0,255))*256+Math.round(rt(an.b*255,0,255))}getHexString(e=Sn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=at.workingColorSpace){at.workingToColorSpace(an.copy(this),n);const i=an.r,r=an.g,s=an.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const f=o-a;switch(c=u<=.5?f/(o+a):f/(2-o-a),o){case i:l=(r-s)/f+(r<s?6:0);break;case r:l=(s-i)/f+2;break;case s:l=(i-r)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,n=at.workingColorSpace){return at.workingToColorSpace(an.copy(this),n),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Sn){at.workingToColorSpace(an.copy(this),e);const n=an.r,i=an.g,r=an.b;return e!==Sn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(rr),this.setHSL(rr.h+e,rr.s+n,rr.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(rr),e.getHSL(wl);const i=ma(rr.h,wl.h,n),r=ma(rr.s,wl.s,n),s=ma(rr.l,wl.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const an=new Ve;Ve.NAMES=aS;class lS extends Zt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new di,this.environmentIntensity=1,this.environmentRotation=new di,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Jn=new F,Di=new F,_d=new F,Ii=new F,Rs=new F,Ps=new F,Bg=new F,yd=new F,Sd=new F,Md=new F,Ed=new At,wd=new At,Td=new At;class ri{constructor(e=new F,n=new F,i=new F){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Jn.subVectors(e,n),r.cross(Jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Jn.subVectors(r,n),Di.subVectors(i,n),_d.subVectors(e,n);const o=Jn.dot(Jn),a=Jn.dot(Di),l=Jn.dot(_d),c=Di.dot(Di),u=Di.dot(_d),f=o*c-a*a;if(f===0)return s.set(0,0,0),null;const d=1/f,p=(c*l-a*u)*d,g=(o*u-a*l)*d;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ii)===null?!1:Ii.x>=0&&Ii.y>=0&&Ii.x+Ii.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,Ii)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Ii.x),l.addScaledVector(o,Ii.y),l.addScaledVector(a,Ii.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Ed.setScalar(0),wd.setScalar(0),Td.setScalar(0),Ed.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),Td.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Ed,s.x),o.addScaledVector(wd,s.y),o.addScaledVector(Td,s.z),o}static isFrontFacing(e,n,i,r){return Jn.subVectors(i,n),Di.subVectors(e,n),Jn.cross(Di).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Di.subVectors(this.a,this.b),Jn.cross(Di).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ri.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ri.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ri.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ri.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ri.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Rs.subVectors(r,i),Ps.subVectors(s,i),yd.subVectors(e,i);const l=Rs.dot(yd),c=Ps.dot(yd);if(l<=0&&c<=0)return n.copy(i);Sd.subVectors(e,r);const u=Rs.dot(Sd),f=Ps.dot(Sd);if(u>=0&&f<=u)return n.copy(r);const d=l*f-u*c;if(d<=0&&l>=0&&u<=0)return o=l/(l-u),n.copy(i).addScaledVector(Rs,o);Md.subVectors(e,s);const p=Rs.dot(Md),g=Ps.dot(Md);if(g>=0&&p<=g)return n.copy(s);const S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return a=c/(c-g),n.copy(i).addScaledVector(Ps,a);const m=u*g-p*f;if(m<=0&&f-u>=0&&p-g>=0)return Bg.subVectors(s,r),a=(f-u)/(f-u+(p-g)),n.copy(r).addScaledVector(Bg,a);const h=1/(m+S+d);return o=S*h,a=d*h,n.copy(i).addScaledVector(Rs,o).addScaledVector(Ps,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ys{constructor(e=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Qn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Qn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Qn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Qn):Qn.fromBufferAttribute(s,o),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Tl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Tl.copy(i.boundingBox)),Tl.applyMatrix4(e.matrixWorld),this.union(Tl)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),bl.subVectors(this.max,Vo),Ns.subVectors(e.a,Vo),Ls.subVectors(e.b,Vo),Ds.subVectors(e.c,Vo),sr.subVectors(Ls,Ns),or.subVectors(Ds,Ls),Or.subVectors(Ns,Ds);let n=[0,-sr.z,sr.y,0,-or.z,or.y,0,-Or.z,Or.y,sr.z,0,-sr.x,or.z,0,-or.x,Or.z,0,-Or.x,-sr.y,sr.x,0,-or.y,or.x,0,-Or.y,Or.x,0];return!bd(n,Ns,Ls,Ds,bl)||(n=[1,0,0,0,1,0,0,0,1],!bd(n,Ns,Ls,Ds,bl))?!1:(Al.crossVectors(sr,or),n=[Al.x,Al.y,Al.z],bd(n,Ns,Ls,Ds,bl))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ui[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ui[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ui[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ui[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ui[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ui[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ui[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ui[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ui),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ui=[new F,new F,new F,new F,new F,new F,new F,new F],Qn=new F,Tl=new ys,Ns=new F,Ls=new F,Ds=new F,sr=new F,or=new F,Or=new F,Vo=new F,bl=new F,Al=new F,kr=new F;function bd(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){kr.fromArray(t,s);const a=r.x*Math.abs(kr.x)+r.y*Math.abs(kr.y)+r.z*Math.abs(kr.z),l=e.dot(kr),c=n.dot(kr),u=i.dot(kr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const kt=new F,Cl=new xe;let VA=0;class On extends vs{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:VA++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Eg,this.updateRanges=[],this.gpuType=si,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Cl.fromBufferAttribute(this,n),Cl.applyMatrix3(e),this.setXY(n,Cl.x,Cl.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)kt.fromBufferAttribute(this,n),kt.applyMatrix3(e),this.setXYZ(n,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)kt.fromBufferAttribute(this,n),kt.applyMatrix4(e),this.setXYZ(n,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)kt.fromBufferAttribute(this,n),kt.applyNormalMatrix(e),this.setXYZ(n,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)kt.fromBufferAttribute(this,n),kt.transformDirection(e),this.setXYZ(n,kt.x,kt.y,kt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Vs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=hn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Vs(n,this.array)),n}setX(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Vs(n,this.array)),n}setY(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Vs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Vs(n,this.array)),n}setW(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array),r=hn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array),r=hn(r,this.array),s=hn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Eg&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class cS extends On{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class uS extends On{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Ht extends On{constructor(e,n,i){super(new Float32Array(e),n,i)}}const HA=new ys,Ho=new F,Ad=new F;class Ro{constructor(e=new F,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):HA.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ho.subVectors(e,this.center);const n=Ho.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ho,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ad.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ho.copy(e.center).add(Ad)),this.expandByPoint(Ho.copy(e.center).sub(Ad))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let GA=0;const Hn=new ft,Cd=new Zt,Is=new F,Nn=new ys,Go=new ys,Yt=new F;class yn extends vs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:GA++}),this.uuid=xs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(lA(e)?uS:cS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Hn.makeRotationFromQuaternion(e),this.applyMatrix4(Hn),this}rotateX(e){return Hn.makeRotationX(e),this.applyMatrix4(Hn),this}rotateY(e){return Hn.makeRotationY(e),this.applyMatrix4(Hn),this}rotateZ(e){return Hn.makeRotationZ(e),this.applyMatrix4(Hn),this}translate(e,n,i){return Hn.makeTranslation(e,n,i),this.applyMatrix4(Hn),this}scale(e,n,i){return Hn.makeScale(e,n,i),this.applyMatrix4(Hn),this}lookAt(e){return Cd.lookAt(e),Cd.updateMatrix(),this.applyMatrix4(Cd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ht(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Xe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ys);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Nn.setFromBufferAttribute(s),this.morphTargetsRelative?(Yt.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(Yt),Yt.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(Yt)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ro);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];Go.setFromBufferAttribute(a),this.morphTargetsRelative?(Yt.addVectors(Nn.min,Go.min),Nn.expandByPoint(Yt),Yt.addVectors(Nn.max,Go.max),Nn.expandByPoint(Yt)):(Nn.expandByPoint(Go.min),Nn.expandByPoint(Go.max))}Nn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Yt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Yt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Yt.fromBufferAttribute(a,c),l&&(Is.fromBufferAttribute(e,c),Yt.add(Is)),r=Math.max(r,i.distanceToSquared(Yt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;let o=this.getAttribute("tangent");(o===void 0||o.count!==i.count)&&(o=new On(new Float32Array(4*i.count),4),this.setAttribute("tangent",o));const a=[],l=[];for(let x=0;x<i.count;x++)a[x]=new F,l[x]=new F;const c=new F,u=new F,f=new F,d=new xe,p=new xe,g=new xe,S=new F,m=new F;function h(x,b,R){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,R),d.fromBufferAttribute(s,x),p.fromBufferAttribute(s,b),g.fromBufferAttribute(s,R),u.sub(c),f.sub(c),p.sub(d),g.sub(d);const N=1/(p.x*g.y-g.x*p.y);isFinite(N)&&(S.copy(u).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(N),m.copy(f).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(N),a[x].add(S),a[b].add(S),a[R].add(S),l[x].add(m),l[b].add(m),l[R].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let x=0,b=v.length;x<b;++x){const R=v[x],N=R.start,U=R.count;for(let H=N,q=N+U;H<q;H+=3)h(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const _=new F,y=new F,w=new F,E=new F;function A(x){w.fromBufferAttribute(r,x),E.copy(w);const b=a[x];_.copy(b),_.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(E,b);const N=y.dot(l[x])<0?-1:1;o.setXYZW(x,_.x,_.y,_.z,N)}for(let x=0,b=v.length;x<b;++x){const R=v[x],N=R.start,U=R.count;for(let H=N,q=N+U;H<q;H+=3)A(e.getX(H+0)),A(e.getX(H+1)),A(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new On(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);const r=new F,s=new F,o=new F,a=new F,l=new F,c=new F,u=new F,f=new F;if(e)for(let d=0,p=e.count;d<p;d+=3){const g=e.getX(d+0),S=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,S),o.fromBufferAttribute(n,m),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),a.add(u),l.add(u),c.add(u),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=n.count;d<p;d+=3)r.fromBufferAttribute(n,d+0),s.fromBufferAttribute(n,d+1),o.fromBufferAttribute(n,d+2),u.subVectors(o,s),f.subVectors(r,s),u.cross(f),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Yt.fromBufferAttribute(e,n),Yt.normalize(),e.setXYZ(n,Yt.x,Yt.y,Yt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,f=a.normalized,d=new c.constructor(l.length*u);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){a.isInterleavedBufferAttribute?p=l[S]*a.data.stride+a.offset:p=l[S]*u;for(let h=0;h<u;h++)d[g++]=c[p++]}return new On(d,u,f)}if(this.index===null)return Xe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new yn,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,i);n.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,f=c.length;u<f;u++){const d=c[u],p=e(d,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let f=0,d=c.length;f<d;f++){const p=c[f];u.push(p.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(n))}const s=e.morphAttributes;for(const c in s){const u=[],f=s[c];for(let d=0,p=f.length;d<p;d++)u.push(f[d].clone(n));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const f=o[c];this.addGroup(f.start,f.count,f.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let WA=0;class Ur extends vs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:WA++}),this.uuid=xs(),this.name="",this.type="Material",this.blending=ao,this.side=Pr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rh,this.blendDst=sh,this.blendEquation=Xr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=xo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Mg,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ws,this.stencilZFail=ws,this.stencilZPass=ws,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Xe(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Xe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector2&&i&&i.isVector2||r&&r.isEuler&&i&&i.isEuler||r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ao&&(i.blending=this.blending),this.side!==Pr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rh&&(i.blendSrc=this.blendSrc),this.blendDst!==sh&&(i.blendDst=this.blendDst),this.blendEquation!==Xr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==xo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Mg&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ws&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ws&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ws&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ve().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new xe().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new xe().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Fi=new F,Rd=new F,Rl=new F,ar=new F,Pd=new F,Pl=new F,Nd=new F;class dS{constructor(e=new F,n=new F(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Fi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Fi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Fi.copy(this.origin).addScaledVector(this.direction,n),Fi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Rd.copy(e).add(n).multiplyScalar(.5),Rl.copy(n).sub(e).normalize(),ar.copy(this.origin).sub(Rd);const s=e.distanceTo(n)*.5,o=-this.direction.dot(Rl),a=ar.dot(this.direction),l=-ar.dot(Rl),c=ar.lengthSq(),u=Math.abs(1-o*o);let f,d,p,g;if(u>0)if(f=o*l-a,d=o*a-l,g=s*u,f>=0)if(d>=-g)if(d<=g){const S=1/u;f*=S,d*=S,p=f*(f+o*d+2*a)+d*(o*f+d+2*l)+c}else d=s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d=-s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;else d<=-g?(f=Math.max(0,-(-o*s+a)),d=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c):d<=g?(f=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(f=Math.max(0,-(o*s+a)),d=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+d*(d+2*l)+c);else d=o>0?-s:s,f=Math.max(0,-(o*d+a)),p=-f*f+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Rd).addScaledVector(Rl,d),p}intersectSphere(e,n){Fi.subVectors(e.center,this.origin);const i=Fi.dot(this.direction),r=Fi.dot(Fi)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),u>=0?(s=(e.min.y-d.y)*u,o=(e.max.y-d.y)*u):(s=(e.max.y-d.y)*u,o=(e.min.y-d.y)*u),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),f>=0?(a=(e.min.z-d.z)*f,l=(e.max.z-d.z)*f):(a=(e.max.z-d.z)*f,l=(e.min.z-d.z)*f),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Fi)!==null}intersectTriangle(e,n,i,r,s){Pd.subVectors(n,e),Pl.subVectors(i,e),Nd.crossVectors(Pd,Pl);let o=this.direction.dot(Nd),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ar.subVectors(this.origin,e);const l=a*this.direction.dot(Pl.crossVectors(ar,Pl));if(l<0)return null;const c=a*this.direction.dot(Pd.cross(ar));if(c<0||l+c>o)return null;const u=-a*ar.dot(Nd);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class us extends Ur{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=am,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const zg=new ft,Br=new dS,Nl=new Ro,Vg=new F,Ll=new F,Dl=new F,Il=new F,Ld=new F,Ul=new F,Hg=new F,Fl=new F;class et extends Zt{constructor(e=new yn,n=new us){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ul.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],f=s[l];u!==0&&(Ld.fromBufferAttribute(f,e),o?Ul.addScaledVector(Ld,u):Ul.addScaledVector(Ld.sub(n),u))}n.add(Ul)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Nl.copy(i.boundingSphere),Nl.applyMatrix4(s),Br.copy(e.ray).recast(e.near),!(Nl.containsPoint(Br.origin)===!1&&(Br.intersectSphere(Nl,Vg)===null||Br.origin.distanceToSquared(Vg)>(e.far-e.near)**2))&&(zg.copy(s).invert(),Br.copy(e.ray).applyMatrix4(zg),!(i.boundingBox!==null&&Br.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Br)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,d=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,S=d.length;g<S;g++){const m=d[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,w=_;y<w;y+=3){const E=a.getX(y),A=a.getX(y+1),x=a.getX(y+2);r=Ol(this,h,e,i,c,u,f,E,A,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),S=Math.min(a.count,p.start+p.count);for(let m=g,h=S;m<h;m+=3){const v=a.getX(m),_=a.getX(m+1),y=a.getX(m+2);r=Ol(this,o,e,i,c,u,f,v,_,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,S=d.length;g<S;g++){const m=d[g],h=o[m.materialIndex],v=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,w=_;y<w;y+=3){const E=y,A=y+1,x=y+2;r=Ol(this,h,e,i,c,u,f,E,A,x),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,h=S;m<h;m+=3){const v=m,_=m+1,y=m+2;r=Ol(this,o,e,i,c,u,f,v,_,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function XA(t,e,n,i,r,s,o,a){let l;if(e.side===vn?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Pr,a),l===null)return null;Fl.copy(a),Fl.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Fl);return c<n.near||c>n.far?null:{distance:c,point:Fl.clone(),object:t}}function Ol(t,e,n,i,r,s,o,a,l,c){t.getVertexPosition(a,Ll),t.getVertexPosition(l,Dl),t.getVertexPosition(c,Il);const u=XA(t,e,n,i,Ll,Dl,Il,Hg);if(u){const f=new F;ri.getBarycoord(Hg,Ll,Dl,Il,f),r&&(u.uv=ri.getInterpolatedAttribute(r,a,l,c,f,new xe)),s&&(u.uv1=ri.getInterpolatedAttribute(s,a,l,c,f,new xe)),o&&(u.normal=ri.getInterpolatedAttribute(o,a,l,c,f,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new F,materialIndex:0};ri.getNormal(Ll,Dl,Il,d.normal),u.face=d,u.barycoord=f}return u}class fS extends dn{constructor(e=null,n=1,i=1,r,s,o,a,l,c=Qt,u=Qt,f,d){super(null,o,a,l,c,u,r,s,f,d),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Gg extends On{constructor(e,n,i,r=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Us=new ft,Wg=new ft,kl=[],Xg=new ys,jA=new ft,Wo=new et,Xo=new Ro;class nu extends et{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Gg(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<i;r++)this.setMatrixAt(r,jA)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new ys),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Us),Xg.copy(e.boundingBox).applyMatrix4(Us),this.boundingBox.union(Xg)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ro),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Us),Xo.copy(e.boundingSphere).applyMatrix4(Us),this.boundingSphere.union(Xo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,r=this.morphTexture.source.data.data,s=i.length+1,o=e*s+1;for(let a=0;a<i.length;a++)i[a]=r[o+a]}raycast(e,n){const i=this.matrixWorld,r=this.count;if(Wo.geometry=this.geometry,Wo.material=this.material,Wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xo.copy(this.boundingSphere),Xo.applyMatrix4(i),e.ray.intersectsSphere(Xo)!==!1))for(let s=0;s<r;s++){this.getMatrixAt(s,Us),Wg.multiplyMatrices(i,Us),Wo.matrixWorld=Wg,Wo.raycast(e,kl);for(let o=0,a=kl.length;o<a;o++){const l=kl[o];l.instanceId=s,l.object=this,n.push(l)}kl.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new Gg(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,r=i.length+1;this.morphTexture===null&&(this.morphTexture=new fS(new Float32Array(r*this.count),r,this.count,fm,si));const s=this.morphTexture.source.data.data;let o=0;for(let c=0;c<i.length;c++)o+=i[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=r*e;return s[l]=a,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Dd=new F,qA=new F,YA=new Ke;class Wr{constructor(e=new F(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Dd.subVectors(i,n).cross(qA.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const r=e.delta(Dd),s=this.normal.dot(r);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const o=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(o<0||o>1)?null:n.copy(e.start).addScaledVector(r,o)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||YA.getNormalMatrix(e),r=this.coplanarPoint(Dd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zr=new Ro,$A=new xe(.5,.5),Bl=new F;class ym{constructor(e=new Wr,n=new Wr,i=new Wr,r=new Wr,s=new Wr,o=new Wr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=wi,i=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],f=s[5],d=s[6],p=s[7],g=s[8],S=s[9],m=s[10],h=s[11],v=s[12],_=s[13],y=s[14],w=s[15];if(r[0].setComponents(c-o,p-u,h-g,w-v).normalize(),r[1].setComponents(c+o,p+u,h+g,w+v).normalize(),r[2].setComponents(c+a,p+f,h+S,w+_).normalize(),r[3].setComponents(c-a,p-f,h-S,w-_).normalize(),i)r[4].setComponents(l,d,m,y).normalize(),r[5].setComponents(c-l,p-d,h-m,w-y).normalize();else if(r[4].setComponents(c-l,p-d,h-m,w-y).normalize(),n===wi)r[5].setComponents(c+l,p+d,h+m,w+y).normalize();else if(n===Ha)r[5].setComponents(l,d,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zr)}intersectsSprite(e){zr.center.set(0,0,0);const n=$A.distanceTo(e.center);return zr.radius=.7071067811865476+n,zr.applyMatrix4(e.matrixWorld),this.intersectsSphere(zr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Bl.x=r.normal.x>0?e.max.x:e.min.x,Bl.y=r.normal.y>0?e.max.y:e.min.y,Bl.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Bl)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hS extends Ur{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const jg=new ft,Xh=new dS,zl=new Ro,Vl=new F;class KA extends Zt{constructor(e=new yn,n=new hS){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zl.copy(i.boundingSphere),zl.applyMatrix4(r),zl.radius+=s,e.ray.intersectsSphere(zl)===!1)return;jg.copy(r).invert(),Xh.copy(e.ray).applyMatrix4(jg);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=i.index,f=i.attributes.position;if(c!==null){const d=Math.max(0,o.start),p=Math.min(c.count,o.start+o.count);for(let g=d,S=p;g<S;g++){const m=c.getX(g);Vl.fromBufferAttribute(f,m),qg(Vl,m,l,r,e,n,this)}}else{const d=Math.max(0,o.start),p=Math.min(f.count,o.start+o.count);for(let g=d,S=p;g<S;g++)Vl.fromBufferAttribute(f,g),qg(Vl,g,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function qg(t,e,n,i,r,s,o){const a=Xh.distanceSqToPoint(t);if(a<n){const l=new F;Xh.closestPointToPoint(t,l),l.applyMatrix4(i);const c=r.ray.origin.distanceTo(l);if(c<r.near||c>r.far)return;s.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class pS extends dn{constructor(e=[],n=ls,i,r,s,o,a,l,c,u){super(e,n,i,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ZA extends dn{constructor(e,n,i,r,s,o,a,l,c){super(e,n,i,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class yo extends dn{constructor(e,n,i=Ri,r,s,o,a=Qt,l=Qt,c,u=Zi,f=1){if(u!==Zi&&u!==Jr)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:n,depth:f};super(d,r,s,o,a,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new _m(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class JA extends yo{constructor(e,n=Ri,i=ls,r,s,o=Qt,a=Qt,l,c=Zi){const u={width:e,height:e,depth:1},f=[u,u,u,u,u,u];super(e,e,n,i,r,s,o,a,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class mS extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Cn extends yn{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],f=[];let d=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new Ht(c,3)),this.setAttribute("normal",new Ht(u,3)),this.setAttribute("uv",new Ht(f,2));function g(S,m,h,v,_,y,w,E,A,x,b){const R=y/A,N=w/x,U=y/2,H=w/2,q=E/2,D=A+1,k=x+1;let B=0,I=0;const W=new F;for(let $=0;$<k;$++){const ee=$*N-H;for(let le=0;le<D;le++){const Ye=le*R-U;W[S]=Ye*v,W[m]=ee*_,W[h]=q,c.push(W.x,W.y,W.z),W[S]=0,W[m]=0,W[h]=E>0?1:-1,u.push(W.x,W.y,W.z),f.push(le/A),f.push(1-$/x),B+=1}}for(let $=0;$<x;$++)for(let ee=0;ee<A;ee++){const le=d+ee+D*$,Ye=d+ee+D*($+1),Pe=d+(ee+1)+D*($+1),Ge=d+(ee+1)+D*$;l.push(le,Ye,Ge),l.push(Ye,Pe,Ge),I+=6}a.addGroup(p,I,b),p+=I,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ga extends yn{constructor(e=1,n=1,i=4,r=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:n,capSegments:i,radialSegments:r,heightSegments:s},n=Math.max(0,n),i=Math.max(1,Math.floor(i)),r=Math.max(3,Math.floor(r)),s=Math.max(1,Math.floor(s));const o=[],a=[],l=[],c=[],u=n/2,f=Math.PI/2*e,d=n,p=2*f+d,g=i*2+s,S=r+1,m=new F,h=new F;for(let v=0;v<=g;v++){let _=0,y=0,w=0,E=0;if(v<=i){const b=v/i,R=b*Math.PI/2;y=-u-e*Math.cos(R),w=e*Math.sin(R),E=-e*Math.cos(R),_=b*f}else if(v<=i+s){const b=(v-i)/s;y=-u+b*n,w=e,E=0,_=f+b*d}else{const b=(v-i-s)/i,R=b*Math.PI/2;y=u+e*Math.sin(R),w=e*Math.cos(R),E=e*Math.sin(R),_=f+d+b*f}const A=Math.max(0,Math.min(1,_/p));let x=0;v===0?x=.5/r:v===g&&(x=-.5/r);for(let b=0;b<=r;b++){const R=b/r,N=R*Math.PI*2,U=Math.sin(N),H=Math.cos(N);h.x=-w*H,h.y=y,h.z=w*U,a.push(h.x,h.y,h.z),m.set(-w*H,E,w*U),m.normalize(),l.push(m.x,m.y,m.z),c.push(R+x,A)}if(v>0){const b=(v-1)*S;for(let R=0;R<r;R++){const N=b+R,U=b+R+1,H=v*S+R,q=v*S+R+1;o.push(N,U,H),o.push(U,q,H)}}}this.setIndex(o),this.setAttribute("position",new Ht(a,3)),this.setAttribute("normal",new Ht(l,3)),this.setAttribute("uv",new Ht(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Sm extends yn{constructor(e=1,n=1,i=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:n,height:i,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],f=[],d=[],p=[];let g=0;const S=[],m=i/2;let h=0;v(),o===!1&&(e>0&&_(!0),n>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Ht(f,3)),this.setAttribute("normal",new Ht(d,3)),this.setAttribute("uv",new Ht(p,2));function v(){const y=new F,w=new F;let E=0;const A=(n-e)/i;for(let x=0;x<=s;x++){const b=[],R=x/s,N=R*(n-e)+e;for(let U=0;U<=r;U++){const H=U/r,q=H*l+a,D=Math.sin(q),k=Math.cos(q);w.x=N*D,w.y=-R*i+m,w.z=N*k,f.push(w.x,w.y,w.z),y.set(D,A,k).normalize(),d.push(y.x,y.y,y.z),p.push(H,1-R),b.push(g++)}S.push(b)}for(let x=0;x<r;x++)for(let b=0;b<s;b++){const R=S[b][x],N=S[b+1][x],U=S[b+1][x+1],H=S[b][x+1];(e>0||b!==0)&&(u.push(R,N,H),E+=3),(n>0||b!==s-1)&&(u.push(N,U,H),E+=3)}c.addGroup(h,E,0),h+=E}function _(y){const w=g,E=new xe,A=new F;let x=0;const b=y===!0?e:n,R=y===!0?1:-1;for(let U=1;U<=r;U++)f.push(0,m*R,0),d.push(0,R,0),p.push(.5,.5),g++;const N=g;for(let U=0;U<=r;U++){const q=U/r*l+a,D=Math.cos(q),k=Math.sin(q);A.x=b*k,A.y=m*R,A.z=b*D,f.push(A.x,A.y,A.z),d.push(0,R,0),E.x=D*.5+.5,E.y=k*.5*R+.5,p.push(E.x,E.y),g++}for(let U=0;U<r;U++){const H=w+U,q=N+U;y===!0?u.push(q,q+1,H):u.push(q+1,q,H),x+=3}c.addGroup(h,x,y===!0?1:2),h+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Sm(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ni{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Xe("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const u=i[r],d=i[r+1]-u,p=(o-u)/d;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new xe:new F);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new F,r=[],s=[],o=[],a=new F,l=new ft;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new F)}s[0]=new F,o[0]=new F;let c=Number.MAX_VALUE;const u=Math.abs(r[0].x),f=Math.abs(r[0].y),d=Math.abs(r[0].z);u<=c&&(c=u,i.set(1,0,0)),f<=c&&(c=f,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(rt(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(rt(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Mm extends Ni{constructor(e=0,n=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=n,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,n=new xe){const i=n,r=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);const a=this.aStartAngle+e*s;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const u=Math.cos(this.aRotation),f=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*u-p*f+this.aX,c=d*f+p*u+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class QA extends Mm{constructor(e,n,i,r,s,o){super(e,n,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}}function Em(){let t=0,e=0,n=0,i=0;function r(s,o,a,l){t=s,e=a,n=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,u,f){let d=(o-s)/c-(a-s)/(c+u)+(a-o)/u,p=(a-o)/u-(l-o)/(u+f)+(l-a)/f;d*=u,p*=u,r(o,a,d,p)},calc:function(s){const o=s*s,a=o*s;return t+e*s+n*o+i*a}}}const Yg=new F,$g=new F,Id=new Em,Ud=new Em,Fd=new Em;class e2 extends Ni{constructor(e=[],n=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=n,this.curveType=i,this.tension=r}getPoint(e,n=new F){const i=n,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,u;this.closed||a>0?c=r[(a-1)%s]:($g.subVectors(r[0],r[1]).add(r[0]),c=$g);const f=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?u=r[(a+2)%s]:(Yg.subVectors(r[s-1],r[s-2]).add(r[s-1]),u=Yg),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),p),S=Math.pow(f.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(u),p);S<1e-4&&(S=1),g<1e-4&&(g=S),m<1e-4&&(m=S),Id.initNonuniformCatmullRom(c.x,f.x,d.x,u.x,g,S,m),Ud.initNonuniformCatmullRom(c.y,f.y,d.y,u.y,g,S,m),Fd.initNonuniformCatmullRom(c.z,f.z,d.z,u.z,g,S,m)}else this.curveType==="catmullrom"&&(Id.initCatmullRom(c.x,f.x,d.x,u.x,this.tension),Ud.initCatmullRom(c.y,f.y,d.y,u.y,this.tension),Fd.initCatmullRom(c.z,f.z,d.z,u.z,this.tension));return i.set(Id.calc(l),Ud.calc(l),Fd.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new F().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function Kg(t,e,n,i,r){const s=(i-e)*.5,o=(r-n)*.5,a=t*t,l=t*a;return(2*n-2*i+s+o)*l+(-3*n+3*i-2*s-o)*a+s*t+n}function t2(t,e){const n=1-t;return n*n*e}function n2(t,e){return 2*(1-t)*t*e}function i2(t,e){return t*t*e}function va(t,e,n,i){return t2(t,e)+n2(t,n)+i2(t,i)}function r2(t,e){const n=1-t;return n*n*n*e}function s2(t,e){const n=1-t;return 3*n*n*t*e}function o2(t,e){return 3*(1-t)*t*t*e}function a2(t,e){return t*t*t*e}function xa(t,e,n,i,r){return r2(t,e)+s2(t,n)+o2(t,i)+a2(t,r)}class gS extends Ni{constructor(e=new xe,n=new xe,i=new xe,r=new xe){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new xe){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(xa(e,r.x,s.x,o.x,a.x),xa(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class l2 extends Ni{constructor(e=new F,n=new F,i=new F,r=new F){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=n,this.v2=i,this.v3=r}getPoint(e,n=new F){const i=n,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(xa(e,r.x,s.x,o.x,a.x),xa(e,r.y,s.y,o.y,a.y),xa(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class vS extends Ni{constructor(e=new xe,n=new xe){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=n}getPoint(e,n=new xe){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new xe){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class c2 extends Ni{constructor(e=new F,n=new F){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=n}getPoint(e,n=new F){const i=n;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,n){return this.getPoint(e,n)}getTangent(e,n=new F){return n.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,n){return this.getTangent(e,n)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class xS extends Ni{constructor(e=new xe,n=new xe,i=new xe){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new xe){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(va(e,r.x,s.x,o.x),va(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class u2 extends Ni{constructor(e=new F,n=new F,i=new F){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new F){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(va(e,r.x,s.x,o.x),va(e,r.y,s.y,o.y),va(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class _S extends Ni{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,n=new xe){const i=n,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],u=r[o>r.length-2?r.length-1:o+1],f=r[o>r.length-3?r.length-1:o+2];return i.set(Kg(a,l.x,c.x,u.x,f.x),Kg(a,l.y,c.y,u.y,f.y)),i}copy(e){super.copy(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let n=0,i=this.points.length;n<i;n++){const r=this.points[n];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let n=0,i=e.points.length;n<i;n++){const r=e.points[n];this.points.push(new xe().fromArray(r))}return this}}var jh=Object.freeze({__proto__:null,ArcCurve:QA,CatmullRomCurve3:e2,CubicBezierCurve:gS,CubicBezierCurve3:l2,EllipseCurve:Mm,LineCurve:vS,LineCurve3:c2,QuadraticBezierCurve:xS,QuadraticBezierCurve3:u2,SplineCurve:_S});class d2 extends Ni{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){const e=this.curves[0].getPoint(0),n=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(n)){const i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new jh[i](n,e))}return this}getPoint(e,n){const i=e*this.getLength(),r=this.getCurveLengths();let s=0;for(;s<r.length;){if(r[s]>=i){const o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,n)}s++}return null}getLength(){const e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const e=[];let n=0;for(let i=0,r=this.curves.length;i<r;i++)n+=this.curves[i].getLength(),e.push(n);return this.cacheLengths=e,e}getSpacedPoints(e=40){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return this.autoClose&&n.push(n[0]),n}getPoints(e=12){const n=[];let i;for(let r=0,s=this.curves;r<s.length;r++){const o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){const u=l[c];i&&i.equals(u)||(n.push(u),i=u)}}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n}copy(e){super.copy(e),this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){const e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let n=0,i=this.curves.length;n<i;n++){const r=this.curves[n];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let n=0,i=e.curves.length;n<i;n++){const r=e.curves[n];this.curves.push(new jh[r.type]().fromJSON(r))}return this}}class qh extends d2{constructor(e){super(),this.type="Path",this.currentPoint=new xe,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let n=1,i=e.length;n<i;n++)this.lineTo(e[n].x,e[n].y);return this}moveTo(e,n){return this.currentPoint.set(e,n),this}lineTo(e,n){const i=new vS(this.currentPoint.clone(),new xe(e,n));return this.curves.push(i),this.currentPoint.set(e,n),this}quadraticCurveTo(e,n,i,r){const s=new xS(this.currentPoint.clone(),new xe(e,n),new xe(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,n,i,r,s,o){const a=new gS(this.currentPoint.clone(),new xe(e,n),new xe(i,r),new xe(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){const n=[this.currentPoint.clone()].concat(e),i=new _S(n);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,n,i,r,s,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,n+l,i,r,s,o),this}absarc(e,n,i,r,s,o){return this.absellipse(e,n,i,i,r,s,o),this}ellipse(e,n,i,r,s,o,a,l){const c=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(e+c,n+u,i,r,s,o,a,l),this}absellipse(e,n,i,r,s,o,a,l){const c=new Mm(e,n,i,r,s,o,a,l);if(this.curves.length>0){const f=c.getPoint(0);f.equals(this.currentPoint)||this.lineTo(f.x,f.y)}this.curves.push(c);const u=c.getPoint(1);return this.currentPoint.copy(u),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){const e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}}class yS extends qh{constructor(e){super(e),this.uuid=xs(),this.type="Shape",this.holes=[]}getPointsHoles(e){const n=[];for(let i=0,r=this.holes.length;i<r;i++)n[i]=this.holes[i].getPoints(e);return n}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(r.clone())}return this}toJSON(){const e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let n=0,i=this.holes.length;n<i;n++){const r=this.holes[n];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let n=0,i=e.holes.length;n<i;n++){const r=e.holes[n];this.holes.push(new qh().fromJSON(r))}return this}}function f2(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let s=SS(t,0,r,n,!0);const o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=v2(t,e,s,n)),t.length>80*n){a=t[0],l=t[1];let u=a,f=l;for(let d=n;d<r;d+=n){const p=t[d],g=t[d+1];p<a&&(a=p),g<l&&(l=g),p>u&&(u=p),g>f&&(f=g)}c=Math.max(u-a,f-l),c=c!==0?32767/c:0}return Wa(s,o,n,a,l,c,0),o}function SS(t,e,n,i,r){let s;if(r===C2(t,e,n,i)>0)for(let o=e;o<n;o+=i)s=Zg(o/i|0,t[o],t[o+1],s);else for(let o=n-i;o>=e;o-=i)s=Zg(o/i|0,t[o],t[o+1],s);return s&&So(s,s.next)&&(ja(s),s=s.next),s}function ds(t,e){if(!t)return t;e||(e=t);let n=t,i;do if(i=!1,!n.steiner&&(So(n,n.next)||Ct(n.prev,n,n.next)===0)){if(ja(n),n=e=n.prev,n===n.next)break;i=!0}else n=n.next;while(i||n!==e);return e}function Wa(t,e,n,i,r,s,o){if(!t)return;!o&&s&&M2(t,i,r,s);let a=t;for(;t.prev!==t.next;){const l=t.prev,c=t.next;if(s?p2(t,i,r,s):h2(t)){e.push(l.i,t.i,c.i),ja(t),t=c.next,a=c.next;continue}if(t=c,t===a){o?o===1?(t=m2(ds(t),e),Wa(t,e,n,i,r,s,2)):o===2&&g2(t,e,n,i,r,s):Wa(ds(t),e,n,i,r,s,1);break}}}function h2(t){const e=t.prev,n=t,i=t.next;if(Ct(e,n,i)>=0)return!1;const r=e.x,s=n.x,o=i.x,a=e.y,l=n.y,c=i.y,u=Math.min(r,s,o),f=Math.min(a,l,c),d=Math.max(r,s,o),p=Math.max(a,l,c);let g=i.next;for(;g!==e;){if(g.x>=u&&g.x<=d&&g.y>=f&&g.y<=p&&ea(r,a,s,l,o,c,g.x,g.y)&&Ct(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function p2(t,e,n,i){const r=t.prev,s=t,o=t.next;if(Ct(r,s,o)>=0)return!1;const a=r.x,l=s.x,c=o.x,u=r.y,f=s.y,d=o.y,p=Math.min(a,l,c),g=Math.min(u,f,d),S=Math.max(a,l,c),m=Math.max(u,f,d),h=Yh(p,g,e,n,i),v=Yh(S,m,e,n,i);let _=t.prevZ,y=t.nextZ;for(;_&&_.z>=h&&y&&y.z<=v;){if(_.x>=p&&_.x<=S&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&ea(a,u,l,f,c,d,_.x,_.y)&&Ct(_.prev,_,_.next)>=0||(_=_.prevZ,y.x>=p&&y.x<=S&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&ea(a,u,l,f,c,d,y.x,y.y)&&Ct(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;_&&_.z>=h;){if(_.x>=p&&_.x<=S&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&ea(a,u,l,f,c,d,_.x,_.y)&&Ct(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;y&&y.z<=v;){if(y.x>=p&&y.x<=S&&y.y>=g&&y.y<=m&&y!==r&&y!==o&&ea(a,u,l,f,c,d,y.x,y.y)&&Ct(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function m2(t,e){let n=t;do{const i=n.prev,r=n.next.next;!So(i,r)&&ES(i,n,n.next,r)&&Xa(i,r)&&Xa(r,i)&&(e.push(i.i,n.i,r.i),ja(n),ja(n.next),n=t=r),n=n.next}while(n!==t);return ds(n)}function g2(t,e,n,i,r,s){let o=t;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&T2(o,a)){let l=wS(o,a);o=ds(o,o.next),l=ds(l,l.next),Wa(o,e,n,i,r,s,0),Wa(l,e,n,i,r,s,0);return}a=a.next}o=o.next}while(o!==t)}function v2(t,e,n,i){const r=[];for(let s=0,o=e.length;s<o;s++){const a=e[s]*i,l=s<o-1?e[s+1]*i:t.length,c=SS(t,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(w2(c))}r.sort(x2);for(let s=0;s<r.length;s++)n=_2(r[s],n);return n}function x2(t,e){let n=t.x-e.x;if(n===0&&(n=t.y-e.y,n===0)){const i=(t.next.y-t.y)/(t.next.x-t.x),r=(e.next.y-e.y)/(e.next.x-e.x);n=i-r}return n}function _2(t,e){const n=y2(t,e);if(!n)return e;const i=wS(n,t);return ds(i,i.next),ds(n,n.next)}function y2(t,e){let n=e;const i=t.x,r=t.y;let s=-1/0,o;if(So(t,n))return n;do{if(So(t,n.next))return n.next;if(r<=n.y&&r>=n.next.y&&n.next.y!==n.y){const f=n.x+(r-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(f<=i&&f>s&&(s=f,o=n.x<n.next.x?n:n.next,f===i))return o}n=n.next}while(n!==e);if(!o)return null;const a=o,l=o.x,c=o.y;let u=1/0;n=o;do{if(i>=n.x&&n.x>=l&&i!==n.x&&MS(r<c?i:s,r,l,c,r<c?s:i,r,n.x,n.y)){const f=Math.abs(r-n.y)/(i-n.x);Xa(n,t)&&(f<u||f===u&&(n.x>o.x||n.x===o.x&&S2(o,n)))&&(o=n,u=f)}n=n.next}while(n!==a);return o}function S2(t,e){return Ct(t.prev,t,e.prev)<0&&Ct(e.next,t,t.next)<0}function M2(t,e,n,i){let r=t;do r.z===0&&(r.z=Yh(r.x,r.y,e,n,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==t);r.prevZ.nextZ=null,r.prevZ=null,E2(r)}function E2(t){let e,n=1;do{let i=t,r;t=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<n&&(a++,o=o.nextZ,!!o);c++);let l=n;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:t=r,r.prevZ=s,s=r;i=o}s.nextZ=null,n*=2}while(e>1);return t}function Yh(t,e,n,i,r){return t=(t-n)*r|0,e=(e-i)*r|0,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t|e<<1}function w2(t){let e=t,n=t;do(e.x<n.x||e.x===n.x&&e.y<n.y)&&(n=e),e=e.next;while(e!==t);return n}function MS(t,e,n,i,r,s,o,a){return(r-o)*(e-a)>=(t-o)*(s-a)&&(t-o)*(i-a)>=(n-o)*(e-a)&&(n-o)*(s-a)>=(r-o)*(i-a)}function ea(t,e,n,i,r,s,o,a){return!(t===o&&e===a)&&MS(t,e,n,i,r,s,o,a)}function T2(t,e){return t.next.i!==e.i&&t.prev.i!==e.i&&!b2(t,e)&&(Xa(t,e)&&Xa(e,t)&&A2(t,e)&&(Ct(t.prev,t,e.prev)||Ct(t,e.prev,e))||So(t,e)&&Ct(t.prev,t,t.next)>0&&Ct(e.prev,e,e.next)>0)}function Ct(t,e,n){return(e.y-t.y)*(n.x-e.x)-(e.x-t.x)*(n.y-e.y)}function So(t,e){return t.x===e.x&&t.y===e.y}function ES(t,e,n,i){const r=Gl(Ct(t,e,n)),s=Gl(Ct(t,e,i)),o=Gl(Ct(n,i,t)),a=Gl(Ct(n,i,e));return!!(r!==s&&o!==a||r===0&&Hl(t,n,e)||s===0&&Hl(t,i,e)||o===0&&Hl(n,t,i)||a===0&&Hl(n,e,i))}function Hl(t,e,n){return e.x<=Math.max(t.x,n.x)&&e.x>=Math.min(t.x,n.x)&&e.y<=Math.max(t.y,n.y)&&e.y>=Math.min(t.y,n.y)}function Gl(t){return t>0?1:t<0?-1:0}function b2(t,e){let n=t;do{if(n.i!==t.i&&n.next.i!==t.i&&n.i!==e.i&&n.next.i!==e.i&&ES(n,n.next,t,e))return!0;n=n.next}while(n!==t);return!1}function Xa(t,e){return Ct(t.prev,t,t.next)<0?Ct(t,e,t.next)>=0&&Ct(t,t.prev,e)>=0:Ct(t,e,t.prev)<0||Ct(t,t.next,e)<0}function A2(t,e){let n=t,i=!1;const r=(t.x+e.x)/2,s=(t.y+e.y)/2;do n.y>s!=n.next.y>s&&n.next.y!==n.y&&r<(n.next.x-n.x)*(s-n.y)/(n.next.y-n.y)+n.x&&(i=!i),n=n.next;while(n!==t);return i}function wS(t,e){const n=$h(t.i,t.x,t.y),i=$h(e.i,e.x,e.y),r=t.next,s=e.prev;return t.next=e,e.prev=t,n.next=r,r.prev=n,i.next=n,n.prev=i,s.next=i,i.prev=s,i}function Zg(t,e,n,i){const r=$h(t,e,n);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function ja(t){t.next.prev=t.prev,t.prev.next=t.next,t.prevZ&&(t.prevZ.nextZ=t.nextZ),t.nextZ&&(t.nextZ.prevZ=t.prevZ)}function $h(t,e,n){return{i:t,x:e,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function C2(t,e,n,i){let r=0;for(let s=e,o=n-i;s<n;s+=i)r+=(t[o]-t[s])*(t[s+1]+t[o+1]),o=s;return r}class R2{static triangulate(e,n,i=2){return f2(e,n,i)}}class eo{static area(e){const n=e.length;let i=0;for(let r=n-1,s=0;s<n;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return eo.area(e)<0}static triangulateShape(e,n){const i=[],r=[],s=[];Jg(e),Qg(i,e);let o=e.length;n.forEach(Jg);for(let l=0;l<n.length;l++)r.push(o),o+=n[l].length,Qg(i,n[l]);const a=R2.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}}function Jg(t){const e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function Qg(t,e){for(let n=0;n<e.length;n++)t.push(e[n].x),t.push(e[n].y)}class wm extends yn{constructor(e=new yS([new xe(.5,.5),new xe(-.5,.5),new xe(-.5,-.5),new xe(.5,-.5)]),n={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:n},e=Array.isArray(e)?e:[e];const i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a];o(c)}this.setAttribute("position",new Ht(r,3)),this.setAttribute("uv",new Ht(s,2)),this.computeVertexNormals();function o(a){const l=[],c=n.curveSegments!==void 0?n.curveSegments:12,u=n.steps!==void 0?n.steps:1,f=n.depth!==void 0?n.depth:1;let d=n.bevelEnabled!==void 0?n.bevelEnabled:!0,p=n.bevelThickness!==void 0?n.bevelThickness:.2,g=n.bevelSize!==void 0?n.bevelSize:p-.1,S=n.bevelOffset!==void 0?n.bevelOffset:0,m=n.bevelSegments!==void 0?n.bevelSegments:3;const h=n.extrudePath,v=n.UVGenerator!==void 0?n.UVGenerator:P2;let _,y=!1,w,E,A,x;if(h){_=h.getSpacedPoints(u),y=!0,d=!1;const ie=h.isCatmullRomCurve3?h.closed:!1;w=h.computeFrenetFrames(u,ie),E=new F,A=new F,x=new F}d||(m=0,p=0,g=0,S=0);const b=a.extractPoints(c);let R=b.shape;const N=b.holes;if(!eo.isClockWise(R)){R=R.reverse();for(let ie=0,oe=N.length;ie<oe;ie++){const se=N[ie];eo.isClockWise(se)&&(N[ie]=se.reverse())}}function H(ie){const se=10000000000000001e-36;let ve=ie[0];for(let me=1;me<=ie.length;me++){const ze=me%ie.length,Ne=ie[ze],qe=Ne.x-ve.x,$e=Ne.y-ve.y,L=qe*qe+$e*$e,dt=Math.max(Math.abs(Ne.x),Math.abs(Ne.y),Math.abs(ve.x),Math.abs(ve.y)),st=se*dt*dt;if(L<=st){ie.splice(ze,1),me--;continue}ve=Ne}}H(R),N.forEach(H);const q=N.length,D=R;for(let ie=0;ie<q;ie++){const oe=N[ie];R=R.concat(oe)}function k(ie,oe,se){return oe||lt("ExtrudeGeometry: vec does not exist"),ie.clone().addScaledVector(oe,se)}const B=R.length;function I(ie,oe,se){let ve,me,ze;const Ne=ie.x-oe.x,qe=ie.y-oe.y,$e=se.x-ie.x,L=se.y-ie.y,dt=Ne*Ne+qe*qe,st=Ne*L-qe*$e;if(Math.abs(st)>Number.EPSILON){const P=Math.sqrt(dt),M=Math.sqrt($e*$e+L*L),V=oe.x-qe/P,j=oe.y+Ne/P,Z=se.x-L/M,fe=se.y+$e/M,pe=((Z-V)*L-(fe-j)*$e)/(Ne*L-qe*$e);ve=V+Ne*pe-ie.x,me=j+qe*pe-ie.y;const Q=ve*ve+me*me;if(Q<=2)return new xe(ve,me);ze=Math.sqrt(Q/2)}else{let P=!1;Ne>Number.EPSILON?$e>Number.EPSILON&&(P=!0):Ne<-Number.EPSILON?$e<-Number.EPSILON&&(P=!0):Math.sign(qe)===Math.sign(L)&&(P=!0),P?(ve=-qe,me=Ne,ze=Math.sqrt(dt)):(ve=Ne,me=qe,ze=Math.sqrt(dt/2))}return new xe(ve/ze,me/ze)}const W=[];for(let ie=0,oe=D.length,se=oe-1,ve=ie+1;ie<oe;ie++,se++,ve++)se===oe&&(se=0),ve===oe&&(ve=0),W[ie]=I(D[ie],D[se],D[ve]);const $=[];let ee,le=W.concat();for(let ie=0,oe=q;ie<oe;ie++){const se=N[ie];ee=[];for(let ve=0,me=se.length,ze=me-1,Ne=ve+1;ve<me;ve++,ze++,Ne++)ze===me&&(ze=0),Ne===me&&(Ne=0),ee[ve]=I(se[ve],se[ze],se[Ne]);$.push(ee),le=le.concat(ee)}let Ye;if(m===0)Ye=eo.triangulateShape(D,N);else{const ie=[],oe=[];for(let se=0;se<m;se++){const ve=se/m,me=p*Math.cos(ve*Math.PI/2),ze=g*Math.sin(ve*Math.PI/2)+S;for(let Ne=0,qe=D.length;Ne<qe;Ne++){const $e=k(D[Ne],W[Ne],ze);he($e.x,$e.y,-me),ve===0&&ie.push($e)}for(let Ne=0,qe=q;Ne<qe;Ne++){const $e=N[Ne];ee=$[Ne];const L=[];for(let dt=0,st=$e.length;dt<st;dt++){const P=k($e[dt],ee[dt],ze);he(P.x,P.y,-me),ve===0&&L.push(P)}ve===0&&oe.push(L)}}Ye=eo.triangulateShape(ie,oe)}const Pe=Ye.length,Ge=g+S;for(let ie=0;ie<B;ie++){const oe=d?k(R[ie],le[ie],Ge):R[ie];y?(A.copy(w.normals[0]).multiplyScalar(oe.x),E.copy(w.binormals[0]).multiplyScalar(oe.y),x.copy(_[0]).add(A).add(E),he(x.x,x.y,x.z)):he(oe.x,oe.y,0)}for(let ie=1;ie<=u;ie++)for(let oe=0;oe<B;oe++){const se=d?k(R[oe],le[oe],Ge):R[oe];y?(A.copy(w.normals[ie]).multiplyScalar(se.x),E.copy(w.binormals[ie]).multiplyScalar(se.y),x.copy(_[ie]).add(A).add(E),he(x.x,x.y,x.z)):he(se.x,se.y,f/u*ie)}for(let ie=m-1;ie>=0;ie--){const oe=ie/m,se=p*Math.cos(oe*Math.PI/2),ve=g*Math.sin(oe*Math.PI/2)+S;for(let me=0,ze=D.length;me<ze;me++){const Ne=k(D[me],W[me],ve);he(Ne.x,Ne.y,f+se)}for(let me=0,ze=N.length;me<ze;me++){const Ne=N[me];ee=$[me];for(let qe=0,$e=Ne.length;qe<$e;qe++){const L=k(Ne[qe],ee[qe],ve);y?he(L.x,L.y+_[u-1].y,_[u-1].x+se):he(L.x,L.y,f+se)}}}J(),ce();function J(){const ie=r.length/3;if(d){let oe=0,se=B*oe;for(let ve=0;ve<Pe;ve++){const me=Ye[ve];Fe(me[2]+se,me[1]+se,me[0]+se)}oe=u+m*2,se=B*oe;for(let ve=0;ve<Pe;ve++){const me=Ye[ve];Fe(me[0]+se,me[1]+se,me[2]+se)}}else{for(let oe=0;oe<Pe;oe++){const se=Ye[oe];Fe(se[2],se[1],se[0])}for(let oe=0;oe<Pe;oe++){const se=Ye[oe];Fe(se[0]+B*u,se[1]+B*u,se[2]+B*u)}}i.addGroup(ie,r.length/3-ie,0)}function ce(){const ie=r.length/3;let oe=0;ae(D,oe),oe+=D.length;for(let se=0,ve=N.length;se<ve;se++){const me=N[se];ae(me,oe),oe+=me.length}i.addGroup(ie,r.length/3-ie,1)}function ae(ie,oe){let se=ie.length;for(;--se>=0;){const ve=se;let me=se-1;me<0&&(me=ie.length-1);for(let ze=0,Ne=u+m*2;ze<Ne;ze++){const qe=B*ze,$e=B*(ze+1),L=oe+ve+qe,dt=oe+me+qe,st=oe+me+$e,P=oe+ve+$e;Ie(L,dt,st,P)}}}function he(ie,oe,se){l.push(ie),l.push(oe),l.push(se)}function Fe(ie,oe,se){it(ie),it(oe),it(se);const ve=r.length/3,me=v.generateTopUV(i,r,ve-3,ve-2,ve-1);je(me[0]),je(me[1]),je(me[2])}function Ie(ie,oe,se,ve){it(ie),it(oe),it(ve),it(oe),it(se),it(ve);const me=r.length/3,ze=v.generateSideWallUV(i,r,me-6,me-3,me-2,me-1);je(ze[0]),je(ze[1]),je(ze[3]),je(ze[1]),je(ze[2]),je(ze[3])}function it(ie){r.push(l[ie*3+0]),r.push(l[ie*3+1]),r.push(l[ie*3+2])}function je(ie){s.push(ie.x),s.push(ie.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON(),n=this.parameters.shapes,i=this.parameters.options;return N2(n,i,e)}static fromJSON(e,n){const i=[];for(let s=0,o=e.shapes.length;s<o;s++){const a=n[e.shapes[s]];i.push(a)}const r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new jh[r.type]().fromJSON(r)),new wm(i,e.options)}}const P2={generateTopUV:function(t,e,n,i,r){const s=e[n*3],o=e[n*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],u=e[r*3+1];return[new xe(s,o),new xe(a,l),new xe(c,u)]},generateSideWallUV:function(t,e,n,i,r,s){const o=e[n*3],a=e[n*3+1],l=e[n*3+2],c=e[i*3],u=e[i*3+1],f=e[i*3+2],d=e[r*3],p=e[r*3+1],g=e[r*3+2],S=e[s*3],m=e[s*3+1],h=e[s*3+2];return Math.abs(a-u)<Math.abs(o-c)?[new xe(o,1-l),new xe(c,1-f),new xe(d,1-g),new xe(S,1-h)]:[new xe(a,1-l),new xe(u,1-f),new xe(p,1-g),new xe(m,1-h)]}};function N2(t,e,n){if(n.shapes=[],Array.isArray(t))for(let i=0,r=t.length;i<r;i++){const s=t[i];n.shapes.push(s.uuid)}else n.shapes.push(t.uuid);return n.options=Object.assign({},e),e.extrudePath!==void 0&&(n.options.extrudePath=e.extrudePath.toJSON()),n}class fs extends yn{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),c=a+1,u=l+1,f=e/a,d=n/l,p=[],g=[],S=[],m=[];for(let h=0;h<u;h++){const v=h*d-o;for(let _=0;_<c;_++){const y=_*f-s;g.push(y,-v,0),S.push(0,0,1),m.push(_/a),m.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<a;v++){const _=v+c*h,y=v+c*(h+1),w=v+1+c*(h+1),E=v+1+c*h;p.push(_,y,E),p.push(y,w,E)}this.setIndex(p),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(S,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new fs(e.width,e.height,e.widthSegments,e.heightSegments)}}class Qr extends yn{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const u=[],f=new F,d=new F,p=[],g=[],S=[],m=[];for(let h=0;h<=i;h++){const v=[],_=h/i,y=o+_*a,w=e*Math.cos(y),E=Math.sqrt(e*e-w*w);let A=0;h===0&&o===0?A=.5/n:h===i&&l===Math.PI&&(A=-.5/n);for(let x=0;x<=n;x++){const b=x/n,R=r+b*s;f.x=-E*Math.cos(R),f.y=w,f.z=E*Math.sin(R),g.push(f.x,f.y,f.z),d.copy(f).normalize(),S.push(d.x,d.y,d.z),m.push(b+A,1-_),v.push(c++)}u.push(v)}for(let h=0;h<i;h++)for(let v=0;v<n;v++){const _=u[h][v+1],y=u[h][v],w=u[h+1][v],E=u[h+1][v+1];(h!==0||o>0)&&p.push(_,y,E),(h!==i-1||l<Math.PI)&&p.push(y,w,E)}this.setIndex(p),this.setAttribute("position",new Ht(g,3)),this.setAttribute("normal",new Ht(S,3)),this.setAttribute("uv",new Ht(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class L2 extends Ur{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Ve(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}}function Mo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];if(ev(r))r.isRenderTargetTexture?(Xe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone();else if(Array.isArray(r))if(ev(r[0])){const s=[];for(let o=0,a=r.length;o<a;o++)s[o]=r[o].clone();e[n][i]=s}else e[n][i]=r.slice();else e[n][i]=r}}return e}function pn(t){const e={};for(let n=0;n<t.length;n++){const i=Mo(t[n]);for(const r in i)e[r]=i[r]}return e}function ev(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function D2(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function TS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const I2={clone:Mo,merge:pn};var U2=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,F2=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Pi extends Ur{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=U2,this.fragmentShader=F2,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Mo(e.uniforms),this.uniformsGroups=D2(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const r=e.uniforms[i];switch(this.uniforms[i]={},r.type){case"t":this.uniforms[i].value=n[r.value]||null;break;case"c":this.uniforms[i].value=new Ve().setHex(r.value);break;case"v2":this.uniforms[i].value=new xe().fromArray(r.value);break;case"v3":this.uniforms[i].value=new F().fromArray(r.value);break;case"v4":this.uniforms[i].value=new At().fromArray(r.value);break;case"m3":this.uniforms[i].value=new Ke().fromArray(r.value);break;case"m4":this.uniforms[i].value=new ft().fromArray(r.value);break;default:this.uniforms[i].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class O2 extends Pi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class jn extends Ur{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jc,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class k2 extends Ur{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Jc,this.normalScale=new xe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new di,this.combine=am,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class B2 extends Ur{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=eA,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class z2 extends Ur{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bS extends Zt{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Od=new ft,tv=new F,nv=new F;class AS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new xe(512,512),this.mapType=In,this.map=null,this.mapPass=null,this.matrix=new ft,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ym,this._frameExtents=new xe(1,1),this._viewportCount=1,this._viewports=[new At(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;tv.setFromMatrixPosition(e.matrixWorld),n.position.copy(tv),nv.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(nv),n.updateMatrixWorld(),Od.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Od,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===Ha||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Od)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Wl=new F,Xl=new _s,xi=new F;class CS extends Zt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ft,this.projectionMatrix=new ft,this.projectionMatrixInverse=new ft,this.coordinateSystem=wi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Wl,Xl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wl,Xl,xi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Wl,Xl,xi),xi.x===1&&xi.y===1&&xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Wl,Xl,xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const lr=new F,iv=new xe,rv=new xe;class Dn extends CS{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Ga*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(pa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ga*2*Math.atan(Math.tan(pa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){lr.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(lr.x,lr.y).multiplyScalar(-e/lr.z),lr.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(lr.x,lr.y).multiplyScalar(-e/lr.z)}getViewSize(e,n){return this.getViewBounds(e,iv,rv),n.subVectors(rv,iv)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(pa*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class V2 extends AS{constructor(){super(new Dn(90,1,.5,500)),this.isPointLightShadow=!0}}class H2 extends bS{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new V2}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Tm extends CS{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class G2 extends AS{constructor(){super(new Tm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class kd extends bS{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Zt.DEFAULT_UP),this.updateMatrix(),this.target=new Zt,this.shadow=new G2}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.shadow=this.shadow.toJSON(),n.object.target=this.target.uuid,n}}const Fs=-90,Os=1;class W2 extends Zt{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Dn(Fs,Os,e,n);r.layers=this.layers,this.add(r);const s=new Dn(Fs,Os,e,n);s.layers=this.layers,this.add(s);const o=new Dn(Fs,Os,e,n);o.layers=this.layers,this.add(o);const a=new Dn(Fs,Os,e,n);a.layers=this.layers,this.add(a);const l=new Dn(Fs,Os,e,n);l.layers=this.layers,this.add(l);const c=new Dn(Fs,Os,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const c of n)this.remove(c);if(e===wi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ha)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,f=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,u),e.setRenderTarget(f,d,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class X2 extends Dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class j2{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1,Xe("Clock: This module has been deprecated. Please use THREE.Timer instead.")}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const n=performance.now();e=(n-this.oldTime)/1e3,this.oldTime=n,this.elapsedTime+=e}return e}}const Lm=class Lm{constructor(e,n,i,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,r){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=r,this}};Lm.prototype.isMatrix2=!0;let sv=Lm;function ov(t,e,n,i){const r=q2(i);switch(n){case nS:return t*e;case fm:return t*e/r.components*r.byteLength;case hm:return t*e/r.components*r.byteLength;case cs:return t*e*2/r.components*r.byteLength;case pm:return t*e*2/r.components*r.byteLength;case iS:return t*e*3/r.components*r.byteLength;case oi:return t*e*4/r.components*r.byteLength;case mm:return t*e*4/r.components*r.byteLength;case gc:case vc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case xc:case _c:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case gh:case xh:return Math.max(t,16)*Math.max(e,8)/4;case mh:case vh:return Math.max(t,8)*Math.max(e,8)/2;case _h:case yh:case Mh:case Eh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Sh:case Kc:case wh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Th:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case bh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Ah:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Ch:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Rh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Ph:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Lh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Dh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Ih:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Uh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Fh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Oh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case kh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Bh:case zh:case Vh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Hh:case Gh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Zc:case Wh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function q2(t){switch(t){case In:case Jy:return{byteLength:1,components:1};case za:case Qy:case Ki:return{byteLength:2,components:1};case um:case dm:return{byteLength:2,components:4};case Ri:case cm:case si:return{byteLength:4,components:1};case eS:case tS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:om}}));typeof window<"u"&&(window.__THREE__?Xe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=om);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function RS(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function Y2(t){const e=new WeakMap;function n(a,l){const c=a.array,u=a.usage,f=c.byteLength,d=t.createBuffer();t.bindBuffer(l,d),t.bufferData(l,c,u),a.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:f}}function i(a,l,c){const u=l.array,f=l.updateRanges;if(t.bindBuffer(c,a),f.length===0)t.bufferSubData(c,0,u);else{f.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<f.length;p++){const g=f[d],S=f[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++d,f[d]=S)}f.length=d+1;for(let p=0,g=f.length;p<g;p++){const S=f[p];t.bufferSubData(c,S.start*u.BYTES_PER_ELEMENT,u,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,n(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var $2=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,K2=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Z2=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,J2=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Q2=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,eC=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tC=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,nC=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iC=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,rC=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,sC=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,oC=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,aC=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,lC=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,cC=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,uC=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,dC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fC=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hC=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,pC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,mC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,gC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,vC=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,xC=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_C=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,yC=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,SC=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,MC=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,EC=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wC=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,TC="gl_FragColor = linearToOutputTexel( gl_FragColor );",bC=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,CC=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,RC=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,PC=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,NC=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,LC=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,DC=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,IC=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,UC=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,FC=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,OC=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,kC=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,BC=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zC=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,VC=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,HC=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,GC=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,WC=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,XC=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,jC=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,qC=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,YC=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,$C=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,KC=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ZC=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,JC=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,QC=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tR=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,nR=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,iR=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,rR=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,sR=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,oR=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aR=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,lR=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,cR=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,uR=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dR=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,fR=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hR=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,pR=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,mR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gR=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,vR=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,xR=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_R=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yR=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SR=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,MR=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ER=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,wR=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,TR=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bR=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,AR=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,CR=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,RR=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,PR=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,NR=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,LR=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,DR=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,IR=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,UR=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,FR=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,OR=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,kR=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,BR=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zR=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,VR=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HR=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,GR=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,WR=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,XR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,jR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,qR=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,YR=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $R=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,KR=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ZR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,JR=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,QR=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,e3=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,n3=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,i3=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,r3=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,s3=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,o3=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a3=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,l3=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,c3=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,u3=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,d3=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,f3=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,h3=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,p3=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,m3=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,g3=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,v3=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,x3=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_3=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,y3=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,S3=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,M3=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,E3=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,w3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,T3=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,b3=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,A3=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,C3=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:$2,alphahash_pars_fragment:K2,alphamap_fragment:Z2,alphamap_pars_fragment:J2,alphatest_fragment:Q2,alphatest_pars_fragment:eC,aomap_fragment:tC,aomap_pars_fragment:nC,batching_pars_vertex:iC,batching_vertex:rC,begin_vertex:sC,beginnormal_vertex:oC,bsdfs:aC,iridescence_fragment:lC,bumpmap_pars_fragment:cC,clipping_planes_fragment:uC,clipping_planes_pars_fragment:dC,clipping_planes_pars_vertex:fC,clipping_planes_vertex:hC,color_fragment:pC,color_pars_fragment:mC,color_pars_vertex:gC,color_vertex:vC,common:xC,cube_uv_reflection_fragment:_C,defaultnormal_vertex:yC,displacementmap_pars_vertex:SC,displacementmap_vertex:MC,emissivemap_fragment:EC,emissivemap_pars_fragment:wC,colorspace_fragment:TC,colorspace_pars_fragment:bC,envmap_fragment:AC,envmap_common_pars_fragment:CC,envmap_pars_fragment:RC,envmap_pars_vertex:PC,envmap_physical_pars_fragment:VC,envmap_vertex:NC,fog_vertex:LC,fog_pars_vertex:DC,fog_fragment:IC,fog_pars_fragment:UC,gradientmap_pars_fragment:FC,lightmap_pars_fragment:OC,lights_lambert_fragment:kC,lights_lambert_pars_fragment:BC,lights_pars_begin:zC,lights_toon_fragment:HC,lights_toon_pars_fragment:GC,lights_phong_fragment:WC,lights_phong_pars_fragment:XC,lights_physical_fragment:jC,lights_physical_pars_fragment:qC,lights_fragment_begin:YC,lights_fragment_maps:$C,lights_fragment_end:KC,lightprobes_pars_fragment:ZC,logdepthbuf_fragment:JC,logdepthbuf_pars_fragment:QC,logdepthbuf_pars_vertex:eR,logdepthbuf_vertex:tR,map_fragment:nR,map_pars_fragment:iR,map_particle_fragment:rR,map_particle_pars_fragment:sR,metalnessmap_fragment:oR,metalnessmap_pars_fragment:aR,morphinstance_vertex:lR,morphcolor_vertex:cR,morphnormal_vertex:uR,morphtarget_pars_vertex:dR,morphtarget_vertex:fR,normal_fragment_begin:hR,normal_fragment_maps:pR,normal_pars_fragment:mR,normal_pars_vertex:gR,normal_vertex:vR,normalmap_pars_fragment:xR,clearcoat_normal_fragment_begin:_R,clearcoat_normal_fragment_maps:yR,clearcoat_pars_fragment:SR,iridescence_pars_fragment:MR,opaque_fragment:ER,packing:wR,premultiplied_alpha_fragment:TR,project_vertex:bR,dithering_fragment:AR,dithering_pars_fragment:CR,roughnessmap_fragment:RR,roughnessmap_pars_fragment:PR,shadowmap_pars_fragment:NR,shadowmap_pars_vertex:LR,shadowmap_vertex:DR,shadowmask_pars_fragment:IR,skinbase_vertex:UR,skinning_pars_vertex:FR,skinning_vertex:OR,skinnormal_vertex:kR,specularmap_fragment:BR,specularmap_pars_fragment:zR,tonemapping_fragment:VR,tonemapping_pars_fragment:HR,transmission_fragment:GR,transmission_pars_fragment:WR,uv_pars_fragment:XR,uv_pars_vertex:jR,uv_vertex:qR,worldpos_vertex:YR,background_vert:$R,background_frag:KR,backgroundCube_vert:ZR,backgroundCube_frag:JR,cube_vert:QR,cube_frag:e3,depth_vert:t3,depth_frag:n3,distance_vert:i3,distance_frag:r3,equirect_vert:s3,equirect_frag:o3,linedashed_vert:a3,linedashed_frag:l3,meshbasic_vert:c3,meshbasic_frag:u3,meshlambert_vert:d3,meshlambert_frag:f3,meshmatcap_vert:h3,meshmatcap_frag:p3,meshnormal_vert:m3,meshnormal_frag:g3,meshphong_vert:v3,meshphong_frag:x3,meshphysical_vert:_3,meshphysical_frag:y3,meshtoon_vert:S3,meshtoon_frag:M3,points_vert:E3,points_frag:w3,shadow_vert:T3,shadow_frag:b3,sprite_vert:A3,sprite_frag:C3},Ee={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new xe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new F},probesMax:{value:new F},probesResolution:{value:new F}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new xe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},Mi={basic:{uniforms:pn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:pn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Ve(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:pn([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:pn([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:pn([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new Ve(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:pn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:pn([Ee.points,Ee.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:pn([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:pn([Ee.common,Ee.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:pn([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:pn([Ee.sprite,Ee.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:pn([Ee.common,Ee.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:pn([Ee.lights,Ee.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Mi.physical={uniforms:pn([Mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new xe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new xe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new xe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const jl={r:0,b:0,g:0},R3=new ft,PS=new Ke;PS.set(-1,0,0,0,1,0,0,0,1);function P3(t,e,n,i,r,s){const o=new Ve(0);let a=r===!0?0:1,l,c,u=null,f=0,d=null;function p(v){let _=v.isScene===!0?v.background:null;if(_&&_.isTexture){const y=v.backgroundBlurriness>0;_=e.get(_,y)}return _}function g(v){let _=!1;const y=p(v);y===null?m(o,a):y&&y.isColor&&(m(y,1),_=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||_)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function S(v,_){const y=p(_);y&&(y.isCubeTexture||y.mapping===Cu)?(c===void 0&&(c=new et(new Cn(1,1,1),new Pi({name:"BackgroundCubeMaterial",uniforms:Mo(Mi.backgroundCube.uniforms),vertexShader:Mi.backgroundCube.vertexShader,fragmentShader:Mi.backgroundCube.fragmentShader,side:vn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,E,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(R3.makeRotationFromEuler(_.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(PS),c.material.toneMapped=at.getTransfer(y.colorSpace)!==ht,(u!==y||f!==y.version||d!==t.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,d=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new et(new fs(2,2),new Pi({name:"BackgroundMaterial",uniforms:Mo(Mi.background.uniforms),vertexShader:Mi.background.vertexShader,fragmentShader:Mi.background.fragmentShader,side:Pr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,l.material.toneMapped=at.getTransfer(y.colorSpace)!==ht,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||d!==t.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,d=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,_){v.getRGB(jl,TS(t)),n.buffers.color.setClear(jl.r,jl.g,jl.b,_,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(v,_=1){o.set(v),a=_,m(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(v){a=v,m(o,a)},render:g,addToRenderList:S,dispose:h}}function N3(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=d(null);let s=r,o=!1;function a(N,U,H,q,D){let k=!1;const B=f(N,q,H,U);s!==B&&(s=B,c(s.object)),k=p(N,q,H,D),k&&g(N,q,H,D),D!==null&&e.update(D,t.ELEMENT_ARRAY_BUFFER),(k||o)&&(o=!1,y(N,U,H,q),D!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(D).buffer))}function l(){return t.createVertexArray()}function c(N){return t.bindVertexArray(N)}function u(N){return t.deleteVertexArray(N)}function f(N,U,H,q){const D=q.wireframe===!0;let k=i[U.id];k===void 0&&(k={},i[U.id]=k);const B=N.isInstancedMesh===!0?N.id:0;let I=k[B];I===void 0&&(I={},k[B]=I);let W=I[H.id];W===void 0&&(W={},I[H.id]=W);let $=W[D];return $===void 0&&($=d(l()),W[D]=$),$}function d(N){const U=[],H=[],q=[];for(let D=0;D<n;D++)U[D]=0,H[D]=0,q[D]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:H,attributeDivisors:q,object:N,attributes:{},index:null}}function p(N,U,H,q){const D=s.attributes,k=U.attributes;let B=0;const I=H.getAttributes();for(const W in I)if(I[W].location>=0){const ee=D[W];let le=k[W];if(le===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(le=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(le=N.instanceColor)),ee===void 0||ee.attribute!==le||le&&ee.data!==le.data)return!0;B++}return s.attributesNum!==B||s.index!==q}function g(N,U,H,q){const D={},k=U.attributes;let B=0;const I=H.getAttributes();for(const W in I)if(I[W].location>=0){let ee=k[W];ee===void 0&&(W==="instanceMatrix"&&N.instanceMatrix&&(ee=N.instanceMatrix),W==="instanceColor"&&N.instanceColor&&(ee=N.instanceColor));const le={};le.attribute=ee,ee&&ee.data&&(le.data=ee.data),D[W]=le,B++}s.attributes=D,s.attributesNum=B,s.index=q}function S(){const N=s.newAttributes;for(let U=0,H=N.length;U<H;U++)N[U]=0}function m(N){h(N,0)}function h(N,U){const H=s.newAttributes,q=s.enabledAttributes,D=s.attributeDivisors;H[N]=1,q[N]===0&&(t.enableVertexAttribArray(N),q[N]=1),D[N]!==U&&(t.vertexAttribDivisor(N,U),D[N]=U)}function v(){const N=s.newAttributes,U=s.enabledAttributes;for(let H=0,q=U.length;H<q;H++)U[H]!==N[H]&&(t.disableVertexAttribArray(H),U[H]=0)}function _(N,U,H,q,D,k,B){B===!0?t.vertexAttribIPointer(N,U,H,D,k):t.vertexAttribPointer(N,U,H,q,D,k)}function y(N,U,H,q){S();const D=q.attributes,k=H.getAttributes(),B=U.defaultAttributeValues;for(const I in k){const W=k[I];if(W.location>=0){let $=D[I];if($===void 0&&(I==="instanceMatrix"&&N.instanceMatrix&&($=N.instanceMatrix),I==="instanceColor"&&N.instanceColor&&($=N.instanceColor)),$!==void 0){const ee=$.normalized,le=$.itemSize,Ye=e.get($);if(Ye===void 0)continue;const Pe=Ye.buffer,Ge=Ye.type,J=Ye.bytesPerElement,ce=Ge===t.INT||Ge===t.UNSIGNED_INT||$.gpuType===cm;if($.isInterleavedBufferAttribute){const ae=$.data,he=ae.stride,Fe=$.offset;if(ae.isInstancedInterleavedBuffer){for(let Ie=0;Ie<W.locationSize;Ie++)h(W.location+Ie,ae.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let Ie=0;Ie<W.locationSize;Ie++)m(W.location+Ie);t.bindBuffer(t.ARRAY_BUFFER,Pe);for(let Ie=0;Ie<W.locationSize;Ie++)_(W.location+Ie,le/W.locationSize,Ge,ee,he*J,(Fe+le/W.locationSize*Ie)*J,ce)}else{if($.isInstancedBufferAttribute){for(let ae=0;ae<W.locationSize;ae++)h(W.location+ae,$.meshPerAttribute);N.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let ae=0;ae<W.locationSize;ae++)m(W.location+ae);t.bindBuffer(t.ARRAY_BUFFER,Pe);for(let ae=0;ae<W.locationSize;ae++)_(W.location+ae,le/W.locationSize,Ge,ee,le*J,le/W.locationSize*ae*J,ce)}}else if(B!==void 0){const ee=B[I];if(ee!==void 0)switch(ee.length){case 2:t.vertexAttrib2fv(W.location,ee);break;case 3:t.vertexAttrib3fv(W.location,ee);break;case 4:t.vertexAttrib4fv(W.location,ee);break;default:t.vertexAttrib1fv(W.location,ee)}}}}v()}function w(){b();for(const N in i){const U=i[N];for(const H in U){const q=U[H];for(const D in q){const k=q[D];for(const B in k)u(k[B].object),delete k[B];delete q[D]}}delete i[N]}}function E(N){if(i[N.id]===void 0)return;const U=i[N.id];for(const H in U){const q=U[H];for(const D in q){const k=q[D];for(const B in k)u(k[B].object),delete k[B];delete q[D]}}delete i[N.id]}function A(N){for(const U in i){const H=i[U];for(const q in H){const D=H[q];if(D[N.id]===void 0)continue;const k=D[N.id];for(const B in k)u(k[B].object),delete k[B];delete D[N.id]}}}function x(N){for(const U in i){const H=i[U],q=N.isInstancedMesh===!0?N.id:0,D=H[q];if(D!==void 0){for(const k in D){const B=D[k];for(const I in B)u(B[I].object),delete B[I];delete D[k]}delete H[q],Object.keys(H).length===0&&delete i[U]}}}function b(){R(),o=!0,s!==r&&(s=r,c(s.object))}function R(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:b,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:S,enableAttribute:m,disableUnusedAttributes:v}}function L3(t,e,n){let i;function r(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function o(l,c,u){u!==0&&(t.drawArraysInstanced(i,l,c,u),n.update(c,i,u))}function a(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let p=0;p<u;p++)d+=c[p];n.update(d,i,1)}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a}function D3(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==oi&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const x=A===Ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==In&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==si&&!x)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const u=l(c);u!==c&&(Xe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const f=n.logarithmicDepthBuffer===!0,d=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&d===!1&&Xe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),_=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),E=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:h,maxVertexUniforms:v,maxVaryings:_,maxFragmentUniforms:y,maxSamples:w,samples:E}}function I3(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new Wr,a=new Ke,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,d){const p=f.length!==0||d||i!==0||r;return r=d,i=f.length,p},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,d){n=u(f,d,0)},this.setState=function(f,d,p){const g=f.clippingPlanes,S=f.clipIntersection,m=f.clipShadows,h=t.get(f);if(!r||g===null||g.length===0||s&&!m)s?u(null):c();else{const v=s?0:i,_=v*4;let y=h.clippingState||null;l.value=y,y=u(g,d,_,p);for(let w=0;w!==_;++w)y[w]=n[w];h.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(f,d,p,g){const S=f!==null?f.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const h=p+S*4,v=d.matrixWorldInverse;a.getNormalMatrix(v),(m===null||m.length<h)&&(m=new Float32Array(h));for(let _=0,y=p;_!==S;++_,y+=4)o.copy(f[_]).applyMatrix4(v,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,m}}const xr=4,av=[.125,.215,.35,.446,.526,.582],jr=20,U3=256,jo=new Tm,lv=new Ve;let Bd=null,zd=0,Vd=0,Hd=!1;const F3=new F;class Kh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=F3}=s;Bd=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Vd=this._renderer.getActiveMipmapLevel(),Hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bd,zd,Vd),this._renderer.xr.enabled=Hd,e.scissorTest=!1,ks(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ls||e.mapping===_o?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bd=this._renderer.getRenderTarget(),zd=this._renderer.getActiveCubeFace(),Vd=this._renderer.getActiveMipmapLevel(),Hd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:un,minFilter:un,generateMipmaps:!1,type:Ki,format:oi,colorSpace:Qc,depthBuffer:!1},r=cv(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cv(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=O3(s)),this._blurMaterial=B3(s,e,n),this._ggxMaterial=k3(s,e,n)}return r}_compileMaterial(e){const n=new et(new yn,e);this._renderer.compile(n,jo)}_sceneToCubeUV(e,n,i,r,s){const l=new Dn(90,1,n,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,d=f.autoClear,p=f.toneMapping;f.getClearColor(lv),f.toneMapping=Ai,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new et(new Cn,new us({name:"PMREM.Background",side:vn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let h=!1;const v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,h=!0):(m.color.copy(lv),h=!0);for(let _=0;_<6;_++){const y=_%3;y===0?(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[_],s.y,s.z)):y===1?(l.up.set(0,0,c[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[_],s.z)):(l.up.set(0,c[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[_]));const w=this._cubeSize;ks(r,y*w,_>2?w:0,w,w),f.setRenderTarget(r),h&&f.render(S,l),f.render(e,l)}f.toneMapping=p,f.autoClear=d,e.background=v}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===ls||e.mapping===_o;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uv());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;ks(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,jo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[i];a.material=o;const l=o.uniforms,c=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-u*u),d=0+c*1.25,p=f*d,{_lodMax:g}=this,S=this._sizeLods[i],m=3*S*(i>g-xr?i-g+xr:0),h=4*(this._cubeSize-S);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,ks(s,m,h,3*S,2*S),r.setRenderTarget(s),r.render(a,jo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,ks(e,m,h,3*S,2*S),r.setRenderTarget(e),r.render(a,jo)}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&lt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=c;const d=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*jr-1),S=s/g,m=isFinite(s)?1+Math.floor(u*S):jr;m>jr&&Xe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${jr}`);const h=[];let v=0;for(let A=0;A<jr;++A){const x=A/S,b=Math.exp(-x*x/2);h.push(b),A===0?v+=b:A<m&&(v+=2*b)}for(let A=0;A<h.length;A++)h[A]=h[A]/v;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=h,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-i;const y=this._sizeLods[r],w=3*y*(r>_-xr?r-_+xr:0),E=4*(this._cubeSize-y);ks(n,w,E,3*y,2*y),l.setRenderTarget(n),l.render(f,jo)}}function O3(t){const e=[],n=[],i=[];let r=t;const s=t-xr+1+av.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>t-xr?l=av[o-t+xr-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,f=1+c,d=[u,u,f,u,f,f,u,u,f,f,u,f],p=6,g=6,S=3,m=2,h=1,v=new Float32Array(S*g*p),_=new Float32Array(m*g*p),y=new Float32Array(h*g*p);for(let E=0;E<p;E++){const A=E%3*2/3-1,x=E>2?0:-1,b=[A,x,0,A+2/3,x,0,A+2/3,x+1,0,A,x,0,A+2/3,x+1,0,A,x+1,0];v.set(b,S*g*E),_.set(d,m*g*E);const R=[E,E,E,E,E,E];y.set(R,h*g*E)}const w=new yn;w.setAttribute("position",new On(v,S)),w.setAttribute("uv",new On(_,m)),w.setAttribute("faceIndex",new On(y,h)),i.push(new et(w,null)),r>xr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function cv(t,e,n){const i=new Ci(t,e,n);return i.texture.mapping=Cu,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ks(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function k3(t,e,n){return new Pi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:U3,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ru(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function B3(t,e,n){const i=new Float32Array(jr),r=new F(0,1,0);return new Pi({name:"SphericalGaussianBlur",defines:{n:jr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function uv(){return new Pi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function dv(){return new Pi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ru(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Ru(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class NS extends Ci{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new pS(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Cn(5,5,5),s=new Pi({name:"CubemapFromEquirect",uniforms:Mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:vn,blending:Wi});s.uniforms.tEquirect.value=n;const o=new et(r,s),a=n.minFilter;return n.minFilter===Zr&&(n.minFilter=un),new W2(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}function z3(t){let e=new WeakMap,n=new WeakMap,i=null;function r(d,p=!1){return d==null?null:p?o(d):s(d)}function s(d){if(d&&d.isTexture){const p=d.mapping;if(p===cd||p===ud)if(e.has(d)){const g=e.get(d).texture;return a(g,d.mapping)}else{const g=d.image;if(g&&g.height>0){const S=new NS(g.height);return S.fromEquirectangularTexture(t,d),e.set(d,S),d.addEventListener("dispose",c),a(S.texture,d.mapping)}else return null}}return d}function o(d){if(d&&d.isTexture){const p=d.mapping,g=p===cd||p===ud,S=p===ls||p===_o;if(g||S){let m=n.get(d);const h=m!==void 0?m.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==h)return i===null&&(i=new Kh(t)),m=g?i.fromEquirectangular(d,m):i.fromCubemap(d,m),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),m.texture;if(m!==void 0)return m.texture;{const v=d.image;return g&&v&&v.height>0||S&&v&&l(v)?(i===null&&(i=new Kh(t)),m=g?i.fromEquirectangular(d):i.fromCubemap(d),m.texture.pmremVersion=d.pmremVersion,n.set(d,m),d.addEventListener("dispose",u),m.texture):null}}}return d}function a(d,p){return p===cd?d.mapping=ls:p===ud&&(d.mapping=_o),d}function l(d){let p=0;const g=6;for(let S=0;S<g;S++)d[S]!==void 0&&p++;return p===g}function c(d){const p=d.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function u(d){const p=d.target;p.removeEventListener("dispose",u);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function V3(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&lo("WebGLRenderer: "+i+" extension not supported."),r}}}function H3(t,e,n,i){const r={},s=new WeakMap;function o(f){const d=f.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];const p=s.get(d);p&&(e.remove(p),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,n.memory.geometries--}function a(f,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,n.memory.geometries++),d}function l(f){const d=f.attributes;for(const p in d)e.update(d[p],t.ARRAY_BUFFER)}function c(f){const d=[],p=f.index,g=f.attributes.position;let S=0;if(g===void 0)return;if(p!==null){const v=p.array;S=p.version;for(let _=0,y=v.length;_<y;_+=3){const w=v[_+0],E=v[_+1],A=v[_+2];d.push(w,E,E,A,A,w)}}else{const v=g.array;S=g.version;for(let _=0,y=v.length/3-1;_<y;_+=3){const w=_+0,E=_+1,A=_+2;d.push(w,E,E,A,A,w)}}const m=new(g.count>=65535?uS:cS)(d,1);m.version=S;const h=s.get(f);h&&e.remove(h),s.set(f,m)}function u(f){const d=s.get(f);if(d){const p=f.index;p!==null&&d.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:a,update:l,getWireframeAttribute:u}}function G3(t,e,n){let i;function r(f){i=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,d){t.drawElements(i,d,s,f*o),n.update(d,i,1)}function c(f,d,p){p!==0&&(t.drawElementsInstanced(i,d,s,f*o,p),n.update(d,i,p))}function u(f,d,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,s,f,0,p);let S=0;for(let m=0;m<p;m++)S+=d[m];n.update(S,i,1)}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function W3(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:lt("WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function X3(t,e,n){const i=new WeakMap,r=new At;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,f=u!==void 0?u.length:0;let d=i.get(a);if(d===void 0||d.count!==f){let R=function(){x.dispose(),i.delete(a),a.removeEventListener("dispose",R)};var p=R;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,S=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,h=a.morphAttributes.position||[],v=a.morphAttributes.normal||[],_=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),S===!0&&(y=2),m===!0&&(y=3);let w=a.attributes.position.count*y,E=1;w>e.maxTextureSize&&(E=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const A=new Float32Array(w*E*4*f),x=new sS(A,w,E,f);x.type=si,x.needsUpdate=!0;const b=y*4;for(let N=0;N<f;N++){const U=h[N],H=v[N],q=_[N],D=w*E*4*N;for(let k=0;k<U.count;k++){const B=k*b;g===!0&&(r.fromBufferAttribute(U,k),A[D+B+0]=r.x,A[D+B+1]=r.y,A[D+B+2]=r.z,A[D+B+3]=0),S===!0&&(r.fromBufferAttribute(H,k),A[D+B+4]=r.x,A[D+B+5]=r.y,A[D+B+6]=r.z,A[D+B+7]=0),m===!0&&(r.fromBufferAttribute(q,k),A[D+B+8]=r.x,A[D+B+9]=r.y,A[D+B+10]=r.z,A[D+B+11]=q.itemSize===4?r.w:1)}}d={count:f,texture:x,size:new xe(w,E)},i.set(a,d),a.addEventListener("dispose",R)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const S=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",S),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",d.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",d.size)}return{update:s}}function j3(t,e,n,i,r){let s=new WeakMap;function o(c){const u=r.render.frame,f=c.geometry,d=e.get(c,f);if(s.get(d)!==u&&(e.update(d),s.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==u&&(p.update(),s.set(p,u))}return d}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:o,dispose:a}}const q3={[Xy]:"LINEAR_TONE_MAPPING",[jy]:"REINHARD_TONE_MAPPING",[qy]:"CINEON_TONE_MAPPING",[lm]:"ACES_FILMIC_TONE_MAPPING",[$y]:"AGX_TONE_MAPPING",[Ky]:"NEUTRAL_TONE_MAPPING",[Yy]:"CUSTOM_TONE_MAPPING"};function Y3(t,e,n,i,r,s){const o=new Ci(e,n,{type:t,depthBuffer:r,stencilBuffer:s,samples:i?4:0,depthTexture:r?new yo(e,n):void 0}),a=new Ci(e,n,{type:Ki,depthBuffer:!1,stencilBuffer:!1}),l=new yn;l.setAttribute("position",new Ht([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ht([0,2,0,0,2,0],2));const c=new O2({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new et(l,c),f=new Tm(-1,1,1,-1,0,1);let d=null,p=null,g=!1,S,m=null,h=[],v=!1;this.setSize=function(_,y){o.setSize(_,y),a.setSize(_,y);for(let w=0;w<h.length;w++){const E=h[w];E.setSize&&E.setSize(_,y)}},this.setEffects=function(_){h=_,v=h.length>0&&h[0].isRenderPass===!0;const y=o.width,w=o.height;for(let E=0;E<h.length;E++){const A=h[E];A.setSize&&A.setSize(y,w)}},this.begin=function(_,y){if(g||_.toneMapping===Ai&&h.length===0)return!1;if(m=y,y!==null){const w=y.width,E=y.height;(o.width!==w||o.height!==E)&&this.setSize(w,E)}return v===!1&&_.setRenderTarget(o),S=_.toneMapping,_.toneMapping=Ai,!0},this.hasRenderPass=function(){return v},this.end=function(_,y){_.toneMapping=S,g=!0;let w=o,E=a;for(let A=0;A<h.length;A++){const x=h[A];if(x.enabled!==!1&&(x.render(_,E,w,y),x.needsSwap!==!1)){const b=w;w=E,E=b}}if(d!==_.outputColorSpace||p!==_.toneMapping){d=_.outputColorSpace,p=_.toneMapping,c.defines={},at.getTransfer(d)===ht&&(c.defines.SRGB_TRANSFER="");const A=q3[p];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,_.setRenderTarget(m),_.render(u,f),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),a.dispose(),l.dispose(),c.dispose()}}const LS=new dn,Zh=new yo(1,1),DS=new sS,IS=new DA,US=new pS,fv=[],hv=[],pv=new Float32Array(16),mv=new Float32Array(9),gv=new Float32Array(4);function Po(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=fv[r];if(s===void 0&&(s=new Float32Array(r),fv[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function jt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function qt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Pu(t,e){let n=hv[e];n===void 0&&(n=new Int32Array(e),hv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function $3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function K3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2fv(this.addr,e),qt(n,e)}}function Z3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(jt(n,e))return;t.uniform3fv(this.addr,e),qt(n,e)}}function J3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4fv(this.addr,e),qt(n,e)}}function Q3(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),qt(n,e)}else{if(jt(n,i))return;gv.set(i),t.uniformMatrix2fv(this.addr,!1,gv),qt(n,i)}}function eP(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),qt(n,e)}else{if(jt(n,i))return;mv.set(i),t.uniformMatrix3fv(this.addr,!1,mv),qt(n,i)}}function tP(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(jt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),qt(n,e)}else{if(jt(n,i))return;pv.set(i),t.uniformMatrix4fv(this.addr,!1,pv),qt(n,i)}}function nP(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function iP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2iv(this.addr,e),qt(n,e)}}function rP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3iv(this.addr,e),qt(n,e)}}function sP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4iv(this.addr,e),qt(n,e)}}function oP(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function aP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(jt(n,e))return;t.uniform2uiv(this.addr,e),qt(n,e)}}function lP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(jt(n,e))return;t.uniform3uiv(this.addr,e),qt(n,e)}}function cP(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(jt(n,e))return;t.uniform4uiv(this.addr,e),qt(n,e)}}function uP(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Zh.compareFunction=n.isReversedDepthBuffer()?vm:gm,s=Zh):s=LS,n.setTexture2D(e||s,r)}function dP(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||IS,r)}function fP(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||US,r)}function hP(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||DS,r)}function pP(t){switch(t){case 5126:return $3;case 35664:return K3;case 35665:return Z3;case 35666:return J3;case 35674:return Q3;case 35675:return eP;case 35676:return tP;case 5124:case 35670:return nP;case 35667:case 35671:return iP;case 35668:case 35672:return rP;case 35669:case 35673:return sP;case 5125:return oP;case 36294:return aP;case 36295:return lP;case 36296:return cP;case 35678:case 36198:case 36298:case 36306:case 35682:return uP;case 35679:case 36299:case 36307:return dP;case 35680:case 36300:case 36308:case 36293:return fP;case 36289:case 36303:case 36311:case 36292:return hP}}function mP(t,e){t.uniform1fv(this.addr,e)}function gP(t,e){const n=Po(e,this.size,2);t.uniform2fv(this.addr,n)}function vP(t,e){const n=Po(e,this.size,3);t.uniform3fv(this.addr,n)}function xP(t,e){const n=Po(e,this.size,4);t.uniform4fv(this.addr,n)}function _P(t,e){const n=Po(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function yP(t,e){const n=Po(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function SP(t,e){const n=Po(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function MP(t,e){t.uniform1iv(this.addr,e)}function EP(t,e){t.uniform2iv(this.addr,e)}function wP(t,e){t.uniform3iv(this.addr,e)}function TP(t,e){t.uniform4iv(this.addr,e)}function bP(t,e){t.uniform1uiv(this.addr,e)}function AP(t,e){t.uniform2uiv(this.addr,e)}function CP(t,e){t.uniform3uiv(this.addr,e)}function RP(t,e){t.uniform4uiv(this.addr,e)}function PP(t,e,n){const i=this.cache,r=e.length,s=Pu(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),qt(i,s));let o;this.type===t.SAMPLER_2D_SHADOW?o=Zh:o=LS;for(let a=0;a!==r;++a)n.setTexture2D(e[a]||o,s[a])}function NP(t,e,n){const i=this.cache,r=e.length,s=Pu(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||IS,s[o])}function LP(t,e,n){const i=this.cache,r=e.length,s=Pu(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||US,s[o])}function DP(t,e,n){const i=this.cache,r=e.length,s=Pu(n,r);jt(i,s)||(t.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||DS,s[o])}function IP(t){switch(t){case 5126:return mP;case 35664:return gP;case 35665:return vP;case 35666:return xP;case 35674:return _P;case 35675:return yP;case 35676:return SP;case 5124:case 35670:return MP;case 35667:case 35671:return EP;case 35668:case 35672:return wP;case 35669:case 35673:return TP;case 5125:return bP;case 36294:return AP;case 36295:return CP;case 36296:return RP;case 35678:case 36198:case 36298:case 36306:case 35682:return PP;case 35679:case 36299:case 36307:return NP;case 35680:case 36300:case 36308:case 36293:return LP;case 36289:case 36303:case 36311:case 36292:return DP}}class UP{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=pP(n.type)}}class FP{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=IP(n.type)}}class OP{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const Gd=/(\w+)(\])?(\[|\.)?/g;function vv(t,e){t.seq.push(e),t.map[e.id]=e}function kP(t,e,n){const i=t.name,r=i.length;for(Gd.lastIndex=0;;){const s=Gd.exec(i),o=Gd.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){vv(n,c===void 0?new UP(a,t,e):new FP(a,t,e));break}else{let f=n.map[a];f===void 0&&(f=new OP(a),vv(n,f)),n=f}}}class yc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let o=0;o<i;++o){const a=e.getActiveUniform(n,o),l=e.getUniformLocation(n,a.name);kP(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function xv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const BP=37297;let zP=0;function VP(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const _v=new Ke;function HP(t){at._getMatrix(_v,at.workingColorSpace,t);const e=`mat3( ${_v.elements.map(n=>n.toFixed(4))} )`;switch(at.getTransfer(t)){case eu:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return Xe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function yv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return n.toUpperCase()+`

`+s+`

`+VP(t.getShaderSource(e),a)}else return s}function GP(t,e){const n=HP(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const WP={[Xy]:"Linear",[jy]:"Reinhard",[qy]:"Cineon",[lm]:"ACESFilmic",[$y]:"AgX",[Ky]:"Neutral",[Yy]:"Custom"};function XP(t,e){const n=WP[e];return n===void 0?(Xe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const ql=new F;function jP(){at.getLuminanceCoefficients(ql);const t=ql.x.toFixed(4),e=ql.y.toFixed(4),n=ql.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qP(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ta).join(`
`)}function YP(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function $P(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function ta(t){return t!==""}function Sv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Mv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const KP=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jh(t){return t.replace(KP,JP)}const ZP=new Map;function JP(t,e){let n=tt[e];if(n===void 0){const i=ZP.get(e);if(i!==void 0)n=tt[i],Xe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Jh(n)}const QP=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ev(t){return t.replace(QP,eN)}function eN(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function wv(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const tN={[mc]:"SHADOWMAP_TYPE_PCF",[Qo]:"SHADOWMAP_TYPE_VSM"};function nN(t){return tN[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const iN={[ls]:"ENVMAP_TYPE_CUBE",[_o]:"ENVMAP_TYPE_CUBE",[Cu]:"ENVMAP_TYPE_CUBE_UV"};function rN(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":iN[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const sN={[_o]:"ENVMAP_MODE_REFRACTION"};function oN(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":sN[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const aN={[am]:"ENVMAP_BLENDING_MULTIPLY",[Zb]:"ENVMAP_BLENDING_MIX",[Jb]:"ENVMAP_BLENDING_ADD"};function lN(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":aN[t.combine]||"ENVMAP_BLENDING_NONE"}function cN(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function uN(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=nN(n),c=rN(n),u=oN(n),f=lN(n),d=cN(n),p=qP(n),g=YP(s),S=r.createProgram();let m,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ta).join(`
`),m.length>0&&(m+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ta).join(`
`),h.length>0&&(h+=`
`)):(m=[wv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ta).join(`
`),h=[wv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ai?"#define TONE_MAPPING":"",n.toneMapping!==Ai?tt.tonemapping_pars_fragment:"",n.toneMapping!==Ai?XP("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,GP("linearToOutputTexel",n.outputColorSpace),jP(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ta).join(`
`)),o=Jh(o),o=Sv(o,n),o=Mv(o,n),a=Jh(a),a=Sv(a,n),a=Mv(a,n),o=Ev(o),a=Ev(a),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,h=["#define varying in",n.glslVersion===Tg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Tg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const _=v+m+o,y=v+h+a,w=xv(r,r.VERTEX_SHADER,_),E=xv(r,r.FRAGMENT_SHADER,y);r.attachShader(S,w),r.attachShader(S,E),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.hasPositionAttribute===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function A(N){if(t.debug.checkShaderErrors){const U=r.getProgramInfoLog(S)||"",H=r.getShaderInfoLog(w)||"",q=r.getShaderInfoLog(E)||"",D=U.trim(),k=H.trim(),B=q.trim();let I=!0,W=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,w,E);else{const $=yv(r,w,"vertex"),ee=yv(r,E,"fragment");lt("WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+N.name+`
Material Type: `+N.type+`

Program Info Log: `+D+`
`+$+`
`+ee)}else D!==""?Xe("WebGLProgram: Program Info Log:",D):(k===""||B==="")&&(W=!1);W&&(N.diagnostics={runnable:I,programLog:D,vertexShader:{log:k,prefix:m},fragmentShader:{log:B,prefix:h}})}r.deleteShader(w),r.deleteShader(E),x=new yc(r,S),b=$P(r,S)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=r.getProgramParameter(S,BP)),R},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=zP++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=E,this}let dN=0;class fN{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const r=this._getShaderCacheForMaterial(e);return r.has(n)===!1&&(r.add(n),n.usedTimes++),r.has(i)===!1&&(r.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new hN(e),n.set(e,i)),i}}class hN{constructor(e){this.id=dN++,this.code=e,this.usedTimes=0}}function pN(t){return t===cs||t===Kc||t===Zc}function mN(t,e,n,i,r,s){const o=new oS,a=new fN,l=new Set,c=[],u=new Map,f=i.logarithmicDepthBuffer;let d=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,b,R,N,U,H){const q=N.fog,D=U.geometry,k=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?N.environment:null,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,I=e.get(x.envMap||k,B),W=I&&I.mapping===Cu?I.image.height:null,$=p[x.type];x.precision!==null&&(d=i.getMaxPrecision(x.precision),d!==x.precision&&Xe("WebGLProgram.getParameters:",x.precision,"not supported, using",d,"instead."));const ee=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,le=ee!==void 0?ee.length:0;let Ye=0;D.morphAttributes.position!==void 0&&(Ye=1),D.morphAttributes.normal!==void 0&&(Ye=2),D.morphAttributes.color!==void 0&&(Ye=3);let Pe,Ge,J,ce;if($){const Le=Mi[$];Pe=Le.vertexShader,Ge=Le.fragmentShader}else{Pe=x.vertexShader,Ge=x.fragmentShader;const Le=a.getVertexShaderStage(x),Nt=a.getFragmentShaderStage(x);a.update(x,Le,Nt),J=Le.id,ce=Nt.id}const ae=t.getRenderTarget(),he=t.state.buffers.depth.getReversed(),Fe=U.isInstancedMesh===!0,Ie=U.isBatchedMesh===!0,it=!!x.map,je=!!x.matcap,ie=!!I,oe=!!x.aoMap,se=!!x.lightMap,ve=!!x.bumpMap&&x.wireframe===!1,me=!!x.normalMap,ze=!!x.displacementMap,Ne=!!x.emissiveMap,qe=!!x.metalnessMap,$e=!!x.roughnessMap,L=x.anisotropy>0,dt=x.clearcoat>0,st=x.dispersion>0,P=x.iridescence>0,M=x.sheen>0,V=x.transmission>0,j=L&&!!x.anisotropyMap,Z=dt&&!!x.clearcoatMap,fe=dt&&!!x.clearcoatNormalMap,pe=dt&&!!x.clearcoatRoughnessMap,Q=P&&!!x.iridescenceMap,ne=P&&!!x.iridescenceThicknessMap,_e=M&&!!x.sheenColorMap,Oe=M&&!!x.sheenRoughnessMap,Me=!!x.specularMap,ye=!!x.specularColorMap,He=!!x.specularIntensityMap,We=V&&!!x.transmissionMap,Ze=V&&!!x.thicknessMap,O=!!x.gradientMap,ge=!!x.alphaMap,te=x.alphaTest>0,Se=!!x.alphaHash,be=!!x.extensions;let re=Ai;x.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(re=t.toneMapping);const Ue={shaderID:$,shaderType:x.type,shaderName:x.name,vertexShader:Pe,fragmentShader:Ge,defines:x.defines,customVertexShaderID:J,customFragmentShaderID:ce,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:d,batching:Ie,batchingColor:Ie&&U._colorsTexture!==null,instancing:Fe,instancingColor:Fe&&U.instanceColor!==null,instancingMorph:Fe&&U.morphTexture!==null,outputColorSpace:ae===null?t.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:it,matcap:je,envMap:ie,envMapMode:ie&&I.mapping,envMapCubeUVHeight:W,aoMap:oe,lightMap:se,bumpMap:ve,normalMap:me,displacementMap:ze,emissiveMap:Ne,normalMapObjectSpace:me&&x.normalMapType===tA,normalMapTangentSpace:me&&x.normalMapType===Jc,packedNormalMap:me&&x.normalMapType===Jc&&pN(x.normalMap.format),metalnessMap:qe,roughnessMap:$e,anisotropy:L,anisotropyMap:j,clearcoat:dt,clearcoatMap:Z,clearcoatNormalMap:fe,clearcoatRoughnessMap:pe,dispersion:st,iridescence:P,iridescenceMap:Q,iridescenceThicknessMap:ne,sheen:M,sheenColorMap:_e,sheenRoughnessMap:Oe,specularMap:Me,specularColorMap:ye,specularIntensityMap:He,transmission:V,transmissionMap:We,thicknessMap:Ze,gradientMap:O,opaque:x.transparent===!1&&x.blending===ao&&x.alphaToCoverage===!1,alphaMap:ge,alphaTest:te,alphaHash:Se,combine:x.combine,mapUv:it&&g(x.map.channel),aoMapUv:oe&&g(x.aoMap.channel),lightMapUv:se&&g(x.lightMap.channel),bumpMapUv:ve&&g(x.bumpMap.channel),normalMapUv:me&&g(x.normalMap.channel),displacementMapUv:ze&&g(x.displacementMap.channel),emissiveMapUv:Ne&&g(x.emissiveMap.channel),metalnessMapUv:qe&&g(x.metalnessMap.channel),roughnessMapUv:$e&&g(x.roughnessMap.channel),anisotropyMapUv:j&&g(x.anisotropyMap.channel),clearcoatMapUv:Z&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:fe&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pe&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ne&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:Oe&&g(x.sheenRoughnessMap.channel),specularMapUv:Me&&g(x.specularMap.channel),specularColorMapUv:ye&&g(x.specularColorMap.channel),specularIntensityMapUv:He&&g(x.specularIntensityMap.channel),transmissionMapUv:We&&g(x.transmissionMap.channel),thicknessMapUv:Ze&&g(x.thicknessMap.channel),alphaMapUv:ge&&g(x.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(me||L),vertexNormals:!!D.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(it||ge),fog:!!q,useFog:x.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||D.attributes.normal===void 0&&me===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:he,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:D.attributes.position!==void 0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:le,morphTextureStride:Ye,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:re,decodeVideoTexture:it&&x.map.isVideoTexture===!0&&at.getTransfer(x.map.colorSpace)===ht,decodeVideoTextureEmissive:Ne&&x.emissiveMap.isVideoTexture===!0&&at.getTransfer(x.emissiveMap.colorSpace)===ht,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Bi,flipSided:x.side===vn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:be&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&x.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ue.vertexUv1s=l.has(1),Ue.vertexUv2s=l.has(2),Ue.vertexUv3s=l.has(3),l.clear(),Ue}function m(x){const b=[];if(x.shaderID?b.push(x.shaderID):(b.push(x.customVertexShaderID),b.push(x.customFragmentShaderID)),x.defines!==void 0)for(const R in x.defines)b.push(R),b.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(h(b,x),v(b,x),b.push(t.outputColorSpace)),b.push(x.customProgramCacheKey),b.join()}function h(x,b){x.push(b.precision),x.push(b.outputColorSpace),x.push(b.envMapMode),x.push(b.envMapCubeUVHeight),x.push(b.mapUv),x.push(b.alphaMapUv),x.push(b.lightMapUv),x.push(b.aoMapUv),x.push(b.bumpMapUv),x.push(b.normalMapUv),x.push(b.displacementMapUv),x.push(b.emissiveMapUv),x.push(b.metalnessMapUv),x.push(b.roughnessMapUv),x.push(b.anisotropyMapUv),x.push(b.clearcoatMapUv),x.push(b.clearcoatNormalMapUv),x.push(b.clearcoatRoughnessMapUv),x.push(b.iridescenceMapUv),x.push(b.iridescenceThicknessMapUv),x.push(b.sheenColorMapUv),x.push(b.sheenRoughnessMapUv),x.push(b.specularMapUv),x.push(b.specularColorMapUv),x.push(b.specularIntensityMapUv),x.push(b.transmissionMapUv),x.push(b.thicknessMapUv),x.push(b.combine),x.push(b.fogExp2),x.push(b.sizeAttenuation),x.push(b.morphTargetsCount),x.push(b.morphAttributeCount),x.push(b.numDirLights),x.push(b.numPointLights),x.push(b.numSpotLights),x.push(b.numSpotLightMaps),x.push(b.numHemiLights),x.push(b.numRectAreaLights),x.push(b.numDirLightShadows),x.push(b.numPointLightShadows),x.push(b.numSpotLightShadows),x.push(b.numSpotLightShadowsWithMaps),x.push(b.numLightProbes),x.push(b.shadowMapType),x.push(b.toneMapping),x.push(b.numClippingPlanes),x.push(b.numClipIntersection),x.push(b.depthPacking)}function v(x,b){o.disableAll(),b.instancing&&o.enable(0),b.instancingColor&&o.enable(1),b.instancingMorph&&o.enable(2),b.matcap&&o.enable(3),b.envMap&&o.enable(4),b.normalMapObjectSpace&&o.enable(5),b.normalMapTangentSpace&&o.enable(6),b.clearcoat&&o.enable(7),b.iridescence&&o.enable(8),b.alphaTest&&o.enable(9),b.vertexColors&&o.enable(10),b.vertexAlphas&&o.enable(11),b.vertexUv1s&&o.enable(12),b.vertexUv2s&&o.enable(13),b.vertexUv3s&&o.enable(14),b.vertexTangents&&o.enable(15),b.anisotropy&&o.enable(16),b.alphaHash&&o.enable(17),b.batching&&o.enable(18),b.dispersion&&o.enable(19),b.batchingColor&&o.enable(20),b.gradientMap&&o.enable(21),b.packedNormalMap&&o.enable(22),b.vertexNormals&&o.enable(23),x.push(o.mask),o.disableAll(),b.fog&&o.enable(0),b.useFog&&o.enable(1),b.flatShading&&o.enable(2),b.logarithmicDepthBuffer&&o.enable(3),b.reversedDepthBuffer&&o.enable(4),b.skinning&&o.enable(5),b.morphTargets&&o.enable(6),b.morphNormals&&o.enable(7),b.morphColors&&o.enable(8),b.premultipliedAlpha&&o.enable(9),b.shadowMapEnabled&&o.enable(10),b.doubleSided&&o.enable(11),b.flipSided&&o.enable(12),b.useDepthPacking&&o.enable(13),b.dithering&&o.enable(14),b.transmission&&o.enable(15),b.sheen&&o.enable(16),b.opaque&&o.enable(17),b.pointsUvs&&o.enable(18),b.decodeVideoTexture&&o.enable(19),b.decodeVideoTextureEmissive&&o.enable(20),b.alphaToCoverage&&o.enable(21),b.numLightProbeGrids>0&&o.enable(22),b.hasPositionAttribute&&o.enable(23),x.push(o.mask)}function _(x){const b=p[x.type];let R;if(b){const N=Mi[b];R=I2.clone(N.uniforms)}else R=x.uniforms;return R}function y(x,b){let R=u.get(b);return R!==void 0?++R.usedTimes:(R=new uN(t,b,x,r),c.push(R),u.set(b,R)),R}function w(x){if(--x.usedTimes===0){const b=c.indexOf(x);c[b]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function E(x){a.remove(x)}function A(){a.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:_,acquireProgram:y,releaseProgram:w,releaseShaderCache:E,programs:c,dispose:A}}function gN(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function vN(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Tv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function bv(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d){let p=0;return d.isInstancedMesh&&(p+=2),d.isSkinnedMesh&&(p+=1),p}function a(d,p,g,S,m,h){let v=t[e];return v===void 0?(v={id:d.id,object:d,geometry:p,material:g,materialVariant:o(d),groupOrder:S,renderOrder:d.renderOrder,z:m,group:h},t[e]=v):(v.id=d.id,v.object=d,v.geometry=p,v.material=g,v.materialVariant=o(d),v.groupOrder=S,v.renderOrder=d.renderOrder,v.z=m,v.group=h),e++,v}function l(d,p,g,S,m,h){const v=a(d,p,g,S,m,h);g.transmission>0?i.push(v):g.transparent===!0?r.push(v):n.push(v)}function c(d,p,g,S,m,h){const v=a(d,p,g,S,m,h);g.transmission>0?i.unshift(v):g.transparent===!0?r.unshift(v):n.unshift(v)}function u(d,p,g){n.length>1&&n.sort(d||vN),i.length>1&&i.sort(p||Tv),r.length>1&&r.sort(p||Tv),g&&(n.reverse(),i.reverse(),r.reverse())}function f(){for(let d=e,p=t.length;d<p;d++){const g=t[d];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:l,unshift:c,finish:f,sort:u}}function xN(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new bv,t.set(i,[o])):r>=s.length?(o=new bv,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function _N(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new F,color:new Ve};break;case"SpotLight":n={position:new F,direction:new F,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":n={color:new Ve,position:new F,halfWidth:new F,halfHeight:new F};break}return t[e.id]=n,n}}}function yN(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new xe,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let SN=0;function MN(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function EN(t){const e=new _N,n=yN(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new F);const r=new F,s=new ft,o=new ft;function a(c){let u=0,f=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let p=0,g=0,S=0,m=0,h=0,v=0,_=0,y=0,w=0,E=0,A=0;c.sort(MN);for(let b=0,R=c.length;b<R;b++){const N=c[b],U=N.color,H=N.intensity,q=N.distance;let D=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===cs?D=N.shadow.map.texture:D=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=U.r*H,f+=U.g*H,d+=U.b*H;else if(N.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(N.sh.coefficients[k],H);A++}else if(N.isDirectionalLight){const k=e.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){const B=N.shadow,I=n.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=D,i.directionalShadowMatrix[p]=N.shadow.matrix,v++}i.directional[p]=k,p++}else if(N.isSpotLight){const k=e.get(N);k.position.setFromMatrixPosition(N.matrixWorld),k.color.copy(U).multiplyScalar(H),k.distance=q,k.coneCos=Math.cos(N.angle),k.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),k.decay=N.decay,i.spot[S]=k;const B=N.shadow;if(N.map&&(i.spotLightMap[w]=N.map,w++,B.updateMatrices(N),N.castShadow&&E++),i.spotLightMatrix[S]=B.matrix,N.castShadow){const I=n.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,i.spotShadow[S]=I,i.spotShadowMap[S]=D,y++}S++}else if(N.isRectAreaLight){const k=e.get(N);k.color.copy(U).multiplyScalar(H),k.halfWidth.set(N.width*.5,0,0),k.halfHeight.set(0,N.height*.5,0),i.rectArea[m]=k,m++}else if(N.isPointLight){const k=e.get(N);if(k.color.copy(N.color).multiplyScalar(N.intensity),k.distance=N.distance,k.decay=N.decay,N.castShadow){const B=N.shadow,I=n.get(N);I.shadowIntensity=B.intensity,I.shadowBias=B.bias,I.shadowNormalBias=B.normalBias,I.shadowRadius=B.radius,I.shadowMapSize=B.mapSize,I.shadowCameraNear=B.camera.near,I.shadowCameraFar=B.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=D,i.pointShadowMatrix[g]=N.shadow.matrix,_++}i.point[g]=k,g++}else if(N.isHemisphereLight){const k=e.get(N);k.skyColor.copy(N.color).multiplyScalar(H),k.groundColor.copy(N.groundColor).multiplyScalar(H),i.hemi[h]=k,h++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=d;const x=i.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==S||x.rectAreaLength!==m||x.hemiLength!==h||x.numDirectionalShadows!==v||x.numPointShadows!==_||x.numSpotShadows!==y||x.numSpotMaps!==w||x.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=S,i.rectArea.length=m,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=_,i.pointShadowMap.length=_,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=_,i.spotLightMatrix.length=y+w-E,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=E,i.numLightProbes=A,x.directionalLength=p,x.pointLength=g,x.spotLength=S,x.rectAreaLength=m,x.hemiLength=h,x.numDirectionalShadows=v,x.numPointShadows=_,x.numSpotShadows=y,x.numSpotMaps=w,x.numLightProbes=A,i.version=SN++)}function l(c,u){let f=0,d=0,p=0,g=0,S=0;const m=u.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){const _=c[h];if(_.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(_.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(_.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(_.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){const y=i.hemi[S];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),S++}}}return{setup:a,setupView:l,state:i}}function Av(t){const e=new EN(t),n=[],i=[],r=[];function s(d){f.camera=d,n.length=0,i.length=0,r.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function l(d){r.push(d)}function c(){e.setup(n)}function u(d){e.setupView(n,d)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:r,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:u,pushLight:o,pushShadow:a,pushLightProbeGrid:l}}function wN(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Av(t),e.set(r,[a])):s>=o.length?(a=new Av(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const TN=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bN=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,AN=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],CN=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Cv=new ft,qo=new F,Wd=new F;function RN(t,e,n){let i=new ym;const r=new xe,s=new xe,o=new At,a=new B2,l=new z2,c={},u=n.maxTextureSize,f={[Pr]:vn,[vn]:Pr,[Bi]:Bi},d=new Pi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new xe},radius:{value:4}},vertexShader:TN,fragmentShader:bN}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const g=new yn;g.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new et(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=mc;let h=this.type;this.render=function(E,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||E.length===0)return;this.type===Wy&&(Xe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=mc);const b=t.getRenderTarget(),R=t.getActiveCubeFace(),N=t.getActiveMipmapLevel(),U=t.state;U.setBlending(Wi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const H=h!==this.type;H&&A.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(D=>D.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,D=E.length;q<D;q++){const k=E[q],B=k.shadow;if(B===void 0){Xe("WebGLShadowMap:",k,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;r.copy(B.mapSize);const I=B.getFrameExtents();r.multiply(I),s.copy(B.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/I.x),r.x=s.x*I.x,B.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/I.y),r.y=s.y*I.y,B.mapSize.y=s.y));const W=t.state.buffers.depth.getReversed();if(B.camera._reversedDepth=W,B.map===null||H===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Qo){if(k.isPointLight){Xe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new Ci(r.x,r.y,{format:cs,type:Ki,minFilter:un,magFilter:un,generateMipmaps:!1}),B.map.texture.name=k.name+".shadowMap",B.map.depthTexture=new yo(r.x,r.y,si),B.map.depthTexture.name=k.name+".shadowMapDepth",B.map.depthTexture.format=Zi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Qt,B.map.depthTexture.magFilter=Qt}else k.isPointLight?(B.map=new NS(r.x),B.map.depthTexture=new JA(r.x,Ri)):(B.map=new Ci(r.x,r.y),B.map.depthTexture=new yo(r.x,r.y,Ri)),B.map.depthTexture.name=k.name+".shadowMap",B.map.depthTexture.format=Zi,this.type===mc?(B.map.depthTexture.compareFunction=W?vm:gm,B.map.depthTexture.minFilter=un,B.map.depthTexture.magFilter=un):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=Qt,B.map.depthTexture.magFilter=Qt);B.camera.updateProjectionMatrix()}const $=B.map.isWebGLCubeRenderTarget?6:1;for(let ee=0;ee<$;ee++){if(B.map.isWebGLCubeRenderTarget)t.setRenderTarget(B.map,ee),t.clear();else{ee===0&&(t.setRenderTarget(B.map),t.clear());const le=B.getViewport(ee);o.set(s.x*le.x,s.y*le.y,s.x*le.z,s.y*le.w),U.viewport(o)}if(k.isPointLight){const le=B.camera,Ye=B.matrix,Pe=k.distance||le.far;Pe!==le.far&&(le.far=Pe,le.updateProjectionMatrix()),qo.setFromMatrixPosition(k.matrixWorld),le.position.copy(qo),Wd.copy(le.position),Wd.add(AN[ee]),le.up.copy(CN[ee]),le.lookAt(Wd),le.updateMatrixWorld(),Ye.makeTranslation(-qo.x,-qo.y,-qo.z),Cv.multiplyMatrices(le.projectionMatrix,le.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Cv,le.coordinateSystem,le.reversedDepth)}else B.updateMatrices(k);i=B.getFrustum(),y(A,x,B.camera,k,this.type)}B.isPointLightShadow!==!0&&this.type===Qo&&v(B,x),B.needsUpdate=!1}h=this.type,m.needsUpdate=!1,t.setRenderTarget(b,R,N)};function v(E,A){const x=e.update(S);d.defines.VSM_SAMPLES!==E.blurSamples&&(d.defines.VSM_SAMPLES=E.blurSamples,p.defines.VSM_SAMPLES=E.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),E.mapPass===null&&(E.mapPass=new Ci(r.x,r.y,{format:cs,type:Ki})),d.uniforms.shadow_pass.value=E.map.depthTexture,d.uniforms.resolution.value=E.mapSize,d.uniforms.radius.value=E.radius,t.setRenderTarget(E.mapPass),t.clear(),t.renderBufferDirect(A,null,x,d,S,null),p.uniforms.shadow_pass.value=E.mapPass.texture,p.uniforms.resolution.value=E.mapSize,p.uniforms.radius.value=E.radius,t.setRenderTarget(E.map),t.clear(),t.renderBufferDirect(A,null,x,p,S,null)}function _(E,A,x,b){let R=null;const N=x.isPointLight===!0?E.customDistanceMaterial:E.customDepthMaterial;if(N!==void 0)R=N;else if(R=x.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const U=R.uuid,H=A.uuid;let q=c[U];q===void 0&&(q={},c[U]=q);let D=q[H];D===void 0&&(D=R.clone(),q[H]=D,A.addEventListener("dispose",w)),R=D}if(R.visible=A.visible,R.wireframe=A.wireframe,b===Qo?R.side=A.shadowSide!==null?A.shadowSide:A.side:R.side=A.shadowSide!==null?A.shadowSide:f[A.side],R.alphaMap=A.alphaMap,R.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,R.map=A.map,R.clipShadows=A.clipShadows,R.clippingPlanes=A.clippingPlanes,R.clipIntersection=A.clipIntersection,R.displacementMap=A.displacementMap,R.displacementScale=A.displacementScale,R.displacementBias=A.displacementBias,R.wireframeLinewidth=A.wireframeLinewidth,R.linewidth=A.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const U=t.properties.get(R);U.light=x}return R}function y(E,A,x,b,R){if(E.visible===!1)return;if(E.layers.test(A.layers)&&(E.isMesh||E.isLine||E.isPoints)&&(E.castShadow||E.receiveShadow&&R===Qo)&&(!E.frustumCulled||i.intersectsObject(E))){E.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,E.matrixWorld);const H=e.update(E),q=E.material;if(Array.isArray(q)){const D=H.groups;for(let k=0,B=D.length;k<B;k++){const I=D[k],W=q[I.materialIndex];if(W&&W.visible){const $=_(E,W,b,R);E.onBeforeShadow(t,E,A,x,H,$,I),t.renderBufferDirect(x,null,H,$,E,I),E.onAfterShadow(t,E,A,x,H,$,I)}}}else if(q.visible){const D=_(E,q,b,R);E.onBeforeShadow(t,E,A,x,H,D,null),t.renderBufferDirect(x,null,H,D,E,null),E.onAfterShadow(t,E,A,x,H,D,null)}}const U=E.children;for(let H=0,q=U.length;H<q;H++)y(U[H],A,x,b,R)}function w(E){E.target.removeEventListener("dispose",w);for(const x in c){const b=c[x],R=E.target.uuid;R in b&&(b[R].dispose(),delete b[R])}}}function PN(t,e){function n(){let O=!1;const ge=new At;let te=null;const Se=new At(0,0,0,0);return{setMask:function(be){te!==be&&!O&&(t.colorMask(be,be,be,be),te=be)},setLocked:function(be){O=be},setClear:function(be,re,Ue,Le,Nt){Nt===!0&&(be*=Le,re*=Le,Ue*=Le),ge.set(be,re,Ue,Le),Se.equals(ge)===!1&&(t.clearColor(be,re,Ue,Le),Se.copy(ge))},reset:function(){O=!1,te=null,Se.set(-1,0,0,0)}}}function i(){let O=!1,ge=!1,te=null,Se=null,be=null;return{setReversed:function(re){if(ge!==re){const Ue=e.get("EXT_clip_control");re?Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.ZERO_TO_ONE_EXT):Ue.clipControlEXT(Ue.LOWER_LEFT_EXT,Ue.NEGATIVE_ONE_TO_ONE_EXT),ge=re;const Le=be;be=null,this.setClear(Le)}},getReversed:function(){return ge},setTest:function(re){re?ae(t.DEPTH_TEST):he(t.DEPTH_TEST)},setMask:function(re){te!==re&&!O&&(t.depthMask(re),te=re)},setFunc:function(re){if(ge&&(re=dA[re]),Se!==re){switch(re){case oh:t.depthFunc(t.NEVER);break;case ah:t.depthFunc(t.ALWAYS);break;case lh:t.depthFunc(t.LESS);break;case xo:t.depthFunc(t.LEQUAL);break;case ch:t.depthFunc(t.EQUAL);break;case uh:t.depthFunc(t.GEQUAL);break;case dh:t.depthFunc(t.GREATER);break;case fh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Se=re}},setLocked:function(re){O=re},setClear:function(re){be!==re&&(be=re,ge&&(re=1-re),t.clearDepth(re))},reset:function(){O=!1,te=null,Se=null,be=null,ge=!1}}}function r(){let O=!1,ge=null,te=null,Se=null,be=null,re=null,Ue=null,Le=null,Nt=null;return{setTest:function(_t){O||(_t?ae(t.STENCIL_TEST):he(t.STENCIL_TEST))},setMask:function(_t){ge!==_t&&!O&&(t.stencilMask(_t),ge=_t)},setFunc:function(_t,hi,pi){(te!==_t||Se!==hi||be!==pi)&&(t.stencilFunc(_t,hi,pi),te=_t,Se=hi,be=pi)},setOp:function(_t,hi,pi){(re!==_t||Ue!==hi||Le!==pi)&&(t.stencilOp(_t,hi,pi),re=_t,Ue=hi,Le=pi)},setLocked:function(_t){O=_t},setClear:function(_t){Nt!==_t&&(t.clearStencil(_t),Nt=_t)},reset:function(){O=!1,ge=null,te=null,Se=null,be=null,re=null,Ue=null,Le=null,Nt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,c=new WeakMap;let u={},f={},d={},p=new WeakMap,g=[],S=null,m=!1,h=null,v=null,_=null,y=null,w=null,E=null,A=null,x=new Ve(0,0,0),b=0,R=!1,N=null,U=null,H=null,q=null,D=null;const k=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,I=0;const W=t.getParameter(t.VERSION);W.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(W)[1]),B=I>=1):W.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),B=I>=2);let $=null,ee={};const le=t.getParameter(t.SCISSOR_BOX),Ye=t.getParameter(t.VIEWPORT),Pe=new At().fromArray(le),Ge=new At().fromArray(Ye);function J(O,ge,te,Se){const be=new Uint8Array(4),re=t.createTexture();t.bindTexture(O,re),t.texParameteri(O,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(O,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Ue=0;Ue<te;Ue++)O===t.TEXTURE_3D||O===t.TEXTURE_2D_ARRAY?t.texImage3D(ge,0,t.RGBA,1,1,Se,0,t.RGBA,t.UNSIGNED_BYTE,be):t.texImage2D(ge+Ue,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,be);return re}const ce={};ce[t.TEXTURE_2D]=J(t.TEXTURE_2D,t.TEXTURE_2D,1),ce[t.TEXTURE_CUBE_MAP]=J(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[t.TEXTURE_2D_ARRAY]=J(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ce[t.TEXTURE_3D]=J(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(t.DEPTH_TEST),o.setFunc(xo),ve(!1),me(_g),ae(t.CULL_FACE),oe(Wi);function ae(O){u[O]!==!0&&(t.enable(O),u[O]=!0)}function he(O){u[O]!==!1&&(t.disable(O),u[O]=!1)}function Fe(O,ge){return d[O]!==ge?(t.bindFramebuffer(O,ge),d[O]=ge,O===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=ge),O===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=ge),!0):!1}function Ie(O,ge){let te=g,Se=!1;if(O){te=p.get(ge),te===void 0&&(te=[],p.set(ge,te));const be=O.textures;if(te.length!==be.length||te[0]!==t.COLOR_ATTACHMENT0){for(let re=0,Ue=be.length;re<Ue;re++)te[re]=t.COLOR_ATTACHMENT0+re;te.length=be.length,Se=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,Se=!0);Se&&t.drawBuffers(te)}function it(O){return S!==O?(t.useProgram(O),S=O,!0):!1}const je={[Xr]:t.FUNC_ADD,[Ib]:t.FUNC_SUBTRACT,[Ub]:t.FUNC_REVERSE_SUBTRACT};je[Fb]=t.MIN,je[Ob]=t.MAX;const ie={[kb]:t.ZERO,[Bb]:t.ONE,[zb]:t.SRC_COLOR,[rh]:t.SRC_ALPHA,[jb]:t.SRC_ALPHA_SATURATE,[Wb]:t.DST_COLOR,[Hb]:t.DST_ALPHA,[Vb]:t.ONE_MINUS_SRC_COLOR,[sh]:t.ONE_MINUS_SRC_ALPHA,[Xb]:t.ONE_MINUS_DST_COLOR,[Gb]:t.ONE_MINUS_DST_ALPHA,[qb]:t.CONSTANT_COLOR,[Yb]:t.ONE_MINUS_CONSTANT_COLOR,[$b]:t.CONSTANT_ALPHA,[Kb]:t.ONE_MINUS_CONSTANT_ALPHA};function oe(O,ge,te,Se,be,re,Ue,Le,Nt,_t){if(O===Wi){m===!0&&(he(t.BLEND),m=!1);return}if(m===!1&&(ae(t.BLEND),m=!0),O!==Db){if(O!==h||_t!==R){if((v!==Xr||w!==Xr)&&(t.blendEquation(t.FUNC_ADD),v=Xr,w=Xr),_t)switch(O){case ao:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ih:t.blendFunc(t.ONE,t.ONE);break;case yg:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Sg:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:lt("WebGLState: Invalid blending: ",O);break}else switch(O){case ao:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case ih:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case yg:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Sg:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",O);break}_=null,y=null,E=null,A=null,x.set(0,0,0),b=0,h=O,R=_t}return}be=be||ge,re=re||te,Ue=Ue||Se,(ge!==v||be!==w)&&(t.blendEquationSeparate(je[ge],je[be]),v=ge,w=be),(te!==_||Se!==y||re!==E||Ue!==A)&&(t.blendFuncSeparate(ie[te],ie[Se],ie[re],ie[Ue]),_=te,y=Se,E=re,A=Ue),(Le.equals(x)===!1||Nt!==b)&&(t.blendColor(Le.r,Le.g,Le.b,Nt),x.copy(Le),b=Nt),h=O,R=!1}function se(O,ge){O.side===Bi?he(t.CULL_FACE):ae(t.CULL_FACE);let te=O.side===vn;ge&&(te=!te),ve(te),O.blending===ao&&O.transparent===!1?oe(Wi):oe(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const Se=O.stencilWrite;a.setTest(Se),Se&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Ne(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?ae(t.SAMPLE_ALPHA_TO_COVERAGE):he(t.SAMPLE_ALPHA_TO_COVERAGE)}function ve(O){N!==O&&(O?t.frontFace(t.CW):t.frontFace(t.CCW),N=O)}function me(O){O!==Nb?(ae(t.CULL_FACE),O!==U&&(O===_g?t.cullFace(t.BACK):O===Lb?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):he(t.CULL_FACE),U=O}function ze(O){O!==H&&(B&&t.lineWidth(O),H=O)}function Ne(O,ge,te){O?(ae(t.POLYGON_OFFSET_FILL),(q!==ge||D!==te)&&(q=ge,D=te,o.getReversed()&&(ge=-ge),t.polygonOffset(ge,te))):he(t.POLYGON_OFFSET_FILL)}function qe(O){O?ae(t.SCISSOR_TEST):he(t.SCISSOR_TEST)}function $e(O){O===void 0&&(O=t.TEXTURE0+k-1),$!==O&&(t.activeTexture(O),$=O)}function L(O,ge,te){te===void 0&&($===null?te=t.TEXTURE0+k-1:te=$);let Se=ee[te];Se===void 0&&(Se={type:void 0,texture:void 0},ee[te]=Se),(Se.type!==O||Se.texture!==ge)&&($!==te&&(t.activeTexture(te),$=te),t.bindTexture(O,ge||ce[O]),Se.type=O,Se.texture=ge)}function dt(){const O=ee[$];O!==void 0&&O.type!==void 0&&(t.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function st(){try{t.compressedTexImage2D(...arguments)}catch(O){lt("WebGLState:",O)}}function P(){try{t.compressedTexImage3D(...arguments)}catch(O){lt("WebGLState:",O)}}function M(){try{t.texSubImage2D(...arguments)}catch(O){lt("WebGLState:",O)}}function V(){try{t.texSubImage3D(...arguments)}catch(O){lt("WebGLState:",O)}}function j(){try{t.compressedTexSubImage2D(...arguments)}catch(O){lt("WebGLState:",O)}}function Z(){try{t.compressedTexSubImage3D(...arguments)}catch(O){lt("WebGLState:",O)}}function fe(){try{t.texStorage2D(...arguments)}catch(O){lt("WebGLState:",O)}}function pe(){try{t.texStorage3D(...arguments)}catch(O){lt("WebGLState:",O)}}function Q(){try{t.texImage2D(...arguments)}catch(O){lt("WebGLState:",O)}}function ne(){try{t.texImage3D(...arguments)}catch(O){lt("WebGLState:",O)}}function _e(O){return f[O]!==void 0?f[O]:t.getParameter(O)}function Oe(O,ge){f[O]!==ge&&(t.pixelStorei(O,ge),f[O]=ge)}function Me(O){Pe.equals(O)===!1&&(t.scissor(O.x,O.y,O.z,O.w),Pe.copy(O))}function ye(O){Ge.equals(O)===!1&&(t.viewport(O.x,O.y,O.z,O.w),Ge.copy(O))}function He(O,ge){let te=c.get(ge);te===void 0&&(te=new WeakMap,c.set(ge,te));let Se=te.get(O);Se===void 0&&(Se=t.getUniformBlockIndex(ge,O.name),te.set(O,Se))}function We(O,ge){const Se=c.get(ge).get(O);l.get(ge)!==Se&&(t.uniformBlockBinding(ge,Se,O.__bindingPointIndex),l.set(ge,Se))}function Ze(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),u={},f={},$=null,ee={},d={},p=new WeakMap,g=[],S=null,m=!1,h=null,v=null,_=null,y=null,w=null,E=null,A=null,x=new Ve(0,0,0),b=0,R=!1,N=null,U=null,H=null,q=null,D=null,Pe.set(0,0,t.canvas.width,t.canvas.height),Ge.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ae,disable:he,bindFramebuffer:Fe,drawBuffers:Ie,useProgram:it,setBlending:oe,setMaterial:se,setFlipSided:ve,setCullFace:me,setLineWidth:ze,setPolygonOffset:Ne,setScissorTest:qe,activeTexture:$e,bindTexture:L,unbindTexture:dt,compressedTexImage2D:st,compressedTexImage3D:P,texImage2D:Q,texImage3D:ne,pixelStorei:Oe,getParameter:_e,updateUBOMapping:He,uniformBlockBinding:We,texStorage2D:fe,texStorage3D:pe,texSubImage2D:M,texSubImage3D:V,compressedTexSubImage2D:j,compressedTexSubImage3D:Z,scissor:Me,viewport:ye,reset:Ze}}function NN(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new xe,u=new WeakMap,f=new Set;let d;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(P,M){return g?new OffscreenCanvas(P,M):tu("canvas")}function m(P,M,V){let j=1;const Z=st(P);if((Z.width>V||Z.height>V)&&(j=V/Math.max(Z.width,Z.height)),j<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const fe=Math.floor(j*Z.width),pe=Math.floor(j*Z.height);d===void 0&&(d=S(fe,pe));const Q=M?S(fe,pe):d;return Q.width=fe,Q.height=pe,Q.getContext("2d").drawImage(P,0,0,fe,pe),Xe("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+fe+"x"+pe+")."),Q}else return"data"in P&&Xe("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),P;return P}function h(P){return P.generateMipmaps}function v(P){t.generateMipmap(P)}function _(P){return P.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?t.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(P,M,V,j,Z,fe=!1){if(P!==null){if(t[P]!==void 0)return t[P];Xe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let pe;j&&(pe=e.get("EXT_texture_norm16"),pe||Xe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===t.RED&&(V===t.FLOAT&&(Q=t.R32F),V===t.HALF_FLOAT&&(Q=t.R16F),V===t.UNSIGNED_BYTE&&(Q=t.R8),V===t.UNSIGNED_SHORT&&pe&&(Q=pe.R16_EXT),V===t.SHORT&&pe&&(Q=pe.R16_SNORM_EXT)),M===t.RED_INTEGER&&(V===t.UNSIGNED_BYTE&&(Q=t.R8UI),V===t.UNSIGNED_SHORT&&(Q=t.R16UI),V===t.UNSIGNED_INT&&(Q=t.R32UI),V===t.BYTE&&(Q=t.R8I),V===t.SHORT&&(Q=t.R16I),V===t.INT&&(Q=t.R32I)),M===t.RG&&(V===t.FLOAT&&(Q=t.RG32F),V===t.HALF_FLOAT&&(Q=t.RG16F),V===t.UNSIGNED_BYTE&&(Q=t.RG8),V===t.UNSIGNED_SHORT&&pe&&(Q=pe.RG16_EXT),V===t.SHORT&&pe&&(Q=pe.RG16_SNORM_EXT)),M===t.RG_INTEGER&&(V===t.UNSIGNED_BYTE&&(Q=t.RG8UI),V===t.UNSIGNED_SHORT&&(Q=t.RG16UI),V===t.UNSIGNED_INT&&(Q=t.RG32UI),V===t.BYTE&&(Q=t.RG8I),V===t.SHORT&&(Q=t.RG16I),V===t.INT&&(Q=t.RG32I)),M===t.RGB_INTEGER&&(V===t.UNSIGNED_BYTE&&(Q=t.RGB8UI),V===t.UNSIGNED_SHORT&&(Q=t.RGB16UI),V===t.UNSIGNED_INT&&(Q=t.RGB32UI),V===t.BYTE&&(Q=t.RGB8I),V===t.SHORT&&(Q=t.RGB16I),V===t.INT&&(Q=t.RGB32I)),M===t.RGBA_INTEGER&&(V===t.UNSIGNED_BYTE&&(Q=t.RGBA8UI),V===t.UNSIGNED_SHORT&&(Q=t.RGBA16UI),V===t.UNSIGNED_INT&&(Q=t.RGBA32UI),V===t.BYTE&&(Q=t.RGBA8I),V===t.SHORT&&(Q=t.RGBA16I),V===t.INT&&(Q=t.RGBA32I)),M===t.RGB&&(V===t.UNSIGNED_SHORT&&pe&&(Q=pe.RGB16_EXT),V===t.SHORT&&pe&&(Q=pe.RGB16_SNORM_EXT),V===t.UNSIGNED_INT_5_9_9_9_REV&&(Q=t.RGB9_E5),V===t.UNSIGNED_INT_10F_11F_11F_REV&&(Q=t.R11F_G11F_B10F)),M===t.RGBA){const ne=fe?eu:at.getTransfer(Z);V===t.FLOAT&&(Q=t.RGBA32F),V===t.HALF_FLOAT&&(Q=t.RGBA16F),V===t.UNSIGNED_BYTE&&(Q=ne===ht?t.SRGB8_ALPHA8:t.RGBA8),V===t.UNSIGNED_SHORT&&pe&&(Q=pe.RGBA16_EXT),V===t.SHORT&&pe&&(Q=pe.RGBA16_SNORM_EXT),V===t.UNSIGNED_SHORT_4_4_4_4&&(Q=t.RGBA4),V===t.UNSIGNED_SHORT_5_5_5_1&&(Q=t.RGB5_A1)}return(Q===t.R16F||Q===t.R32F||Q===t.RG16F||Q===t.RG32F||Q===t.RGBA16F||Q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(P,M){let V;return P?M===null||M===Ri||M===Va?V=t.DEPTH24_STENCIL8:M===si?V=t.DEPTH32F_STENCIL8:M===za&&(V=t.DEPTH24_STENCIL8,Xe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Ri||M===Va?V=t.DEPTH_COMPONENT24:M===si?V=t.DEPTH_COMPONENT32F:M===za&&(V=t.DEPTH_COMPONENT16),V}function E(P,M){return h(P)===!0||P.isFramebufferTexture&&P.minFilter!==Qt&&P.minFilter!==un?Math.log2(Math.max(M.width,M.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?M.mipmaps.length:1}function A(P){const M=P.target;M.removeEventListener("dispose",A),b(M),M.isVideoTexture&&u.delete(M),M.isHTMLTexture&&f.delete(M)}function x(P){const M=P.target;M.removeEventListener("dispose",x),N(M)}function b(P){const M=i.get(P);if(M.__webglInit===void 0)return;const V=P.source,j=p.get(V);if(j){const Z=j[M.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(P),Object.keys(j).length===0&&p.delete(V)}i.remove(P)}function R(P){const M=i.get(P);t.deleteTexture(M.__webglTexture);const V=P.source,j=p.get(V);delete j[M.__cacheKey],o.memory.textures--}function N(P){const M=i.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),i.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let j=0;j<6;j++){if(Array.isArray(M.__webglFramebuffer[j]))for(let Z=0;Z<M.__webglFramebuffer[j].length;Z++)t.deleteFramebuffer(M.__webglFramebuffer[j][Z]);else t.deleteFramebuffer(M.__webglFramebuffer[j]);M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer[j])}else{if(Array.isArray(M.__webglFramebuffer))for(let j=0;j<M.__webglFramebuffer.length;j++)t.deleteFramebuffer(M.__webglFramebuffer[j]);else t.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&t.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&t.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let j=0;j<M.__webglColorRenderbuffer.length;j++)M.__webglColorRenderbuffer[j]&&t.deleteRenderbuffer(M.__webglColorRenderbuffer[j]);M.__webglDepthRenderbuffer&&t.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const V=P.textures;for(let j=0,Z=V.length;j<Z;j++){const fe=i.get(V[j]);fe.__webglTexture&&(t.deleteTexture(fe.__webglTexture),o.memory.textures--),i.remove(V[j])}i.remove(P)}let U=0;function H(){U=0}function q(){return U}function D(P){U=P}function k(){const P=U;return P>=r.maxTextures&&Xe("WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+r.maxTextures),U+=1,P}function B(P){const M=[];return M.push(P.wrapS),M.push(P.wrapT),M.push(P.wrapR||0),M.push(P.magFilter),M.push(P.minFilter),M.push(P.anisotropy),M.push(P.internalFormat),M.push(P.format),M.push(P.type),M.push(P.generateMipmaps),M.push(P.premultiplyAlpha),M.push(P.flipY),M.push(P.unpackAlignment),M.push(P.colorSpace),M.join()}function I(P,M){const V=i.get(P);if(P.isVideoTexture&&L(P),P.isRenderTargetTexture===!1&&P.isExternalTexture!==!0&&P.version>0&&V.__version!==P.version){const j=P.image;if(j===null)Xe("WebGLRenderer: Texture marked for update but no image data found.");else if(j.complete===!1)Xe("WebGLRenderer: Texture marked for update but image is incomplete");else{he(V,P,M);return}}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,V.__webglTexture,t.TEXTURE0+M)}function W(P,M){const V=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){he(V,P,M);return}else P.isExternalTexture&&(V.__webglTexture=P.sourceTexture?P.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,V.__webglTexture,t.TEXTURE0+M)}function $(P,M){const V=i.get(P);if(P.isRenderTargetTexture===!1&&P.version>0&&V.__version!==P.version){he(V,P,M);return}n.bindTexture(t.TEXTURE_3D,V.__webglTexture,t.TEXTURE0+M)}function ee(P,M){const V=i.get(P);if(P.isCubeDepthTexture!==!0&&P.version>0&&V.__version!==P.version){Fe(V,P,M);return}n.bindTexture(t.TEXTURE_CUBE_MAP,V.__webglTexture,t.TEXTURE0+M)}const le={[hh]:t.REPEAT,[Hi]:t.CLAMP_TO_EDGE,[ph]:t.MIRRORED_REPEAT},Ye={[Qt]:t.NEAREST,[Qb]:t.NEAREST_MIPMAP_NEAREST,[Sl]:t.NEAREST_MIPMAP_LINEAR,[un]:t.LINEAR,[dd]:t.LINEAR_MIPMAP_NEAREST,[Zr]:t.LINEAR_MIPMAP_LINEAR},Pe={[nA]:t.NEVER,[aA]:t.ALWAYS,[iA]:t.LESS,[gm]:t.LEQUAL,[rA]:t.EQUAL,[vm]:t.GEQUAL,[sA]:t.GREATER,[oA]:t.NOTEQUAL};function Ge(P,M){if(M.type===si&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===un||M.magFilter===dd||M.magFilter===Sl||M.magFilter===Zr||M.minFilter===un||M.minFilter===dd||M.minFilter===Sl||M.minFilter===Zr)&&Xe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(P,t.TEXTURE_WRAP_S,le[M.wrapS]),t.texParameteri(P,t.TEXTURE_WRAP_T,le[M.wrapT]),(P===t.TEXTURE_3D||P===t.TEXTURE_2D_ARRAY)&&t.texParameteri(P,t.TEXTURE_WRAP_R,le[M.wrapR]),t.texParameteri(P,t.TEXTURE_MAG_FILTER,Ye[M.magFilter]),t.texParameteri(P,t.TEXTURE_MIN_FILTER,Ye[M.minFilter]),M.compareFunction&&(t.texParameteri(P,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(P,t.TEXTURE_COMPARE_FUNC,Pe[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Qt||M.minFilter!==Sl&&M.minFilter!==Zr||M.type===si&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||i.get(M).__currentAnisotropy){const V=e.get("EXT_texture_filter_anisotropic");t.texParameterf(P,V.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),i.get(M).__currentAnisotropy=M.anisotropy}}}function J(P,M){let V=!1;P.__webglInit===void 0&&(P.__webglInit=!0,M.addEventListener("dispose",A));const j=M.source;let Z=p.get(j);Z===void 0&&(Z={},p.set(j,Z));const fe=B(M);if(fe!==P.__cacheKey){Z[fe]===void 0&&(Z[fe]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,V=!0),Z[fe].usedTimes++;const pe=Z[P.__cacheKey];pe!==void 0&&(Z[P.__cacheKey].usedTimes--,pe.usedTimes===0&&R(M)),P.__cacheKey=fe,P.__webglTexture=Z[fe].texture}return V}function ce(P,M,V){return Math.floor(Math.floor(P/V)/M)}function ae(P,M,V,j){const fe=P.updateRanges;if(fe.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,M.width,M.height,V,j,M.data);else{fe.sort((Oe,Me)=>Oe.start-Me.start);let pe=0;for(let Oe=1;Oe<fe.length;Oe++){const Me=fe[pe],ye=fe[Oe],He=Me.start+Me.count,We=ce(ye.start,M.width,4),Ze=ce(Me.start,M.width,4);ye.start<=He+1&&We===Ze&&ce(ye.start+ye.count-1,M.width,4)===We?Me.count=Math.max(Me.count,ye.start+ye.count-Me.start):(++pe,fe[pe]=ye)}fe.length=pe+1;const Q=n.getParameter(t.UNPACK_ROW_LENGTH),ne=n.getParameter(t.UNPACK_SKIP_PIXELS),_e=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,M.width);for(let Oe=0,Me=fe.length;Oe<Me;Oe++){const ye=fe[Oe],He=Math.floor(ye.start/4),We=Math.ceil(ye.count/4),Ze=He%M.width,O=Math.floor(He/M.width),ge=We,te=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ze),n.pixelStorei(t.UNPACK_SKIP_ROWS,O),n.texSubImage2D(t.TEXTURE_2D,0,Ze,O,ge,te,V,j,M.data)}P.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,Q),n.pixelStorei(t.UNPACK_SKIP_PIXELS,ne),n.pixelStorei(t.UNPACK_SKIP_ROWS,_e)}}function he(P,M,V){let j=t.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(j=t.TEXTURE_2D_ARRAY),M.isData3DTexture&&(j=t.TEXTURE_3D);const Z=J(P,M),fe=M.source;n.bindTexture(j,P.__webglTexture,t.TEXTURE0+V);const pe=i.get(fe);if(fe.version!==pe.__version||Z===!0){if(n.activeTexture(t.TEXTURE0+V),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const te=at.getPrimaries(at.workingColorSpace),Se=M.colorSpace===pr?null:at.getPrimaries(M.colorSpace),be=M.colorSpace===pr||te===Se?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,be)}n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment);let ne=m(M.image,!1,r.maxTextureSize);ne=dt(M,ne);const _e=s.convert(M.format,M.colorSpace),Oe=s.convert(M.type);let Me=y(M.internalFormat,_e,Oe,M.normalized,M.colorSpace,M.isVideoTexture);Ge(j,M);let ye;const He=M.mipmaps,We=M.isVideoTexture!==!0,Ze=pe.__version===void 0||Z===!0,O=fe.dataReady,ge=E(M,ne);if(M.isDepthTexture)Me=w(M.format===Jr,M.type),Ze&&(We?n.texStorage2D(t.TEXTURE_2D,1,Me,ne.width,ne.height):n.texImage2D(t.TEXTURE_2D,0,Me,ne.width,ne.height,0,_e,Oe,null));else if(M.isDataTexture)if(He.length>0){We&&Ze&&n.texStorage2D(t.TEXTURE_2D,ge,Me,He[0].width,He[0].height);for(let te=0,Se=He.length;te<Se;te++)ye=He[te],We?O&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ye.width,ye.height,_e,Oe,ye.data):n.texImage2D(t.TEXTURE_2D,te,Me,ye.width,ye.height,0,_e,Oe,ye.data);M.generateMipmaps=!1}else We?(Ze&&n.texStorage2D(t.TEXTURE_2D,ge,Me,ne.width,ne.height),O&&ae(M,ne,_e,Oe)):n.texImage2D(t.TEXTURE_2D,0,Me,ne.width,ne.height,0,_e,Oe,ne.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){We&&Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,Me,He[0].width,He[0].height,ne.depth);for(let te=0,Se=He.length;te<Se;te++)if(ye=He[te],M.format!==oi)if(_e!==null)if(We){if(O)if(M.layerUpdates.size>0){const be=ov(ye.width,ye.height,M.format,M.type);for(const re of M.layerUpdates){const Ue=ye.data.subarray(re*be/ye.data.BYTES_PER_ELEMENT,(re+1)*be/ye.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,re,ye.width,ye.height,1,_e,Ue)}M.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,ye.width,ye.height,ne.depth,_e,ye.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,te,Me,ye.width,ye.height,ne.depth,0,ye.data,0,0);else Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else We?O&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,ye.width,ye.height,ne.depth,_e,Oe,ye.data):n.texImage3D(t.TEXTURE_2D_ARRAY,te,Me,ye.width,ye.height,ne.depth,0,_e,Oe,ye.data)}else{We&&Ze&&n.texStorage2D(t.TEXTURE_2D,ge,Me,He[0].width,He[0].height);for(let te=0,Se=He.length;te<Se;te++)ye=He[te],M.format!==oi?_e!==null?We?O&&n.compressedTexSubImage2D(t.TEXTURE_2D,te,0,0,ye.width,ye.height,_e,ye.data):n.compressedTexImage2D(t.TEXTURE_2D,te,Me,ye.width,ye.height,0,ye.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):We?O&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ye.width,ye.height,_e,Oe,ye.data):n.texImage2D(t.TEXTURE_2D,te,Me,ye.width,ye.height,0,_e,Oe,ye.data)}else if(M.isDataArrayTexture)if(We){if(Ze&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,Me,ne.width,ne.height,ne.depth),O)if(M.layerUpdates.size>0){const te=ov(ne.width,ne.height,M.format,M.type);for(const Se of M.layerUpdates){const be=ne.data.subarray(Se*te/ne.data.BYTES_PER_ELEMENT,(Se+1)*te/ne.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Se,ne.width,ne.height,1,_e,Oe,be)}M.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(M.isData3DTexture)We?(Ze&&n.texStorage3D(t.TEXTURE_3D,ge,Me,ne.width,ne.height,ne.depth),O&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,ne.width,ne.height,ne.depth,_e,Oe,ne.data)):n.texImage3D(t.TEXTURE_3D,0,Me,ne.width,ne.height,ne.depth,0,_e,Oe,ne.data);else if(M.isFramebufferTexture){if(Ze)if(We)n.texStorage2D(t.TEXTURE_2D,ge,Me,ne.width,ne.height);else{let te=ne.width,Se=ne.height;for(let be=0;be<ge;be++)n.texImage2D(t.TEXTURE_2D,be,Me,te,Se,0,_e,Oe,null),te>>=1,Se>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in t){const te=t.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),ne.parentNode!==te){te.appendChild(ne),f.add(M),te.onpaint=Se=>{const be=Se.changedElements;for(const re of f)be.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,ne);else{const be=t.RGBA,re=t.RGBA,Ue=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,be,re,Ue,ne)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(He.length>0){if(We&&Ze){const te=st(He[0]);n.texStorage2D(t.TEXTURE_2D,ge,Me,te.width,te.height)}for(let te=0,Se=He.length;te<Se;te++)ye=He[te],We?O&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,_e,Oe,ye):n.texImage2D(t.TEXTURE_2D,te,Me,_e,Oe,ye);M.generateMipmaps=!1}else if(We){if(Ze){const te=st(ne);n.texStorage2D(t.TEXTURE_2D,ge,Me,te.width,te.height)}O&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,Oe,ne)}else n.texImage2D(t.TEXTURE_2D,0,Me,_e,Oe,ne);h(M)&&v(j),pe.__version=fe.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Fe(P,M,V){if(M.image.length!==6)return;const j=J(P,M),Z=M.source;n.bindTexture(t.TEXTURE_CUBE_MAP,P.__webglTexture,t.TEXTURE0+V);const fe=i.get(Z);if(Z.version!==fe.__version||j===!0){n.activeTexture(t.TEXTURE0+V);const pe=at.getPrimaries(at.workingColorSpace),Q=M.colorSpace===pr?null:at.getPrimaries(M.colorSpace),ne=M.colorSpace===pr||pe===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,M.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,M.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const _e=M.isCompressedTexture||M.image[0].isCompressedTexture,Oe=M.image[0]&&M.image[0].isDataTexture,Me=[];for(let re=0;re<6;re++)!_e&&!Oe?Me[re]=m(M.image[re],!0,r.maxCubemapSize):Me[re]=Oe?M.image[re].image:M.image[re],Me[re]=dt(M,Me[re]);const ye=Me[0],He=s.convert(M.format,M.colorSpace),We=s.convert(M.type),Ze=y(M.internalFormat,He,We,M.normalized,M.colorSpace),O=M.isVideoTexture!==!0,ge=fe.__version===void 0||j===!0,te=Z.dataReady;let Se=E(M,ye);Ge(t.TEXTURE_CUBE_MAP,M);let be;if(_e){O&&ge&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Se,Ze,ye.width,ye.height);for(let re=0;re<6;re++){be=Me[re].mipmaps;for(let Ue=0;Ue<be.length;Ue++){const Le=be[Ue];M.format!==oi?He!==null?O?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,He,Le.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,Ze,Le.width,Le.height,0,Le.data):Xe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,0,0,Le.width,Le.height,He,We,Le.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue,Ze,Le.width,Le.height,0,He,We,Le.data)}}}else{if(be=M.mipmaps,O&&ge){be.length>0&&Se++;const re=st(Me[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Se,Ze,re.width,re.height)}for(let re=0;re<6;re++)if(Oe){O?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,Me[re].width,Me[re].height,He,We,Me[re].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ze,Me[re].width,Me[re].height,0,He,We,Me[re].data);for(let Ue=0;Ue<be.length;Ue++){const Nt=be[Ue].image[re].image;O?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,Nt.width,Nt.height,He,We,Nt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,Ze,Nt.width,Nt.height,0,He,We,Nt.data)}}else{O?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,He,We,Me[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ze,He,We,Me[re]);for(let Ue=0;Ue<be.length;Ue++){const Le=be[Ue];O?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,0,0,He,We,Le.image[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Ue+1,Ze,He,We,Le.image[re])}}}h(M)&&v(t.TEXTURE_CUBE_MAP),fe.__version=Z.version,M.onUpdate&&M.onUpdate(M)}P.__version=M.version}function Ie(P,M,V,j,Z,fe){const pe=s.convert(V.format,V.colorSpace),Q=s.convert(V.type),ne=y(V.internalFormat,pe,Q,V.normalized,V.colorSpace),_e=i.get(M),Oe=i.get(V);if(Oe.__renderTarget=M,!_e.__hasExternalTextures){const Me=Math.max(1,M.width>>fe),ye=Math.max(1,M.height>>fe);Z===t.TEXTURE_3D||Z===t.TEXTURE_2D_ARRAY?n.texImage3D(Z,fe,ne,Me,ye,M.depth,0,pe,Q,null):n.texImage2D(Z,fe,ne,Me,ye,0,pe,Q,null)}n.bindFramebuffer(t.FRAMEBUFFER,P),$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,Z,Oe.__webglTexture,0,qe(M)):(Z===t.TEXTURE_2D||Z>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,j,Z,Oe.__webglTexture,fe),n.bindFramebuffer(t.FRAMEBUFFER,null)}function it(P,M,V){if(t.bindRenderbuffer(t.RENDERBUFFER,P),M.depthBuffer){const j=M.depthTexture,Z=j&&j.isDepthTexture?j.type:null,fe=w(M.stencilBuffer,Z),pe=M.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;$e(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,qe(M),fe,M.width,M.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,qe(M),fe,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,fe,M.width,M.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,pe,t.RENDERBUFFER,P)}else{const j=M.textures;for(let Z=0;Z<j.length;Z++){const fe=j[Z],pe=s.convert(fe.format,fe.colorSpace),Q=s.convert(fe.type),ne=y(fe.internalFormat,pe,Q,fe.normalized,fe.colorSpace);$e(M)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,qe(M),ne,M.width,M.height):V?t.renderbufferStorageMultisample(t.RENDERBUFFER,qe(M),ne,M.width,M.height):t.renderbufferStorage(t.RENDERBUFFER,ne,M.width,M.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function je(P,M,V){const j=M.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,P),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(M.depthTexture);if(Z.__renderTarget=M,(!Z.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),j){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,M.depthTexture.addEventListener("dispose",A)),Z.__webglTexture===void 0){Z.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),Ge(t.TEXTURE_CUBE_MAP,M.depthTexture);const _e=s.convert(M.depthTexture.format),Oe=s.convert(M.depthTexture.type);let Me;M.depthTexture.format===Zi?Me=t.DEPTH_COMPONENT24:M.depthTexture.format===Jr&&(Me=t.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Me,M.width,M.height,0,_e,Oe,null)}}else I(M.depthTexture,0);const fe=Z.__webglTexture,pe=qe(M),Q=j?t.TEXTURE_CUBE_MAP_POSITIVE_X+V:t.TEXTURE_2D,ne=M.depthTexture.format===Jr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(M.depthTexture.format===Zi)$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,Q,fe,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,ne,Q,fe,0);else if(M.depthTexture.format===Jr)$e(M)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,ne,Q,fe,0,pe):t.framebufferTexture2D(t.FRAMEBUFFER,ne,Q,fe,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(P){const M=i.get(P),V=P.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==P.depthTexture){const j=P.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),j){const Z=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,j.removeEventListener("dispose",Z)};j.addEventListener("dispose",Z),M.__depthDisposeCallback=Z}M.__boundDepthTexture=j}if(P.depthTexture&&!M.__autoAllocateDepthBuffer)if(V)for(let j=0;j<6;j++)je(M.__webglFramebuffer[j],P,j);else{const j=P.texture.mipmaps;j&&j.length>0?je(M.__webglFramebuffer[0],P,0):je(M.__webglFramebuffer,P,0)}else if(V){M.__webglDepthbuffer=[];for(let j=0;j<6;j++)if(n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[j]),M.__webglDepthbuffer[j]===void 0)M.__webglDepthbuffer[j]=t.createRenderbuffer(),it(M.__webglDepthbuffer[j],P,!1);else{const Z=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=M.__webglDepthbuffer[j];t.bindRenderbuffer(t.RENDERBUFFER,fe),t.framebufferRenderbuffer(t.FRAMEBUFFER,Z,t.RENDERBUFFER,fe)}}else{const j=P.texture.mipmaps;if(j&&j.length>0?n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=t.createRenderbuffer(),it(M.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,fe=M.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,fe),t.framebufferRenderbuffer(t.FRAMEBUFFER,Z,t.RENDERBUFFER,fe)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function oe(P,M,V){const j=i.get(P);M!==void 0&&Ie(j.__webglFramebuffer,P,P.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),V!==void 0&&ie(P)}function se(P){const M=P.texture,V=i.get(P),j=i.get(M);P.addEventListener("dispose",x);const Z=P.textures,fe=P.isWebGLCubeRenderTarget===!0,pe=Z.length>1;if(pe||(j.__webglTexture===void 0&&(j.__webglTexture=t.createTexture()),j.__version=M.version,o.memory.textures++),fe){V.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer[Q]=[];for(let ne=0;ne<M.mipmaps.length;ne++)V.__webglFramebuffer[Q][ne]=t.createFramebuffer()}else V.__webglFramebuffer[Q]=t.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){V.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)V.__webglFramebuffer[Q]=t.createFramebuffer()}else V.__webglFramebuffer=t.createFramebuffer();if(pe)for(let Q=0,ne=Z.length;Q<ne;Q++){const _e=i.get(Z[Q]);_e.__webglTexture===void 0&&(_e.__webglTexture=t.createTexture(),o.memory.textures++)}if(P.samples>0&&$e(P)===!1){V.__webglMultisampledFramebuffer=t.createFramebuffer(),V.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,V.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const ne=Z[Q];V.__webglColorRenderbuffer[Q]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,V.__webglColorRenderbuffer[Q]);const _e=s.convert(ne.format,ne.colorSpace),Oe=s.convert(ne.type),Me=y(ne.internalFormat,_e,Oe,ne.normalized,ne.colorSpace,P.isXRRenderTarget===!0),ye=qe(P);t.renderbufferStorageMultisample(t.RENDERBUFFER,ye,Me,P.width,P.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,V.__webglColorRenderbuffer[Q])}t.bindRenderbuffer(t.RENDERBUFFER,null),P.depthBuffer&&(V.__webglDepthRenderbuffer=t.createRenderbuffer(),it(V.__webglDepthRenderbuffer,P,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(fe){n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),Ge(t.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps&&M.mipmaps.length>0)for(let ne=0;ne<M.mipmaps.length;ne++)Ie(V.__webglFramebuffer[Q][ne],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ne);else Ie(V.__webglFramebuffer[Q],P,M,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);h(M)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(pe){for(let Q=0,ne=Z.length;Q<ne;Q++){const _e=Z[Q],Oe=i.get(_e);let Me=t.TEXTURE_2D;(P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Me=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Me,Oe.__webglTexture),Ge(Me,_e),Ie(V.__webglFramebuffer,P,_e,t.COLOR_ATTACHMENT0+Q,Me,0),h(_e)&&v(Me)}n.unbindTexture()}else{let Q=t.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Q=P.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Q,j.__webglTexture),Ge(Q,M),M.mipmaps&&M.mipmaps.length>0)for(let ne=0;ne<M.mipmaps.length;ne++)Ie(V.__webglFramebuffer[ne],P,M,t.COLOR_ATTACHMENT0,Q,ne);else Ie(V.__webglFramebuffer,P,M,t.COLOR_ATTACHMENT0,Q,0);h(M)&&v(Q),n.unbindTexture()}P.depthBuffer&&ie(P)}function ve(P){const M=P.textures;for(let V=0,j=M.length;V<j;V++){const Z=M[V];if(h(Z)){const fe=_(P),pe=i.get(Z).__webglTexture;n.bindTexture(fe,pe),v(fe),n.unbindTexture()}}}const me=[],ze=[];function Ne(P){if(P.samples>0){if($e(P)===!1){const M=P.textures,V=P.width,j=P.height;let Z=t.COLOR_BUFFER_BIT;const fe=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,pe=i.get(P),Q=M.length>1;if(Q)for(let _e=0;_e<M.length;_e++)n.bindFramebuffer(t.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,pe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);const ne=P.texture.mipmaps;ne&&ne.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let _e=0;_e<M.length;_e++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(Z|=t.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(Z|=t.STENCIL_BUFFER_BIT)),Q){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]);const Oe=i.get(M[_e]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Oe,0)}t.blitFramebuffer(0,0,V,j,0,0,V,j,Z,t.NEAREST),l===!0&&(me.length=0,ze.length=0,me.push(t.COLOR_ATTACHMENT0+_e),P.depthBuffer&&P.resolveDepthBuffer===!1&&(me.push(fe),ze.push(fe),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,ze)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,me))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Q)for(let _e=0;_e<M.length;_e++){n.bindFramebuffer(t.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.RENDERBUFFER,pe.__webglColorRenderbuffer[_e]);const Oe=i.get(M[_e]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,pe.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+_e,t.TEXTURE_2D,Oe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const M=P.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[M])}}}function qe(P){return Math.min(r.maxSamples,P.samples)}function $e(P){const M=i.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function L(P){const M=o.render.frame;u.get(P)!==M&&(u.set(P,M),P.update())}function dt(P,M){const V=P.colorSpace,j=P.format,Z=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||V!==Qc&&V!==pr&&(at.getTransfer(V)===ht?(j!==oi||Z!==In)&&Xe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",V)),M}function st(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=k,this.resetTextureUnits=H,this.getTextureUnits=q,this.setTextureUnits=D,this.setTexture2D=I,this.setTexture2DArray=W,this.setTexture3D=$,this.setTextureCube=ee,this.rebindTextures=oe,this.setupRenderTarget=se,this.updateRenderTargetMipmap=ve,this.updateMultisampleRenderTarget=Ne,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=$e,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function LN(t,e){function n(i,r=pr){let s;const o=at.getTransfer(r);if(i===In)return t.UNSIGNED_BYTE;if(i===um)return t.UNSIGNED_SHORT_4_4_4_4;if(i===dm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===eS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===tS)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Jy)return t.BYTE;if(i===Qy)return t.SHORT;if(i===za)return t.UNSIGNED_SHORT;if(i===cm)return t.INT;if(i===Ri)return t.UNSIGNED_INT;if(i===si)return t.FLOAT;if(i===Ki)return t.HALF_FLOAT;if(i===nS)return t.ALPHA;if(i===iS)return t.RGB;if(i===oi)return t.RGBA;if(i===Zi)return t.DEPTH_COMPONENT;if(i===Jr)return t.DEPTH_STENCIL;if(i===fm)return t.RED;if(i===hm)return t.RED_INTEGER;if(i===cs)return t.RG;if(i===pm)return t.RG_INTEGER;if(i===mm)return t.RGBA_INTEGER;if(i===gc||i===vc||i===xc||i===_c)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===gc)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===vc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===xc)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===_c)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===gc)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===vc)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===xc)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===_c)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===mh||i===gh||i===vh||i===xh)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===mh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xh)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===_h||i===yh||i===Sh||i===Mh||i===Eh||i===Kc||i===wh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===_h||i===yh)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Sh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Mh)return s.COMPRESSED_R11_EAC;if(i===Eh)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Kc)return s.COMPRESSED_RG11_EAC;if(i===wh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Th||i===bh||i===Ah||i===Ch||i===Rh||i===Ph||i===Nh||i===Lh||i===Dh||i===Ih||i===Uh||i===Fh||i===Oh||i===kh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Th)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===bh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ah)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ch)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ph)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Nh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Lh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Dh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ih)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Uh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Fh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Oh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kh)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Bh||i===zh||i===Vh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Bh)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===zh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Vh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hh||i===Gh||i===Zc||i===Wh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Hh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Gh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zc)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Wh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Va?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const DN=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,IN=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class UN{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new mS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Pi({vertexShader:DN,fragmentShader:IN,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new et(new fs(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class FN extends vs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,f=null,d=null,p=null,g=null;const S=typeof XRWebGLBinding<"u",m=new UN,h={},v=n.getContextAttributes();let _=null,y=null;const w=[],E=[],A=new xe;let x=null;const b=new Dn;b.viewport=new At;const R=new Dn;R.viewport=new At;const N=[b,R],U=new X2;let H=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(J){let ce=w[J];return ce===void 0&&(ce=new vd,w[J]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(J){let ce=w[J];return ce===void 0&&(ce=new vd,w[J]=ce),ce.getGripSpace()},this.getHand=function(J){let ce=w[J];return ce===void 0&&(ce=new vd,w[J]=ce),ce.getHandSpace()};function D(J){const ce=E.indexOf(J.inputSource);if(ce===-1)return;const ae=w[ce];ae!==void 0&&(ae.update(J.inputSource,J.frame,c||o),ae.dispatchEvent({type:J.type,data:J.inputSource}))}function k(){r.removeEventListener("select",D),r.removeEventListener("selectstart",D),r.removeEventListener("selectend",D),r.removeEventListener("squeeze",D),r.removeEventListener("squeezestart",D),r.removeEventListener("squeezeend",D),r.removeEventListener("end",k),r.removeEventListener("inputsourceschange",B);for(let J=0;J<w.length;J++){const ce=E[J];ce!==null&&(E[J]=null,w[J].disconnect(ce))}H=null,q=null,m.reset();for(const J in h)delete h[J];e.setRenderTarget(_),p=null,d=null,f=null,r=null,y=null,Ge.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(J){s=J,i.isPresenting===!0&&Xe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(J){a=J,i.isPresenting===!0&&Xe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(J){c=J},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(J){if(r=J,r!==null){if(_=e.getRenderTarget(),r.addEventListener("select",D),r.addEventListener("selectstart",D),r.addEventListener("selectend",D),r.addEventListener("squeeze",D),r.addEventListener("squeezestart",D),r.addEventListener("squeezeend",D),r.addEventListener("end",k),r.addEventListener("inputsourceschange",B),v.xrCompatible!==!0&&await n.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,he=null,Fe=null;v.depth&&(Fe=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ae=v.stencil?Jr:Zi,he=v.stencil?Va:Ri);const Ie={colorFormat:n.RGBA8,depthFormat:Fe,scaleFactor:s};f=this.getBinding(),d=f.createProjectionLayer(Ie),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ci(d.textureWidth,d.textureHeight,{format:oi,type:In,depthTexture:new yo(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const ae={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ae),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new Ci(p.framebufferWidth,p.framebufferHeight,{format:oi,type:In,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Ge.setContext(r),Ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function B(J){for(let ce=0;ce<J.removed.length;ce++){const ae=J.removed[ce],he=E.indexOf(ae);he>=0&&(E[he]=null,w[he].disconnect(ae))}for(let ce=0;ce<J.added.length;ce++){const ae=J.added[ce];let he=E.indexOf(ae);if(he===-1){for(let Ie=0;Ie<w.length;Ie++)if(Ie>=E.length){E.push(ae),he=Ie;break}else if(E[Ie]===null){E[Ie]=ae,he=Ie;break}if(he===-1)break}const Fe=w[he];Fe&&Fe.connect(ae)}}const I=new F,W=new F;function $(J,ce,ae){I.setFromMatrixPosition(ce.matrixWorld),W.setFromMatrixPosition(ae.matrixWorld);const he=I.distanceTo(W),Fe=ce.projectionMatrix.elements,Ie=ae.projectionMatrix.elements,it=Fe[14]/(Fe[10]-1),je=Fe[14]/(Fe[10]+1),ie=(Fe[9]+1)/Fe[5],oe=(Fe[9]-1)/Fe[5],se=(Fe[8]-1)/Fe[0],ve=(Ie[8]+1)/Ie[0],me=it*se,ze=it*ve,Ne=he/(-se+ve),qe=Ne*-se;if(ce.matrixWorld.decompose(J.position,J.quaternion,J.scale),J.translateX(qe),J.translateZ(Ne),J.matrixWorld.compose(J.position,J.quaternion,J.scale),J.matrixWorldInverse.copy(J.matrixWorld).invert(),Fe[10]===-1)J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const $e=it+Ne,L=je+Ne,dt=me-qe,st=ze+(he-qe),P=ie*je/L*$e,M=oe*je/L*$e;J.projectionMatrix.makePerspective(dt,st,P,M,$e,L),J.projectionMatrixInverse.copy(J.projectionMatrix).invert()}}function ee(J,ce){ce===null?J.matrixWorld.copy(J.matrix):J.matrixWorld.multiplyMatrices(ce.matrixWorld,J.matrix),J.matrixWorldInverse.copy(J.matrixWorld).invert()}this.updateCamera=function(J){if(r===null)return;let ce=J.near,ae=J.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&(ae=m.depthFar)),U.near=R.near=b.near=ce,U.far=R.far=b.far=ae,(H!==U.near||q!==U.far)&&(r.updateRenderState({depthNear:U.near,depthFar:U.far}),H=U.near,q=U.far),U.layers.mask=J.layers.mask|6,b.layers.mask=U.layers.mask&-5,R.layers.mask=U.layers.mask&-3;const he=J.parent,Fe=U.cameras;ee(U,he);for(let Ie=0;Ie<Fe.length;Ie++)ee(Fe[Ie],he);Fe.length===2?$(U,b,R):U.projectionMatrix.copy(b.projectionMatrix),le(J,U,he)};function le(J,ce,ae){ae===null?J.matrix.copy(ce.matrixWorld):(J.matrix.copy(ae.matrixWorld),J.matrix.invert(),J.matrix.multiply(ce.matrixWorld)),J.matrix.decompose(J.position,J.quaternion,J.scale),J.updateMatrixWorld(!0),J.projectionMatrix.copy(ce.projectionMatrix),J.projectionMatrixInverse.copy(ce.projectionMatrixInverse),J.isPerspectiveCamera&&(J.fov=Ga*2*Math.atan(1/J.projectionMatrix.elements[5]),J.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(J){l=J,d!==null&&(d.fixedFoveation=J),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=J)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(U)},this.getCameraTexture=function(J){return h[J]};let Ye=null;function Pe(J,ce){if(u=ce.getViewerPose(c||o),g=ce,u!==null){const ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let he=!1;ae.length!==U.cameras.length&&(U.cameras.length=0,he=!0);for(let je=0;je<ae.length;je++){const ie=ae[je];let oe=null;if(p!==null)oe=p.getViewport(ie);else{const ve=f.getViewSubImage(d,ie);oe=ve.viewport,je===0&&(e.setRenderTargetTextures(y,ve.colorTexture,ve.depthStencilTexture),e.setRenderTarget(y))}let se=N[je];se===void 0&&(se=new Dn,se.layers.enable(je),se.viewport=new At,N[je]=se),se.matrix.fromArray(ie.transform.matrix),se.matrix.decompose(se.position,se.quaternion,se.scale),se.projectionMatrix.fromArray(ie.projectionMatrix),se.projectionMatrixInverse.copy(se.projectionMatrix).invert(),se.viewport.set(oe.x,oe.y,oe.width,oe.height),je===0&&(U.matrix.copy(se.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),he===!0&&U.cameras.push(se)}const Fe=r.enabledFeatures;if(Fe&&Fe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const je=f.getDepthInformation(ae[0]);je&&je.isValid&&je.texture&&m.init(je,r.renderState)}if(Fe&&Fe.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let je=0;je<ae.length;je++){const ie=ae[je].camera;if(ie){let oe=h[ie];oe||(oe=new mS,h[ie]=oe);const se=f.getCameraImage(ie);oe.sourceTexture=se}}}}for(let ae=0;ae<w.length;ae++){const he=E[ae],Fe=w[ae];he!==null&&Fe!==void 0&&Fe.update(he,ce,c||o)}Ye&&Ye(J,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),g=null}const Ge=new RS;Ge.setAnimationLoop(Pe),this.setAnimationLoop=function(J){Ye=J},this.dispose=function(){}}}const ON=new ft,FS=new Ke;FS.set(-1,0,0,0,1,0,0,0,1);function kN(t,e){function n(m,h){m.matrixAutoUpdate===!0&&m.updateMatrix(),h.value.copy(m.matrix)}function i(m,h){h.color.getRGB(m.fogColor.value,TS(t)),h.isFog?(m.fogNear.value=h.near,m.fogFar.value=h.far):h.isFogExp2&&(m.fogDensity.value=h.density)}function r(m,h,v,_,y){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(m,h):h.isMeshLambertMaterial?(s(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(m,h),f(m,h)):h.isMeshPhongMaterial?(s(m,h),u(m,h),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(m,h),d(m,h),h.isMeshPhysicalMaterial&&p(m,h,y)):h.isMeshMatcapMaterial?(s(m,h),g(m,h)):h.isMeshDepthMaterial?s(m,h):h.isMeshDistanceMaterial?(s(m,h),S(m,h)):h.isMeshNormalMaterial?s(m,h):h.isLineBasicMaterial?(o(m,h),h.isLineDashedMaterial&&a(m,h)):h.isPointsMaterial?l(m,h,v,_):h.isSpriteMaterial?c(m,h):h.isShadowMaterial?(m.color.value.copy(h.color),m.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(m,h){m.opacity.value=h.opacity,h.color&&m.diffuse.value.copy(h.color),h.emissive&&m.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.bumpMap&&(m.bumpMap.value=h.bumpMap,n(h.bumpMap,m.bumpMapTransform),m.bumpScale.value=h.bumpScale,h.side===vn&&(m.bumpScale.value*=-1)),h.normalMap&&(m.normalMap.value=h.normalMap,n(h.normalMap,m.normalMapTransform),m.normalScale.value.copy(h.normalScale),h.side===vn&&m.normalScale.value.negate()),h.displacementMap&&(m.displacementMap.value=h.displacementMap,n(h.displacementMap,m.displacementMapTransform),m.displacementScale.value=h.displacementScale,m.displacementBias.value=h.displacementBias),h.emissiveMap&&(m.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,m.emissiveMapTransform)),h.specularMap&&(m.specularMap.value=h.specularMap,n(h.specularMap,m.specularMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest);const v=e.get(h),_=v.envMap,y=v.envMapRotation;_&&(m.envMap.value=_,m.envMapRotation.value.setFromMatrix4(ON.makeRotationFromEuler(y)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(FS),m.reflectivity.value=h.reflectivity,m.ior.value=h.ior,m.refractionRatio.value=h.refractionRatio),h.lightMap&&(m.lightMap.value=h.lightMap,m.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,m.lightMapTransform)),h.aoMap&&(m.aoMap.value=h.aoMap,m.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,m.aoMapTransform))}function o(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform))}function a(m,h){m.dashSize.value=h.dashSize,m.totalSize.value=h.dashSize+h.gapSize,m.scale.value=h.scale}function l(m,h,v,_){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.size.value=h.size*v,m.scale.value=_*.5,h.map&&(m.map.value=h.map,n(h.map,m.uvTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function c(m,h){m.diffuse.value.copy(h.color),m.opacity.value=h.opacity,m.rotation.value=h.rotation,h.map&&(m.map.value=h.map,n(h.map,m.mapTransform)),h.alphaMap&&(m.alphaMap.value=h.alphaMap,n(h.alphaMap,m.alphaMapTransform)),h.alphaTest>0&&(m.alphaTest.value=h.alphaTest)}function u(m,h){m.specular.value.copy(h.specular),m.shininess.value=Math.max(h.shininess,1e-4)}function f(m,h){h.gradientMap&&(m.gradientMap.value=h.gradientMap)}function d(m,h){m.metalness.value=h.metalness,h.metalnessMap&&(m.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,m.metalnessMapTransform)),m.roughness.value=h.roughness,h.roughnessMap&&(m.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,m.roughnessMapTransform)),h.envMap&&(m.envMapIntensity.value=h.envMapIntensity)}function p(m,h,v){m.ior.value=h.ior,h.sheen>0&&(m.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),m.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(m.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,m.sheenColorMapTransform)),h.sheenRoughnessMap&&(m.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,m.sheenRoughnessMapTransform))),h.clearcoat>0&&(m.clearcoat.value=h.clearcoat,m.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(m.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,m.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(m.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===vn&&m.clearcoatNormalScale.value.negate())),h.dispersion>0&&(m.dispersion.value=h.dispersion),h.iridescence>0&&(m.iridescence.value=h.iridescence,m.iridescenceIOR.value=h.iridescenceIOR,m.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(m.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,m.iridescenceMapTransform)),h.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),h.transmission>0&&(m.transmission.value=h.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(m.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,m.transmissionMapTransform)),m.thickness.value=h.thickness,h.thicknessMap&&(m.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=h.attenuationDistance,m.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(m.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(m.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=h.specularIntensity,m.specularColor.value.copy(h.specularColor),h.specularColorMap&&(m.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,m.specularColorMapTransform)),h.specularIntensityMap&&(m.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,h){h.matcap&&(m.matcap.value=h.matcap)}function S(m,h){const v=e.get(h).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function BN(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,w){const E=w.program;i.uniformBlockBinding(y,E)}function c(y,w){let E=r[y.id];E===void 0&&(m(y),E=u(y),r[y.id]=E,y.addEventListener("dispose",v));const A=w.program;i.updateUBOMapping(y,A);const x=e.render.frame;s[y.id]!==x&&(d(y),s[y.id]=x)}function u(y){const w=f();y.__bindingPointIndex=w;const E=t.createBuffer(),A=y.__size,x=y.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,A,x),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,E),E}function f(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const w=r[y.id],E=y.uniforms,A=y.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let x=0,b=E.length;x<b;x++){const R=E[x];if(Array.isArray(R))for(let N=0,U=R.length;N<U;N++)p(R[N],x,N,A);else p(R,x,0,A)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(y,w,E,A){if(S(y,w,E,A)===!0){const x=y.__offset,b=y.value;if(Array.isArray(b)){let R=0;for(let N=0;N<b.length;N++){const U=b[N],H=h(U);g(U,y.__data,R),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(R+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(b,y.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,x,y.__data)}}function g(y,w,E){typeof y=="number"||typeof y=="boolean"?w[0]=y:y.isMatrix3?(w[0]=y.elements[0],w[1]=y.elements[1],w[2]=y.elements[2],w[3]=0,w[4]=y.elements[3],w[5]=y.elements[4],w[6]=y.elements[5],w[7]=0,w[8]=y.elements[6],w[9]=y.elements[7],w[10]=y.elements[8],w[11]=0):ArrayBuffer.isView(y)?w.set(new y.constructor(y.buffer,y.byteOffset,w.length)):y.toArray(w,E)}function S(y,w,E,A){const x=y.value,b=w+"_"+E;if(A[b]===void 0)return typeof x=="number"||typeof x=="boolean"?A[b]=x:ArrayBuffer.isView(x)?A[b]=x.slice():A[b]=x.clone(),!0;{const R=A[b];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return A[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function m(y){const w=y.uniforms;let E=0;const A=16;for(let b=0,R=w.length;b<R;b++){const N=Array.isArray(w[b])?w[b]:[w[b]];for(let U=0,H=N.length;U<H;U++){const q=N[U],D=Array.isArray(q.value)?q.value:[q.value];for(let k=0,B=D.length;k<B;k++){const I=D[k],W=h(I),$=E%A,ee=$%W.boundary,le=$+ee;E+=ee,le!==0&&A-le<W.storage&&(E+=A-le),q.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=E,E+=W.storage}}}const x=E%A;return x>0&&(E+=A-x),y.__size=E,y.__cache={},this}function h(y){const w={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(w.boundary=4,w.storage=4):y.isVector2?(w.boundary=8,w.storage=8):y.isVector3||y.isColor?(w.boundary=16,w.storage=12):y.isVector4?(w.boundary=16,w.storage=16):y.isMatrix3?(w.boundary=48,w.storage=48):y.isMatrix4?(w.boundary=64,w.storage=64):y.isTexture?Xe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(w.boundary=16,w.storage=y.byteLength):Xe("WebGLRenderer: Unsupported uniform value type.",y),w}function v(y){const w=y.target;w.removeEventListener("dispose",v);const E=o.indexOf(w.__bindingPointIndex);o.splice(E,1),t.deleteBuffer(r[w.id]),delete r[w.id],delete s[w.id]}function _(){for(const y in r)t.deleteBuffer(r[y]);o=[],r={},s={}}return{bind:l,update:c,dispose:_}}const zN=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _i=null;function VN(){return _i===null&&(_i=new fS(zN,16,16,cs,Ki),_i.name="DFG_LUT",_i.minFilter=un,_i.magFilter=un,_i.wrapS=Hi,_i.wrapT=Hi,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}class HN{constructor(e={}){const{canvas:n=cA(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:d=!1,outputBufferType:p=In}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=o;const S=p,m=new Set([mm,pm,hm]),h=new Set([In,Ri,za,Va,um,dm]),v=new Uint32Array(4),_=new Int32Array(4),y=new F;let w=null,E=null;const A=[],x=[];let b=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let N=!1,U=null,H=null,q=null,D=null;this._outputColorSpace=Sn;let k=0,B=0,I=null,W=-1,$=null;const ee=new At,le=new At;let Ye=null;const Pe=new Ve(0);let Ge=0,J=n.width,ce=n.height,ae=1,he=null,Fe=null;const Ie=new At(0,0,J,ce),it=new At(0,0,J,ce);let je=!1;const ie=new ym;let oe=!1,se=!1;const ve=new ft,me=new F,ze=new At,Ne={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function $e(){return I===null?ae:1}let L=i;function dt(T,z){return n.getContext(T,z)}try{const T={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${om}`),n.addEventListener("webglcontextlost",Nt,!1),n.addEventListener("webglcontextrestored",_t,!1),n.addEventListener("webglcontextcreationerror",hi,!1),L===null){const z="webgl2";if(L=dt(z,T),L===null)throw dt(z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(T){throw lt("WebGLRenderer: "+T.message),T}let st,P,M,V,j,Z,fe,pe,Q,ne,_e,Oe,Me,ye,He,We,Ze,O,ge,te,Se,be,re;function Ue(){st=new V3(L),st.init(),Se=new LN(L,st),P=new D3(L,st,e,Se),M=new PN(L,st),P.reversedDepthBuffer&&d&&M.buffers.depth.setReversed(!0),H=L.createFramebuffer(),q=L.createFramebuffer(),D=L.createFramebuffer(),V=new W3(L),j=new gN,Z=new NN(L,st,M,j,P,Se,V),fe=new z3(R),pe=new Y2(L),be=new N3(L,pe),Q=new H3(L,pe,V,be),ne=new j3(L,Q,pe,be,V),O=new X3(L,P,Z),He=new I3(j),_e=new mN(R,fe,st,P,be,He),Oe=new kN(R,j),Me=new xN,ye=new wN(st),Ze=new P3(R,fe,M,ne,g,l),We=new RN(R,ne,P),re=new BN(L,V,P,M),ge=new L3(L,st,V),te=new G3(L,st,V),V.programs=_e.programs,R.capabilities=P,R.extensions=st,R.properties=j,R.renderLists=Me,R.shadowMap=We,R.state=M,R.info=V}Ue(),S!==In&&(b=new Y3(S,n.width,n.height,a,r,s));const Le=new FN(R,L);this.xr=Le,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const T=st.get("WEBGL_lose_context");T&&T.loseContext()},this.forceContextRestore=function(){const T=st.get("WEBGL_lose_context");T&&T.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(T){T!==void 0&&(ae=T,this.setSize(J,ce,!1))},this.getSize=function(T){return T.set(J,ce)},this.setSize=function(T,z,Y=!0){if(Le.isPresenting){Xe("WebGLRenderer: Can't change size while VR device is presenting.");return}J=T,ce=z,n.width=Math.floor(T*ae),n.height=Math.floor(z*ae),Y===!0&&(n.style.width=T+"px",n.style.height=z+"px"),b!==null&&b.setSize(n.width,n.height),this.setViewport(0,0,T,z)},this.getDrawingBufferSize=function(T){return T.set(J*ae,ce*ae).floor()},this.setDrawingBufferSize=function(T,z,Y){J=T,ce=z,ae=Y,n.width=Math.floor(T*Y),n.height=Math.floor(z*Y),this.setViewport(0,0,T,z)},this.setEffects=function(T){if(S===In){lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(T){for(let z=0;z<T.length;z++)if(T[z].isOutputPass===!0){Xe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}b.setEffects(T||[])},this.getCurrentViewport=function(T){return T.copy(ee)},this.getViewport=function(T){return T.copy(Ie)},this.setViewport=function(T,z,Y,G){T.isVector4?Ie.set(T.x,T.y,T.z,T.w):Ie.set(T,z,Y,G),M.viewport(ee.copy(Ie).multiplyScalar(ae).round())},this.getScissor=function(T){return T.copy(it)},this.setScissor=function(T,z,Y,G){T.isVector4?it.set(T.x,T.y,T.z,T.w):it.set(T,z,Y,G),M.scissor(le.copy(it).multiplyScalar(ae).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(T){M.setScissorTest(je=T)},this.setOpaqueSort=function(T){he=T},this.setTransparentSort=function(T){Fe=T},this.getClearColor=function(T){return T.copy(Ze.getClearColor())},this.setClearColor=function(){Ze.setClearColor(...arguments)},this.getClearAlpha=function(){return Ze.getClearAlpha()},this.setClearAlpha=function(){Ze.setClearAlpha(...arguments)},this.clear=function(T=!0,z=!0,Y=!0){let G=0;if(T){let X=!1;if(I!==null){const Te=I.texture.format;X=m.has(Te)}if(X){const Te=I.texture.type,Ce=h.has(Te),we=Ze.getClearColor(),De=Ze.getClearAlpha(),ke=we.r,Je=we.g,nt=we.b;Ce?(v[0]=ke,v[1]=Je,v[2]=nt,v[3]=De,L.clearBufferuiv(L.COLOR,0,v)):(_[0]=ke,_[1]=Je,_[2]=nt,_[3]=De,L.clearBufferiv(L.COLOR,0,_))}else G|=L.COLOR_BUFFER_BIT}z&&(G|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Y&&(G|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),G!==0&&L.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(T){T.setRenderer(this),U=T},this.dispose=function(){n.removeEventListener("webglcontextlost",Nt,!1),n.removeEventListener("webglcontextrestored",_t,!1),n.removeEventListener("webglcontextcreationerror",hi,!1),Ze.dispose(),Me.dispose(),ye.dispose(),j.dispose(),fe.dispose(),ne.dispose(),be.dispose(),re.dispose(),_e.dispose(),Le.dispose(),Le.removeEventListener("sessionstart",Im),Le.removeEventListener("sessionend",Um),Fr.stop()};function Nt(T){T.preventDefault(),Ag("WebGLRenderer: Context Lost."),N=!0}function _t(){Ag("WebGLRenderer: Context Restored."),N=!1;const T=V.autoReset,z=We.enabled,Y=We.autoUpdate,G=We.needsUpdate,X=We.type;Ue(),V.autoReset=T,We.enabled=z,We.autoUpdate=Y,We.needsUpdate=G,We.type=X}function hi(T){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",T.statusMessage)}function pi(T){const z=T.target;z.removeEventListener("dispose",pi),BS(z)}function BS(T){zS(T),j.remove(T)}function zS(T){const z=j.get(T).programs;z!==void 0&&(z.forEach(function(Y){_e.releaseProgram(Y)}),T.isShaderMaterial&&_e.releaseShaderCache(T))}this.renderBufferDirect=function(T,z,Y,G,X,Te){z===null&&(z=Ne);const Ce=X.isMesh&&X.matrixWorld.determinantAffine()<0,we=GS(T,z,Y,G,X);M.setMaterial(G,Ce);let De=Y.index,ke=1;if(G.wireframe===!0){if(De=Q.getWireframeAttribute(Y),De===void 0)return;ke=2}const Je=Y.drawRange,nt=Y.attributes.position;let Be=Je.start*ke,mt=(Je.start+Je.count)*ke;Te!==null&&(Be=Math.max(Be,Te.start*ke),mt=Math.min(mt,(Te.start+Te.count)*ke)),De!==null?(Be=Math.max(Be,0),mt=Math.min(mt,De.count)):nt!=null&&(Be=Math.max(Be,0),mt=Math.min(mt,nt.count));const It=mt-Be;if(It<0||It===1/0)return;be.setup(X,G,we,Y,De);let Lt,vt=ge;if(De!==null&&(Lt=pe.get(De),vt=te,vt.setIndex(Lt)),X.isMesh)G.wireframe===!0?(M.setLineWidth(G.wireframeLinewidth*$e()),vt.setMode(L.LINES)):vt.setMode(L.TRIANGLES);else if(X.isLine){let nn=G.linewidth;nn===void 0&&(nn=1),M.setLineWidth(nn*$e()),X.isLineSegments?vt.setMode(L.LINES):X.isLineLoop?vt.setMode(L.LINE_LOOP):vt.setMode(L.LINE_STRIP)}else X.isPoints?vt.setMode(L.POINTS):X.isSprite&&vt.setMode(L.TRIANGLES);if(X.isBatchedMesh)if(st.get("WEBGL_multi_draw"))vt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const nn=X._multiDrawStarts,Ae=X._multiDrawCounts,Rn=X._multiDrawCount,ct=De?pe.get(De).bytesPerElement:1,Vn=j.get(G).currentProgram.getUniforms();for(let mi=0;mi<Rn;mi++)Vn.setValue(L,"_gl_DrawID",mi),vt.render(nn[mi]/ct,Ae[mi])}else if(X.isInstancedMesh)vt.renderInstances(Be,It,X.count);else if(Y.isInstancedBufferGeometry){const nn=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,Ae=Math.min(Y.instanceCount,nn);vt.renderInstances(Be,It,Ae)}else vt.render(Be,It)};function Dm(T,z,Y){T.transparent===!0&&T.side===Bi&&T.forceSinglePass===!1?(T.side=vn,T.needsUpdate=!0,il(T,z,Y),T.side=Pr,T.needsUpdate=!0,il(T,z,Y),T.side=Bi):il(T,z,Y)}this.compile=function(T,z,Y=null){Y===null&&(Y=T),E=ye.get(Y),E.init(z),x.push(E),Y.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),T!==Y&&T.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(E.pushLight(X),X.castShadow&&E.pushShadow(X))}),E.setupLights();const G=new Set;return T.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const Te=X.material;if(Te)if(Array.isArray(Te))for(let Ce=0;Ce<Te.length;Ce++){const we=Te[Ce];Dm(we,Y,X),G.add(we)}else Dm(Te,Y,X),G.add(Te)}),E=x.pop(),G},this.compileAsync=function(T,z,Y=null){const G=this.compile(T,z,Y);return new Promise(X=>{function Te(){if(G.forEach(function(Ce){j.get(Ce).currentProgram.isReady()&&G.delete(Ce)}),G.size===0){X(T);return}setTimeout(Te,10)}st.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Nu=null;function VS(T){Nu&&Nu(T)}function Im(){Fr.stop()}function Um(){Fr.start()}const Fr=new RS;Fr.setAnimationLoop(VS),typeof self<"u"&&Fr.setContext(self),this.setAnimationLoop=function(T){Nu=T,Le.setAnimationLoop(T),T===null?Fr.stop():Fr.start()},Le.addEventListener("sessionstart",Im),Le.addEventListener("sessionend",Um),this.render=function(T,z){if(z!==void 0&&z.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;U!==null&&U.renderStart(T,z);const Y=Le.enabled===!0&&Le.isPresenting===!0,G=b!==null&&(I===null||Y)&&b.begin(R,I);if(T.matrixWorldAutoUpdate===!0&&T.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Le.enabled===!0&&Le.isPresenting===!0&&(b===null||b.isCompositing()===!1)&&(Le.cameraAutoUpdate===!0&&Le.updateCamera(z),z=Le.getCamera()),T.isScene===!0&&T.onBeforeRender(R,T,z,I),E=ye.get(T,x.length),E.init(z),E.state.textureUnits=Z.getTextureUnits(),x.push(E),ve.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),ie.setFromProjectionMatrix(ve,wi,z.reversedDepth),se=this.localClippingEnabled,oe=He.init(this.clippingPlanes,se),w=Me.get(T,A.length),w.init(),A.push(w),Le.enabled===!0&&Le.isPresenting===!0){const Ce=R.xr.getDepthSensingMesh();Ce!==null&&Lu(Ce,z,-1/0,R.sortObjects)}Lu(T,z,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(he,Fe,z.reversedDepth),qe=Le.enabled===!1||Le.isPresenting===!1||Le.hasDepthSensing()===!1,qe&&Ze.addToRenderList(w,T),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),oe===!0&&He.beginShadows();const X=E.state.shadowsArray;if(We.render(X,T,z),oe===!0&&He.endShadows(),(G&&b.hasRenderPass())===!1){const Ce=w.opaque,we=w.transmissive;if(E.setupLights(),z.isArrayCamera){const De=z.cameras;if(we.length>0)for(let ke=0,Je=De.length;ke<Je;ke++){const nt=De[ke];Om(Ce,we,T,nt)}qe&&Ze.render(T);for(let ke=0,Je=De.length;ke<Je;ke++){const nt=De[ke];Fm(w,T,nt,nt.viewport)}}else we.length>0&&Om(Ce,we,T,z),qe&&Ze.render(T),Fm(w,T,z)}I!==null&&B===0&&(Z.updateMultisampleRenderTarget(I),Z.updateRenderTargetMipmap(I)),G&&b.end(R),T.isScene===!0&&T.onAfterRender(R,T,z),be.resetDefaultState(),W=-1,$=null,x.pop(),x.length>0?(E=x[x.length-1],Z.setTextureUnits(E.state.textureUnits),oe===!0&&He.setGlobalState(R.clippingPlanes,E.state.camera)):E=null,A.pop(),A.length>0?w=A[A.length-1]:w=null,U!==null&&U.renderEnd()};function Lu(T,z,Y,G){if(T.visible===!1)return;if(T.layers.test(z.layers)){if(T.isGroup)Y=T.renderOrder;else if(T.isLOD)T.autoUpdate===!0&&T.update(z);else if(T.isLightProbeGrid)E.pushLightProbeGrid(T);else if(T.isLight)E.pushLight(T),T.castShadow&&E.pushShadow(T);else if(T.isSprite){if(!T.frustumCulled||ie.intersectsSprite(T)){G&&ze.setFromMatrixPosition(T.matrixWorld).applyMatrix4(ve);const Ce=ne.update(T),we=T.material;we.visible&&w.push(T,Ce,we,Y,ze.z,null)}}else if((T.isMesh||T.isLine||T.isPoints)&&(!T.frustumCulled||ie.intersectsObject(T))){const Ce=ne.update(T),we=T.material;if(G&&(T.boundingSphere!==void 0?(T.boundingSphere===null&&T.computeBoundingSphere(),ze.copy(T.boundingSphere.center)):(Ce.boundingSphere===null&&Ce.computeBoundingSphere(),ze.copy(Ce.boundingSphere.center)),ze.applyMatrix4(T.matrixWorld).applyMatrix4(ve)),Array.isArray(we)){const De=Ce.groups;for(let ke=0,Je=De.length;ke<Je;ke++){const nt=De[ke],Be=we[nt.materialIndex];Be&&Be.visible&&w.push(T,Ce,Be,Y,ze.z,nt)}}else we.visible&&w.push(T,Ce,we,Y,ze.z,null)}}const Te=T.children;for(let Ce=0,we=Te.length;Ce<we;Ce++)Lu(Te[Ce],z,Y,G)}function Fm(T,z,Y,G){const{opaque:X,transmissive:Te,transparent:Ce}=T;E.setupLightsView(Y),oe===!0&&He.setGlobalState(R.clippingPlanes,Y),G&&M.viewport(ee.copy(G)),X.length>0&&nl(X,z,Y),Te.length>0&&nl(Te,z,Y),Ce.length>0&&nl(Ce,z,Y),M.buffers.depth.setTest(!0),M.buffers.depth.setMask(!0),M.buffers.color.setMask(!0),M.setPolygonOffset(!1)}function Om(T,z,Y,G){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;if(E.state.transmissionRenderTarget[G.id]===void 0){const Be=st.has("EXT_color_buffer_half_float")||st.has("EXT_color_buffer_float");E.state.transmissionRenderTarget[G.id]=new Ci(1,1,{generateMipmaps:!0,type:Be?Ki:In,minFilter:Zr,samples:Math.max(4,P.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:at.workingColorSpace})}const Te=E.state.transmissionRenderTarget[G.id],Ce=G.viewport||ee;Te.setSize(Ce.z*R.transmissionResolutionScale,Ce.w*R.transmissionResolutionScale);const we=R.getRenderTarget(),De=R.getActiveCubeFace(),ke=R.getActiveMipmapLevel();R.setRenderTarget(Te),R.getClearColor(Pe),Ge=R.getClearAlpha(),Ge<1&&R.setClearColor(16777215,.5),R.clear(),qe&&Ze.render(Y);const Je=R.toneMapping;R.toneMapping=Ai;const nt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),E.setupLightsView(G),oe===!0&&He.setGlobalState(R.clippingPlanes,G),nl(T,Y,G),Z.updateMultisampleRenderTarget(Te),Z.updateRenderTargetMipmap(Te),st.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let mt=0,It=z.length;mt<It;mt++){const Lt=z[mt],{object:vt,geometry:nn,material:Ae,group:Rn}=Lt;if(Ae.side===Bi&&vt.layers.test(G.layers)){const ct=Ae.side;Ae.side=vn,Ae.needsUpdate=!0,km(vt,Y,G,nn,Ae,Rn),Ae.side=ct,Ae.needsUpdate=!0,Be=!0}}Be===!0&&(Z.updateMultisampleRenderTarget(Te),Z.updateRenderTargetMipmap(Te))}R.setRenderTarget(we,De,ke),R.setClearColor(Pe,Ge),nt!==void 0&&(G.viewport=nt),R.toneMapping=Je}function nl(T,z,Y){const G=z.isScene===!0?z.overrideMaterial:null;for(let X=0,Te=T.length;X<Te;X++){const Ce=T[X],{object:we,geometry:De,group:ke}=Ce;let Je=Ce.material;Je.allowOverride===!0&&G!==null&&(Je=G),we.layers.test(Y.layers)&&km(we,z,Y,De,Je,ke)}}function km(T,z,Y,G,X,Te){T.onBeforeRender(R,z,Y,G,X,Te),T.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,T.matrixWorld),T.normalMatrix.getNormalMatrix(T.modelViewMatrix),X.onBeforeRender(R,z,Y,G,T,Te),X.transparent===!0&&X.side===Bi&&X.forceSinglePass===!1?(X.side=vn,X.needsUpdate=!0,R.renderBufferDirect(Y,z,G,X,T,Te),X.side=Pr,X.needsUpdate=!0,R.renderBufferDirect(Y,z,G,X,T,Te),X.side=Bi):R.renderBufferDirect(Y,z,G,X,T,Te),T.onAfterRender(R,z,Y,G,X,Te)}function il(T,z,Y){z.isScene!==!0&&(z=Ne);const G=j.get(T),X=E.state.lights,Te=E.state.shadowsArray,Ce=X.state.version,we=_e.getParameters(T,X.state,Te,z,Y,E.state.lightProbeGridArray),De=_e.getProgramCacheKey(we);let ke=G.programs;G.environment=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?z.environment:null,G.fog=z.fog;const Je=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap;G.envMap=fe.get(T.envMap||G.environment,Je),G.envMapRotation=G.environment!==null&&T.envMap===null?z.environmentRotation:T.envMapRotation,ke===void 0&&(T.addEventListener("dispose",pi),ke=new Map,G.programs=ke);let nt=ke.get(De);if(nt!==void 0){if(G.currentProgram===nt&&G.lightsStateVersion===Ce)return zm(T,we),nt}else we.uniforms=_e.getUniforms(T),U!==null&&T.isNodeMaterial&&U.build(T,Y,we),T.onBeforeCompile(we,R),nt=_e.acquireProgram(we,De),ke.set(De,nt),G.uniforms=we.uniforms;const Be=G.uniforms;return(!T.isShaderMaterial&&!T.isRawShaderMaterial||T.clipping===!0)&&(Be.clippingPlanes=He.uniform),zm(T,we),G.needsLights=XS(T),G.lightsStateVersion=Ce,G.needsLights&&(Be.ambientLightColor.value=X.state.ambient,Be.lightProbe.value=X.state.probe,Be.directionalLights.value=X.state.directional,Be.directionalLightShadows.value=X.state.directionalShadow,Be.spotLights.value=X.state.spot,Be.spotLightShadows.value=X.state.spotShadow,Be.rectAreaLights.value=X.state.rectArea,Be.ltc_1.value=X.state.rectAreaLTC1,Be.ltc_2.value=X.state.rectAreaLTC2,Be.pointLights.value=X.state.point,Be.pointLightShadows.value=X.state.pointShadow,Be.hemisphereLights.value=X.state.hemi,Be.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Be.spotLightMatrix.value=X.state.spotLightMatrix,Be.spotLightMap.value=X.state.spotLightMap,Be.pointShadowMatrix.value=X.state.pointShadowMatrix),G.lightProbeGrid=E.state.lightProbeGridArray.length>0,G.currentProgram=nt,G.uniformsList=null,nt}function Bm(T){if(T.uniformsList===null){const z=T.currentProgram.getUniforms();T.uniformsList=yc.seqWithValue(z.seq,T.uniforms)}return T.uniformsList}function zm(T,z){const Y=j.get(T);Y.outputColorSpace=z.outputColorSpace,Y.batching=z.batching,Y.batchingColor=z.batchingColor,Y.instancing=z.instancing,Y.instancingColor=z.instancingColor,Y.instancingMorph=z.instancingMorph,Y.skinning=z.skinning,Y.morphTargets=z.morphTargets,Y.morphNormals=z.morphNormals,Y.morphColors=z.morphColors,Y.morphTargetsCount=z.morphTargetsCount,Y.numClippingPlanes=z.numClippingPlanes,Y.numIntersection=z.numClipIntersection,Y.vertexAlphas=z.vertexAlphas,Y.vertexTangents=z.vertexTangents,Y.toneMapping=z.toneMapping}function HS(T,z){if(T.length===0)return null;if(T.length===1)return T[0].texture!==null?T[0]:null;y.setFromMatrixPosition(z.matrixWorld);for(let Y=0,G=T.length;Y<G;Y++){const X=T[Y];if(X.texture!==null&&X.boundingBox.containsPoint(y))return X}return null}function GS(T,z,Y,G,X){z.isScene!==!0&&(z=Ne),Z.resetTextureUnits();const Te=z.fog,Ce=G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial?z.environment:null,we=I===null?R.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:at.workingColorSpace,De=G.isMeshStandardMaterial||G.isMeshLambertMaterial&&!G.envMap||G.isMeshPhongMaterial&&!G.envMap,ke=fe.get(G.envMap||Ce,De),Je=G.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,nt=!!Y.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),Be=!!Y.morphAttributes.position,mt=!!Y.morphAttributes.normal,It=!!Y.morphAttributes.color;let Lt=Ai;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Lt=R.toneMapping);const vt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,nn=vt!==void 0?vt.length:0,Ae=j.get(G),Rn=E.state.lights;if(oe===!0&&(se===!0||T!==$)){const yt=T===$&&G.id===W;He.setState(G,T,yt)}let ct=!1;G.version===Ae.__version?(Ae.needsLights&&Ae.lightsStateVersion!==Rn.state.version||Ae.outputColorSpace!==we||X.isBatchedMesh&&Ae.batching===!1||!X.isBatchedMesh&&Ae.batching===!0||X.isBatchedMesh&&Ae.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&Ae.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&Ae.instancing===!1||!X.isInstancedMesh&&Ae.instancing===!0||X.isSkinnedMesh&&Ae.skinning===!1||!X.isSkinnedMesh&&Ae.skinning===!0||X.isInstancedMesh&&Ae.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ae.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ae.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ae.instancingMorph===!1&&X.morphTexture!==null||Ae.envMap!==ke||G.fog===!0&&Ae.fog!==Te||Ae.numClippingPlanes!==void 0&&(Ae.numClippingPlanes!==He.numPlanes||Ae.numIntersection!==He.numIntersection)||Ae.vertexAlphas!==Je||Ae.vertexTangents!==nt||Ae.morphTargets!==Be||Ae.morphNormals!==mt||Ae.morphColors!==It||Ae.toneMapping!==Lt||Ae.morphTargetsCount!==nn||!!Ae.lightProbeGrid!=E.state.lightProbeGridArray.length>0)&&(ct=!0):(ct=!0,Ae.__version=G.version);let Vn=Ae.currentProgram;ct===!0&&(Vn=il(G,z,X),U&&G.isNodeMaterial&&U.onUpdateProgram(G,Vn,Ae));let mi=!1,Qi=!1,Ss=!1;const xt=Vn.getUniforms(),Ut=Ae.uniforms;if(M.useProgram(Vn.program)&&(mi=!0,Qi=!0,Ss=!0),G.id!==W&&(W=G.id,Qi=!0),Ae.needsLights){const yt=HS(E.state.lightProbeGridArray,X);Ae.lightProbeGrid!==yt&&(Ae.lightProbeGrid=yt,Qi=!0)}if(mi||$!==T){M.buffers.depth.getReversed()&&T.reversedDepth!==!0&&(T._reversedDepth=!0,T.updateProjectionMatrix()),xt.setValue(L,"projectionMatrix",T.projectionMatrix),xt.setValue(L,"viewMatrix",T.matrixWorldInverse);const tr=xt.map.cameraPosition;tr!==void 0&&tr.setValue(L,me.setFromMatrixPosition(T.matrixWorld)),P.logarithmicDepthBuffer&&xt.setValue(L,"logDepthBufFC",2/(Math.log(T.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&xt.setValue(L,"isOrthographic",T.isOrthographicCamera===!0),$!==T&&($=T,Qi=!0,Ss=!0)}if(Ae.needsLights&&(Rn.state.directionalShadowMap.length>0&&xt.setValue(L,"directionalShadowMap",Rn.state.directionalShadowMap,Z),Rn.state.spotShadowMap.length>0&&xt.setValue(L,"spotShadowMap",Rn.state.spotShadowMap,Z),Rn.state.pointShadowMap.length>0&&xt.setValue(L,"pointShadowMap",Rn.state.pointShadowMap,Z)),X.isSkinnedMesh){xt.setOptional(L,X,"bindMatrix"),xt.setOptional(L,X,"bindMatrixInverse");const yt=X.skeleton;yt&&(yt.boneTexture===null&&yt.computeBoneTexture(),xt.setValue(L,"boneTexture",yt.boneTexture,Z))}X.isBatchedMesh&&(xt.setOptional(L,X,"batchingTexture"),xt.setValue(L,"batchingTexture",X._matricesTexture,Z),xt.setOptional(L,X,"batchingIdTexture"),xt.setValue(L,"batchingIdTexture",X._indirectTexture,Z),xt.setOptional(L,X,"batchingColorTexture"),X._colorsTexture!==null&&xt.setValue(L,"batchingColorTexture",X._colorsTexture,Z));const er=Y.morphAttributes;if((er.position!==void 0||er.normal!==void 0||er.color!==void 0)&&O.update(X,Y,Vn),(Qi||Ae.receiveShadow!==X.receiveShadow)&&(Ae.receiveShadow=X.receiveShadow,xt.setValue(L,"receiveShadow",X.receiveShadow)),(G.isMeshStandardMaterial||G.isMeshLambertMaterial||G.isMeshPhongMaterial)&&G.envMap===null&&z.environment!==null&&(Ut.envMapIntensity.value=z.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=VN()),Qi){if(xt.setValue(L,"toneMappingExposure",R.toneMappingExposure),Ae.needsLights&&WS(Ut,Ss),Te&&G.fog===!0&&Oe.refreshFogUniforms(Ut,Te),Oe.refreshMaterialUniforms(Ut,G,ae,ce,E.state.transmissionRenderTarget[T.id]),Ae.needsLights&&Ae.lightProbeGrid){const yt=Ae.lightProbeGrid;Ut.probesSH.value=yt.texture,Ut.probesMin.value.copy(yt.boundingBox.min),Ut.probesMax.value.copy(yt.boundingBox.max),Ut.probesResolution.value.copy(yt.resolution)}yc.upload(L,Bm(Ae),Ut,Z)}if(G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(yc.upload(L,Bm(Ae),Ut,Z),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&xt.setValue(L,"center",X.center),xt.setValue(L,"modelViewMatrix",X.modelViewMatrix),xt.setValue(L,"normalMatrix",X.normalMatrix),xt.setValue(L,"modelMatrix",X.matrixWorld),G.uniformsGroups!==void 0){const yt=G.uniformsGroups;for(let tr=0,Ms=yt.length;tr<Ms;tr++){const Vm=yt[tr];re.update(Vm,Vn),re.bind(Vm,Vn)}}return Vn}function WS(T,z){T.ambientLightColor.needsUpdate=z,T.lightProbe.needsUpdate=z,T.directionalLights.needsUpdate=z,T.directionalLightShadows.needsUpdate=z,T.pointLights.needsUpdate=z,T.pointLightShadows.needsUpdate=z,T.spotLights.needsUpdate=z,T.spotLightShadows.needsUpdate=z,T.rectAreaLights.needsUpdate=z,T.hemisphereLights.needsUpdate=z}function XS(T){return T.isMeshLambertMaterial||T.isMeshToonMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isShadowMaterial||T.isShaderMaterial&&T.lights===!0}this.getActiveCubeFace=function(){return k},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(T,z,Y){const G=j.get(T);G.__autoAllocateDepthBuffer=T.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),j.get(T.texture).__webglTexture=z,j.get(T.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:Y,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(T,z){const Y=j.get(T);Y.__webglFramebuffer=z,Y.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(T,z=0,Y=0){I=T,k=z,B=Y;let G=null,X=!1,Te=!1;if(T){const we=j.get(T);if(we.__useDefaultFramebuffer!==void 0){M.bindFramebuffer(L.FRAMEBUFFER,we.__webglFramebuffer),ee.copy(T.viewport),le.copy(T.scissor),Ye=T.scissorTest,M.viewport(ee),M.scissor(le),M.setScissorTest(Ye),W=-1;return}else if(we.__webglFramebuffer===void 0)Z.setupRenderTarget(T);else if(we.__hasExternalTextures)Z.rebindTextures(T,j.get(T.texture).__webglTexture,j.get(T.depthTexture).__webglTexture);else if(T.depthBuffer){const Je=T.depthTexture;if(we.__boundDepthTexture!==Je){if(Je!==null&&j.has(Je)&&(T.width!==Je.image.width||T.height!==Je.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(T)}}const De=T.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Te=!0);const ke=j.get(T).__webglFramebuffer;T.isWebGLCubeRenderTarget?(Array.isArray(ke[z])?G=ke[z][Y]:G=ke[z],X=!0):T.samples>0&&Z.useMultisampledRTT(T)===!1?G=j.get(T).__webglMultisampledFramebuffer:Array.isArray(ke)?G=ke[Y]:G=ke,ee.copy(T.viewport),le.copy(T.scissor),Ye=T.scissorTest}else ee.copy(Ie).multiplyScalar(ae).floor(),le.copy(it).multiplyScalar(ae).floor(),Ye=je;if(Y!==0&&(G=H),M.bindFramebuffer(L.FRAMEBUFFER,G)&&M.drawBuffers(T,G),M.viewport(ee),M.scissor(le),M.setScissorTest(Ye),X){const we=j.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+z,we.__webglTexture,Y)}else if(Te){const we=z;for(let De=0;De<T.textures.length;De++){const ke=j.get(T.textures[De]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+De,ke.__webglTexture,Y,we)}}else if(T!==null&&Y!==0){const we=j.get(T.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,we.__webglTexture,Y)}W=-1},this.readRenderTargetPixels=function(T,z,Y,G,X,Te,Ce,we=0){if(!(T&&T.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=j.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De){M.bindFramebuffer(L.FRAMEBUFFER,De);try{const ke=T.textures[we],Je=ke.format,nt=ke.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+we),!P.textureFormatReadable(Je)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!P.textureTypeReadable(nt)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=T.width-G&&Y>=0&&Y<=T.height-X&&L.readPixels(z,Y,G,X,Se.convert(Je),Se.convert(nt),Te)}finally{const ke=I!==null?j.get(I).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(T,z,Y,G,X,Te,Ce,we=0){if(!(T&&T.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=j.get(T).__webglFramebuffer;if(T.isWebGLCubeRenderTarget&&Ce!==void 0&&(De=De[Ce]),De)if(z>=0&&z<=T.width-G&&Y>=0&&Y<=T.height-X){M.bindFramebuffer(L.FRAMEBUFFER,De);const ke=T.textures[we],Je=ke.format,nt=ke.type;if(T.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+we),!P.textureFormatReadable(Je))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!P.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Be=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Be),L.bufferData(L.PIXEL_PACK_BUFFER,Te.byteLength,L.STREAM_READ),L.readPixels(z,Y,G,X,Se.convert(Je),Se.convert(nt),0);const mt=I!==null?j.get(I).__webglFramebuffer:null;M.bindFramebuffer(L.FRAMEBUFFER,mt);const It=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await uA(L,It,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Be),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,Te),L.deleteBuffer(Be),L.deleteSync(It),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(T,z=null,Y=0){const G=Math.pow(2,-Y),X=Math.floor(T.image.width*G),Te=Math.floor(T.image.height*G),Ce=z!==null?z.x:0,we=z!==null?z.y:0;Z.setTexture2D(T,0),L.copyTexSubImage2D(L.TEXTURE_2D,Y,0,0,Ce,we,X,Te),M.unbindTexture()},this.copyTextureToTexture=function(T,z,Y=null,G=null,X=0,Te=0){let Ce,we,De,ke,Je,nt,Be,mt,It;const Lt=T.isCompressedTexture?T.mipmaps[Te]:T.image;if(Y!==null)Ce=Y.max.x-Y.min.x,we=Y.max.y-Y.min.y,De=Y.isBox3?Y.max.z-Y.min.z:1,ke=Y.min.x,Je=Y.min.y,nt=Y.isBox3?Y.min.z:0;else{const Ut=Math.pow(2,-X);Ce=Math.floor(Lt.width*Ut),we=Math.floor(Lt.height*Ut),T.isDataArrayTexture?De=Lt.depth:T.isData3DTexture?De=Math.floor(Lt.depth*Ut):De=1,ke=0,Je=0,nt=0}G!==null?(Be=G.x,mt=G.y,It=G.z):(Be=0,mt=0,It=0);const vt=Se.convert(z.format),nn=Se.convert(z.type);let Ae;z.isData3DTexture?(Z.setTexture3D(z,0),Ae=L.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(Z.setTexture2DArray(z,0),Ae=L.TEXTURE_2D_ARRAY):(Z.setTexture2D(z,0),Ae=L.TEXTURE_2D),M.activeTexture(L.TEXTURE0),M.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,z.flipY),M.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),M.pixelStorei(L.UNPACK_ALIGNMENT,z.unpackAlignment);const Rn=M.getParameter(L.UNPACK_ROW_LENGTH),ct=M.getParameter(L.UNPACK_IMAGE_HEIGHT),Vn=M.getParameter(L.UNPACK_SKIP_PIXELS),mi=M.getParameter(L.UNPACK_SKIP_ROWS),Qi=M.getParameter(L.UNPACK_SKIP_IMAGES);M.pixelStorei(L.UNPACK_ROW_LENGTH,Lt.width),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Lt.height),M.pixelStorei(L.UNPACK_SKIP_PIXELS,ke),M.pixelStorei(L.UNPACK_SKIP_ROWS,Je),M.pixelStorei(L.UNPACK_SKIP_IMAGES,nt);const Ss=T.isDataArrayTexture||T.isData3DTexture,xt=z.isDataArrayTexture||z.isData3DTexture;if(T.isDepthTexture){const Ut=j.get(T),er=j.get(z),yt=j.get(Ut.__renderTarget),tr=j.get(er.__renderTarget);M.bindFramebuffer(L.READ_FRAMEBUFFER,yt.__webglFramebuffer),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let Ms=0;Ms<De;Ms++)Ss&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,j.get(T).__webglTexture,X,nt+Ms),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,j.get(z).__webglTexture,Te,It+Ms)),L.blitFramebuffer(ke,Je,Ce,we,Be,mt,Ce,we,L.DEPTH_BUFFER_BIT,L.NEAREST);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(X!==0||T.isRenderTargetTexture||j.has(T)){const Ut=j.get(T),er=j.get(z);M.bindFramebuffer(L.READ_FRAMEBUFFER,q),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,D);for(let yt=0;yt<De;yt++)Ss?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ut.__webglTexture,X,nt+yt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ut.__webglTexture,X),xt?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,er.__webglTexture,Te,It+yt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,er.__webglTexture,Te),X!==0?L.blitFramebuffer(ke,Je,Ce,we,Be,mt,Ce,we,L.COLOR_BUFFER_BIT,L.NEAREST):xt?L.copyTexSubImage3D(Ae,Te,Be,mt,It+yt,ke,Je,Ce,we):L.copyTexSubImage2D(Ae,Te,Be,mt,ke,Je,Ce,we);M.bindFramebuffer(L.READ_FRAMEBUFFER,null),M.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else xt?T.isDataTexture||T.isData3DTexture?L.texSubImage3D(Ae,Te,Be,mt,It,Ce,we,De,vt,nn,Lt.data):z.isCompressedArrayTexture?L.compressedTexSubImage3D(Ae,Te,Be,mt,It,Ce,we,De,vt,Lt.data):L.texSubImage3D(Ae,Te,Be,mt,It,Ce,we,De,vt,nn,Lt):T.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,Te,Be,mt,Ce,we,vt,nn,Lt.data):T.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,Te,Be,mt,Lt.width,Lt.height,vt,Lt.data):L.texSubImage2D(L.TEXTURE_2D,Te,Be,mt,Ce,we,vt,nn,Lt);M.pixelStorei(L.UNPACK_ROW_LENGTH,Rn),M.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ct),M.pixelStorei(L.UNPACK_SKIP_PIXELS,Vn),M.pixelStorei(L.UNPACK_SKIP_ROWS,mi),M.pixelStorei(L.UNPACK_SKIP_IMAGES,Qi),Te===0&&z.generateMipmaps&&L.generateMipmap(Ae),M.unbindTexture()},this.initRenderTarget=function(T){j.get(T).__webglFramebuffer===void 0&&Z.setupRenderTarget(T)},this.initTexture=function(T){T.isCubeTexture?Z.setTextureCube(T,0):T.isData3DTexture?Z.setTexture3D(T,0):T.isDataArrayTexture||T.isCompressedArrayTexture?Z.setTexture2DArray(T,0):Z.setTexture2D(T,0),M.unbindTexture()},this.resetState=function(){k=0,B=0,I=null,M.reset(),be.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return wi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),n.unpackColorSpace=at._getUnpackColorSpace()}}function na(t,e){return e*t/2}function Rv(t){return Math.PI-Math.PI/t}function GN(t){const{teeth:e,module:n,thickness:i,bore:r}=t,s=na(e,n),o=s+n,a=s-1.25*n,l=Math.PI*2/e,c=l*.3,u=l*.17,f=new yS,d=(m,h)=>new xe(Math.cos(h)*m,Math.sin(h)*m);for(let m=0;m<e;m+=1){const h=m*l,v=d(a,h-c),_=d(o,h-u),y=d(o,h+u),w=d(a,h+c);m===0?f.moveTo(v.x,v.y):f.lineTo(v.x,v.y),f.lineTo(_.x,_.y),f.lineTo(y.x,y.y),f.lineTo(w.x,w.y);const E=h+c,A=h+l-c,x=3;for(let b=1;b<=x;b+=1){const R=E+(A-E)*b/x,N=d(a,R);f.lineTo(N.x,N.y)}}f.closePath();const p=new qh;p.absarc(0,0,r,0,Math.PI*2,!0),f.holes.push(p);const g=n*.14,S=new wm(f,{depth:i,bevelEnabled:!0,bevelThickness:g,bevelSize:g,bevelSegments:2,curveSegments:8,steps:1});return S.translate(0,0,-i/2),S.computeVertexNormals(),S}const ia=.2,Qh=.55,_a=13,bm=43,Xd=_a+bm,WN=26,Pv=Math.PI*2,Nv=.82;function Lv(t){const e=new Map;for(let n=_a;n<=bm;n+=1)e.set(n,GN({teeth:n,module:ia,thickness:Qh,bore:t}));return e}function XN(){const t=new Bt,e=new Bt,n=new Bt;t.add(e,n);const i=Lv(.3),r=Lv(.42),s=new jn({color:14147048,metalness:.96,roughness:.21}),o=new jn({color:4804959,metalness:.9,roughness:.36}),a=new jn({color:7108228,metalness:.92,roughness:.17}),l=new jn({color:0,emissive:new Ve(7993343),emissiveIntensity:2.6,roughness:.5});let c=_a,u=Xd-_a;const f=new et(i.get(c),s),d=new et(r.get(u),o);e.add(f),n.add(d);const p=new Sm(.26,.26,26,32);p.rotateX(Math.PI/2),p.translate(0,0,-11),e.add(new et(p,a));const g=new Qr(.13,20,20),S=new et(g,l);e.add(S);const m=new et(g,l);n.add(m);let h=0,v=0,_=0;return{root:t,update:(A,x)=>{const b=Et.clamp(x.driverTeeth,_a,bm),R=Math.round(b);if(R!==c){const D=Xd-R,k=n.rotation.z,B=-h*(R/D)+Rv(D),I=Pv/D;v=k-B,_=Math.round(v/I)*I,c=R,u=D;const W=i.get(c),$=r.get(u);W&&$&&(f.geometry=W,d.geometry=$)}const N=na(b,ia),U=na(Xd-b,ia),H=N/na(c,ia),q=U/na(u,ia);e.scale.setScalar(H),n.scale.setScalar(q),e.position.set(-N,0,0),n.position.set(U,0,0),t.position.x=N-U,S.position.set(Nv/H,0,Qh*.62),m.position.set(Nv/q,0,Qh*.62),h+=WN*Pv/60*A,e.rotation.z=h,v=Et.lerp(v,_,1-Math.exp(-9*A)),n.rotation.z=-h*(c/u)+Rv(u)+v},setAccent:A=>{l.emissive.copy(A)},dispose:()=>{i.forEach(A=>A.dispose()),r.forEach(A=>A.dispose()),i.clear(),r.clear(),p.dispose(),g.dispose(),s.dispose(),o.dispose(),a.dispose(),l.dispose()}}}const ra=4,ep=6,Vr=ra*ep,Dv=1.85,Iv=1.05,jd=.75,OS=t=>Et.clamp(t,0,1),Uv=t=>{const e=OS(t);return e*e*e*(e*(e*6-15)+10)};function jN(){const t=new Bt;t.position.set(0,1.6,0),t.rotation.y=-.22;const e=new Ve(9347839),n=new Ve(16751949),i=new Cn(1.42,.76,.9),r=new jn({color:4870495,metalness:.55,roughness:.44}),s=new nu(i,r,Vr);s.castShadow=!0,s.frustumCulled=!1,t.add(s);const o=new Cn(1.02,.11,.06),a=new us,l=new nu(o,a,Vr);l.frustumCulled=!1,t.add(l);const c=new Cn(ra*Dv+.6,.12,.55),u=new jn({color:2764864,metalness:.6,roughness:.4,emissive:e.clone(),emissiveIntensity:0,transparent:!0,opacity:0}),f=new et(c,u);f.position.set(0,jd-.85,0),t.add(f);const d=[],p=[],g=[],S=new Float32Array(Vr),m=new Float32Array(Vr),h=new Float32Array(Vr);for(let q=0;q<Vr;q+=1){const D=q%ra,k=Math.floor(q/ra);d.push(new F((D-(ra-1)/2)*Dv,jd+(ep-1-k)*Iv,0)),p.push(new F((Math.random()-.5)*2.6,jd+(ep-1)*Iv*.5+(Math.random()-.5)*2.2,(Math.random()-.5)*1.9)),g.push(new di((Math.random()-.5)*1.5,(Math.random()-.5)*1.9,(Math.random()-.5)*1.5)),S[q]=Math.random()*Math.PI*2,m[q]=Math.random(),h[q]=2.2+Math.random()*3.4}const v=new F,_=new di,y=new _s,w=new F(1,1,1),E=new ft,A=new ft,x=new F(0,-.22,.48),b=new Ve;let R=0;return{root:t,update:(q,D)=>{R+=q;const k=OS(D.ordered),B=Uv(k),I=1-B;for(let $=0;$<Vr;$+=1){if(v.copy(p[$]).lerp(d[$],B),I>.001){const Ge=R*2.4+S[$];v.x+=Math.sin(Ge)*.06*I,v.y+=Math.cos(Ge*1.3)*.05*I,v.z+=Math.sin(Ge*.7)*.05*I}_.set(g[$].x*I,g[$].y*I,g[$].z*I),y.setFromEuler(_),E.compose(v,y,w),s.setMatrixAt($,E),A.makeTranslation(x.x,x.y,x.z),A.premultiply(E),l.setMatrixAt($,A);const ee=.5+Math.sin(R*7+S[$])*.18,le=(R/h[$]+m[$])%1,Ye=Math.max(0,1-le*7)**1.6,Pe=Et.lerp(ee,Ye,B);b.copy(n).lerp(e,B).multiplyScalar(Pe),l.setColorAt($,b)}s.instanceMatrix.needsUpdate=!0,l.instanceMatrix.needsUpdate=!0,l.instanceColor&&(l.instanceColor.needsUpdate=!0);const W=Uv((k-.55)/.45);u.opacity=W,u.emissiveIntensity=W*1.4,f.scale.x=.2+W*.8},setAccent:q=>{e.copy(q),u.emissive.copy(q)},dispose:()=>{i.dispose(),r.dispose(),o.dispose(),a.dispose(),c.dispose(),u.dispose(),s.dispose(),l.dispose()}}}const Yo=12,Yl=9,tp=.4,qN=.07,$l=tp+qN;function YN(){const t=new Bt,e=Yo*Yl,n=Yo*$l,i=Yl*$l,r=new Cn(n+.5,i+1.3,.12),s=new jn({color:1448740,metalness:.2,roughness:.75}),o=new et(r,s);o.position.z=-.1,t.add(o);const a=new Cn(n,.44,.06),l=new us({color:1862472}),c=new et(a,l);c.position.set(0,i/2+.34,0),t.add(c);const u=new fs(tp,tp),f=new us,d=new nu(u,f,e),p=new ft;for(let E=0;E<Yl;E+=1)for(let A=0;A<Yo;A+=1){const x=E*Yo+A;p.setPosition((A-(Yo-1)/2)*$l,((Yl-1)/2-E)*$l,0),d.setMatrixAt(x,p)}d.instanceMatrix.needsUpdate=!0,t.add(d);const g=new Float32Array(e),S=new Int32Array(e);for(let E=0;E<e;E+=1)S[E]=E;let m=0;const h=()=>{for(let E=e-1;E>0;E-=1){const A=Math.floor(Math.random()*(E+1)),x=S[E];S[E]=S[A],S[A]=x}};h();const v=[{at:0,color:new Ve(14826288)},{at:.2,color:new Ve(15888428)},{at:.4,color:new Ve(16098851)},{at:.6,color:new Ve(15978532)},{at:.8,color:new Ve(8832831)},{at:1,color:new Ve(2075231)}],_=new Ve,y=(E,A)=>{const x=Et.clamp(E,0,1);let b=1;for(;b<v.length-1&&v[b].at<x;)b+=1;const R=v[b-1],N=v[b],U=Math.max(N.at-R.at,1e-6);return A.copy(R.color).lerp(N.color,(x-R.at)/U)},w=E=>{y(g[E],_),d.setColorAt(E,_)};for(let E=0;E<e;E+=1)w(E);return{root:t,count:e,fillAll:()=>{g.fill(1)},setAll:E=>{g.fill(Et.clamp(E,0,1))},touchNext:()=>{g[S[m]]=1,m+=1,m>=e&&(m=0,h())},age:(E,A)=>{for(let x=0;x<e;x+=1)g[x]=Math.max(0,g[x]-A*E)},commit:()=>{for(let E=0;E<e;E+=1)w(E);d.instanceColor&&(d.instanceColor.needsUpdate=!0)},dispose:()=>{r.dispose(),s.dispose(),a.dispose(),l.dispose(),u.dispose(),f.dispose(),d.dispose()}}}const qd=t=>Et.clamp(t,0,1);function $N({phase:t,gait:e,load:n,reach:i,time:r}){const s=qd(e),o=qd(n),a=qd(i),l=Math.sin(t),c=Math.sin(t-.55),u=Math.cos(t*2),f=Math.max(0,-Math.sin(t-.9))*1.25*s,d=Math.max(0,-Math.sin(t+Math.PI-.9))*1.25*s;let p,g,S,m,h,v;if(o>.001){const w=-1.16+Math.sin(r*5.5)*.02*o;p=Et.lerp(-l*.52*s,w,o),g=Et.lerp(l*.52*s,w,o),h=o*.26,v=-o*.26,S=-o*.62,m=-o*.62}else p=-l*.52*s,g=l*.52*s,h=.07,v=-.07,S=Math.max(0,-c)*.75*s+.12,m=Math.max(0,c)*.75*s+.12;a>.001&&(S=Et.lerp(S,-.1,a),m=Et.lerp(m,-.1,a),p=Et.lerp(p,-1.52,a),g=Et.lerp(g,-1.52,a),h=Et.lerp(h,.12,a),v=Et.lerp(v,-.12,a));const _=1+u*.045*s;return{legL:{upper:l*.62*s+o*.06,lower:f,tip:-f*.45-l*.16*s,spread:0},legR:{upper:-l*.62*s+o*.06,lower:d,tip:-d*.45+l*.16*s,spread:0},armL:{upper:p,lower:S,tip:0,spread:h},armR:{upper:g,lower:m,tip:0,spread:v},body:{offsetX:l*.045*s,offsetY:Math.abs(Math.cos(t))*.075*s-o*.05,rotX:-o*.17+s*.06+a*.13,rotZ:-l*.035*s,stretchY:_,stretchXZ:1-(_-1)*.55},pelvis:{rotY:l*.16*s,rotZ:l*.09*s},chest:{rotY:-l*.22*s,rotZ:-l*.05*s,breathe:1+Math.sin(r*1.7)*.016},head:{rotX:o*.18+Math.sin(r*1.1)*.02,rotY:c*.16*s+l*.11*s,rotZ:-c*.07*s},grip:{y:-.16+a*.14,z:.6+a*.42}}}const np=.4,ip=.42,Fv=.32,Ov=.3,KN=np+ip,kv=.23;function Kl(t,e,n){const i=new Bt;e.position.y=-n/2,i.add(e);const r=new Bt;return r.position.y=-n,i.add(r),t.add(i),{group:i,end:r}}function ZN(){const t=new Bt,e=new Bt;t.add(e);const n=new jn({color:14275527,roughness:.62,metalness:.08}),i=[],r=D=>(i.push(D),D),s=(D,k)=>r(new ga(D,Math.max(k-D*2,.01),6,16)),o=r(new Qr(1,18,14)),a=(D,k)=>{const B=new et(o,n);return B.scale.setScalar(k),D.add(B),B},l=new Bt;l.position.y=KN,e.add(l);const c=new et(r(new ga(.17,.12,6,16)),n);c.rotation.z=Math.PI/2,c.scale.set(1,1,.85),l.add(c);const u=s(.1,ip),f=s(.088,np),d=r(new Qr(.125,18,14)),p=D=>{const k=Kl(l,new et(u,n),ip);k.group.position.x=D*.115,a(k.group,.125);const B=Kl(k.end,new et(f,n),np);a(B.group,.105);const I=new et(d,n);return I.scale.set(.92,.6,1.45),I.position.set(0,.02,.07),B.end.add(I),{thigh:k.group,shin:B.group,foot:I}},g=p(-1),S=p(1),m=new Bt;m.position.y=.1,l.add(m);const h=new et(r(new ga(.215,.3,8,20)),n);h.position.y=.2,h.scale.set(1,1,.76),m.add(h);const v=new Bt;v.position.y=.4,m.add(v),a(v,.085);const _=new Bt;_.position.y=.1+kv*.72,v.add(_);const y=new et(r(new Qr(kv,32,26)),n);y.scale.set(.94,1.12,.94),_.add(y);const w=s(.072,Fv),E=s(.064,Ov),A=r(new Qr(.082,18,14)),x=new Bt;x.position.y=.3,m.add(x);const b=D=>{const k=Kl(x,new et(w,n),Fv);k.group.position.x=D*.245,a(k.group,.1);const B=Kl(k.end,new et(E,n),Ov);a(B.group,.082);const I=new et(A,n);return I.scale.set(1,1.1,.82),B.end.add(I),{upper:k.group,fore:B.group,hand:I}},R=b(-1),N=b(1),U=new Bt;U.position.set(0,-.16,.6),x.add(U);const H=D=>{const k=$N(D);g.thigh.rotation.x=k.legL.upper,g.shin.rotation.x=k.legL.lower,g.foot.rotation.x=k.legL.tip,S.thigh.rotation.x=k.legR.upper,S.shin.rotation.x=k.legR.lower,S.foot.rotation.x=k.legR.tip,R.upper.rotation.x=k.armL.upper,R.upper.rotation.z=k.armL.spread,R.fore.rotation.x=k.armL.lower,N.upper.rotation.x=k.armR.upper,N.upper.rotation.z=k.armR.spread,N.fore.rotation.x=k.armR.lower,e.position.set(k.body.offsetX,k.body.offsetY,0),e.rotation.x=k.body.rotX,e.rotation.z=k.body.rotZ,e.scale.set(k.body.stretchXZ,k.body.stretchY,k.body.stretchXZ),l.rotation.y=k.pelvis.rotY,l.rotation.z=k.pelvis.rotZ,m.rotation.y=k.chest.rotY,m.rotation.z=k.chest.rotZ,m.scale.y=k.chest.breathe,_.rotation.x=k.head.rotX,_.rotation.y=k.head.rotY-m.rotation.y*.5,_.rotation.z=k.head.rotZ,U.position.set(0,k.grip.y,k.grip.z)};return H({phase:0,gait:0,load:0,reach:0,time:0}),{root:t,grip:U,step:H,dispose:()=>{for(const D of i)D.dispose();n.dispose()}}}function JN(){const e=document.createElement("canvas");e.width=64,e.height=64;const n=e.getContext("2d");if(n){const r=n.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(.3,"rgba(255,255,255,0.9)"),r.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=r,n.fillRect(0,0,64,64)}const i=new ZA(e);return i.colorSpace=Sn,i}function QN(t,e){const n=new Float32Array(t*3),i=new Float32Array(t*3),r=new yn,s=new On(n,3),o=new On(i,3);s.setUsage(wg),o.setUsage(wg),r.setAttribute("position",s),r.setAttribute("color",o);const a=JN(),l=new hS({size:e,map:a,vertexColors:!0,transparent:!0,depthWrite:!1,blending:ih,sizeAttenuation:!0}),c=new KA(r,l);return c.frustumCulled=!1,{points:c,positions:n,colors:i,capacity:t,commit:()=>{s.needsUpdate=!0,o.needsUpdate=!0},dispose:()=>{r.dispose(),l.dispose(),a.dispose()}}}const Yd=-6.4,Bv=5,zv=2.9,$d=-4.5,Kd=3.5,gt={waiting:.9,pulling:2.3,carrying:5.8,placing:7.3,returning:10.4,resting:11.1},eL=gt.resting,Vv=new F(-5.5,1.25,.55),tL=new F(4,2.15,.5),nL=.105,iL=.05,rL=105,yi=200,Hv=Math.PI/2-.4,sL=-Math.PI/2+.4,kS=t=>Et.clamp(t,0,1),Zl=(t,e,n,i)=>Et.lerp(t,e,1-Math.exp(-n*i)),ei=t=>{const e=kS(t);return e*e*e*(e*(e*6-15)+10)};function oL(){const t=new Bt;t.position.set(0,1.8,0),t.rotation.y=-.18;const e=new Ve(7993343),n=new fs(200,140),i=new L2({opacity:.55}),r=new et(n,i);r.rotation.x=-Math.PI/2,r.receiveShadow=!0,t.add(r);const s=new Cn(2.3,2.6,1.9),o=new jn({color:3752271,metalness:.65,roughness:.42}),a=new et(s,o);a.position.set(Yd,1.3,0),a.castShadow=!0,t.add(a);const l=new Cn(1.7,.14,.08),c=new us({color:e.clone()});for(let Pe=0;Pe<3;Pe+=1){const Ge=new et(l,c);Ge.position.set(Yd,.75+Pe*.55,.98),t.add(Ge)}const u=YN();u.root.position.set(Bv,zv,0),u.root.rotation.y=-.34,t.add(u.root);const f=ZN();f.root.scale.setScalar(1.18),t.add(f.root);const d=new Cn(1.05,.88,.82),p=new jn({color:14207395,metalness:.05,roughness:.8}),g=new et(d,p);g.castShadow=!0,t.add(g);const S=new fs(.72,.56),m=new us({color:9206354}),h=new et(S,m);h.position.z=.42,g.add(h);const v=QN(yi,.22);t.add(v.points);const _=new Float32Array(yi),y=new Float32Array(yi),w=new Float32Array(yi),E=new Float32Array(yi),A=new Uint8Array(yi);let x=0,b=0,R=0,N=0,U=0,H=!1,q=0,D=0,k=0,B,I=Hv;const W=new F,$=()=>{let Pe=-1;for(let Ge=0;Ge<yi;Ge+=1){const J=(x+Ge)%yi;if(A[J]===0){Pe=J,x=(J+1)%yi;break}}Pe<0||(_[Pe]=0,y[Pe]=.62+Math.random()*.26,w[Pe]=.7+Math.random()*1.5,E[Pe]=(Math.random()-.5)*1.4,A[Pe]=1)};return{root:t,update:(Pe,Ge)=>{U+=Pe;const ce=kS(Ge.automated)<.5,ae=!1;if(f.root.visible=ce&&!ae,g.visible=ce,v.points.visible=!ce,ce!==B&&(B=ce,ce?(u.setAll(0),R=0,H=!1):u.setAll(1)),u.age(Pe,ce?nL:iL),ce){const he=R;R=(R+Pe)%eL,R<he&&(H=!1);const Fe=(L,dt)=>R>=L&&R<dt,Ie=(L,dt)=>ei((R-L)/(dt-L)),it=Fe(gt.waiting,gt.pulling),je=Fe(gt.pulling,gt.carrying),ie=Fe(gt.carrying,gt.placing),oe=Fe(gt.placing,gt.returning);let se=$d,ve=!1,me=!1,ze=0,Ne=0;if(it){const L=(R-gt.waiting)/(gt.pulling-gt.waiting);ze=L<.5?ei(L/.5):1-ei((L-.5)/.5),Ne=L<.4?0:ei((L-.4)/.6)}else if(je)se=Et.lerp($d,Kd,Ie(gt.pulling,gt.carrying)),ve=!0,me=!0,Ne=1;else if(ie){const L=(R-gt.carrying)/(gt.placing-gt.carrying);se=Kd,me=!0,ze=L<.55?ei(L/.55):1-ei((L-.55)/.45),Ne=L<.55?1:0}else oe&&(se=Et.lerp(Kd,$d,Ie(gt.placing,gt.returning)),ve=!0);q=Zl(q,ve?1:0,7,Pe),D=Zl(D,Ne,6,Pe),k=Zl(k,ze,8,Pe),I=Zl(I,me?Hv:sL,6,Pe),N+=Pe*(7.6-D*1.9)*q;const qe={phase:N,gait:q,load:D,reach:k,time:U};if(f.root.position.x=se,f.root.rotation.y=I,f.step(qe),f.grip.getWorldPosition(W),t.worldToLocal(W),it){const L=(R-gt.waiting)/(gt.pulling-gt.waiting);g.scale.setScalar(Math.max(ei(L/.4),1e-4)),g.position.copy(Vv).lerp(W,ei(Math.max(0,(L-.35)/.65)))}else if(je)g.scale.setScalar(1),g.position.copy(W);else if(ie){const L=(R-gt.carrying)/(gt.placing-gt.carrying);g.position.copy(W).lerp(tL,ei(Math.min(L/.55,1))),g.scale.setScalar(Math.max(1-ei(Math.max(0,(L-.6)/.4)),1e-4))}else g.scale.setScalar(1e-4),g.position.copy(Vv);g.rotation.y=Et.lerp(.25,I,D),!H&&R>=gt.carrying+.55*(gt.placing-gt.carrying)&&(u.fillAll(),H=!0)}else{for(b+=rL*Pe;b>=1;)$(),b-=1;for(let he=0;he<yi;he+=1){if(A[he]===0){v.colors[he*3]=0,v.colors[he*3+1]=0,v.colors[he*3+2]=0;continue}if(_[he]+=y[he]*Pe,_[he]>=1){A[he]=0,u.touchNext(),v.colors[he*3]=0,v.colors[he*3+1]=0,v.colors[he*3+2]=0;continue}const Fe=_[he],Ie=Math.sin(Fe*Math.PI);v.positions[he*3]=Et.lerp(Yd+1.2,Bv,Fe),v.positions[he*3+1]=Et.lerp(1.9,zv,Fe)+Ie*w[he],v.positions[he*3+2]=E[he]*Ie;const it=.55+.45*ei((Fe-.5)/.5);v.colors[he*3]=e.r*it,v.colors[he*3+1]=e.g*it,v.colors[he*3+2]=e.b*it}v.commit()}u.commit()},setAccent:Pe=>{e.copy(Pe),c.color.copy(Pe)},dispose:()=>{n.dispose(),i.dispose(),s.dispose(),o.dispose(),l.dispose(),c.dispose(),d.dispose(),p.dispose(),S.dispose(),m.dispose(),u.dispose(),f.dispose(),v.dispose()}}}class aL extends lS{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;const e=new Cn;e.deleteAttribute("uv");const n=new jn({side:vn}),i=new jn,r=new H2(16777215,900,28,2);r.position.set(.418,16.199,.3),this.add(r);const s=new et(e,n);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const o=new nu(e,i,6),a=new Zt;a.position.set(-10.906,2.009,1.846),a.rotation.set(0,-.195,0),a.scale.set(2.328,7.905,4.651),a.updateMatrix(),o.setMatrixAt(0,a.matrix),a.position.set(-5.607,-.754,-.758),a.rotation.set(0,.994,0),a.scale.set(1.97,1.534,3.955),a.updateMatrix(),o.setMatrixAt(1,a.matrix),a.position.set(6.167,.857,7.803),a.rotation.set(0,.561,0),a.scale.set(3.927,6.285,3.687),a.updateMatrix(),o.setMatrixAt(2,a.matrix),a.position.set(-2.017,.018,6.124),a.rotation.set(0,.333,0),a.scale.set(2.002,4.566,2.064),a.updateMatrix(),o.setMatrixAt(3,a.matrix),a.position.set(2.291,-.756,-2.621),a.rotation.set(0,-.286,0),a.scale.set(1.546,1.552,1.496),a.updateMatrix(),o.setMatrixAt(4,a.matrix),a.position.set(-2.193,-.369,-5.547),a.rotation.set(0,.516,0),a.scale.set(3.875,3.487,2.986),a.updateMatrix(),o.setMatrixAt(5,a.matrix),this.add(o);const l=new et(e,Bs(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new et(e,Bs(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const u=new et(e,Bs(17));u.position.set(14.904,12.198,-1.832),u.scale.set(.15,4.265,6.331),this.add(u);const f=new et(e,Bs(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);const d=new et(e,Bs(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const p=new et(e,Bs(100));p.position.set(0,20,0),p.scale.set(1,.1,1),this.add(p)}dispose(){const e=new Set;this.traverse(n=>{n.isMesh&&(e.add(n.geometry),e.add(n.material))});for(const n of e)n.dispose()}}function Bs(t){return new k2({color:0,emissive:16777215,emissiveIntensity:t})}const Gv=16/9,Zd=38;function lL(t,e){const n=new lS;n.background=new Ve(e);const i=new Dn(Zd,1,.1,400),r=new HN({antialias:!0,alpha:!1,powerPreference:"high-performance"});r.outputColorSpace=Sn,r.toneMapping=lm,r.toneMappingExposure=1.05,r.setPixelRatio(Math.min(window.devicePixelRatio,2)),r.shadowMap.enabled=!0,r.shadowMap.type=Wy,t.appendChild(r.domElement);const s=new Kh(r),o=new aL,a=s.fromScene(o,.04);n.environment=a.texture,n.environmentIntensity=.35,o.dispose(),s.dispose();const l=new kd(16777215,3.4);l.position.set(6,9,7),l.castShadow=!0,l.shadow.mapSize.set(2048,2048),l.shadow.bias=-8e-4,l.shadow.normalBias=.02,l.shadow.camera.left=-16,l.shadow.camera.right=16,l.shadow.camera.top=14,l.shadow.camera.bottom=-8,l.shadow.camera.near=.5,l.shadow.camera.far=42,n.add(l);const c=new kd(8959231,4.2);c.position.set(-8,3,-9),n.add(c);const u=new kd(16777215,.5);return u.position.set(-5,-3,6),n.add(u),{scene:n,camera:i,renderer:r,resize:(p,g)=>{const S=p/Math.max(g,1);if(i.aspect=S,S<Gv){const h=Math.tan(Et.degToRad(Zd)/2)*Gv;i.fov=Et.radToDeg(2*Math.atan(h/S))}else i.fov=Zd;i.updateProjectionMatrix(),r.setSize(p,g)},dispose:()=>{a.texture.dispose(),n.environment=null,r.dispose(),r.domElement.remove()}}}const cr=[{id:"cog",duration:15,copy:[{at:0,value:{title:"I don't want to just be a small cog in a big machine.",body:"Same shaft. Same speed. What changes is what it is connected to."}}],camera:[{at:0,value:[-2.2,3.2,21]},{at:7,value:[-3,2.5,18.9]},{at:15,value:[-2.8,3,19.8]}],target:[{at:0,value:[-4.2,.3,0]},{at:7,value:[-4,0,0]},{at:15,value:[-4,0,0]}],accent:[{at:0,value:"#79f7ff"}],background:[{at:0,value:"#05070d"}],act:{kind:"cog",driverTeeth:[{at:0,value:13},{at:3.2,value:13},{at:11,value:43},{at:15,value:43}]}},{id:"by-hand",duration:18,layout:"bottom",copy:[{at:0,value:{title:"It used to arrive by hand.",body:"Cut a full export, carry the whole thing over, paste it in. Once a day, every day — and the moment it landed it started going out of date."}}],camera:[{at:0,value:[1.6,5.6,16.2]},{at:9,value:[.9,5.1,15.2]},{at:18,value:[1.5,5.5,16]}],target:[{at:0,value:[.3,3.7,0]},{at:18,value:[.3,3.5,0]}],accent:[{at:0,value:"#ffb46b"}],background:[{at:0,value:"#07070c"}],act:{kind:"pipeline",automated:[{at:0,value:0}]}},{id:"on-its-own",duration:14,layout:"bottom",copy:[{at:0,value:{title:"Now it just arrives.",body:"No export, no trip, no paste. Records land as they change, so the sheet is never filled and never stale — it is simply current."}}],camera:[{at:0,value:[1.4,5.4,15.8]},{at:7,value:[.8,4.9,14.9]},{at:14,value:[1.3,5.3,15.6]}],target:[{at:0,value:[.3,3.6,0]},{at:14,value:[.3,3.4,0]}],accent:[{at:0,value:"#7dfcc0"}],background:[{at:0,value:"#05090d"}],act:{kind:"pipeline",automated:[{at:0,value:1}]}},{id:"architecture",duration:20,layout:"bottom",copy:[{at:0,value:{title:"One process became many.",body:"A single always-running program became a container per job, each on its own schedule — it starts, does its work, exits, and leaves a record behind. The same work, now separable and auditable."}}],camera:[{at:0,value:[1.8,5.4,13.6]},{at:10,value:[1,4.9,12.7]},{at:20,value:[1.7,5.3,13.4]}],target:[{at:0,value:[0,3.6,0]},{at:20,value:[0,3.4,0]}],accent:[{at:0,value:"#8ea2ff"}],background:[{at:0,value:"#05070f"}],act:{kind:"architecture",ordered:[{at:0,value:0},{at:6,value:0},{at:13,value:1},{at:20,value:1}]}}],Wv=cr[0],cL=t=>t*t*t*(t*(t*6-15)+10);function Am(t,e){if(e<=t[0].at)return{from:0,to:0,blend:0};const n=t.length-1;if(e>=t[n].at)return{from:n,to:n,blend:0};let i=0;for(;i<n&&t[i+1].at<=e;)i+=1;const r=t[i].at,s=t[i+1].at,o=Math.max(s-r,1e-6);return{from:i,to:i+1,blend:cL((e-r)/o)}}function Jd(t,e){const{from:n,to:i,blend:r}=Am(t,e);return Et.lerp(t[n].value,t[i].value,r)}function Xv(t,e,n){const{from:i,to:r,blend:s}=Am(t,e);return n.fromArray(t[i].value).lerp(dL.fromArray(t[r].value),s)}function Jl(t,e,n){const{from:i,to:r,blend:s}=Am(t,e);return n.set(t[i].value).lerp(fL.set(t[r].value),s)}function uL(t,e){let n=0;for(;n<t.length-1&&t[n+1].at<=e;)n+=1;return n}const dL=new F,fL=new Ve;function hL(){const t=ue.useRef(null),e=ue.useRef(0),n=ue.useRef(0),[i,r]=ue.useState(0),[s,o]=ue.useState(0),a=ue.useRef(0),l=ue.useCallback(()=>{a.current+=1},[]),c=ue.useCallback(_=>{const y=Math.max(0,Math.min(cr.length-1,_));e.current=y,r(y),a.current+=1},[]),u=ue.useCallback(()=>{c(e.current+1)},[c]),f=ue.useCallback(()=>{c(e.current-1)},[c]);ue.useEffect(()=>{const _=document.body.style.overflow;document.body.style.overflow="hidden";const y=w=>{const E=[" ","Enter","ArrowRight","ArrowDown","PageDown"],A=["Backspace","Delete","ArrowLeft","ArrowUp","PageUp"];if(E.includes(w.key)){w.preventDefault(),u();return}if(A.includes(w.key)){w.preventDefault(),f();return}w.key==="Home"&&(w.preventDefault(),c(0)),w.key==="End"&&(w.preventDefault(),c(cr.length-1)),(w.key==="r"||w.key==="R")&&(w.preventDefault(),l())};return window.addEventListener("keydown",y),()=>{document.body.style.overflow=_,window.removeEventListener("keydown",y)}},[c,u,f,l]),ue.useEffect(()=>{const _=t.current;if(!_)return;const y=lL(_,Wv.background[0].value),{scene:w,camera:E,renderer:A}=y;E.position.fromArray(Wv.camera[0].value);const x=XN(),b=oL(),R=jN();w.add(x.root,b.root,R.root);const N=new j2,U=new F,H=new Ve,q=new Ve;let D=0,k=a.current,B=-1;const I=()=>{y.resize(_.clientWidth,_.clientHeight)};I();const W=new ResizeObserver(I);return W.observe(_),A.setAnimationLoop(()=>{const $=Math.min(N.getDelta(),.05),ee=cr[Math.min(e.current,cr.length-1)];k!==a.current&&(k=a.current,D=0),D=Math.min(D+$,ee.duration),Xv(ee.camera,D,E.position),Xv(ee.target,D,U),E.lookAt(U),Jl(ee.accent,D,H),Jl(ee.background,D,q),w.background.copy(q),x.root.visible=ee.act.kind==="cog",b.root.visible=ee.act.kind==="pipeline",R.root.visible=ee.act.kind==="architecture",ee.act.kind==="cog"?(x.setAccent(H),x.update($,{driverTeeth:Jd(ee.act.driverTeeth,D)})):ee.act.kind==="pipeline"?(b.setAccent(H),b.update($,{automated:Jd(ee.act.automated,D)})):(R.setAccent(H),R.update($,{ordered:Jd(ee.act.ordered,D)}));const le=uL(ee.copy,D);le!==B&&(B=le,o(le)),A.render(w,E)}),()=>{W.disconnect(),A.setAnimationLoop(null),w.remove(x.root,b.root,R.root),x.dispose(),b.dispose(),R.dispose(),y.dispose()}},[]);const d=cr[Math.min(i,cr.length-1)],p=d.layout==="bottom",g=d.copy[s].at,S=d.copy[s].value,m=Jl(d.accent,g,new Ve).getStyle(),h=Jl(d.background,g,new Ve).getStyle(),v=_=>{const y=performance.now();y-n.current<450||Math.abs(_.deltaY)<8||(n.current=y,_.deltaY>0?u():f())};return C.jsxs("main",{onPointerDown:_=>{_.button===0&&u()},onWheel:v,style:{position:"fixed",inset:0,overflow:"hidden",background:h,color:"white",cursor:"pointer",userSelect:"none",touchAction:"none",fontFamily:"Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif"},children:[C.jsx("style",{children:`
          @keyframes present-enter {
            from {
              opacity: 0;
              transform: translateY(32px);
              filter: blur(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
              filter: blur(0);
            }
          }

          .present-copy {
            animation:
              present-enter
              600ms
              cubic-bezier(.2, .8, .2, 1)
              both;
          }

          @media (max-width: 800px) {
            .present-frame {
              left: 24px !important;
              right: 24px;
              bottom: 92px;
              top: auto !important;
              transform: none !important;
              width: auto !important;
            }

            .present-title {
              font-size:
                clamp(2rem, min(14vw, 8.5vh), 5rem)
                !important;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .present-copy {
              animation-duration: 1ms;
            }
          }
        `}),C.jsx("div",{ref:t,style:{position:"absolute",inset:0}}),C.jsx("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,pointerEvents:"none",background:`
            radial-gradient(
              circle at 68% 48%,
              transparent 0 18%,
              rgba(0, 0, 0, 0.28) 58%,
              rgba(0, 0, 0, 0.8) 100%
            ),
            linear-gradient(
              90deg,
              rgba(2, 3, 10, 0.8),
              transparent 60%
            )
          `}}),C.jsx("section",{className:"present-frame","aria-live":"polite",style:{position:"absolute",zIndex:2,left:"clamp(24px, 7vw, 112px)",top:p?"auto":"50%",bottom:p?"clamp(56px, 11vh, 132px)":"auto",width:p?"min(900px, 74vw)":"min(620px, 48vw)",transform:p?"none":"translateY(-50%)",pointerEvents:"none"},children:C.jsxs("div",{className:"present-copy",children:[C.jsx("h1",{className:"present-title",style:{maxWidth:p?"24ch":"10.5ch",margin:0,fontSize:p?"clamp(1.7rem, min(3.8vw, 7vh), 4.2rem)":"clamp(2.2rem, min(6.2vw, 10.5vh), 7.2rem)",fontWeight:650,letterSpacing:"-.065em",lineHeight:.92},children:S.title}),C.jsx("p",{style:{maxWidth:"48ch",marginTop:"clamp(24px, 3.4vh, 42px)",color:"rgba(245,247,255,.68)",fontSize:"clamp(0.95rem, min(1.25vw, 2.1vh), 1.28rem)",lineHeight:1.65},children:S.body})]},`${d.id}-${s}`)}),C.jsxs("footer",{style:{position:"absolute",zIndex:2,right:40,bottom:32,color:m,fontSize:".75rem",letterSpacing:".12em",pointerEvents:"none"},children:[String(i+1).padStart(2,"0")," / ",String(cr.length).padStart(2,"0")]})]})}function pL(){const t=Ir(),e=t.pathname==="/present"||t.pathname==="/present/";return C.jsxs(C.Fragment,{children:[C.jsx(jw,{}),C.jsxs("div",{className:"min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300",children:[C.jsx("main",{className:e?"min-h-screen":"pb-20 min-h-screen",children:C.jsxs(uw,{children:[C.jsx(zs,{path:"/",element:C.jsx(qw,{})}),C.jsx(zs,{path:"/about",element:C.jsx(Yw,{})}),C.jsx(zs,{path:"/projects",element:C.jsx($w,{})}),C.jsx(zs,{path:"/contact",element:C.jsx(Pb,{})}),C.jsx(zs,{path:"/present",element:C.jsx(hL,{})})]})}),!e&&C.jsx(Xw,{})]})]})}function mL(){return C.jsx(Gw,{children:C.jsx(vw,{children:C.jsx(pL,{})})})}Qd.createRoot(document.getElementById("root")).render(C.jsx(nx.StrictMode,{children:C.jsx(mL,{})}));
