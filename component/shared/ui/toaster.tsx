"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/component/shared/ui/toast"
import { useToast, useFeedbackToast } from "@/lib/context/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export function FeedbackToaster() {
  const { feedbacks } = useFeedbackToast()

  return (
    <ToastProvider>
      {feedbacks.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className="flex flex-col gap-7">
            <div className="w-full flex flex-col gap-2.5 pt-2 items-center justify-center">
            {title && <ToastTitle className="text-p-base text-blue-200 font-sora">{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="sm:right-2 sm:bottom-4 sm:top-auto w-[23.12rem]" />
    </ToastProvider>
  )
}

