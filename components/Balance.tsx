import getUserBalance from "@/app/actions/getUserBalance";
import { addCommas } from "@/lib/utils";
const Balance = async () => {
    const {balance} = await getUserBalance();
    return (<>
        <h4>Your Balance</h4>
        <h1>{addCommas(balance ?? 0)}</h1>
    </>);
}

export default Balance;