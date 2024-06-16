import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/component/shared/ui/tooltip";

type TooltipWrapperProps = {
    children: React.ReactNode;
    info: string;
    align?: "center" | "start" | "end";
}

const TooltipWrapper = ({children, info, align = "start"}: TooltipWrapperProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent updatePositionStrategy="always" side="left" align={align}>
          <p className="md:text-p-xs text-p-xs font-work-sans md:px-2 md:py-1">{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
