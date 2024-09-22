import {useDay, useActions} from '../store';

export default function App() {
  const day = useDay();
  const actions = useActions();

  return (
    <div className="p-8 text-center">
      <span>Day {day}</span>
      <button
        className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md hover:bg-blue-700 active:bg-blue-800"
        onClick={actions.incrementDay}
      >
        Next
      </button>
    </div>
  );
}
