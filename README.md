# socket-chat

# Demo Details

## How to use
Username: TestUser
Password: test

On incorrect credentials LoginDialog animates and an error message is shown.

Transitions between loggedIn and loggedOut state fluidly.

Type messages into input and press enter (or click send) to emit 'message' events (Empty messages will be ignored).

To simulate receiving 'command' events from the server you can type '/command' into the chat input which will emit a 'command' event to the server and receive a widget command back. If this widget command has been received before this chat session then nothing happens and a console log is added, otherwise displays the widget

Styling is fully responsive with an alternate, more concise design for mobile views to better use the smaller space.

## Design philosophy
Main brand colours are #45b985 ($socketChatDarkGreen), #35495e ($socketChatDarkBlue) and white because they're high constrast while being pleasing to the eye and affording a clean uncluttered look.

The design for the brand logo plays on the concept of 'sockets' as being a means of connecting two endpoints and allowing messages through and it evokes this imagery with the two 'portals' that bisect the app name. A minimalistic font was chosen to compliment the simple style of the rest of the app.

The various buttons the user can interact with ('Send', Response options buttons) share a colour and rounded style so that a user learns to associate that colour with interactiveness. Similarly the logoutButton's positioning in the top right is consistent with many applications and the hover turning it the same colour as the buttons reinforces this understanding.

The chat messages are designed to look like speech bubbles coming from each side of the conversation.

When displaying the widgets it was chosen to display them as if they were simple chat messages rather than as a modal on top in order to better tie in to the experience as a chat application and make them feel more natural and streamlined. Similarly the responses on clicking a button get emitted as a message from the user to reinforce this experience.

## Future improvements
* Track connected state of the socket and don't try and send messages if it's not connected
    * Keep track of messages sent while not connected and send them once the connection re-establishes
* Make chat input richer:
    * Make it a text area so new lines are available
    * Allow bold/italics/other text decoration
    * Allow emojis
* Implement more tests for the various components

# Dev Details
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
When server is running app can be accessed from 'http://localhost:8080/'

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```