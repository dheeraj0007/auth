import LoginForm from "../components/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/dashboard");
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
