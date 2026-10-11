import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Paper, Stage} from '../../components/Frame';
import {C} from '../../theme';
import * as K from './kit';

/* Still: every kit piece at a glance, for layout review. */
export const KitSheet: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Paper />
      <Stage>
        <K.ConcertTicket x={260} y={160} />
        <K.Receipt x={720} y={40} s={0.7} lines={[{label: 'Ticket', amount: '$50.00', t: 1, color: C.cyan}, {label: 'Service fee', amount: '$10.00', t: 1, color: C.magenta}, {label: 'Tax', amount: '$4.70', t: 0.5}]} total={{label: 'TOTAL', amount: '$70.70', t: 1}} />
        <K.Phone x={1130} y={250} s={0.6}><K.Button text="BUY" /></K.Phone>
        <K.Venue x={1600} y={330} s={0.7} frame={frame} />
        <K.Pie x={180} y={540} s={0.6} slices={[{v: 50, color: C.cyan, label: 'A'}, {v: 30, color: C.magenta, label: 'B', pop: 1}, {v: 20, color: C.yellow}]} />
        <K.Donut x={480} y={540} s={0.6} pct={86} label="CONCERTS" />
        <K.Contract x={760} y={560} s={0.6} sign={1} seal={1} />
        <K.Door x={1000} y={700} s={0.6} label="ONE DOOR" open={0.3} />
        <K.Shop x={1250} y={700} s={0.6} sign="SOLD OUT" />
        <K.Bot x={1480} y={700} s={0.8} />
        <K.Courthouse x={1730} y={700} s={0.5} />
        <K.Capitol x={200} y={1000} s={0.5} />
        <K.LineChart x={560} y={1000} s={0.4} pts={[1, 1.1, 1.3, 1.6]} labels={['19', '20', '21', '22']} />
        <K.Timer x={850} y={900} s={0.5} text="09:59" t={0.7} />
        <K.BoxOffice x={1050} y={1040} s={0.4} />
        <K.Bill x={1250} y={950} s={0.7} value="$20" />
        <K.Stock x={1480} y={950} s={0.5} name="SEATS" change="9.3%" />
        <K.Bubble x={1760} y={930} s={0.6} text={'Robbing\nthem blind'} />
        <K.Seat x={1820} y={560} s={0.6} />
        <K.Email x={1500} y={480} s={0.4} text="robbing them blind" />
      </Stage>
    </AbsoluteFill>
  );
};
