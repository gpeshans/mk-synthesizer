'use strict';

/**
 * Helper function to dump the grunt configuration.
 */
module.exports = function (obj) {
  var placeholder = '____PLACEHOLDER____';
  var fns = [];
  var json = JSON.stringify(obj, function (key, value) {
    if (typeof value === 'function') {
      fns.push(value);
      return placeholder;
    }
    return value;
  }, 2);
  if (json) {
    json = json.replace(new RegExp('"' + placeholder + '"', 'g'), function () {
      return fns.shift();
    });
  }
  return json;
};