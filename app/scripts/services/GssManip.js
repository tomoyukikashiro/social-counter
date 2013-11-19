'use strict';

/**
 * google spreadsheet parser
 *
 *  Thank you for your kindness @debiru
 *  http://jsdo.it/debiru/jCkS
 *
 * @class
 * @version 0.1.0
 * @author Tomoyuki Kashiro <kashiro@github>
 * @license MIT
 */

angular.module('socialCounterApp').factory('GssManip', ['$rootScope', '$http', function ($rootScope, $http) {

  function GssManip(ssid, sid){
    this.ssid      = ssid;
    this.sid       = sid;
    this.jsonUrl   = 'https://spreadsheets.google.com/feeds/cells/' + this.ssid + '/' + this.sid + '/public/basic?alt=json-in-script&callback=JSON_CALLBACK';
    this.data      = null;
    this.callback  = null;
    this.$event    = $rootScope.$new();
    this.loadQueue = [];

    this.onloaded(angular.bind(this, function() {
      this.callback(this.getData());

      this.postprocess();

      if (this.loadQueue.length > 0) {
        this._load.apply(this, this.loadQueue.shift());
      }
    }));
  }

  GssManip.trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };

  GssManip.prototype.preprocess = function() {
    this.data = null;
  };

  GssManip.prototype.postprocess = function() {
    this.callback = null;
  };

  GssManip.prototype.onloaded = function(callback) {
    this.$event.$on('loaded', callback);
  };

  GssManip.prototype.loaded = function() {
    this.$event.$emit('loaded');
  };

  GssManip.prototype.done = function(res) {
    this.data = this.parseFeedEntry(res.data.feed.entry);
  };

  GssManip.prototype.fail = function() {
    this.data = null;
  };

  GssManip.prototype.always = function() {
    this.loaded();
  };

  GssManip.prototype.ajax = function() {
    return $http.jsonp(this.jsonUrl, {method : 'GET'})
      .then(angular.bind(this, this.done), angular.bind(this, this.fail))['finally'](angular.bind(this, this.always));
  };

  GssManip.prototype.parseFeedEntry = function(cells) {
    var keys = [],
        data = [];

    angular.forEach(cells, function(cell) {
      var m, r, c, t, key;

      m = cell.id.$t.match(/R(\d+)C(\d+)$/);
      r = parseInt(m[1], 10) - 2; // 0-origin, excepts keys row
      c = parseInt(m[2], 10) - 1; // 0-origin
      t = cell.content.$t;

      // keys row
      if (r < 0) {
        keys[c] = GssManip.trim(t);
      }
      // data rows
      else {
        if(!data[r]){
          data[r] = {};
        }
        key = (keys[c] !== null ? keys[c] : 'C' + (c + 1));
        data[r][key] = t;
      }
    });

    // define empty parameter as a empty string
    angular.forEach(data, function(params) {
      angular.forEach(keys, function(key) {
        if (params[key] === null) {
          params[key] = '';
        }
      });
    });

    return data;
  };

  GssManip.prototype.getData = function() {
    return (this.data !== null ? angular.extend([], this.data) : null);
  };

  GssManip.prototype._load = function(callback, reload) {
    this.callback = callback || angular.noop;

    if (this.data === null || reload) {
      this.preprocess();
      this.ajax();
    }
    else {
      this.loaded();
    }
  };

  GssManip.prototype.load = function(callback, reload) {
    if (this.callback === null) {
      this._load(callback, reload);
    }
    else {
      this.loadQueue.push(arguments);
    }
  };

  GssManip.prototype.reload = function(callback) {
    this.load(callback, true);
  };

  return GssManip;

}]);
