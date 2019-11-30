import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../OnlyOffice";

export const useScript = src => {
  const [loading, setLoading] = useState(false);
  const [{ loaded, error }, setState] = useState({
    loaded: false,
    error: false
  });

  useEffect(() => {
    // Don't load it again if already loaded
    if (document.getElementById(src)) {
      setState({
        loaded: true,
        error: false
      });
      return;
    }
    setLoading(true);
    // Create script
    let script = document.createElement("script");
    script.setAttribute("id", src);
    script.setAttribute("src", src);
    script.async = true;
    // Script event listener callbacks for load and error
    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false
      });
      setLoading(false);
    };
    const onScriptError = () => {
      setState({
        loaded: true,
        error: true
      });
      setLoading(false);
    };
    script.addEventListener("load", onScriptLoad);
    script.addEventListener("error", onScriptError);
    // Add script to document body
    document.head.appendChild(script);
    // Remove event listeners on cleanup
    return () => {
      script.removeEventListener("load", onScriptLoad);
      script.removeEventListener("error", onScriptError);
    };
  }, [src]);

  return [loaded, loading, error];
};

export const useOnlyOffice = () => {
  const oo = useContext(Context);
  return oo || {};
};

/**
 * Returns an event dispatcher function
 * @return {Function}
 */
export const useEventEmitter = (eventName, element = window) => {
  return useCallback(
    detail => {
      const event = new CustomEvent(eventName, {
        detail
      });
      element.dispatchEvent(event);
    },
    [eventName, element]
  );
};
