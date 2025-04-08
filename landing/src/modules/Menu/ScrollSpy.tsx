import { useState, useRef, useEffect } from "react";

function useScrollSpy(sectionRefs, options = { offset: 200 }) {
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    if (!sectionRefs.current || sectionRefs.current.length === 0) return;

    const handleScroll = () => {
      const scrollContainer = document.querySelector(".menu-items-container");
      if (!scrollContainer) return;

      const scrollTop = scrollContainer.scrollTop;

      // Find the section that's currently visible
      let currentSection = "";
      sectionRefs.current.forEach((section, index) => {
        if (section) {
          const rect = section.getBoundingClientRect();
          const sectionTop = rect.top;

          // Consider a section visible when it's near the top of the viewport
          if (sectionTop <= options.offset && sectionTop >= -rect.height + 100) {
            currentSection = section.getAttribute('data-category');
          }
        }
      });

      if (currentSection && currentSection !== activeCategory) {
        setActiveCategory(currentSection);
      }
    };

    const scrollContainer = document.querySelector(".menu-items-container");
    scrollContainer?.addEventListener("scroll", handleScroll);

    // Initial check for visible sections
    handleScroll();

    return () => scrollContainer?.removeEventListener("scroll", handleScroll);
  }, [sectionRefs, options.offset, activeCategory]);

  return activeCategory;
}