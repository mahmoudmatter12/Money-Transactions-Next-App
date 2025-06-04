"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
async function getUserBalance(): Promise<{
    balance?: number;
    error?: string;
}>
{
    const { userId } = await auth();
    if (!userId) {
        return { error: "You must be logged in to get your balance" };
    }
    try{
        const transactions = await db.transaction.findMany({
            where: {
                userId,
            },
        });
        const balance = transactions.reduce(
            (sum, transaction) => sum + transaction.amount,0
        );
        return { balance };
    } catch (error: any) {
        console.error("Error fetching user balance:", error);
        return { error: "An error occurred while getting your balance" };
    }
}

export default getUserBalance;