"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _FeedbackTypes = _interopRequireDefault(require("./FeedbackTypes"));

var _FeedbackModal = _interopRequireDefault(require("./FeedbackModal"));

var _LocalizationManager = _interopRequireDefault(require("../../logic/locatization/LocalizationManager"));

var _feedback_survey = _interopRequireDefault(require("../../static/img/feedback/feedback_survey.svg"));

var _BinaryFeedbackModal = _interopRequireDefault(require("./BinaryFeedbackModal"));

var _PointsFeedbackModal = _interopRequireDefault(require("./PointsFeedbackModal"));

var _BinaryPointsFeedbackModal = _interopRequireDefault(require("./BinaryPointsFeedbackModal"));

var _QuizFeedbackModal = _interopRequireDefault(require("./QuizFeedbackModal"));

var _ConfigManager = _interopRequireDefault(require("../../logic/config/ConfigManager"));

var _ClassificationFeedbackModal = _interopRequireDefault(require("./ClassificationFeedbackModal"));

var _RegressionFeedbackModal = _interopRequireDefault(require("./RegressionFeedbackModal"));

var _NERFeedbackModal = _interopRequireDefault(require("./NERFeedbackModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _FeedbackFactory =
/*#__PURE__*/
function () {
  function _FeedbackFactory() {
    _classCallCheck(this, _FeedbackFactory);
  }

  _createClass(_FeedbackFactory, [{
    key: "create",
    value: function create(type, isOpen, onAccept, task, annotation, feedback, exp) {
      if (_ConfigManager["default"].profile.exp === false && type === _FeedbackTypes["default"].POINTS) type = _FeedbackTypes["default"].BINARY_POINTS;
      if (_ConfigManager["default"].config.showFeedback === false) type = _FeedbackTypes["default"].CONFIRM_ONLY;

      switch (type) {
        case _FeedbackTypes["default"].NONE:
          return null;

        case _FeedbackTypes["default"].CONFIRM_ONLY:
          return _react["default"].createElement(_FeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            headerText: _LocalizationManager["default"].feedback.annotationSaved,
            message: _LocalizationManager["default"].feedback.annotationSavedMessage,
            image: _feedback_survey["default"],
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        case _FeedbackTypes["default"].QUIZ:
          return _react["default"].createElement(_QuizFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            headerText: _LocalizationManager["default"].feedback.annotationSaved,
            message: _LocalizationManager["default"].feedback.annotationSavedMessage,
            image: _feedback_survey["default"],
            annotation: annotation,
            feedback: feedback,
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        case _FeedbackTypes["default"].BINARY:
          return _react["default"].createElement(_BinaryFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            feedback: feedback
          });

        case _FeedbackTypes["default"].BINARY_POINTS:
          return _react["default"].createElement(_BinaryPointsFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            feedback: feedback,
            annotation: annotation,
            task: task,
            exp: exp
          });

        case _FeedbackTypes["default"].POINTS:
          return _react["default"].createElement(_PointsFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            feedback: feedback,
            annotation: annotation,
            task: task,
            exp: exp
          });

        case _FeedbackTypes["default"].QUESTIONNAIRE:
          return _react["default"].createElement(_FeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            headerText: _LocalizationManager["default"].feedback.questionnaireSaved,
            message: _LocalizationManager["default"].feedback.questionnaireSavedMessage,
            image: _feedback_survey["default"],
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        case _FeedbackTypes["default"].CLASSIFICATION:
          return _react["default"].createElement(_ClassificationFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            annotation: annotation,
            feedback: feedback,
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        case _FeedbackTypes["default"].REGRESSION:
          return _react["default"].createElement(_RegressionFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            annotation: annotation,
            feedback: feedback,
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        case _FeedbackTypes["default"].NER:
          return _react["default"].createElement(_NERFeedbackModal["default"], {
            isOpen: isOpen,
            onAccept: onAccept,
            annotation: annotation,
            feedback: feedback,
            buttonText: _LocalizationManager["default"].feedback.nextItem
          });

        default:
          return null;
      }
    }
  }]);

  return _FeedbackFactory;
}();

var FeedbackFactory = new _FeedbackFactory();
var _default = FeedbackFactory;
exports["default"] = _default;