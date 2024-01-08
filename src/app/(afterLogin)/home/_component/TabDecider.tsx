'use client';

import React, { use } from 'react';

import PostRecommends from './PostRecommends';
import FollowingPosts from './FollowingPosts';
import { TabContext, useTabContext } from './TabProvider';

export default function TabDecider() {
  // const { tab } = useTabContext();
  const { tab } = use(TabContext);

  if (tab === 'rec') {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}
