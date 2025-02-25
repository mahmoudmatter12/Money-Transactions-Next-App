import { AddTransaction } from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import IncomeExpance from "@/components/incomeExpance";
import TransactionList from "@/components/TransactionsList";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h2>Welcome, {user.firstName}</h2>
      <Balance />
      <IncomeExpance />
      <AddTransaction />
      <TransactionList />
      
    </main>
  );
};

export default HomePage;