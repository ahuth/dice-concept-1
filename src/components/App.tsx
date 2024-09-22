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

export default function App() {
  const [selected, setSelected] = useState<number>();

  const actions = useActions();
  const activities = useActivities();
  const day = useDay();
  const dice = useDice();
  const gratitude = useGraditude();
  const hydration = useHydration();
  const sanity = useSanity();

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <span>Day: {day}</span>
      <div className="flex justify-center gap-2">
        <label className="w-20" htmlFor="gratitude-meter">
          Gratitude
        </label>
        <meter
          id="gratitude-meter"
          low={25}
          high={75}
          min="0"
          max="100"
          value={gratitude}
        />
        <span>{gratitude}/100</span>
      </div>
      <div className="flex justify-center gap-2">
        <label className="w-20" htmlFor="hydration-meter">
          Hydration
        </label>
        <meter
          id="hydration-meter"
          low={25}
          high={75}
          min="0"
          max="100"
          value={hydration}
        />
        <span>{hydration}/100</span>
      </div>
      <div className="flex justify-center gap-2">
        <label className="w-20" htmlFor="sanity-meter">
          Sanity
        </label>
        <meter
          id="sanity-meter"
          low={25}
          high={75}
          min="0"
          max="100"
          value={sanity}
        />
        <span>{sanity}/100</span>
      </div>
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
                onClick={() => setSelected(i)}
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
        disabled
        onClick={actions.nextDay}
      >
        Next day
      </button>
    </div>
  );
}
