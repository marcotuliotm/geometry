import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import RedCircle from './Components/RedCircle';
import YellowCircle from './Components/YellowCircle';
import Parallelogram from './Components/Parallelogram';

class App extends Component {

  state = {
    points: [],
    parallelogram: null,
    yellowCircle: null,
  }

  createLastPoint = (points = []) => {
    const [a, b, c,] = points;
    const x = a.x - b.x + c.x;
    const y = a.y - b.y + c.y;
    return { id: 3, x, y, draggable: false };
  }

  setPoint = pointUpdate => {
    const { points } = this.state;
    this.updatePoint(points, pointUpdate);
    const lastPoint = this.createLastPoint(points);
    this.updatePoint(points, lastPoint);
    const yellowCircle = (<YellowCircle points={points} />);
    this.setState({ points, yellowCircle });
  }

  updatePoint = (points, pointUpdate) => points
    .filter(point => point.id === pointUpdate.id)
    .map(point => {
      point.x = pointUpdate.x
      point.y = pointUpdate.y
      return point;
    })

  handleClickPoint = e => {
    const { clientX, clientY } = e.evt;
    const { points } = this.state;
    if (points.length < 3) {
      points.push({ id: points.length, x: clientX, y: clientY, draggable: false });
      if (points.length === 3) {
        this.createParallelogram(points);
      } else {
        this.setState({ points });
      }
    }
  }

  createParallelogram = points => {
    points.map(point => point.draggable = true);
    const lastPoint = this.createLastPoint(points);
    points.push(lastPoint);
    const parallelogram = (<Parallelogram points={points} />);
    const yellowCircle = (<YellowCircle points={points} />);
    this.setState({ points, parallelogram, yellowCircle });
  }

  handleClick = () => this.setState({
    points: [],
    parallelogram: null,
    yellowCircle: null,
  });

  render() {
    const { points, parallelogram, yellowCircle } = this.state;
    return (
      <main>
        <button onClick={this.handleClick}>
          Reset
        </button>
        <Stage width={window.innerWidth} height={window.innerHeight} onClick={this.handleClickPoint}>
          <Layer>
            {parallelogram}
            {yellowCircle}
            {points.length > 0 ? points.map((point, key) => (<RedCircle key={key} point={point} setPoint={this.setPoint} />)) : null}
          </Layer>
        </Stage>
      </main>
    );
  }
}

export default App;
