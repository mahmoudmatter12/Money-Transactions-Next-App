'use server';
import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { Transaction } from '@/types/Transaction';

async function getTransactions(): Promise<{
  transactions?: Transaction[];
  error?: string;
}> {
  const { userId } = await auth();

  if (!userId) {
    return { error: 'User not found' };
  }

  try {
    const transactions = await db.transaction.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { transactions };
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return { error: 'Database error' };
  }
}

export default getTransactions;