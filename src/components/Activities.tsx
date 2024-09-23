import {useActivities} from '../store';
import Activity from './Activity';

type Props = {
  disabled?: boolean;
  onDoActivity: (name: string) => void;
};

export default function Activities({disabled, onDoActivity}: Props) {
  const activities = useActivities();

  return (
    <ul className="flex flex-col gap-2">
      {activities.map((activity) => {
        return (
          <Activity
            activity={activity}
            key={activity.name}
            disabled={disabled || activity.status !== 'todo'}
            onClick={() => onDoActivity(activity.name)}
          />
        );
      })}
    </ul>
  );
}
