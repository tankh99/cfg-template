import * as React from "react"

import { cn } from "@/lib/utils"
import { Plus } from "lucide-react";
import Loading from "./loading";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  loading: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, description, loading, className, ...props }, ref) => {
    return (
      <div className="h-full">
        <div className="p-6 border-4 border-dashed cursor-pointer relative w-[480px] h-full text-center flex flex-col items-center justify-center">
          {loading
            ? <Loading />
            : (
              <>
                <Plus size={48} />
                <h4 className="text-xl">{label}</h4>
                <p className="text-gray-600">{description}</p>
                <input
                  type="file"
                  className={cn(
                    "absolute left-0 right-0 top-0 bottom-0 opacity-0 h-full w-full block cursor-pointer",
                    className
                  )}
                  ref={ref}
                  {...props}
                />
              </>
            )
          }
        </div>
      </div>
    )
  }
)
FileInput.displayName = "File Input"

export { FileInput }
