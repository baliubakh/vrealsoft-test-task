import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";

import { googleLogin } from "../lib/auth";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

export default function LoginButton() {
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;

    const res = await googleLogin(credential);

    if (res && "data" in res) {
      const { user, token } = res.data;

      setUser(user, token);

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <section className="border-2 border-black pb-8 flex justify-center items-center flex-col">
        <h1 className="py-4 px-8 ">VrealSoft test task</h1>
        <h2 className="py-2 px-8 border-b-2 border-black w-full text-center">
          Sign in/Sign up
        </h2>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={() => toast.error(`Error on user login!`)}
        />
      </section>
    </main>
  );
}
