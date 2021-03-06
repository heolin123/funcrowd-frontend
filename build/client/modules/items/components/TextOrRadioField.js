"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _RadioElement = _interopRequireDefault(require("./element/RadioElement"));

var _RadioOtherElement = _interopRequireDefault(require("./element/RadioOtherElement"));

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

var TextOrRadioField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TextOrRadioField, _React$Component);

  function TextOrRadioField(props) {
    var _this;

    _classCallCheck(this, TextOrRadioField);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TextOrRadioField).call(this, props));
    _this.state = {
      otherSelected: false
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(TextOrRadioField, [{
    key: "handleChange",
    value: function handleChange(event) {
      var other = document.getElementById(this.props.name + "-other");
      this.setState({
        otherSelected: other.checked
      });
      console.log(event.target);
      this.props.onChange(event);
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.value !== this.props.value) return true;
      if (nextState.otherSelected !== this.state.otherSelected) return true;
      return false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var order = this.props.source.order;

      var textElement = _react["default"].createElement(_RadioOtherElement["default"], {
        key: "other",
        className: "small",
        name: this.props.name,
        onChange: this.handleChange,
        required: this.props.required,
        text: this.props.source.label,
        disabled: !this.state.otherSelected
      });

      var values = this.props.source.values;
      var options = values.map(function (option) {
        return _react["default"].createElement(_RadioElement["default"], {
          key: option,
          className: "small",
          name: _this2.props.name,
          onChange: _this2.handleChange,
          required: _this2.props.required,
          value: option
        });
      });
      if (order === 'first') options.unshift(textElement);else options.push(textElement);
      var label;
      if (this.props.label) label = _react["default"].createElement("label", null, _react["default"].createElement("strong", null, this.props.label));
      return _react["default"].createElement("div", {
        className: "form-group"
      }, label, _react["default"].createElement("div", null, options));
    }
  }]);

  return TextOrRadioField;
}(_react["default"].Component);

exports["default"] = TextOrRadioField;