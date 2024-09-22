import Button from './Button';

type Props = {
  difficulty: number;
  disabled?: boolean;
  name: string;
  onClick: () => void;
};

export default function Activity({difficulty, disabled, name, onClick}: Props) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-40">
        <span className="mr-2">{name}</span>
        <span className="rounded bg-gray-200 p-2 text-gray-800">
          {difficulty}
        </span>
      </div>
      <Button disabled={disabled} onClick={onClick}>
        Do it
      </Button>
    </div>
  );
}
