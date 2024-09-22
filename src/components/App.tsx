import {useState} from 'react';
import {
  useActions,
  useActivities,
  useDay,
  useDice,
  useGraditude,
  useHydration,
  useSanity,
} from '../store';
import Activity from './Activity';
import Button from './Button';
import Die from './Die';
import Meter from './Meter';

export default function App() {
  const [selected, setSelected] = useState<number>();

  const actions = useActions();
  const activities = useActivities();
  const day = useDay();
  const dice = useDice();
  const gratitude = useGraditude();
  const hydration = useHydration();
  const sanity = useSanity();

  const dayIsDone = activities.every((activity) => activity.completed);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <span>Day: {day}</span>
      <p className="max-w-prose">
        Maintain your gratitude, hydration, and sanity by selecting dice and
        applying them to various activities. Every day you'll get a new set of
        dice.
      </p>
      <Meter name="Gratitude" value={gratitude} />
      <Meter name="Hydration" value={hydration} />
      <Meter name="Sanity" value={sanity} />
      <ul className="flex justify-center gap-2">
        {dice.map((val, i) => {
          return (
            <li key={i}>
              <Die
                active={i === selected}
                onClick={() =>
                  // Set or unset this die as selected.
                  setSelected((prev) => (prev === i ? undefined : i))
                }
                value={val}
              />
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col gap-2">
        {activities.map((activity) => {
          return (
            <Activity
              disabled={selected == undefined || activity.completed}
              name={activity.name}
              onClick={() => {
                setSelected(undefined);
                actions.takeAction(activity.name, selected ?? -1);
              }}
            />
          );
        })}
      </ul>
      <Button disabled={!dayIsDone} onClick={actions.nextDay}>
        Next day
      </Button>
    </div>
  );
}
