import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return null;
    }

    return {
      // userId: session.user.id || '',
      user: session.user,
    };
  } catch (error) {
    console.error('Error fetching session user:', error);
    return null;
  }
};
