import AddTransaction from "@/components/AddTransaction";
import Balance from "@/components/Balance";
import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import IncomeExpance from "@/components/incomeExpance";
const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }
  return (
    <div>
      <h2>Welcome {user.fullName}</h2>
      <p>Here is your dashboard</p>
      <Balance  />
      <IncomeExpance />
      <AddTransaction />
    </div>
  );
}

export default HomePage;