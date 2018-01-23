import React from 'react';
import PropTypes from 'prop-types';

import {
  Appear,
  Image,
  Link,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Slide,
  Text,
} from 'spectacle';
import 'prismjs/components/prism-bash';

import preloader from 'spectacle/lib/utils/preloader';

import createTheme from 'spectacle/lib/themes/default';
import notes from './notes';

// Require CSS
require('normalize.css');
require('./assets/override.css');
require('./assets/prism-tomorrow.css');

const images = {
  mozillaSourceMap: require('./assets/mozilla-source-map.png'),
};

const video = {
  facepalm: require('./assets/facepalm.mp4'),
  sortBug: require('./assets/sort-bug.m4v'),
};

preloader(images);
preloader(video);

const theme = createTheme(
  {
    primary: '#A1D1CA',
    secondary: '#2D2926',
    tertiary: '#FDFDFD',
    quartenary: 'white',
  },
  {
    primary: '-apple-system, BlinkMacSystemFont, Helvetica',
    secondary: '-apple-system, BlinkMacSystemFont, Helvetica',
  },
);

theme.screen.components.codePane.fontSize = '1.4rem';
// console.log(theme);

const AppearListItem = ({ children }) => (
  <Appear>
    <ListItem>{children}</ListItem>
  </Appear>
);

AppearListItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck
        transition={['slide']}
        progress="None"
        transitionDuration={500}
        theme={theme}
      >
        <Slide bgColor="primary" notes="">
          <Heading size={1} lineHeight={1.5} textColor="secondary">
            Error reporting in JavaScript
          </Heading>
        </Slide>
        <Slide bgColor="primary" notes={notes.question}>
          <Heading size={1} textColor="secondary" style={{ fontSize: '15em' }}>
            ?
          </Heading>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={1}>
            Exceptions in JavaScript
          </Heading>
          <List textColor="tertiary" ordered>
            <ListItem>Handled exceptions</ListItem>
            <ListItem>Unhandled exceptions</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Handled exception
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/handled-exception.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Unhandled exception
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/unhandled-exception.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            Reporting handled exception
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/reporting-handled-exception.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={1}>
            Reporting unhandled exception
          </Heading>
          <Appear>
            <span>
              <span style={{ fontSize: '128px' }}>{'\u{1F914}'}</span>
            </span>
          </Appear>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Try/Catch
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/reporting-unhandled-exception-try-catch.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={2}>
            GlobalEventHandler window.onerror
          </Heading>
          <Text textColor="tertiary" style={{ margin: '0 0 3em 0' }}>
            An event handler for the error event.
          </Text>
          <Link
            textColor="tertiary"
            href="https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror"
          >
            Source: Mozilla Developer Network
          </Link>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            window.onerror syntax
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/reporting-unhandled-exception-onerror.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={4} fit textColor="primary" lineHeight="2">
            window.onerror arguments
          </Heading>
          <List textColor="tertiary">
            <ListItem textSize="2.2rem">
              <b>message</b> – The message associated with the error
            </ListItem>
            <ListItem textSize="2.2rem">
              <b>url</b> – The URL of the script associated with the error
            </ListItem>
            <ListItem textSize="2.2rem">
              <b>lineNo</b> – The line number (if available)
            </ListItem>
            <ListItem textSize="2.2rem">
              <b>columnNo</b> – The column number (if available)
            </ListItem>
            <ListItem textSize="2.2rem">
              <b>error</b> – The Error object associated with this error (if
              available)
            </ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            The Error Object
          </Heading>
          <List textColor="tertiary" style={{ margin: '0 0 3em 0' }}>
            <ListItem>
              <b>message</b> – Same as onerror message
            </ListItem>
            <ListItem>
              <b>fileName</b> – Same as onerror url
            </ListItem>
            <ListItem>
              <b>lineNumber</b> – Same as onerror lineNo
            </ListItem>
          </List>
          <Link
            textColor="tertiary"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/"
          >
            Source: Mozilla Developer Network
          </Link>
        </Slide>
        <Slide bgColor="secondary">
          <Text
            textColor="tertiary"
            lineHeight="1.5em"
            style={{ margin: '0 0 3em 0' }}
          >
            May also contain a non-standard property:{' '}
            <b>Error.prototype.stack</b>
          </Text>
          <Link
            textColor="tertiary"
            href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack"
          >
            Source: Mozilla Developer Network
          </Link>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Chrome 57
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/chrome-stack.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Firefox 52
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/firefox-stack.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <video src={video.facepalm} autoPlay />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            Libs to the rescue
          </Heading>
          <List textColor="tertiary">
            <AppearListItem>
              <Link
                textColor="tertiary"
                href="https://github.com/csnover/TraceKit"
              >
                TraceKit
              </Link>
            </AppearListItem>
            <AppearListItem>
              <Link
                textColor="tertiary"
                href="https://github.com/stacktracejs/stacktrace.js/"
              >
                Stacktrace.js
              </Link>
            </AppearListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Stack as an array
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/stack-as-array.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight="2">
            Intermission
          </Heading>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            Backend
          </Heading>
          <List textColor="tertiary">
            <AppearListItem>
              Add endpoint to your backend logging infrastructure
            </AppearListItem>
            <AppearListItem>
              Or use a logging service. (Loggly, Papertrail etc.)
            </AppearListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            Data logged
          </Heading>
          <List textColor="tertiary">
            <ListItem>Level (warning, error, etc)</ListItem>
            <ListItem>Message</ListItem>
            <ListItem>Session id</ListItem>
            <ListItem>Stack info</ListItem>
            <ListItem>User agent</ListItem>
            <ListItem>App state (Redux store)</ListItem>
          </List>
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            Error Reporter
          </Heading>
          <CodePane
            lang="bash"
            source="yarn add ndla-error-reporter"
            margin="20px auto"
          />
          <Link
            textColor="tertiary"
            href="https://github.com/NDLANO/frontend-packages/tree/master/packages/ndla-error-reporter"
          >
            See source code on Github
          </Link>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Error reporter usage (1)
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-usage-1.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide transition={['slide']}>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Error reporter usage (2)
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-usage-2.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            ErrorReporter API
          </Heading>
          <List textColor="tertiary">
            <ListItem>ErrorReporter.captureMessage(msg)</ListItem>
            <ListItem>
              ErrorReporter.captureError(error, [additionalInfo])
            </ListItem>
            <ListItem>ErrorReporter.refresh()</ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            ErrorReporter.captureError
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-capture-error.example')}
            margin="20px auto"
          />
          <Text textColor="secondary" textAlign="left">
            Processes error and sends error info to Loggly with optional
            additional info.
          </Text>
        </Slide>
        <Slide>
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            ErrorReporter onerror handler
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-onerror.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            What can go wrong?
          </Heading>
        </Slide>
        <Slide>
          <video src={video.sortBug} autoPlay />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Check for dupes
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-check-dupes.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            One more spam guard
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/error-reporter-remaining.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} textColor="primary" lineHeight="2">
            Alternative services
          </Heading>
          <List textColor="tertiary">
            <ListItem>
              <Link textColor="tertiary" href="https://sentry.io/welcome/">
                Sentry (Raven.js)
              </Link>
            </ListItem>
            <ListItem>
              <Link textColor="tertiary" href="https://www.bugsnag.com/">
                Bugsnag
              </Link>
            </ListItem>
            <ListItem>
              <Link textColor="tertiary" href="https://trackjs.com/">
                Track:js
              </Link>
            </ListItem>
            <ListItem>
              <Link textColor="tertiary" href="https://raygun.com/">
                Raygun
              </Link>
            </ListItem>
          </List>
        </Slide>
        <Slide>
          <Heading textColor="secondary" lineHeight="2">
            One more thing...
          </Heading>
        </Slide>
        <Slide>
          <Heading size={3} textColor="secondary" lineHeight="2">
            Uglified
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/uglified-stack.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide>
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            Generate separate source-map on (prod) build
          </Heading>
          <CodePane
            lang="js"
            source={require('./assets/uglify-webpack.example')}
            margin="20px auto"
          />
        </Slide>
        <Slide notes="Parse and consume source maps">
          <Heading size={4} textColor="secondary" lineHeight="2">
            Mozilla source-map
          </Heading>
          <Image width="100%" src={images.mozillaSourceMap} />
        </Slide>
        <Slide>
          <Heading fit caps textColor="secondary" lineHeight="2">
            Demo
          </Heading>
        </Slide>
        <Slide bgColor="secondary" transition={['spin', 'slide']}>
          <Heading size={1} fit lineHeight={1.5} textColor="primary">
            Thanks for listening!
          </Heading>
          <Text textAlign="left" textColor="primary" margin="1.5em 0 0 0">
            Links to source code:
          </Text>
          <List textColor="tertiary" style={{ listStyleType: 'none' }}>
            <ListItem>
              <Link
                textColor="tertiary"
                href="https://github.com/NDLANO/frontend-packages/tree/master/packages/ndla-error-reporter"
              >
                Error reporter source
              </Link>
            </ListItem>
            <ListItem>
              <Link
                textColor="tertiary"
                href="https://github.com/NDLANO/frontend-packages/tree/master/packages/ndla-source-map-resolver"
              >
                Source map resolver
              </Link>
            </ListItem>
            <ListItem>
              <Link
                textColor="tertiary"
                href="https://github.com/NDLANO/learningpath-frontend"
              >
                Learningpath frontend
              </Link>
            </ListItem>
          </List>
        </Slide>
      </Deck>
    );
  }
}
