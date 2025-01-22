'use client';

import { UrlParamsProvider } from "./contexts/urlContext";

export function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UrlParamsProvider>
      {children}
    </UrlParamsProvider>
  );
}