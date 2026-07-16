import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DetailPanel } from "./components/DetailPanel";
import { detailPanels } from "./content";
import { slides } from "./slides/Slides";
import type { DetailPanelId } from "./types";

const clampIndex = (value: number) => Math.max(0, Math.min(slides.length - 1, value));
type TransitionAxis = "x" | "y";
type SlideMotionIntent = {
  axis: TransitionAxis;
  direction: number;
  reduceMotion: boolean;
};

const slideVariants = {
  enter: ({ axis, direction, reduceMotion }: SlideMotionIntent) => {
    if (reduceMotion) return { opacity: 1, x: 0, y: 0 };
    return axis === "y"
      ? { opacity: 0, x: 0, y: direction > 0 ? "11vh" : "-11vh" }
      : { opacity: 0, x: direction > 0 ? "11vw" : "-11vw", y: 0 };
  },
  center: { opacity: 1, x: 0, y: 0 },
  exit: ({ axis, direction, reduceMotion }: SlideMotionIntent) => {
    if (reduceMotion) return { opacity: 1, x: 0, y: 0 };
    return axis === "y"
      ? { opacity: 0, x: 0, y: direction > 0 ? "-7vh" : "7vh" }
      : { opacity: 0, x: direction > 0 ? "-7vw" : "7vw", y: 0 };
  },
};

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
  const [transitionAxis, setTransitionAxis] = useState<TransitionAxis>("x");
  const [panelId, setPanelId] = useState<DetailPanelId | null>(null);
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const slideRef = useRef<HTMLElement>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const wheelLocked = useRef(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (
      target: number,
      historyMode: "push" | "replace" | "none" = "push",
      axis: TransitionAxis = "x",
    ) => {
      const nextIndex = clampIndex(target);
      if (nextIndex === activeIndex) return;

      setDirection(nextIndex > activeIndex ? 1 : -1);
      setTransitionAxis(axis);
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
      setTransitionAxis("x");
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
  const motionIntent: SlideMotionIntent = {
    axis: transitionAxis,
    direction,
    reduceMotion: Boolean(reduceMotion || exportMode),
  };

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

    const mobileVerticalSwipe = window.matchMedia("(max-width: 760px)").matches
      && Math.abs(deltaY) >= 54
      && Math.abs(deltaY) > Math.abs(deltaX) * 1.1;

    if (mobileVerticalSwipe) {
      if (deltaY < 0) goTo(activeIndex + 1, "push", "y");
      else goTo(activeIndex - 1, "push", "y");
      return;
    }

    if (Math.abs(deltaX) < 54 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    if (deltaX < 0) next();
    else previous();
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (panelId || !window.matchMedia("(max-width: 760px)").matches) return;
    if (Math.abs(event.deltaY) < 28 || Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

    event.preventDefault();
    if (wheelLocked.current) return;

    wheelLocked.current = true;
    if (event.deltaY > 0) goTo(activeIndex + 1, "push", "y");
    else goTo(activeIndex - 1, "push", "y");

    window.setTimeout(() => {
      wheelLocked.current = false;
    }, transitionDuration * 1000 + 140);
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
        onWheel={handleWheel}
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
          <AnimatePresence mode="wait" initial={false} custom={motionIntent}>
            <motion.section
              ref={slideRef}
              key={activeSlide.id}
              id={activeSlide.id}
              className="slide"
              onScroll={handleSlideScroll}
              aria-label={`${activeIndex + 1} из ${slides.length}. ${activeSlide.title}`}
              custom={motionIntent}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
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
            <ArrowLeft size={20} weight="bold" aria-hidden="true" />
          </button>

          <button
            type="button"
            className="nav-arrow"
            onClick={next}
            disabled={activeIndex === slides.length - 1}
            aria-label="Следующий слайд"
          >
            <ArrowRight size={20} weight="bold" aria-hidden="true" />
          </button>
        </nav>
      </div>

      <DetailPanel panel={panel} onClose={() => setPanelId(null)} />
    </div>
  );
}
