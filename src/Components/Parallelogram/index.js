import React from 'react';
import PropTypes from 'prop-types';
import { Shape } from 'react-konva';

function Parallelogram({ points = [] }) {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.map(point => context.lineTo(point.x, point.y));
        context.closePath();
        context.fillStrokeShape(shape);
      }}
      stroke="blue"
    />
  )
}

Parallelogram.propTypes = {
  points: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  })).isRequired
}

export default Parallelogram;
