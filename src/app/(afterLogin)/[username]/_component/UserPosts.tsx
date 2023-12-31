'use client';
import React from 'react';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';

import { Post as IPost } from '@/model/Post';
import Post from '@/app/(afterLogin)/_component/Post';
import { getUserPosts } from '../_lib/getUserPosts';

type Props = {
  username: string;
};

export default function UserPosts({ username }: Props) {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, string]
  >({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    staleTime: 1000 * 60,
    gcTime: 300 * 1000,
  });

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['users', username]);
  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  } else {
    return null;
  }
}
