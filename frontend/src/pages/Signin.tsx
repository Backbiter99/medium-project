import { AuthSignin } from "../components/AuthSignin";
import { Quote } from "../components/Quote";

export const Signin = () => {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="max-w-xl w-full mx-auto">
        <AuthSignin />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
