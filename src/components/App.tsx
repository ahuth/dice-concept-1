import clsx from 'clsx';
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
      <Meter name="Gratitude" value={gratitude} />
      <Meter name="Hydration" value={hydration} />
      <Meter name="Sanity" value={sanity} />
      <ul className="flex justify-center gap-2">
        {dice.map((val, i) => {
          const active = i === selected;
          return (
            <li key={i}>
              <button
                aria-current={active ? true : undefined}
                className={clsx(
                  'rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
                  active && 'ring-2',
                )}
                disabled={val < 0}
                onClick={() =>
                  // Set or unset this die as selected.
                  setSelected((prev) => (prev === i ? undefined : i))
                }
              >
                {Math.abs(val)}
              </button>
            </li>
          );
        })}
      </ul>
      <ul className="flex flex-col gap-2">
        {activities.map((activity) => {
          return (
            <li className="flex items-center gap-2" key={activity.name}>
              <span className="w-32">{activity.name}</span>
              <button
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={selected == undefined || activity.completed}
                onClick={() => {
                  setSelected(undefined);
                  actions.takeAction(activity.name, selected ?? -1);
                }}
              >
                Do it
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!dayIsDone}
        onClick={actions.nextDay}
      >
        Next day
      </button>
    </div>
  );
}
