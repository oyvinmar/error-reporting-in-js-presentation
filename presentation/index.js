// Import React
import React from "react";

// Import Spectacle Core tags
import {
  Appear,
  BlockQuote,
  Cite,
  Link,
  CodePane,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
  S,
  Slide,
  Text
} from "spectacle";
import CodeSlide from "spectacle-code-slide";

// Import image preloader util
import preloader from "spectacle/lib/utils/preloader";

// Import theme
import createTheme from "spectacle/lib/themes/default";

// Require CSS
require("normalize.css");
require("spectacle/lib/themes/default/index.css");
require("../assets/override.css");


const images = {
  city: require("../assets/city.jpg"),
  kat: require("../assets/kat.png"),
  logo: require("../assets/formidable-logo.svg"),
  markdown: require("../assets/markdown.png")
};

preloader(images);

const theme = createTheme({
  primary: "#009682",
  secondary: "#424242",
  tertiary: "#FDFDFD",
  quartenary: "white"
}, {
  primary: "Montserrat",
  secondary: "Helvetica"
});

// theme.screen.components.codePane.pre.fontSize = "1.5rem";
theme.screen.components.codePane.pre.fontSize = "1.5rem";
// theme.screen.components.image.margin = "1.5rem auto";
// theme.screen.components.listItem.fontSize = "3.5rem";
// theme.screen.components.listItem.fontWeight = "500";

// const AppearLis  tItem = ({ children }) => <Appear><ListItem>{children}</ListItem></Appear>;

export default class Presentation extends React.Component {
  render() {
    return (
      <Deck transition={[]} transitionDuration={500} theme={theme}>
        <Slide transition={["slide"]} bgColor="primary">
          <Heading size={1} fit lineHeight={1} textColor="secondary">
            Error reporting in JavaScript
          </Heading>
        </Slide>
        <Slide transition={["slide"]} bgColor="primary">
          <span style={{ fontSize: "128px" }}>
            {"\u{1F914}"}
          </span>
        </Slide>
        <Slide transition={["slide"]} bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={1}>
            Exceptions in JavaScript
          </Heading>
          <List textColor="tertiary" ordered>
            <ListItem>Handled exceptions</ListItem>
            <ListItem>Unhandled exceptions</ListItem>
          </List>
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            Handled exception
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/handled-exception.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            Unhandled exception
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/unhandled-exception.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} fit textColor="secondary" lineHeight="2">
            Reporting handled exception
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/reporting-handled-exception.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={1}>
            Reporting unhandled exception
          </Heading>
          <Appear>
            <span>
              <span style={{ fontSize: "128px" }}>
                {"\u{1F914}"}
              </span>
            </span>
          </Appear>
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            Try/Catch
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/reporting-unhandled-exception-try-catch.example")} margin="20px auto" />
        </Slide>
        <Slide bgColor="secondary">
          <Heading size={3} fit textColor="primary" lineHeight={2}>
            GlobalEventHandlers window.onerror
          </Heading>
          <Text textColor="tertiary" style={{ margin: "0 0 3em 0" }} >An event handler for the error event.</Text>
          <Link textColor="tertiary" href="https://developer.mozilla.org/en/docs/Web/API/GlobalEventHandlers/onerror"><S type="underline">See: Mozilla Developer Network</S></Link>
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            window.onerror syntax
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/reporting-unhandled-exception-onerror.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} bgColor="secondary" >
          <Heading size={4} fit textColor="primary" lineHeight="2">
            window.onerror arguments
          </Heading>
          <List textColor="tertiary">
            <ListItem><b>message</b> – The message associated with the error</ListItem>
            <ListItem><b>url</b> – The URL of the script associated with the error</ListItem>
            <ListItem><b>lineNo</b> – The line number (if available)</ListItem>
            <ListItem><b>columnNo</b> – The column number (if available)</ListItem>
            <ListItem><b>error</b> – The Error object associated with this error (if available)</ListItem>
          </List>
        </Slide>
        <Slide transition={["slide"]} bgColor="secondary" >
          <Heading size={3} textColor="primary" lineHeight="2">
            The Error Object
          </Heading>
          <List textColor="tertiary" style={{ margin: "0 0 3em 0" }} >
            <ListItem><b>message</b> – Same as onerror message</ListItem>
            <ListItem><b>fileName</b> – Same as onerror url</ListItem>
            <ListItem><b>lineNumber</b> – Same as onerror</ListItem>
          </List>
          <Link textColor="tertiary" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/" >
            <S type="underline">Source: Mozilla Developer Network</S>
          </Link>
        </Slide>
        <Slide transition={["slide"]} bgColor="secondary" >
          <Text textColor="tertiary" style={{ margin: "0 0 3em 0" }}>May also contain a non-standard property: <b>Error.prototype.stack</b></Text>
          <Link textColor="tertiary" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack">
            <S type="underline"> Source: Mozilla Developer Network</S>
          </Link>
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            Chrome 57
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/chrome-stack.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} >
          <Heading size={3} textColor="secondary" lineHeight="2">
            Firefox 52
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/firefox-stack.example")} margin="20px auto" />
        </Slide>
        <CodeSlide
          lang="js"
          transition={["fade"]}
          transition={[]}
          code={require("raw-loader!../assets/code.example")}
          ranges={[
            { loc: [0, 200], title: "Hello world example" },
            { loc: [0, 1], note: "Import hello world dependencies" },
            { loc: [2, 6], note: "Create sayHelloWorld function" },
            { loc: [3, 4], note: "Call and log hello" }
          ]}
        />

        <Slide transition={["fade"]} bgColor="secondary" textColor="primary">
          <BlockQuote>
            <Quote>Example Quote</Quote>
            <Cite>Author</Cite>
          </BlockQuote>
        </Slide>
      </Deck>
    );
  }
}
