import logo from "./logo.svg"
import Image from "next/image"
import { auth, signOut } from "@/auth"
import { Button } from "@nextui-org/button"
import { FaRegSmile } from "react-icons/fa"
export default async function Page() {
  const session = await auth()


  return (
    <div className="flex flex-col justify-center items-center h-screen p-8 bg-gray-500">
      <div className="font-semibold text-4xl">Quiz by EckiHag 2024!</div>
      <h3>Designed by Next.js!</h3>
      <div className="flex items-center justify-center bg-beige pt-8 w-72 text-center">Sprüche 3:13-14: Wohl dem Menschen, der Weisheit findet, dem Menschen, der Verstand erlangt! Denn es ist besser, sie zu erwerben, als Silber, und ihr Ertrag ist besser als Gold.</div>

      <Image src={logo} alt="Logo" width={300} height={300} className="animate-spin-slow" />


      <h3 className="text-2xl font-semibold">User session data:</h3>
      {session ? (
        <div>
          <pre>{JSON.stringify(session, null, 2)}</pre>
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

