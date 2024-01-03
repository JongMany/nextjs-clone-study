'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import style from './logoutButton.module.css';

export default function LogoutButton() {
  const router = useRouter();
  const { data: me } = useSession();

  const onLogout = () => {
    signOut({ redirect: false })
      .then(() => {
        router.replace('/');
      })
      .catch(console.error);
  };

  // 내정보가 없으면 로그아웃 버튼 안 보여주기

  if (!me?.user) return null;

  return (
    <button className={style.logOutButton} onClick={onLogout}>
      <div className={style.logOutUserImage}>
        <img src={me.user?.image as string} alt={me.user?.id} />
      </div>
      <div className={style.logOutUserName}>
        <div>{me.user?.name}</div>
        <div>@{me.user?.email}</div>
      </div>
    </button>
  );
}
