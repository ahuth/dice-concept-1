import Button from './Button';

type Props = {
  disabled?: boolean;
  name: string;
  onClick: () => void;
};

export default function Activity({disabled, name, onClick}: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-32">{name}</span>
      <Button disabled={disabled} onClick={onClick}>
        Do it
      </Button>
    </div>
  );
}
