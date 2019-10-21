import React from 'react';
import PropTypes from 'prop-types';
import { Circle, Text, Label } from 'react-konva';

function RedCircle({ point = { x: 0, y: 0, draggable: false }, setPoint }) {
  const { x, y, draggable } = point;
  return (
    <Label>
      <Circle
        draggable={draggable}
        radius={5.5}
        stroke="red"
        x={x}
        y={y}
        onDragMove={e => setPoint({
          ...point,
          x: e.evt.clientX,
          y: e.evt.clientY,
        })}
      />
      <Text text={`x: ${x}`} x={x - 10} y={y + 10} />
      <Text text={`y: ${y}`} x={x - 10} y={y + 20} />
    </Label>
  )
}

RedCircle.propTypes = {
  setPoint: PropTypes.func.isRequired,
  point: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    draggable: PropTypes.bool.isRequired,
  }).isRequired
}

export default RedCircle;
