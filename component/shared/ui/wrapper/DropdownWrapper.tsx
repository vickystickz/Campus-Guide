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
  label?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  MenuItems: {
    id: string;
    value: string;
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
  }[];
  align?: "start" | "end";
  side?: "left" | "right" | "top" | "bottom";
  menuItemClassName?: string;
  menuContentClassName?: string;
  onSelect: (item: string) => void;
  onOpenChange?: (open: boolean) => void;
  activeItem?: string;
  disabledItem?: string;
};

const DropdownWrapper = ({
  label,
  children,
  footer,
  MenuItems,
  menuItemClassName,
  menuContentClassName,
  align = "start",
  side = "left",
  onSelect,
  onOpenChange,
  activeItem,
  disabledItem
}: DropdownWrapperProps) => {
  return (
    <DropdownMenu onOpenChange={onOpenChange}>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        className={cn(
          "md:w-[14rem] w-[12rem] py-1 font-sora",
          menuContentClassName
        )}
      >
        {label && (
          <DropdownMenuLabel className="md:m-2 m-1">{label}</DropdownMenuLabel>
        )}
        {label && <DropdownMenuSeparator />}
        {MenuItems.map((item) => (
          <DropdownMenuItem
            className={cn(
              "hover:bg-blue-200 hover:text-white font-semibold text-blue-200 py-2 px-3 rounded-md md:mt-2 mt-1 md:mx-2 mx-1 cursor-pointer transition-all ease-in-out duration-150 delay-150",
              item.icon && "flex items-center gap-2",
              menuItemClassName,
              item.id === disabledItem && "cursor-not-allowed"
            )}
            disabled={item.id === disabledItem}
            key={item.id}
            onSelect={() => onSelect(item.id)}
          >
            {item.icon && <item.icon className="" />}
            {item.id === activeItem && <Check className="mr-2 w-5 h-5" />}
            {item.value}
          </DropdownMenuItem>
        ))}
        {footer && <DropdownMenuSeparator />}
        {footer && <div>{footer}</div>}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownWrapper;
