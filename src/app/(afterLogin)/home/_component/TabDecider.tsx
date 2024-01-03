'use client';

import React from 'react';

import PostRecommends from './PostRecommends';
import FollowingPosts from './FollowingPosts';
import { useTabContext } from './TabProvider';

export default function TabDecider() {
  const { tab } = useTabContext();

  if (tab === 'rec') {
    return <PostRecommends />;
  }
  return <FollowingPosts />;
}
