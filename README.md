# react-native-scroll-locky


### Why?

Ever found yourself in need of a way to nest 2 scroll views (or list views, or flat lists, or virtualised lists)?
Then you know that the lists are not smart enough to know when to respond to the pan gestures.

This simple utility makes sure that the component you add it to only responds to a specific direction gesture,
a.k.a we LOCK the list pan responses only to the direction we want it to respond to.


### Installation

`npm install react-native-scroll-locky`


### Usage


```
import RNLocky from "react-native-scroll-locky";

class AClass extends Component {
  constructor(props) {
    super(props);
    this.directionLockPanHandler = new ScrollDirectionLockManager(
      ScrollDirectionLockManager.Direction.HORIZONTAL,
      // or ScrollDirectionLockManager.Direction.VERTICAL
    );
  }
  
  render() {
      return (
          <ScrollView
              {...this.directionLockPanHandler.getPanHandlers()}
          >
            <ScrollView>
                ...
            </ScrollView>
          </ScrollView>
      );
  }
}

```
