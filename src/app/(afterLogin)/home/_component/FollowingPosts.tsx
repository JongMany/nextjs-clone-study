'use client';

import React from 'react';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import getFollowingPosts from '../_lib/getFollowingPost';
import Post from '../../_component/Post';
import styles from '@/app/(afterLogin)/home/home.module.css';

export default function FollowingPosts() {
  const { data } = useSuspenseQuery<IPost[]>({
    queryKey: ['post', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 1000 * 60,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
}
