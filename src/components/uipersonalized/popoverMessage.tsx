
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

interface PopoverMessageProps {
    message: string;
}
export function PopoverMessage({ message }: PopoverMessageProps) {
    return (
        <Popover open={true} modal={false}>
            <PopoverTrigger  ></PopoverTrigger>
            <PopoverContent>{message}</PopoverContent>
        </Popover>
    );
}