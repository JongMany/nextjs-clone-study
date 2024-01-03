'use client';
import React from 'react';
import style from '@/app/(afterLogin)/@modal/[username]/status/[id]/photo/[photoId]/photoModal.module.css';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import { Post as IPost } from '@/model/Post';
import { useQuery } from '@tanstack/react-query';
import ActionButtons from '@/app/(afterLogin)/_component/ActionButtons';

type Props = {
  id: string;
};

export default function ImageZone({ id }: Props) {
  const { data: post } = useQuery<IPost, Object, IPost, [_1: string, string]>({
    queryKey: ['posts', id],
    queryFn: getSinglePost,
    staleTime: 1000 * 60,
    gcTime: 300 * 1000,
  });

  if (!post?.Images[0]) return null;

  return (
    <div className={style.imageZone}>
      <img src={post?.Images[0].link} alt={post.content} />
      <div
        className={style.image}
        style={{ backgroundImage: `url(${post.Images[0].link})` }}
      />
      <div className={style.buttonZone}>
        <div className={style.buttonInner}>
          <ActionButtons white />
        </div>
      </div>
    </div>
  );
}
