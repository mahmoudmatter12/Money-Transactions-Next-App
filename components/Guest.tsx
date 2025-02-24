import { SignInButton } from "@clerk/nextjs";
const Guest = () => {
    return ( <div className="guest">
        <h2>Welcom Guest</  h2>
        <p>Sign in to access more features</p>
        <SignInButton />


    </div> );
}
 
export default Guest;