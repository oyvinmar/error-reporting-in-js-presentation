# Outline

## Intro

### Question
Big thinking emoji

#### Notes
* Hvor mange logger feil på serverside i prosjektet dere sitter på nå?
* Hvor mange logger feil som oppstår på klient side?


### Exceptions in JS
1. Handled exceptions
2. Unhandled exceptions

#### Notes:

Jeg kommer ikke til å gå veldig inn på feilhåndtering i JS, men det er viktig å skille på to scenarioer.


### Handled exception example
```js
try {
  unstableApiCall('https://our-unreliable-service.com')
} catch (e) {
  console.log('Api call failed');
}
```
```js
fetch('flower.jpg')
  .then(function(response) {
    if(response.ok) {
      return response.blob();
    }
  })
  .catch(function(error) {
    console.log('Fetch operation failed ' + error.message);
  });
```
### Unhandled exception example

```js
var a = { };
var b = { a: a };
a.b = b;
JSON.stringify(a);
```


>TypeError: cyclic object value, Circular reference in value argument not supported

### Reporting handled exceptions
> Easy

```js
try {
  unstableApiCall('https://our-unreliable-service.com')
} catch (e) {
  reportError(e);
}
```

### Reporting unhandled exceptions
Harder :emoji:

But: **Global error event handler**

### GlobalEventHandlers.onerror

An event handler for the error event. Error events are fired at various targets for different kinds of errors:

