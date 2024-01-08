import style from './home.module.css';
import Tab from './_component/Tab';
import PostForm from './_component/PostForm';
import TabProvider from './_component/TabProvider';
import { Suspense } from 'react';
import TabDeciderSuspense from './_component/TabDeciderSuspense';
import Loading from './loading';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm me={session} />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
