import {animated, type SpringValues, type Lookup} from '@react-spring/web';
import {useDice} from '../store';
import Die from './Die';

type Props = {
  onSelect: (index: number) => void;
  selected?: number;
  springs: SpringValues<Lookup>;
};

export default function Dice({onSelect, selected, springs}: Props) {
  const dice = useDice();

  return (
    <ul className="flex justify-center gap-2">
      {dice.map((val, i) => {
        return (
          <animated.li key={i} style={i === selected ? springs : undefined}>
            <Die
              active={i === selected}
              onClick={() => onSelect(i)}
              value={val}
            />
          </animated.li>
        );
      })}
    </ul>
  );
}
