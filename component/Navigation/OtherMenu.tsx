import APP_CONFIG from "@/constant/config";
import DropdownWrapper from "@/component/shared/ui/wrapper/DropdownWrapper";
import { LogoVector, MenuIcon } from "@/utils/exports/app-icons";
import TooltipWrapper from "../shared/ui/wrapper/TooltipWrapper";
import { useAppContext } from "@/lib/context/AppContext";

const OtherMenu = () => {
  const { TOOLTIP_CONFIG, MAP_CONFIG } = APP_CONFIG;
  const { setModal, sharedUrl } = useAppContext();

    const handleSelect = (item: string) => {
      setModal({
        visible: true,
        type: item as "share" | "feedback" | null,
      })
    };

  return (
    <div className="absolute top-4 md:right-7 right-4">
      <DropdownWrapper
        MenuItems={MAP_CONFIG.MAP_TOP_MENU}
        onOpenChange={(status) => {}}
        activeItem=""
        onSelect={handleSelect}
        align="end"
        side="bottom"
        disabledItems={["feedback", sharedUrl ? "" : "share"]}
        menuItemClassName="hover:text-white w-[13.6rem]"
        menuContentClassName="bg-white rounded-xl w-fit p-4 shadow-menu"
        footer={
            <div className="flex flex-col gap-2 justify-center items-center mt-4">
                <div className="flex items-center gap-2">
                    <LogoVector />
                    <span className="text-p-xs text-blue-200 font-work-sans">
                        Designed with lots of <span className="text-red-500">❤</span>
                    </span>
                </div>
                <span className="text-p-sm text-blue-100">Developed by YouthMappers</span>
            </div>
        }
      >
        <div className="p-4 rounded-full bg-white shadow-md">
          <MenuIcon />
        </div>
      </DropdownWrapper>
    </div>
  );
};

export default OtherMenu;
