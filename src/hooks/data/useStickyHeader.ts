import { useEffect, useState } from "react";

export const useStickyHeader = () => {
    const [isSticky, setIsSticky] = useState<boolean>(false);
    useEffect(() => {
        const handleScroll = () => {
             
          if (window.scrollY > 60) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      return {isSticky}
}