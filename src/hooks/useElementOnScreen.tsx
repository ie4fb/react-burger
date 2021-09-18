import React, { useState, useEffect, useRef, RefObject } from "react";

interface IhookProps {
  root: null,
  rootMargin: string,
  threshold: number,
  ref: React.RefObject<HTMLDivElement>
}

export default function useElementOnScreen(options: IhookProps) {
    const elementRef = options.ref;
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (element: IntersectionObserverEntry[]) => {
        const [entry] = element;
        setIsVisible(entry.isIntersecting);
      }

      useEffect(() => {
        const observer = new IntersectionObserver(toggleVisibility, options)
        if(elementRef.current) observer.observe(elementRef.current)
    
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (elementRef.current) observer.unobserve(elementRef.current)
        }
       }, [elementRef, options])

    return isVisible
    
}
