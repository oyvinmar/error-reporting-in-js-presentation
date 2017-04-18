// Import React
import React from "react";

// Import Spectacle Core tags
import {
  BlockQuote,
  CodePane,
  Cite,
  Deck,
  Heading,
  ListItem,
  List,
  Quote,
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
          <Heading size={4} textColor="secondary" lineHeight="2">
            Handled exception
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/handle-exception.example")} margin="20px auto" />
        </Slide>
        <Slide>
          <Heading size={4} textColor="secondary" lineHeight="2">
            Unhandled exception
          </Heading>
          <CodePane lang="js" source={require("raw-loader!../assets/unhandle-exception.example")} margin="20px auto" />
        </Slide>
        <Slide transition={["slide"]} bgColor="tertiary">
          <Heading size={6} textColor="primary" caps>Typography</Heading>
          <Heading size={1} textColor="secondary">Heading 1</Heading>
          <Heading size={2} textColor="secondary">Heading 2</Heading>
          <Heading size={3} textColor="secondary">Heading 3</Heading>
          <Heading size={4} textColor="secondary">Heading 4</Heading>
          <Heading size={5} textColor="secondary">Heading 5</Heading>
          <Text size={6} textColor="secondary">Standard text</Text>
        </Slide>
        <Slide transition={["slide"]} bgColor="primary" textColor="tertiary">
          <Heading size={6} textColor="secondary" caps>Standard List</Heading>
          <List>
            <ListItem>Item 1</ListItem>
            <ListItem>Item 2</ListItem>
            <ListItem>Item 3</ListItem>
            <ListItem>Item 4</ListItem>
          </List>
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
