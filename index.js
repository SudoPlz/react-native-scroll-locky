import {
  PanResponder,
} from 'react-native';

const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

/**
 * ScrollDirectionLockManager
 * Allows a scrollview to only become the pan responder,
 * if and only if the user is scrolling to the direction that scroll view
 * is intended to scroll in.
 *
 * a.k.a
 *  a horizontal scroll view will only catch the pan responder
 *  if scrolled horizontally, and vice-versa
 */
class ScrollDirectionLockManager {
  constructor(directionLock) {
    this.swipeDirection = null;
    this.directionLock = directionLock;
    this.checkSwipeDirection = this.checkSwipeDirection.bind(this);
    this.clearSwipeDirection = this.clearSwipeDirection.bind(this);
    this.directionIsUknown = this.directionIsUknown.bind(this);
    this.getPanHandlers = this.getPanHandlers.bind(this);
    this.canMove = this.canMove.bind(this);
    this.panHandlers = null;
    if (!this.directionLock) {
      throw new Error('ScrollDirectionLockManager needs a directionLock to operate');
    }
  }

  directionIsUknown() {
    return this.swipeDirection == null;
  }

  checkSwipeDirection(gestureState) {
    if (
      (Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 3)) &&
      (Math.abs(gestureState.vx) > Math.abs(gestureState.vy * 3))
    ) {
      this.swipeDirection = DIRECTION.HORIZONTAL;
    } else {
      this.swipeDirection = DIRECTION.VERTICAL;
    }
  }

  canMove(/* evt, gestureState */) {
    return (this.swipeDirection === this.directionLock);
  }

  clearSwipeDirection(/* evt, gestureState */) {
    this.swipeDirection = null;
  }

  getPanHandlers() {
    if (!this.panHandlers) {
      this.panHandlers = PanResponder.create({
        onMoveShouldSetPanResponder: this.canMove,
        onPanResponderMove: (evt, gestureState) => {
          if (this.directionIsUknown()) {
            this.checkSwipeDirection(gestureState);
          }
        },
        onPanResponderRelease: this.clearSwipeDirection,
      });
    }
    return this.panHandlers.panHandlers;
  }
}

ScrollDirectionLockManager.Direction = DIRECTION;
export default ScrollDirectionLockManager;
