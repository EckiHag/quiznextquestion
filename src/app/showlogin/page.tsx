import logo from "./logo.svg"
import Image from "next/image"
import { auth, signOut } from "@/auth"
import { Button } from "@nextui-org/button"
import { FaRegSmile } from "react-icons/fa"
export default async function Page() {
  const session = await auth()


  return (
    <div className="flex flex-col justify-center items-center h-screen p-8 pt-14 bg-gray-500">
      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
          <div>Role: {session?.user?.role}</div>
          <form
            action={async () => {
              "use server"

              await signOut()
            }}
          >
            <Button type="submit" color="primary" variant="bordered" startContent={<FaRegSmile size={20} />}>
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div>Not signed in</div>
      )}
    </div>
  )
}

