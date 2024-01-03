'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import getFollowingPosts from '../_lib/getFollowingPost';
import Post from '../../_component/Post';

export default function FollowingPosts() {
  const { data } = useQuery<IPost[]>({
    queryKey: ['post', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 1000 * 60,
    gcTime: 300 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
}
