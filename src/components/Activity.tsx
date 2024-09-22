type Props = {
  disabled?: boolean;
  name: string;
  onClick: () => void;
};

export default function Activity({disabled, name, onClick}: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32">{name}</span>
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50"
        disabled={disabled}
        onClick={onClick}
      >
        Do it
      </button>
    </div>
  );
}
