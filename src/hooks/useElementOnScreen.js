import { useState, useEffect, useRef } from "react";

export default function useElementOnScreen(options) {
    const elementRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      }

      useEffect(() => {
        const observer = new IntersectionObserver(toggleVisibility, options)
        if(elementRef.current) observer.observe(elementRef.current)
    
        return () => {
          if (elementRef.current) observer.unobserve(elementRef.current)
        }
       }, [elementRef, options])

    return [elementRef, isVisible]
    
}
