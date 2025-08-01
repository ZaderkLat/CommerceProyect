"use client";
import toast, { ToastBar, Toaster } from "react-hot-toast";
import { useTheme } from "next-themes";
import { X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
export default function CustomToaster() {
    const { theme } = useTheme();

    const isDark = theme === "dark";

    return (
        <Toaster
            position="top-right"
            toastOptions={{
                style: {
                    background: isDark ? "#1f2937" : "#ffffff",
                    color: isDark ? "#f9fafb" : "#111827",
                    border: isDark ? "1px solid #374151" : "1px solid #e5e7eb",
                },
                success: {
                    iconTheme: {
                        primary: isDark ? "#4ade80" : "#16a34a",
                        secondary: "#fff",
                    },
                },
                error: {
                    iconTheme: {
                        primary: isDark ? "#f87171" : "#dc2626",
                        secondary: "#fff",
                    },
                },
            }}
        >
            {(t) => (
                <ToastBar toast={t}>
                    {({ icon, message }) => (
                        <div className="flex items-center w-full justify-between">
                            <div className="flex items-center gap-2">
                                {icon}
                                {message}
                            </div>

                            <div className="flex items-center h-10">
                                <Separator orientation="vertical" className="h-full" />
                            </div>


                            <button
                                onClick={() => toast.dismiss(t.id)}
                                className="ml-4 text-sm font-semibold hover:text-red-500 transition-colors"
                            >
                                <X className="h-7 w-7" />
                            </button>

                        </div>
                    )}
                </ToastBar>
            )}
        </Toaster>
    );
}

