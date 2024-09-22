import clsx from 'clsx';

type Props = {
  active: boolean;
  onClick: () => void;
  value: number;
};

export default function Die({active, onClick, value}: Props) {
  return (
    <button
      aria-current={active ? true : undefined}
      className={clsx(
        'rounded bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300 active:bg-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
        active && 'ring-2',
      )}
      disabled={value < 0}
      onClick={onClick}
    >
      {Math.abs(value)}
    </button>
  );
}
