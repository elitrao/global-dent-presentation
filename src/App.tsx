import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DetailPanel } from "./components/DetailPanel";
import { detailPanels } from "./content";
import { slides } from "./slides/Slides";
import type { DetailPanelId } from "./types";

const clampIndex = (value: number) => Math.max(0, Math.min(slides.length - 1, value));

function indexFromHash(hash = window.location.hash) {
  const match = hash.match(/^#slide-(\d+)$/);
  if (!match) return 0;
  return clampIndex(Number(match[1]) - 1);
}

function slideHash(index: number) {
  return `#slide-${index + 1}`;
}

export function App() {
  const exportMode = new URLSearchParams(window.location.search).has("export");
  const [activeIndex, setActiveIndex] = useState(() => indexFromHash());
  const [direction, setDirection] = useState(1);
  const [panelId, setPanelId] = useState<DetailPanelId | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const slideRef = useRef<HTMLElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (target: number, historyMode: "push" | "replace" | "none" = "push") => {
      const nextIndex = clampIndex(target);
      if (nextIndex === activeIndex) return;

      setDirection(nextIndex > activeIndex ? 1 : -1);
      setActiveIndex(nextIndex);

      if (historyMode !== "none") {
        const method = historyMode === "replace" ? "replaceState" : "pushState";
        window.history[method](null, "", slideHash(nextIndex));
      }
    },
    [activeIndex],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const previous = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!window.location.hash.match(/^#slide-(\d+)$/)) {
      window.history.replaceState(null, "", slideHash(activeIndex));
    }

    const syncFromLocation = () => {
      const target = indexFromHash();
      setDirection(target >= activeIndex ? 1 : -1);
      setActiveIndex(target);
    };

    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);
    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [activeIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (panelId) return;

      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select, [contenteditable='true']")) return;

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        next();
      } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        previous();
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(slides.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goTo, next, panelId, previous]);

  const activeSlide = slides[activeIndex];
  const ActiveSlide = activeSlide.component;
  const panel = panelId ? detailPanels[panelId] : null;

  const focusSlideTitle = () => {
    const title = slideRef.current?.querySelector<HTMLElement>("[data-slide-title]");
    title?.focus({ preventScroll: true });
  };

  const handlePointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse") return;
    pointerStart.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent) => {
    if (!pointerStart.current || panelId) return;
    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    pointerStart.current = null;

    if (Math.abs(deltaX) < 54 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    if (deltaX < 0) next();
    else previous();
  };

  const transitionDuration = reduceMotion || exportMode ? 0.01 : 0.55;

  useEffect(() => {
    setHeaderScrolled(false);
  }, [activeIndex]);

  const handleSlideScroll = (event: React.UIEvent<HTMLElement>) => {
    const nextScrolled = event.currentTarget.scrollTop > 10;
    setHeaderScrolled((current) => (current === nextScrolled ? current : nextScrolled));
  };

  return (
    <div className={exportMode ? "presentation-root is-exporting" : "presentation-root"}>
      <motion.div
        className="ambient-glow"
        aria-hidden="true"
        animate={{
          x: `${(activeIndex % 3) * 14 - 12}vw`,
          y: `${((activeIndex + 1) % 3) * 6 - 8}vh`,
          opacity: activeIndex === 1 ? 0.34 : 0.52,
        }}
        transition={{ duration: reduceMotion ? 0.01 : 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <div className="grain-layer" aria-hidden="true" />

      <div
        className="presentation-shell"
        aria-hidden={panel ? true : undefined}
        inert={panel ? true : undefined}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={() => {
          pointerStart.current = null;
        }}
      >
        <header className={`${headerScrolled ? "presentation-header is-scrolled" : "presentation-header"}${activeIndex === 0 ? " is-cover" : ""}`}>
          {activeIndex === 0 ? (
            <img className="cover-brand-logo" src="/assets/global-dent-club-logo.png" alt="Global Dent Club" />
          ) : (
            <div className="wordmark" aria-label="Global Dent и Synapt">
              <span className="wordmark-mark" aria-hidden="true" />
              <span>Global Dent</span>
              <span className="wordmark-collab"><b>×</b> Synapt</span>
            </div>
          )}
        </header>

        <main className="slides-viewport" aria-live="polite">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.section
              ref={slideRef}
              key={activeSlide.id}
              id={activeSlide.id}
              className="slide"
              onScroll={handleSlideScroll}
              aria-label={`${activeIndex + 1} из ${slides.length}. ${activeSlide.title}`}
              custom={direction}
              initial={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: direction > 0 ? "11vw" : "-11vw" }
              }
              animate={{ opacity: 1, x: 0 }}
              exit={
                reduceMotion
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: direction > 0 ? "-7vw" : "7vw" }
              }
              transition={{ duration: transitionDuration, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={focusSlideTitle}
            >
              <ActiveSlide openPanel={setPanelId} />
            </motion.section>
          </AnimatePresence>
        </main>

        <nav className="presentation-nav" aria-label="Навигация по презентации">
          <button
            type="button"
            className="nav-arrow"
            onClick={previous}
            disabled={activeIndex === 0}
            aria-label="Предыдущий слайд"
          >
            <ArrowLeft size={26} weight="bold" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="nav-arrow"
            onClick={next}
            disabled={activeIndex === slides.length - 1}
            aria-label="Следующий слайд"
          >
            <ArrowRight size={26} weight="bold" aria-hidden="true" />
          </button>
        </nav>
      </div>

      <DetailPanel panel={panel} onClose={() => setPanelId(null)} />
    </div>
  );
}
