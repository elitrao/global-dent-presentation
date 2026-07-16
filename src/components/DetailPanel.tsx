import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { DetailPanelContent } from "../types";

interface DetailPanelProps {
  panel: DetailPanelContent | null;
  onClose: () => void;
}

const focusableSelector =
  'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function DetailPanel({ panel, onClose }: DetailPanelProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!panel) return;

    previousFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus.current?.focus();
    };
  }, [panel, onClose]);

  return (
    <AnimatePresence>
      {panel ? (
        <motion.div
          className="panel-backdrop"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.aside
            ref={dialogRef}
            className="detail-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-panel-title"
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: reduceMotion ? 0.01 : 0.42,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="panel-head">
              <div>
                <p className="panel-kicker">Детали проекта</p>
                <h2 id="detail-panel-title">{panel.title}</h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="icon-button panel-close"
                onClick={onClose}
                aria-label="Закрыть панель"
              >
                <X size={22} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <p className="panel-intro">{panel.intro}</p>

            <div className="panel-groups">
              {panel.groups.map((group) => (
                <section className="panel-group" key={group.title}>
                  <div className="panel-group-heading">
                    <h3>{group.title}</h3>
                    {group.owner ? <p>{group.owner}</p> : null}
                  </div>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            {panel.note ? <p className="panel-note">{panel.note}</p> : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
