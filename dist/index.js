"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _api = _interopRequireDefault(require("./routes/api"));

var _rateLimiter = _interopRequireDefault(require("./lib/rateLimiter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
app.set('port', process.env.PORT || 5000);
app.use(_bodyParser.default.json());
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use((0, _cors.default)());
app.use(_rateLimiter.default);
app.use('/', _api.default);
app.listen(app.get('port'), () => {
  console.log(`Express server listening on port: ${app.get('port')}`);
});