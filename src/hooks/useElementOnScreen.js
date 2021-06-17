import { useState, useEffect, useRef } from "react";

export default function useElementOnScreen(options) {
    const elementRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (element) => {
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

    return [elementRef, isVisible]
    
}
