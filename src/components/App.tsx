import {
  useActions,
  useDay,
  useDice,
  useGraditude,
  useHydration,
  useSanity,
} from '../store';

export default function App() {
  const actions = useActions();
  const day = useDay();
  const dice = useDice();
  const gratitude = useGraditude();
  const hydration = useHydration();
  const sanity = useSanity();

  return (
    <div className="flex flex-col items-center gap-2 p-8">
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
          return (
            <li key={i}>
              <button
                className="rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
                disabled={val < 0}
                onClick={actions.pickDie.bind(null, i)}
              >
                {Math.abs(val)}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 active:bg-blue-800"
        onClick={actions.nextDay}
      >
        Next
      </button>
    </div>
  );
}
