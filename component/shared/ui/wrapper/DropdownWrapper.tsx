import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/component/shared/ui/dropdown";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type DropdownWrapperProps = {
  label: string;
  children: React.ReactNode;
  MenuItems: {
    id: string;
    value: string;
  }[];
  onSelect: (item: string) => void;
  onOpenChange?: (open: boolean) => void;
  activeItem: string;
};

const DropdownWrapper = ({
  label,
  children,
  MenuItems,
  onSelect,
  onOpenChange,
  activeItem,
}: DropdownWrapperProps) => {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="left"
        className="md:w-[14rem] w-[12rem] py-1 font-sora"
      >
        {label && (
          <DropdownMenuLabel className="md:m-2 m-1">{label}</DropdownMenuLabel>
        )}
        {label && <DropdownMenuSeparator />}
        {MenuItems.map((item) => (
          <DropdownMenuItem
            className={cn("hover:bg-blue-200 hover:text-white font-semibold text-blue-200 py-2 px-3 rounded-md md:mt-2 mt-1 md:mx-2 mx-1 cursor-pointer transition-all ease-in-out duration-150 delay-150"
            )}
            key={item.id}
            onSelect={() => onSelect(item.id)}
          >
            {item.id === activeItem && (
                <Check className="mr-2 w-5 h-5" />
            )}
            {item.value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWrapper;
