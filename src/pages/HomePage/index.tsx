import React, { useState, useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  TailSpinBox,
  TotalCountBox,
  TotalCountText,
  SectionTitle,
} from "./HomePageStyle";
import ActivitySection, { Activity } from "./ActivitySection";
import PostSection, { Post } from "./PostSection";
import axios from "../../infras/AxiosFactory";

const HomePage = (): JSX.Element => {
  const [activities, setActivities] = useState([] as Activity[]);
  const [posts, setPosts] = useState([] as Post[]);
  const [totalCount, setTotalCount] = useState(0);

  const [isFetchTotalCountDone, setIsFetchTotalCountDone] = useState(false);
  const [isFetchActivitiesDone, setIsFetchActivitiesDone] = useState(false);
  const [isFetchRecentPostsDone, setIsFetchRecentPostsDone] = useState(false);

  useEffect(() => {
    axios.get("/cards/total-count").then((res) => {
      setTotalCount(res.data.totalCount);
      setIsFetchTotalCountDone(true);
    });
  }, []);

  useEffect(() => {
    axios.get("/cards/activities").then((res) => {
      setActivities(res.data.activities);
      setIsFetchActivitiesDone(true);
    });
  }, []);

  useEffect(() => {
    axios.get("/recent-posts").then((res) => {
      setPosts(res.data.cards);
      setIsFetchRecentPostsDone(true);
    });
  }, []);

  const switchComponent = (
    isFetchTotalCountDone: boolean,
    isFetchActivitiesDone: boolean,
    isFetchRecentPostsDone: boolean,
    totalCount: number,
    activities: Activity[],
    posts: Post[]
  ) => {
    const isLoadDone =
      isFetchTotalCountDone && isFetchActivitiesDone && isFetchRecentPostsDone;
    if (!isLoadDone) {
      return (
        <TailSpinBox>
          <TailSpin />
        </TailSpinBox>
      );
    } else {
      return (
        <React.Fragment>
          <TotalCountBox>
            <TotalCountText>{totalCount}</TotalCountText>
          </TotalCountBox>
          <SectionTitle>ACTIVITY</SectionTitle>
          <ActivitySection activities={activities} />
          <SectionTitle>RECENT POSTS</SectionTitle>
          <PostSection posts={posts} />
        </React.Fragment>
      );
    }
  };

  return switchComponent(
    isFetchTotalCountDone,
    isFetchActivitiesDone,
    isFetchRecentPostsDone,
    totalCount,
    activities,
    posts
  );
};

export default HomePage;
