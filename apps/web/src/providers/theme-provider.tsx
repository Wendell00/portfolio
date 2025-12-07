"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import {
  type ComponentProps,
  type ReactElement,
  useEffect,
  useState,
} from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>): ReactElement | null {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
