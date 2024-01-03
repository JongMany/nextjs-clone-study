'use client';
import { Post as IPost } from '@/model/Post';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getSinglePost } from '../_lib/getSinglePost';
import Post from '@/app/(afterLogin)/_component/Post';

type Props = {
  id: string;
  noImage?: boolean;
};

export default function SinglePost({ id, noImage }: Props) {
  const { data: post, error } = useQuery<
    IPost,
    Object,
    IPost,
    [_1: string, string]
  >({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 1000 * 60,
    gcTime: 300 * 1000,
  });

  if (error) {
    return (
      <div
        style={{
          height: 100,
          alignItems: 'center',
          fontSize: 31,
          fontWeight: 'bold',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        게시글을 찾을 수 없습니다
      </div>
    );
  }
  if (!post) {
    // 로딩 중...
    return null;
  }
  return <Post key={post.postId} post={post} noImage={noImage} />;
}
