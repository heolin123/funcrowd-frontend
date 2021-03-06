"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _SessionManager = _interopRequireDefault(require("../SessionManager"));

var _UserBounty = _interopRequireDefault(require("../models/bounty/UserBounty"));

var _ConfigManager = _interopRequireDefault(require("../config/ConfigManager"));

var _Item = _interopRequireDefault(require("../models/item/Item"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BountyRepository =
/*#__PURE__*/
function () {
  function BountyRepository() {
    _classCallCheck(this, BountyRepository);
  }

  _createClass(BountyRepository, null, [{
    key: "all",
    value: function all() {
      return _axios["default"].get(_ConfigManager["default"].baseUrl + '/api/v1/packages/status/', _SessionManager["default"].config).then(function (response) {
        var bounties = response.data.map(function (bounty_data) {
          return _UserBounty["default"].fromJson(bounty_data);
        });
        return bounties;
      });
    }
  }, {
    key: "get",
    value: function get(bountyId) {
      return _axios["default"].get(_ConfigManager["default"].baseUrl + '/api/v1/packages/' + bountyId + '/status/', _SessionManager["default"].config).then(function (response) {
        var bounty = _UserBounty["default"].fromJson(response.data);

        return bounty;
      });
    }
  }, {
    key: "getNextItem",
    value: function getNextItem(bountyId) {
      return _axios["default"].get(_ConfigManager["default"].baseUrl + '/api/v1/packages/' + bountyId + '/items/next/', _SessionManager["default"].config).then(function (response) {
        var item = _Item["default"].fromJson(response.data);

        return item;
      });
    }
  }]);

  return BountyRepository;
}();

exports["default"] = BountyRepository;