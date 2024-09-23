import {useSpring} from '@react-spring/web';
import {useState} from 'react';
import {
  useActions,
  useActivities,
  useDay,
  useGraditude,
  useHydration,
  useSanity,
} from '../store';
import Activities from './Activities';
import Button from './Button';
import Dice from './Dice';
import Meter from './Meter';

export default function App() {
  const actions = useActions();
  const activities = useActivities();
  const day = useDay();
  const gratitude = useGraditude();
  const hydration = useHydration();
  const sanity = useSanity();

  const [selected, setSelected] = useState<number>();

  const [springs, animateApi] = useSpring(() => ({
    from: {rotate: 0},
  }));

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <span>Day: {day}</span>
      <p className="max-w-prose">
        Maintain your gratitude, hydration, and sanity. Roll a die against
        another one assigned to an activity of your choice. If your die is
        higher, you're successful at it (your mother would be so proud).
      </p>
      <p className="max-w-prose">
        When there are no more activities to do, the day ends. You'll lose 15
        points off each category. Then the next day begins and you get a fresh
        set of dice. Good luck!
      </p>
      <Meter name="Gratitude" value={gratitude} />
      <Meter name="Hydration" value={hydration} />
      <Meter name="Sanity" value={sanity} />
      <Dice
        onSelect={(i) => {
          // Set or unset this die as selected.
          setSelected((prev) => (prev === i ? undefined : i));
        }}
        selected={selected}
        springs={springs}
      />
      <Activities
        disabled={selected == undefined}
        onDoActivity={(name) => {
          animateApi.start({
            from: {
              rotate: 0,
            },
            to: {
              rotate: 360,
            },
            onRest: () => {
              setSelected(undefined);
              actions.takeAction(name, selected ?? -1);
            },
          });
        }}
      />
      <Button
        disabled={activities.some((activity) => activity.status === 'todo')}
        onClick={actions.nextDay}
      >
        Next day
      </Button>
    </div>
  );
}
