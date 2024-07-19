import Link from "next/link"

export const Navbar = () => {
    return(
        <div className="fixed top-0 left-0 right-0 z-50 container mx-auto py-5 flex flex-row bg-inherit">
          <Link href="/" className="text-white font-light italic text-xl">trome</Link>
        </div>
    )
}
