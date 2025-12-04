import { useState } from "react";
import { handleLogin } from "../lib/auth";
import { LoginInfo } from "../lib/definition";
import { useRouter } from "next/navigation";

export const useLoginSubmit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState();
  const router = useRouter();

  const submit = async (data: LoginInfo) => {
    setIsLoading(true);

    try {
      const res = await handleLogin(data);
      if (res.error) setError(res.error);
      
      if (!res.error) {
        setResponse({
          type: 'success',
          message: `Thanks for your submission ${res.email}, we will get back to you shortly!.`
        });
        router.push('/dashboard');
      }
    } catch (e) {
      setResponse({
        type: 'error',
        message: 'Email or password is incorrect.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return { isLoading, response, submit };
};