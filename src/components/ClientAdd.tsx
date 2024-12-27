"use client";

import { useEffect } from "react";

export function ClientAdd({ data, userId }: { data?: string; userId: string }) {
  useEffect(() => {
    if (data) {
      localStorage.setItem(`FRANKS_BLAKE_WEDDING_${userId}`, data);
    }
  }, [data]);

  return <></>;
}
