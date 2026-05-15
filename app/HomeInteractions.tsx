"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type HomeInteractionsProps = {
  heroSlides: string[];
};

type HeroSlideshowProps = {
  slides: string[];
  fallback: string;
};

const TRANSITION_MS = 900;
const SLIDE_MS = 5200;

export function HeroSlideshow({ slides, fallback }: HeroSlideshowProps) {
  const cleanSlides = useMemo(
    () => slides.filter((slide, index, list) => slide && list.indexOf(slide) === index),
    [slides],
  );
  const safeSlides = useMemo(
    () => (cleanSlides.length > 0 ? cleanSlides : [fallback]),
    [cleanSlides, fallback],
  );
  const [activeLayer, setActiveLayer] = useState<0 | 1>(0);
  const [layerImages, setLayerImages] = useState<[string, string]>([
    safeSlides[0],
    safeSlides[1] || safeSlides[0],
  ]);
  const activeLayerRef = useRef<0 | 1>(0);
  const currentIndexRef = useRef(0);
  const lockedRef = useRef(false);

  useEffect(() => {
    activeLayerRef.current = 0;
    currentIndexRef.current = 0;
    lockedRef.current = false;
    setActiveLayer(0);
    setLayerImages([safeSlides[0], safeSlides[1] || safeSlides[0]]);
  }, [safeSlides]);

  useEffect(() => {
    safeSlides.slice(0, 8).forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, [safeSlides]);

  useEffect(() => {
    if (safeSlides.length < 2) return;

    let transitionTimer = 0;

    const showNextSlide = () => {
      if (lockedRef.current) return;
      lockedRef.current = true;

      const hiddenLayer = activeLayerRef.current === 0 ? 1 : 0;
      const nextIndex = (currentIndexRef.current + 1) % safeSlides.length;
      const nextSrc = safeSlides[nextIndex];
      const loader = new Image();

      loader.onload = () => {
        setLayerImages((images) => {
          const nextImages: [string, string] = [...images];
          nextImages[hiddenLayer] = nextSrc;
          return nextImages;
        });

        window.requestAnimationFrame(() => {
          activeLayerRef.current = hiddenLayer;
          setActiveLayer(hiddenLayer);
          transitionTimer = window.setTimeout(() => {
            currentIndexRef.current = nextIndex;
            lockedRef.current = false;
          }, TRANSITION_MS);
        });
      };

      loader.onerror = () => {
        currentIndexRef.current = nextIndex;
        lockedRef.current = false;
      };

      loader.src = nextSrc;
    };

    const intervalTimer = window.setInterval(showNextSlide, SLIDE_MS);

    return () => {
      window.clearInterval(intervalTimer);
      window.clearTimeout(transitionTimer);
      lockedRef.current = false;
    };
  }, [safeSlides]);

  return (
    <>
      <img
        className={`hero-image${activeLayer === 0 ? " is-active" : ""}`}
        src={layerImages[0]}
        alt="Stüdyo Genç çekim örneği"
        fetchPriority="high"
      />
      <img
        className={`hero-image${activeLayer === 1 ? " is-active" : ""}`}
        src={layerImages[1]}
        alt=""
        aria-hidden="true"
      />
    </>
  );
}

export function HomeInteractions({ heroSlides }: HomeInteractionsProps) {
  useEffect(() => {
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const siteMenu = document.getElementById("siteMenu");
    const header = document.querySelector(".site-header");

    const toggleMenu = () => siteMenu?.classList.toggle("is-open");
    const closeMenu = () => siteMenu?.classList.remove("is-open");
    const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 20);
    const menuLinks = Array.from(siteMenu?.querySelectorAll("a") || []);

    menuToggle?.addEventListener("click", toggleMenu);
    window.addEventListener("scroll", updateHeader, { passive: true });
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));
    updateHeader();

    return () => {
      menuToggle?.removeEventListener("click", toggleMenu);
      window.removeEventListener("scroll", updateHeader);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
    };
  }, []);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!revealItems.length) return;

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return null;
}
