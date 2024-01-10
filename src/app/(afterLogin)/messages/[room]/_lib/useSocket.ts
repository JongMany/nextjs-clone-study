import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

let socket: Socket | null;

export default function useSocket() {
  const { data: session } = useSession();

  const disconnect = useCallback(() => {
    socket?.disconnect();
    socket = null;
  }, []);

  useEffect(() => {
    if (!socket) {
      // 서버와 웹소켓 연결하는 주소
      socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/messages`, {
        transports: ['websocket'],
      });

      socket.on('connect_error', (err) => {
        console.error(err);
        console.log(`connect error due to ${err.message}`);
      });
    }
  }, [session]);

  useEffect(() => {
    if (socket?.connected && session?.user?.email) {
      socket?.emit('login', { id: session?.user?.email });
    }
  }, [session]);

  return [socket, disconnect] as const;
}
