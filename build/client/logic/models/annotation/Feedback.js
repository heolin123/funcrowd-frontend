"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Feedback =
/*#__PURE__*/
function () {
  function Feedback(score, scores, values, type) {
    _classCallCheck(this, Feedback);

    this.score = score;
    this.scores = scores;
    this.values = values;
    this.type = type;
  }

  _createClass(Feedback, null, [{
    key: "fromJson",
    value: function fromJson(feedback_data) {
      if (feedback_data) {
        var feedback = new Feedback(feedback_data.score, feedback_data.scores, feedback_data.values, feedback_data.type);
        return feedback;
      }
    }
  }]);

  return Feedback;
}();

exports["default"] = Feedback;