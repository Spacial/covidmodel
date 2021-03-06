import * as React from 'react';
import {LinePath} from '../path';
import {useGraphData} from './useGraphData';
import {useNearestPoint} from './useNearestPoint';
import {usePreviousValue} from '../util';

const {useCallback, useMemo} = React;

const NearestCircle = ({y, ...remaining}) => {
  const nearest = useNearestPoint(y);
  return (
    nearest && <circle cx={nearest.x} cy={nearest.y} r="2.5" {...remaining} />
  );
};

export const Line = ({
  y,
  stroke,
  strokeWidth = 1.5,
  dot = true,
  ...remaining
}) => {
  const {clipPath, data, scrubber, x, xMax, xScale, yScale} = useGraphData();
  const xMaxPrev = usePreviousValue(xMax);

  const xFn = useCallback((...d) => xScale(x(...d)), [x, xMax, xScale]);
  const yFn = useCallback((...d) => yScale(y(...d)), [y, yScale]);

  return (
    <>
      <LinePath
        clipPath={clipPath}
        {...remaining}
        data={data}
        x={xFn}
        y={yFn}
        stroke={stroke}
        strokeWidth={strokeWidth}
        immediate={xMax !== xMaxPrev}
      />
      {scrubber && dot && (
        <NearestCircle y={y} fill={stroke} clipPath={clipPath} />
      )}
    </>
  );
};
