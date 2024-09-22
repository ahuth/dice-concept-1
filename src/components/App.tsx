import {useDay, useDice, useActions} from '../store';

export default function App() {
  const day = useDay();
  const dice = useDice();
  const actions = useActions();

  return (
    <div className="flex flex-col items-center gap-2 p-8">
      <span>Day: {day}</span>
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
