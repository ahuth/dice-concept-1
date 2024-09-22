import type {Activity as ActivityType} from '../store';
import Button from './Button';

type Props = {
  activity: ActivityType;
  disabled?: boolean;
  onClick: () => void;
};

export default function Activity({activity, disabled, onClick}: Props) {
  return (
    <div className="flex items-center gap-2 pl-6">
      <div className="flex w-32 items-center gap-2">
        <div className="flex flex-col gap-0.5">
          <span>{activity.name}</span>
          <span className="italic text-gray-500">
            <span title={`Gratitude: ${activity.effects.gratitude}`}>
              {activity.effects.gratitude}
            </span>{' '}
            /{' '}
            <span title={`Hydration: ${activity.effects.hydration}`}>
              {activity.effects.hydration}
            </span>{' '}
            /{' '}
            <span title={`Sanity: ${activity.effects.sanity}`}>
              {activity.effects.sanity}
            </span>
          </span>
        </div>
      </div>
      <div className="h-10 w-10 rounded bg-gray-200 p-2 text-center text-gray-800">
        {activity.difficulty}
      </div>
      <Button disabled={disabled} onClick={onClick}>
        Do it
      </Button>
      <div className="w-6">
        {activity.status === 'success' ?
          '✅'
        : activity.status === 'failure' ?
          '❌'
        : ''}
      </div>
    </div>
  );
}
