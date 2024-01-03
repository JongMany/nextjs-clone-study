'use client';

import React from 'react';
import { getTrends } from '../../_lib/getTrends';
import { useQuery } from '@tanstack/react-query';
import { HashTag } from '@/model/HashTag';
import Trend from '../../_component/Trend';
import { useSession } from 'next-auth/react';

export default function TrendSection() {
  const { data: session } = useSession();

  const { data } = useQuery<HashTag[]>({
    queryKey: ['trends'],
    queryFn: getTrends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!session?.user,
  });
  return data?.map((trend) => <Trend key={trend.tagId} trend={trend} />);
}
