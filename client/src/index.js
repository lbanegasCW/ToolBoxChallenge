/**
 * Client entrypoint.
 *
 * Responsibilities:
 * - Load Bootstrap styles.
 * - Mount the React application into the root DOM node.
 *
 * @module index
 */

require('bootstrap/dist/css/bootstrap.min.css')
require('./index.css')

const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./App')

ReactDOM.render(
  React.createElement(React.StrictMode, null, React.createElement(App)),
  document.getElementById('root')
)
