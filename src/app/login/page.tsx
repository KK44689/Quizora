import { poppins } from "../ui/font";
import { Login } from "../ui/login";

export default function Page() {
  return (
    <div className={`${poppins.className} flex flex-col md:flex-row h-screen`}>
      <Login />
    </div >
  );
}