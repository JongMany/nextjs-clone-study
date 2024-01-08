  type Props = {
    pageParam?: number;
  };
  export default async function getPostRecommends({ pageParam }: Props) {
    const res = await fetch(
      `http://localhost:9090/api/posts/recommends?cursor=${pageParam}`,
      {
        next: {
          tags: ['post', 'recommends'],
        },
        credentials: 'include',
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    return res.json();
  }
