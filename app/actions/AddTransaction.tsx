"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

interface TransactionData {
    text: string;
    amount: number;
}

interface TransactionDataResponse {
    data?: TransactionData;
    error?: string;
}

async function addTransaction(formData: FormData): Promise<TransactionDataResponse> {
    const text = formData.get('text') as string;
    const amount = Number(formData.get('amount'));
    const { userId } = await auth();
    
    if (!userId) {
        return { error: 'You must be logged in to add a transaction' };
    }

    if (!text || !amount) {
        return { error: 'Please provide a text and amount' };

    }
    try{

        const transactionData: TransactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId,
            },
        });
        revalidatePath('/');
        return { data: transactionData };
        
    } catch (error:any) {
        console.error('Error adding transaction:', error);
        return { error: 'An error occurred while adding the transaction' };
    }

}

export default addTransaction;