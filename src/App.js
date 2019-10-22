import React, { Component } from 'react'
import { Stage, Layer } from 'react-konva'
import RedCircle from './Components/RedCircle'
import YellowCircle from './Components/YellowCircle'
import Parallelogram from './Components/Parallelogram'
import Button from './Components/Button'
import Modal from './Components/Modal'

import './App.css';

class App extends Component {
  state = {
    points: [],
    parallelogram: null,
    yellowCircle: null,
    modal: false,
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
    const { offsetX, offsetY } = e.evt;
    const { points } = this.state;
    if (points.length < 3) {
      points.push({ id: points.length, x: offsetX, y: offsetY, draggable: false });
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

  handleClickReset = () => this.setState({
    points: [],
    parallelogram: null,
    yellowCircle: null,
  });

  handleClickModal = () => this.setState({
    modal: !this.state.modal,
  });

  render() {
    const { points, parallelogram, yellowCircle, modal } = this.state;
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">0+X Geometry</h1>
          <div className="app__buttons">
            <Button onClick={this.handleClickReset} text="Reset" />
            <Button onClick={this.handleClickModal} text="About" />
          </div>
        </header>
        <main className="app__content">
          {modal ?
            (<Modal
              title="JavaScript assignment"
              text={`This project consists of the user being able to choose three arbitrary points by clicking on the screen being the fourth created by the application along with a parallelogram
              and a circle with the same area as this parallelogram.
              The three user-created points can be dragged by the user at the same time as the parallelogram and circle are redrawn.`}
              onClick={this.handleClickModal}
            />) : null}
          <Stage className="canvas" width={window.innerWidth - 32} height={window.innerHeight - 90} onClick={this.handleClickPoint}>
            <Layer>
              {parallelogram}
              {yellowCircle}
              {points.length > 0 ? points.map((point, key) => (<RedCircle key={key} point={point} setPoint={this.setPoint} />)) : null}
            </Layer>
          </Stage>
        </main>
      </div>
    );
  }
}

export default App;