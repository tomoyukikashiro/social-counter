'use strict';

/**
 * @class parser for google spread sheet json format
 *        Thank you your kindness @debiru
 *        http://jsdo.it/debiru/jCkS
 *
 * @return {[type]} [description]
 */
angular.module('socialCounterApp').factory('GssManip', [function () {

  function GssManip(ssid, sid){
    this.ssid      = ssid;
    this.sid       = sid;
    this.jsonUrl   = 'https://spreadsheets.google.com/feeds/cells/' + this.ssid + '/' + this.sid + '/public/basic?alt=json-in-script';
    this.data      = null;
    this.callback  = null;
    this.$event    = $({});
    this.loadQueue = [];

    this.onloaded($.proxy(function() {
      this.callback(this.getData());

      this.postprocess();

      if (this.loadQueue.length > 0) {
        this._load.apply(this, this.loadQueue.shift());
      }
    }, this));
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
    this.$event.on('loaded', callback);
  };

  GssManip.prototype.loaded = function() {
    this.$event.trigger('loaded');
  };

  GssManip.prototype.done = function(res) {
    this.data = this.parseFeedEntry(res.feed.entry);
  };

  GssManip.prototype.fail = function() {
    this.data = null;
  };

  GssManip.prototype.always = function() {
    this.loaded();
  };

  GssManip.prototype.ajax = function() {
    return $.ajax({
      type     : 'GET',
      dataType : 'jsonp',
      url      : this.jsonUrl
    }).done($.proxy(this.done, this)).fail($.proxy(this.fail, this)).always($.proxy(this.always, this));
  };

  GssManip.prototype.parseFeedEntry = function(cells) {
    var keys = [],
        data = [];

    $.each(cells, function(idx, cell) {
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
    $.each(data, function(i, params) {
      $.each(keys, function(k, key) {
        if (params[key] === null) {
          params[key] = '';
        }
      });
    });

    return data;
  };

  GssManip.prototype.getData = function() {
    return (this.data !== null ? $.extend(true, [], this.data) : null);
  };

  GssManip.prototype._load = function(callback, reload) {
    this.callback = callback || $.noop;

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
