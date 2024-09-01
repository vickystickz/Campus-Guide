"use client";

import AppProvider, { useAppContext } from "@/lib/context/AppContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, FeedbackToaster } from "@/component/shared/ui/toaster";
import { Theme } from "@radix-ui/themes";
import { MapProvider } from "react-map-gl";
import { ReactNode } from "react";
import ModalProvider from "@/component/shared/modal-ui/ModalProvider";

interface AppProviderProps {
  children: ReactNode;
}

export const Providers: React.FC<AppProviderProps> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <Theme>
          <MapProvider>{children}</MapProvider>
          <Toaster />
          <FeedbackToaster />
        </Theme>
        <ModalProvider />
      </QueryClientProvider>
    </AppProvider>
  );
};
