import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  className,
  disabled,
  onClick,
  children,
}: Props) {
  return (
    <button
      className={clsx(
        'rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 active:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
