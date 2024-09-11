import logo from "./logo.svg"
import Image from "next/image"
import { auth, signOut } from "@/auth"
import { Button } from "@nextui-org/button"
import { FaRegSmile } from "react-icons/fa"
export default async function Page() {
  const session = await auth()


  return (
    <div className="flex flex-col justify-center items-center h-screen p-8 pt-14 bg-gray-500">
      <div className="font-semibold text-4xl">Quiz by EckiHag 2024!</div>
      <h3>Designed by Next.js!</h3>
      <div className="flex items-center justify-center pt-8 w-72 text-center">Sprüche 3:13-14: Wohl dem Menschen, der Weisheit findet, dem Menschen, der Verstand erlangt! Denn es ist besser, sie zu erwerben, als Silber, und ihr Ertrag ist besser als Gold.</div>

      <Image src={logo} alt="Logo" width={300} height={300} className="animate-spin-slow" />
      
    </div>
  )
}

