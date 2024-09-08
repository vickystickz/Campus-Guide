"use client";

import { CircleCheckBig, Copy, Import, Route } from "lucide-react";
import { useState } from "react";
import { useAppContext } from "@/lib/context/AppContext";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { RouteProfileActiveIcon } from "@/component/Navigation/map-components/RouteTab";
import APP_CONFIG from "@/constant/config";
import CloseToast from "@/assets/icons/CloseToast";
import { Input } from "../ui/input";
import Button from "../ui/button";
import Link from "next/link";
import { toast } from "@/lib/context/use-toast";
import { getFormattedEstimatedTime } from "@/utils/navigation";

const ModalProvider = () => {
  const { routeProfile, modal, setModal } = useAppContext();

  if (modal.visible && modal.type === "share") {
    return (
      <ShareModal
        open={modal.visible}
        onOpenChange={() => {
          setModal({ visible: !modal.visible, type: null });
        }}
        routeProfile={routeProfile}
      />
    );
  }
  if (modal.visible && modal.type === "feedback") {
    return (
      <FeedbackModal
        open={modal.visible}
        onOpenChange={() => {
          setModal({ visible: !modal.visible, type: null });
        }}
      />
    );
  }
};

export default ModalProvider;

const ShareModal = ({
  open,
  onOpenChange,
  routeProfile,
}: {
  open: boolean;
  routeProfile: "driving" | "walking" | "cycling";
  onOpenChange: (open: boolean) => void;
}) => {
  const { SHARE_ROUTE_CONFIG } = APP_CONFIG;
  const { sharedUrl, routeInfo } = useAppContext();


  const activeRouteDetails = routeInfo && routeInfo.length > 0;

  return (
    <Dialog
      open={open}
      onClose={onOpenChange}
      transition
      className="modal-overlay"
    >
      <DialogPanel className="font-work-sans bg-white rounded-xl md:w-[29.75rem] w-[24rem]">
        <div className="p-6 space-y-8">
          <DialogTitle className="font-sora text-base text-blue-300 flex justify-between">
            Share Route
            <CloseToast
              className="h-5 w-5 cursor-pointer"
              onClick={() => onOpenChange(!open)}
            />
          </DialogTitle>
          <div className="flex items-center gap-4">
            <RouteProfileActiveIcon routeProfile={routeProfile} />
            <div className="w-full ">
              {/* <p className="text-p-base font-medium text-blue-400 truncate text-ellipsis w-[95%]">
                <span className="text-p-base font-medium text-blue-100 ">
                  From
                </span>{" "}
                FUTA NorthGate
              </p> */}
              <div className="flex items-center justify-between">
                <p className="text-p-base font-medium text-blue-400  w-[70%] truncate">
                  <span className="text-p-base font-medium text-blue-100">
                  To:
                  </span>{" "}
                  {activeRouteDetails && routeInfo[0].legs[0].summary}
                </p>
                <span className="text-p-base font-medium text-blue-100">
                  {activeRouteDetails && getFormattedEstimatedTime(routeInfo[0].duration)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Input
              placeholder=""
              className="rounded-full flex-1 truncate text-blue-200"
              value={sharedUrl ? sharedUrl : ""}
            />

            <Button
              icon={<Copy />}
              className="w-fit border-blue-50 hover:text-white hover:bg-blue-200  hover:bg py-2 px-4 border-[1px] text-blue-300 text-sm"
              onClick={() => {
                if (sharedUrl) {
                  navigator.clipboard.writeText(sharedUrl);
                  toast({
                    action: <CircleCheckBig className="text-cg-success" />,
                    title: "Copied",
                    description: "Link has been copied to clipboard",
                  });
                }
              }}
            >
              Copy Link
            </Button>
          </div>
        </div>
        <div className="w-full flex items-center justify-center gap-16 bg-[#F4F6F8] py-6 rounded-b-xl">
          {SHARE_ROUTE_CONFIG.map((item) => (
            <Link
              key={item.id}
              href={`${item.href} ${sharedUrl}`}
              target="_blank"
              className="flex flex-col items-center gap-2 cursor-pointer hover:opacity-80"
            >
              <item.icon />
              <span className="text-blue-200 text-p-base">{item.label}</span>
            </Link>
          ))}
        </div>
      </DialogPanel>
    </Dialog>
  );
};

const FeedbackModal = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <Dialog
      open={open}
      onClose={onOpenChange}
      transition
      className="modal-overlay "
    >
      <DialogPanel className="font-work-sans bg-white rounded-xl md:w-[29.75rem] w-[24rem] p-6">
        <DialogTitle className="font-sora text-base text-blue-300 flex justify-between">
          Got a minute
          <CloseToast
            className="h-5 w-5 cursor-pointer"
            onClick={() => onOpenChange(!open)}
          />
        </DialogTitle>
        <Description className="text-p-base text-blue-200">
          We&apos;d love to hear what you think! Share your thoughts and help us
          make things even better.
        </Description>
        <div>
          <div></div>

          <div className="flex items-center justify-center">
            <Button className="bg-purple-300 text-cg-white">
              Submit Feedback
            </Button>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};
