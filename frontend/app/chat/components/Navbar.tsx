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
    bg-white rounded-xl shadow-2xl ">
        <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
            <Image src={character.image} alt={character.name} width={100} height={100} className="rounded-full"/>
            <h1 className="text-2xl font-semibold">{character.name}</h1>
            </div>
            <div className="flex items-center gap-4
            ">
                <IoCallSharp size={30}/>
                <FaVideo size={30}/>
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar