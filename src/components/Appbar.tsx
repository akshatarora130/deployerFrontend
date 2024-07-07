import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Appbar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleLogin = () => {
    router.push("/Login");
  }

  const handleSignout = () => {
    signOut({
      callbackUrl: "/"
    }).then(() => {
      console.log("Logged Out");
    });
  }

  const handleAllDep = () => {
    router.push("/AllDeployments")
  }

  if (!session) {
    return (
      <div className="appbar relative top-0 left-0 right-0 z-10 flex justify-between items-center bg-black text-white p-4 border-b border-gray-700 h-[8vh]">
        <button onClick={() => {
          router.push("/")
        }}>
          <div className="text-4xl font-bold">DEPLOYER</div>
        </button>
        <div>
          <button className="px-4 py-2 text-xs rounded-md bg-white hover:bg-gray-300 text-black font-bold" onClick={handleLogin}>Login/Signup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="appbar relative top-0 left-0 right-0 z-0 flex justify-between items-center bg-black text-white p-4 border-b border-gray-700 h-[8vh]">
      <button onClick={() => {
        router.push("/")
      }}>
        <div className="text-4xl font-bold">DEPLOYER</div>
      </button>
      <div className="flex gap-4">
        <button className="px-4 py-2 text-xs rounded-md bg-white hover:bg-gray-300 text-black font-bold" onClick={handleAllDep}>All Deployments</button>
        <button className="px-4 py-2 text-xs rounded-md bg-red-600 hover:bg-red-700 text-white font-bold" onClick={handleSignout}>Signout</button>
      </div>
    </div>
  );
}

export default Appbar;
