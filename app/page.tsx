import Image from "next/image";
import APP_CONFIG from "@/constant/config";
import LOGO from "@/public/cg-cover-logo.svg";

export default function Home() {
  const { projectStatus, percentage } = APP_CONFIG


  return (
    <main className="bg-B-500 h-full w-full">
      <div className="bg-[url('/bg-cover.svg')] flex flex-col lg:gap-10 md:gap-6 gap-2 items-center justify-center h-full w-full bg-cover">
        <div className="lg:w-[40rem] lg:h-[20rem] md:w-[30rem] md:h-[20rem] w-[20rem] h-[14rem]">
          <Image src={LOGO} alt="Campus Guide Logo" priority={true} className="object-fit h-full w-full" />
        </div>
        <div className="text-B-300 lg:text-[2rem] md:text-[1.5rem] text-[1rem] lg:py-4 lg:px-6 py-2 px-4 bg-P-50 rounded-lg ">
           <span>Project Status : {projectStatus} ({percentage}%)</span>
            
            <div className="flex items-center justify-center">
            </div>
        </div>
      </div>
    </main>
  );
}
