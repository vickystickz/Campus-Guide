"use client";

import AppProvider from "@/lib/context/AppContext";
import { Toaster, FeedbackToaster } from "@/component/shared/ui/toaster"
import { Theme } from "@radix-ui/themes";
import { MapProvider } from "react-map-gl";
import { ReactNode } from "react";

interface AppProviderProps {
  children: ReactNode;
}

export const Providers: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <AppProvider>
      <Theme>
        <MapProvider>{children}</MapProvider>
        <Toaster />
        <FeedbackToaster />
      </Theme>
    </AppProvider>
  );
};
