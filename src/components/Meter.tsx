import {useId} from 'react';

type Props = {
  max?: number;
  name: string;
  value: number;
};

export default function Meter({max = 100, name, value}: Props) {
  const id = useId();
  return (
    <div className="flex justify-center gap-2">
      <label className="w-20" htmlFor={id}>
        {name}
      </label>
      <meter
        id={id}
        low={max * 0.25}
        high={max * 0.75}
        min="0"
        max={max}
        value={value}
      />
      <span>
        {value}/{max}
      </span>
    </div>
  );
}
