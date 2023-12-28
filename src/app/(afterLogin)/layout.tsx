import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function AfterLoginLayout({ children }: Props) {
  return <div>
    로그인 후 레이아웃
  </div>;
}
