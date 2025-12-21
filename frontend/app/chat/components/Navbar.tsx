import { IoCallSharp } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import Image, { StaticImageData } from "next/image";

type NavbarProps = {
  character: {
    name: string;
    image: StaticImageData;
  };
};

const Navbar = ({ character }: NavbarProps) => {
  return (
    <>
    <div className="
    bg-white rounded-xl shadow-md  min-w-4xl ">
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-6">
            <Image src={character.image} alt={character.name} width={50} height={50} className="rounded-full cursor-pointer"/>
            <h1 className="text-2xl font-semibold">{character.name}</h1>
            </div>
            <div className="flex items-center gap-10
            ">
                <IoCallSharp size={30} className="cursor-pointer"/>
                <FaVideo size={30} className="cursor-pointer"/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar