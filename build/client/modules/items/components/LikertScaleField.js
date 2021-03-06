"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RadioElement = _interopRequireDefault(require("./element/RadioElement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LikertScaleField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LikertScaleField, _React$Component);

  function LikertScaleField(props) {
    var _this;

    _classCallCheck(this, LikertScaleField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LikertScaleField).call(this, props));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(LikertScaleField, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.props.onChange(event);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      var result = nextProps.value !== this.props.value;
      return result;
    }
  }, {
    key: "render",
    value: function render() {
      /*
      let options = this.props.source.map((option) =>
                        */
      var options = [];
      var min = this.props.source['min'];
      var max = this.props.source['max'];
      var count = this.props.source['count'];
      var labelsClassName = this.props.source['labels'] === true ? "radio-likert-value-label" : "";

      for (var i = 0; i < count; i++) {
        var value = min['value'] + i * (max['value'] - min['value'] + 1) / count;
        options.push(_react["default"].createElement(_RadioElement["default"], {
          key: value,
          label: value,
          name: this.props.name,
          className: "radio-likert",
          labelsClassName: labelsClassName,
          onChange: this.handleChange,
          required: this.props.required,
          value: value
        }));
      }

      var label;
      if (this.props.label) label = _react["default"].createElement("label", null, _react["default"].createElement("strong", null, this.props.label));
      return _react["default"].createElement("div", {
        className: "form-group"
      }, label, _react["default"].createElement("div", {
        className: "position-relative"
      }, _react["default"].createElement("div", {
        className: "d-lg-inline-block radio-likert-label min"
      }, _react["default"].createElement("small", null, _react["default"].createElement("b", null, min['text']))), _react["default"].createElement("div", {
        className: "d-inline-block"
      }, options), _react["default"].createElement("div", {
        className: "d-inline-block radio-likert-label max"
      }, _react["default"].createElement("small", null, _react["default"].createElement("b", null, max['text'])))));
    }
  }]);

  return LikertScaleField;
}(_react["default"].Component);

exports["default"] = LikertScaleField;