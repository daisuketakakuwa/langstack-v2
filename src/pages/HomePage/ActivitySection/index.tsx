import {
  ActivityBox,
  ActivityGauge,
  ActivityRecord,
} from "./ActivitySectionStyle";

export type Activity = {
  date: string;
  totalCount: number;
};

type ActivityPageProp = {
  activities: Activity[];
};

const calculateGaugeWidth = (
  maxTotalCount: number,
  activity: Activity
): number => {
  return (activity.totalCount / maxTotalCount) * 150;
};

const ActivitySection = (prop: ActivityPageProp): JSX.Element => {
  const maxTotalCount = Math.max(...prop.activities.map((a) => a.totalCount));
  const activities = prop.activities;

  return (
    <ActivityBox>
      {activities.map((activity) => (
        <ActivityRecord key={activity.date}>
          <span>{activity.date}</span>
          <ActivityGauge
            gaugeWidth={calculateGaugeWidth(maxTotalCount, activity)}
          />
          <span>{activity.totalCount}</span>
        </ActivityRecord>
      ))}
    </ActivityBox>
  );
};

export default ActivitySection;
