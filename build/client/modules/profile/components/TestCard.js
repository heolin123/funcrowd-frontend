"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _LocalizationManager = _interopRequireDefault(require("../../../logic/locatization/LocalizationManager"));

var _Icons = require("../../../components/Icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TestCard =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TestCard, _React$Component);

  function TestCard() {
    _classCallCheck(this, TestCard);

    return _possibleConstructorReturn(this, _getPrototypeOf(TestCard).apply(this, arguments));
  }

  _createClass(TestCard, [{
    key: "render",
    value: function render() {
      var isUnlocked = false;
      var score = 0;
      var maxScore = 0;
      this.props.testResults.forEach(function (result) {
        if (result.status !== "LOCKED") isUnlocked = true;
        score += result.score;
        maxScore += result.maxScore;
      });
      var iconName = "task/test_grey";
      var scores = "";
      var message = "Rozwiąż test aby zobaczyć wynik";
      var className = "locked";

      if (isUnlocked) {
        scores = (score || 0) + "/" + maxScore + " pytań";
        iconName = isUnlocked ? "task/test_blue" : "task/test_grey";
        message = "Odpowiedziałeś/łaś dobrze na:";
        className = "";
      }

      return _react["default"].createElement("div", {
        className: "col-3 d-inline-block",
        style: {
          verticalAlign: "top"
        }
      }, _react["default"].createElement("div", {
        className: "test-card card-2-static " + className
      }, _react["default"].createElement("div", {
        className: "small"
      }, _react["default"].createElement("b", null, this.props.name)), _react["default"].createElement(_Icons.Icon, {
        className: "test-card-icon",
        name: iconName
      }), _react["default"].createElement("div", {
        className: "little",
        style: {
          marginBottom: "8px"
        }
      }, message), _react["default"].createElement("div", {
        style: {
          minHeight: "25px"
        }
      }, _react["default"].createElement("b", null, scores))));
    }
  }]);

  return TestCard;
}(_react["default"].Component);

exports["default"] = TestCard;