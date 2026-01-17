import { useEffect } from "react";

export default function useEscapeKey(callback) {
  useEffect(() => {
    function onKeydown(event) {
      if (event.key !== "Escape") {
        return;
      }

      callback();
    }

    window.addEventListener("keydown", onKeydown);

    return () => window.removeEventListener("keydown", onKeydown);
  }, [callback]);
}
