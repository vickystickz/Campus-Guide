import Image from "next/image";
import SuccessImage from "@/public/party-popper.svg";
import APP_CONFIG from "@/constant/config";

const Success = () => {
    const { TOAST_CONFIG} = APP_CONFIG

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-[15rem]">
      <p className="text-center font-sora text-p-xs text-blue-200">{TOAST_CONFIG.FEEDBACKS.SUCCESS.message}</p>
      <div>
        <Image
          src={SuccessImage}
          alt="Success Image"
          priority={true}
          className="object-fit h-full w-full"
        />
      </div>
    </div>
  );    
};

export default Success;


// Use the Success component in the feedback toast component like this:

// import { feedbackToast } from "@/lib/context/use-toast";
// import Success from "@/component/Navigation/feedback/Success";


//Attach to the button onClick event


// const { dismiss } = feedbackToast({
//     title: "Thank you for your feedback!",
//     description: <Success />,
//     action: (
//       <Button
//         className="bg-purple-300 px-14 font-medium md:text-p-base text-p-xs text-white"
//         onClick={() => dismiss()}
//       >
//         Close
//       </Button>
//     ),
//   });