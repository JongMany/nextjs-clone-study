'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

const onSubmit = async (
  prevState: { message: string | null },
  formData: FormData
) => {
  // validate
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }
  if (!formData.get('name') || !(formData.get('name') as string)?.trim()) {
    return { message: 'no_name' };
  }
  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }
  if (!formData.get('image')) {
    return { message: 'no_image' };
  }
  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: 'post',
        body: formData,
        credentials: 'include',
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(response.json());
    shouldRedirect = true;
    await signIn('credentials', {
      username: formData.get('id'),
      password: formData.get('password'),
      redirect: false, // 서버쪽에서 redirect하기 때문에 기능을 꺼야함
    });
  } catch (error) {
    console.error(error);
    return { message: null };
  }
  if (shouldRedirect) {
    redirect('/home');
    return { message: null };
  }
  return { message: null };
};
export default onSubmit;
