!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e||self).tsTools={})}(this,function(e){var t=function(e){return Object.prototype.toString.call(e).match(/\w+\s(\w+)/)[1].toLowerCase()},n={__proto__:null,getType:t},r={__proto__:null,capitalizeFirstWordInSentence:function(e){return"string"==typeof e||e instanceof String?e.trim().length?e.split(". ").map(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}).join(". "):"":e},isNonEmptyString:function(e){return"string"==typeof e&&""!==e.trim()},isSameText:function(e,n,r){return void 0===r&&(r=!0),"string"===t(e)&&"string"===t(e)&&(r?e.toLowerCase()===n.toLowerCase():e===n)}},o=process.env.NODE_DEV="TEST",i=function(e){return Array.isArray(e)?new Array:Object.assign({})},u=function e(n,r){void 0===r&&(r=[]);var o=t(n);if(-1===["object","array"].indexOf(o))return n;var u=r.find(function(e){return e.original===n});if(u)return u.copy;var s=i(n);return r.push({original:n,copy:s}),Object.keys(n).forEach(function(t){var o=parseInt(t);s[t]=Number.isNaN(o)?e(n[t],r):e(n[o],r)}),s};module.exports.isObject=function(e){return"object"===t(e)},module.exports.deepClone=function(e){try{return structuredClone(e)}catch(t){return u(e)}},o&&(module.exports.newCopyHelper=i),e.objectUtil={__proto__:null,deepCloneWithoutCircularReferences:function(e){return JSON.parse(JSON.stringify(e,(t=new WeakSet,function(e,n){if("object"==typeof n&&null!==n){if(t.has(n))return;t.add(n)}return n})));var t},recursiveDeepClone:u},e.regexUtil=n,e.stringUtil=r});
//# sourceMappingURL=index.umd.js.map
