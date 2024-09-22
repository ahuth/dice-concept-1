import Button from './Button';

type Props = {
  effectOnGratitude: number;
  effectOnHydration: number;
  effectOnSanity: number;
  difficulty: number;
  disabled?: boolean;
  name: string;
  onClick: () => void;
};

export default function Activity({
  effectOnGratitude,
  effectOnHydration,
  effectOnSanity,
  difficulty,
  disabled,
  name,
  onClick,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex w-44 items-center gap-2">
        <div className="flex flex-col gap-0.5">
          <span>{name}</span>
          <span className="italic text-gray-500">
            <span title={`Gratitude: ${effectOnGratitude}`}>
              {effectOnGratitude}
            </span>{' '}
            /{' '}
            <span title={`Hydration: ${effectOnHydration}`}>
              {effectOnHydration}
            </span>{' '}
            / <span title={`Sanity: ${effectOnSanity}`}>{effectOnSanity}</span>
          </span>
        </div>
        <div className="h-10 w-10 rounded bg-gray-200 p-2 text-center text-gray-800">
          {difficulty}
        </div>
      </div>
      <Button disabled={disabled} onClick={onClick}>
        Do it
      </Button>
    </div>
  );
}
