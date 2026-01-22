import { useEffect } from "react";

export function useCleanAuthUrl() {
  useEffect(() => {
    const url = new URL(window.location.href);

    // إزالة auth parameters من URL
    const authParams = ["code", "state", "session_state"];
    let hasAuthParam = false;

    authParams.forEach((param) => {
      if (url.searchParams.has(param)) {
        url.searchParams.delete(param);
        hasAuthParam = true;
      }
    });

    if (hasAuthParam) {
      window.history.replaceState({}, "", url.toString());
    }
  }, []);
}
