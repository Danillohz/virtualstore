import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BackgroundColor() {
    const location = useLocation();
    
    useEffect(() => {
        const background = location.pathname === '/'
          ? 'white'
          : location.pathname === '/login'
          ? 'white'
          : location.pathname === '/ceoview'
          ? '#65A605'
          : location.pathname === '/clientview'
          ? '#65A605'
          : null;
    
        document.body.style.backgroundColor = background || '';
      }, [location]);
  
    return null;
  }
