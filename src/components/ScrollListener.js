// //import rafSchedule from 'raf-schd';

// class ScrollListener extends Component {
//   constructor(props) {
//     super(props);

//     this.handleScroll = this.handleScroll.bind(this);

//     // Create a new function to schedule updates.
//     this.scheduleUpdate = rafSchedule(
//       point => this.props.onScroll(point)
//     );
//   }

//   handleScroll(e) {
//     // When we receive a scroll event, schedule an update.
//     // If we receive many updates within a frame, we'll only publish the latest value.
//     this.scheduleUpdate({ x: e.clientX, y: e.clientY });
//   }

//   componentWillUnmount() {
//     // Cancel any pending updates since we're unmounting.
//     this.scheduleUpdate.cancel();
//   }

//   render() {
//     return (
//       <div
//         style={{ overflow: 'scroll' }}
//         onScroll={this.handleScroll}
//       >
//         <img src="/my-huge-image.jpg" />
//       </div>
//     );
//   }
// }