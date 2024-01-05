import { useState, useEffect, useCallback } from "react";

const useDynamicWidth = (nameList: string[], htmlElement) => {
  const [width, setWidth] = useState(0);

  // Function to handle the resizing of the element
  const handleResize = useCallback((entries: any) => {
    const { contentRect } = entries[0];
    setWidth(contentRect.width);
  }, []);

  // Attach a ResizeObserver to the element when it mounts
  useEffect(() => {
    if (!htmlElement.current) {
      return;
    }
    const element = htmlElement.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);

    // Cleanup the observer when the component unmounts
    return () => {
      resizeObserver.unobserve(element);
    };
  }, [handleResize, nameList]);

  // Access the width using the ref and update it when it changes
  useEffect(() => {
    if (htmlElement.current) {
      const element = htmlElement.current;
      if (element) {
        setWidth(element.getBoundingClientRect().width);
      }
    }
  }, [nameList]);

  return [width];
};

export default useDynamicWidth;
