import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Backdrop} from '../../components/Backdrop';
import {Stage} from '../../components/Frame';
import {C} from '../../theme';
import {Phone, Browser} from '../concert-fees/kit';
import * as K from './kit';

/* Still: every piece of this video's kit, for layout review. */
export const YourPriceKit: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Backdrop accent={C.magenta} second={C.cyan} />
      <Stage>
        <G0 x={160} y={330} s={0.5}><Phone><K.RideQuote price="$66.27" color={C.red} note="same ride" /></Phone></G0>
        <K.Couch x={560} y={330} s={0.5} />
        <K.Car x={900} y={330} s={0.6} label="RIDE" />
        <K.Stall x={1300} y={360} s={0.45} />
        <K.Handbag x={1300} y={240} s={0.6} />
        <K.FlatTV x={1700} y={330} s={0.55} />
        {(['pin', 'device', 'cart', 'mouse', 'scroll', 'eye', 'clock', 'baby', 'walk', 'type', 'school', 'dollar', 'student', 'kid', 'bird'] as const).map((ic, i) => (
          <K.Badge2 key={ic} icon={ic} x={80 + i * 122} y={460} s={0.6} color={[C.cyan, C.magenta, C.yellow, C.green][i % 4]} />
        ))}
        <K.StoreFront x={250} y={790} s={0.4} name="TARGET" />
        <K.ParkingLines x={250} y={800} s={0.5} />
        <K.LaptopLid x={560} y={760} s={0.6} label="MAC" />
        <G0 x={900} y={680} s={0.4}><Browser w={820} h={300}><K.HotelRow y={-60} name="The Grand" price="$389" stars={5} fancy /><K.HotelRow y={30} name="Budget Inn" price="$89" stars={3} /></Browser></G0>
        <K.Cereal x={1150} y={800} s={0.6} />
        <K.Pasta x={1240} y={800} s={0.6} />
        <K.PeanutButter x={1330} y={800} s={0.6} />
        <K.Thermometer x={1420} y={800} s={0.6} />
        <K.Moon x={1500} y={700} s={0.6} />
        <K.ShelfLabel x={1640} y={640} s={0.6} price="$4.99" />
        <K.ShelfLabel x={1640} y={760} s={0.6} price="$5.49" digital />
        <K.Sticker x={1820} y={640} s={0.6} price="$3" />
        <K.Cart x={1780} y={900} s={0.35} />
        <K.Plane x={560} y={980} s={0.5} />
        <K.TaxiMeter x={900} y={980} s={0.45} value="$12.40" />
        <K.FlipCoin x={1100} y={980} s={0.6} t={frame / 30} />
      </Stage>
    </AbsoluteFill>
  );
};

const G0: React.FC<{x: number; y: number; s: number; children: React.ReactNode}> = ({x, y, s, children}) => <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
