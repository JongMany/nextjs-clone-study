import Link from 'next/link';
import style from './trend.module.css';

// type Props = {
//   trend: { count: number; title: string };
// };

export default function Trend() {
  return (
    <Link href={`/search?q=제로초`} className={style.container}>
      {/* <Link href={`/search?q=${trend.title}`} className={style.container}> */}
      {/* <div className={style.count}>실시간 트렌드</div> */}
      {/* <div className={style.title}>{trend.title}</div> */}
      {/* <div className={style.count}>{trend.count.toLocaleString()} posts</div> */}
      <div className={style.count}>실시간 트렌드</div>
      <div className={style.title}>제로초</div>
      <div className={style.count}>1,234 posts</div>
    </Link>
  );
}
