// Generated by CoffeeScript 1.3.3
var BIO;

BIO = {
  __trans: function(bn) {
    var err, i;
    if (!bn || !bn.match(/^\d+$/)) {
      err = new Error();
      err.name = "BIO Error";
      err.message = "'" + bn + "' is not an Integer.";
      throw err;
    }
    return (function() {
      var _i, _len, _ref, _results;
      _ref = bn.replace(/^0+/g, "").split("");
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        i = _ref[_i];
        _results.push(parseInt(i));
      }
      return _results;
    })();
  },
  __cmp: function(na, nb) {
    var i, result, _i, _ref;
    if (na.length > nb.length) {
      return 1;
    } else if (na.length < nb.length) {
      return -1;
    } else {
      result = 0;
      for (i = _i = 0, _ref = na.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (na[i] !== nb[i]) {
          result = (na[i] > nb[i] ? 1 : -1);
          break;
        }
      }
      return result;
    }
  },
  gt: function(a, b) {
    return this.__cmp(this.__trans(a), this.__trans(b)) === 1;
  },
  gte: function(a, b) {
    return this.__cmp(this.__trans(a), this.__trans(b)) >= 1;
  },
  lt: function(a, b) {
    return this.__cmp(this.__trans(a), this.__trans(b)) === -1;
  },
  lte: function(a, b) {
    return this.__cmp(this.__trans(a), this.__trans(b)) <= 0;
  },
  eq: function(a, b) {
    return a === b;
  },
  __carry: function(na) {
    var i, s, _i, _ref;
    for (i = _i = 0, _ref = na.length; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      s = na[i];
      if (s > 9) {
        na[i] = s % 10;
        na[i + 1] += Math.floor(s / 10);
      }
    }
    return na;
  },
  __add: function(na, nb) {
    var i, len, result, _i, _ref;
    len = Math.max(na.length, nb.length);
    result = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= len ? _i <= len : _i >= len; i = 0 <= len ? ++_i : --_i) {
        _results.push(0);
      }
      return _results;
    })();
    na = na.concat().reverse();
    nb = nb.concat().reverse();
    for (i = _i = 0, _ref = len - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      result[i] = (na[i] || 0) + (nb[i] || 0);
    }
    result = this.__carry(result).reverse();
    while (result[0] === 0) {
      result.shift();
    }
    return result;
  },
  add: function(a, b) {
    var na, nb;
    na = this.__trans(a);
    nb = this.__trans(b);
    return this.__add(na, nb).join("");
  },
  __minus: function(na, nb) {
    var i, len, result, s, _i, _j, _ref;
    na = na.concat().reverse();
    nb = nb.concat().reverse();
    len = Math.max(na.length, nb.length);
    result = (function() {
      var _i, _results;
      _results = [];
      for (i = _i = 0; 0 <= len ? _i <= len : _i >= len; i = 0 <= len ? ++_i : --_i) {
        _results.push(0);
      }
      return _results;
    })();
    for (i = _i = 0, _ref = len - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
      result[i] = (na[i] || 0) - (nb[i] || 0);
    }
    for (i = _j = 0; 0 <= len ? _j <= len : _j >= len; i = 0 <= len ? ++_j : --_j) {
      s = result[i];
      if (s < 0) {
        result[i] += 10;
        result[i + 1] -= 1;
      }
    }
    result = result.reverse();
    while (result[0] === 0) {
      result.shift();
    }
    return result;
  },
  minus: function(a, b) {
    var na, nb, result;
    na = this.__trans(a);
    nb = this.__trans(b);
    switch (this.__cmp(na, nb)) {
      case -1:
        result = "-" + this.__minus(nb, na).join("");
        break;
      case 0:
        result = 0;
        break;
      case 1:
        result = this.__minus(na, nb).join("");
    }
    return result;
  },
  __multiplyBySigle: function(a, si) {
    var i, len, na, result, _i, _ref;
    if (si === 0) {
      return [0];
    } else if (si === 1) {
      return a;
    } else {
      na = a.concat().reverse();
      len = na.length;
      na.push(0);
      result = na;
      for (i = _i = 0, _ref = len - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        result[i] *= si;
      }
      result = this.__carry(result).reverse();
      if (result[0] === 0) {
        result.shift();
      }
      return result;
    }
  },
  __lmv: function(a, n) {
    var i;
    if (n > 0) {
      return a.concat((function() {
        var _i, _results;
        _results = [];
        for (i = _i = 1; 1 <= n ? _i <= n : _i >= n; i = 1 <= n ? ++_i : --_i) {
          _results.push(0);
        }
        return _results;
      })());
    } else {
      return a;
    }
  },
  __multiply: function(na, nb) {
    var cache, i, ib, max_idx, result, _i;
    result = [0];
    cache = [];
    max_idx = nb.length - 1;
    for (i = _i = max_idx; max_idx <= 0 ? _i <= 0 : _i >= 0; i = max_idx <= 0 ? ++_i : --_i) {
      ib = nb[i];
      if (!(cache[ib] != null)) {
        cache[ib] = this.__multiplyBySigle(na, ib);
      }
      result = this.__add(result, this.__lmv(cache[ib], max_idx - i));
    }
    return result;
  },
  multiply: function(a, b) {
    var na, nb;
    na = this.__trans(a);
    nb = this.__trans(b);
    if (na.length < nb.length) {
      return this.__multiply(nb, na).join("");
    } else {
      return this.__multiply(na, nb).join("");
    }
  },
  __divide: function(na, nb) {
    var cache, d_len, delta_len, i, left, result, tmp, _i, _j, _multi,
      _this = this;
    result = [0];
    left = na.slice(0);
    cache = [];
    delta_len = na.length - nb.length;
    _multi = function(i) {
      if (!(cache[i] != null)) {
        cache[i] = _this.__multiplyBySigle(nb, i);
      }
      return cache[i];
    };
    for (d_len = _i = delta_len; delta_len <= 0 ? _i <= 0 : _i >= 0; d_len = delta_len <= 0 ? ++_i : --_i) {
      for (i = _j = 1; _j <= 9; i = ++_j) {
        tmp = this.__lmv(_multi(i), d_len);
        if (this.__cmp(left, tmp) === -1) {
          result.push(i - 1);
          left = this.__minus(left, this.__lmv(_multi(i - 1), d_len));
          break;
        }
        if (i === 9) {
          result.push(i);
          left = this.__minus(left, this.__lmv(_multi(i), d_len));
        }
      }
    }
    while (result[0] === 0) {
      result.shift();
    }
    return result;
  },
  divide: function(a, b) {
    var na, nb;
    na = this.__trans(a);
    nb = this.__trans(b);
    switch (this.__cmp(na, nb)) {
      case -1:
        return "0";
      case 0:
        return "1";
      default:
        return this.__divide(na, nb).join("");
    }
  }
};
