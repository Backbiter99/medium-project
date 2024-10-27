import { Auth } from "../components/AuthSignup";
import { Quote } from "../components/Quote";

export const Signup = () => {
  return (
    <div className="lg:grid lg:grid-cols-2">
      <div className="max-w-xl w-full mx-auto">
        <Auth />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
