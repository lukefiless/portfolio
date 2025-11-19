/**
 * SCROLL TO TOP COMPONENT
 *
 * This component automatically scrolls to the top of the page when navigating
 * to routes other than the Projects page (which has its own scroll behavior).
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Don't scroll to top if we're on the projects page
    // The projects page handles its own scroll behavior
    if (location.pathname !== "/projects") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