*When a JavaScript runtime error (including syntax errors and exceptions thrown within handlers) occurs, an error event using interface ErrorEvent is fired at window and window.onerror() is invoked (as well as handlers attached by window.addEventListener (not only capturing).*


Source: MDN

### Syntax (1)

```js
window.onerror = function(messageOrEvent, source, lineno, colno, error) {

}
```

### Syntax (2)

* **messsage** – The message associated with the error, e.g. “Uncaught ReferenceError: foo is not defined”
* **url** – The URL of the script or document associated with the error, e.g. “/dist/app.js”
* **lineNo** – The line number (if available)
* **columnNo** – The column number (if available)
* **error** – The Error object associated with this error (if available)

### The Error Object
* **message** – Human-readable description of the error.
* **fileName** – The value for the fileName property on the created Error object.
* **lineNumber** – The value for the lineNumber property on the created Error object. Defaults to the line number containing the Error() constructor invocation.

#### Notes
Innholder tre standardiserte properties.

Filename: Defaults to the name of the file containing the code that called the Error() constructor.

### The Error Object
> Redundant values that already provided to you via window.onerror

### Error.prototype.stack

May also contain a non-standard property: Error.prototype.stack

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack

#### Notes
This stack property tells you at what source location each frame of the program was when the error occurred. The stack trace can be a critical part of debugging an error. And despite being non-standard, this property is available in every modern browser.

### Error.prototype.stack in Chrome

```js
`Error: foobar
    at new bar (<anonymous>:241:11)
    at foo (<anonymous>:245:5)
    at callFunction (<anonymous>:229:33)
    at Object.InjectedScript._evaluateOn (<anonymous>:875:140)
    at Object.InjectedScript._evaluateAndWrap (<anonymous>:808:34)`
```

### Error.prototype.stack in IE

```js
`Error: foobar
   at bar (Unknown script code:2:5)
   at foo (Unknown script code:6:5)
   at Anonymous function (Unknown script code:11:5)
   at Anonymous function (Unknown script code:10:2)
   at Anonymous function (Unknown script code:1:73)`
```
### Facepalm gif
:facepalm:

### Libs to the rescue

Libraries that normalize stack properties so that it is consistent across browsers:
* TraceKit
* Stacktrace.js

### The stack as an array
```js
"stack":[
  {
    "url":"http://localhost:3000/assets/main.js",
    "func":"createError",
    "args":[],
    "line":3429,
    "column":null
  },
  {"url":"http://localhost:3000/assets/main.js","func":"ReactErrorUtils.invokeGuardedCallback","args":[],"line":1969,"column":null},
  {"url":"http://localhost:3000/assets/main.js","func":"executeDispatch","args":[],"line":1941,"column":null},
  {"url":"http://localhost:3000/assets/main.js","func":"executeDispatchesInOrder","args":[],"line":1941,"column":null},
  {"url":"http://localhost:3000/assets/main.js","func":"executeDispatchesAndRelease","args":[],"line":1305,"column":null},


"stack": [
  {
    "url": "main.fa4ad8bb7fdf85c2f2a4.js",
    "func": "r",
    "args": [],
    "line": 25,
    "column": 183317
  },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "r", "args": [], "line": 11, "column": 118147 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "a", "args": [], "line": 11, "column": 114266 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "u", "args": [], "line": 11, "column": 114483 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "d", "args": [], "line": 11, "column": 51291 }
]
```
### Overview

#### Notes
Nå har vi «det vi trenger» for å begynne å raportere feil og sende de til en logge tjeneste

### Loggly
Loggly logo
#### Notes
Implementasjons detalj

### Loggly data
* Level - e.g. *warning, error*
* App state - Redux store
* StackInfo/Stacktrace
* SessionId - uuid
* userAgent - Chrome 54
* appName - learningpath-frontend/staging

#### Notes

### ErrorReporter singleton
```js
const ErrorReporter = (function Singleton() {
  let instance;
  return {
    getInstance(config) {
      if (!instance) {
        instance = init(config);
      }

      return instance;
    },
  };
}());

export default ErrorReporter;
```
#### Notes
Hvorfor singleton?

### ErrorReporter usage

```js
import ErrorReporter from 'ndla-error-reporter';

const reduxStore = configureStore();

window.errorReporter = ErrorReporter.getInstance({
  logglyApiKey: 'xxx',
  store: reduxStore,
  environment: 'test',
  componentName: 'learningpath-frontend'
});
```

### ErrorReporter usage

```js
// After initial instantiation
import ErrorReporter from 'ndla-error-reporter';

ErrorReporter.getInstance().captureMessage('Testing');
```

### ErrorReporter API
* ErrorReporter.captureError(error, [additionalInfo])
* ErrorReporter.captureMessage(msg)
* ErrorReporter.refresh()

### ErrorReporter.captureError(error, [additionalInfo])
Processes error and sends error info to Loggly with optional additional info.
```js
try {
  // some "dangerous" code
} catch (e) {
  errorReporter.captureError(e, {url: 'http://example.com'});
}
```

### Subscribes to window.onerror
```js
function init(config) {
  // Suscribes to window.onerror
  TraceKit.report.subscribe((stackInfo) => {
    processStackInfo(stackInfo, config);
  });
  ...
}
```

#### Notes
* processStackInfo tar i mot data og sender til Loggly

### What can go wrong?
Drag and drop demo gif

### Check for dupes
```js
function processStackInfo(stackInfo, config, additionalInfo) {
  // Don't send multiple copies of the same error. This fixes a problem when a client goes into an infinite loop
  const firstFrame = stackInfo.stack && stackInfo.stack[0] ? stackInfo.stack[0] : {};
  const deduplicate = [stackInfo.name, stackInfo.message, firstFrame.url, firstFrame.line, firstFrame.func].join('|');

  if (deduplicate !== previousNotification) {
    previousNotification = deduplicate;
    const data = getLogData(stackInfo, config.store, additionalInfo);
    sendToLoggly(data, config);
  }
}
```

### One more spam guard

```js
const ErrorReporter = (function Singleton() {
  let instance;
  let previousNotification;
  let messagesRemaining = 10;

  const sessionId = uuid();

  function sendToLoggly(data, config) {
    if (!config.logglyApiKey || messagesRemaining < 1) {
      return;
    }

    messagesRemaining -= 1;

    send(config.logglyApiKey, extendedData);
  }
```

### Alternative services
* Sentry (Raven.js)
* Bugsnag
* Trackjs
* Raygun

### One more thing

### Uglified
```js
"stack": [
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "r", "args": [], "line": 25, "column": 183317 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "r", "args": [], "line": 11, "column": 118147 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "a", "args": [], "line": 11, "column": 114266 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "u", "args": [], "line": 11, "column": 114483 },
  { "url": "main.fa4ad8bb7fdf85c2f2a4.js", "func": "d", "args": [], "line": 11, "column": 51291 }
]
```
### Dooh
Facepalm emoji/gif

### Generate separate source-map on build

```js
new webpack.optimize.UglifyJsPlugin({
  sourceMap: true
}),

devtool: 'source-map',
```

### Mozilla to the rescue

https://www.npmjs.com/package/source-map

### Demo script

### Thanks for listening

Slides:
* onerror
  * Script Error problem
  * Error object browser support
