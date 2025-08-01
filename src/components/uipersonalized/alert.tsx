import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

export default function AlertComponent({
    type,
    title,
    description,
    iconType,
}: {
    type: "destructive" | "default";
    title: string;
    description?: string;
    iconType?: "error" | "success" | "info";
}) {
    let icon;
    switch (iconType) {
        case "error":
            icon = <AlertCircleIcon className="h-4 w-4" />;
            break;
        case "success":
            icon = <CheckCircle2Icon className="h-4 w-4" />;
            break;
        case "info":
            icon = <PopcornIcon className="h-4 w-4" />;
            break;
        default:
            icon = <PopcornIcon className="h-4 w-4" />;
    }

    return (
        <div className="py-2">
            <Alert variant={type} className="py-1 px-2">
                {icon}

                {title && <AlertTitle>{title}</AlertTitle>}
                {description && <AlertDescription>{description}</AlertDescription>}
            </Alert>
        </div>
    );
}