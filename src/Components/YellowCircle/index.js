import React from 'react';
import PropTypes from 'prop-types';
import { Shape, Text, Label } from 'react-konva';

function getCentreOfMass(points = []) {
  const x = points.map(point => point.x).reduce((x, amount) => amount + x, 0) / 4;
  const y = points.map(point => point.y).reduce((y, amount) => amount + y, 0) / 4;

  return { x: Math.round(x), y: Math.round(y) };
}

function getArea(points = []) {
  const [a, b, c,] = points;
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const ac = { x: c.x - a.x, y: c.y - a.y };
  return Math.abs((ab.x * ac.y) - (ab.y * ac.x));
}

function YellowCircle({ points = [] }) {
  const area = getArea(points);
  const { x, y } = getCentreOfMass(points);
  const radius = Math.round(Math.sqrt(area / Math.PI));
  return (
    <Label>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.arc(x, y, radius, 0, 2 * Math.PI, false);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        stroke="yellow"
      />
      <Text text={`x: ${x}`} x={x - 10} y={y + 10} />
      <Text text={`y: ${y}`} x={x - 10} y={y + 20} />
      <Text text={`area: ${area}`} x={x - 10} y={y + 30} />
    </Label>
  )
}

YellowCircle.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired
}

export default YellowCircle;
