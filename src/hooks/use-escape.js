import { useEffect } from "react";

function useEscape(callback) {
    useEffect(() => {
        function handleEscape(event) {
            if (event.key === 'Escape')
                callback();
        }
        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);
    }, [callback]);
}

export default useEscape;
