import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { site, socials } from "../content";
import "./Nav.css";

const LINKS = [
  { label: "Index", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Nav({ ready }) {
  const root = useRef(null);
  const overlay = useRef(null);
  const [open, setOpen] = useState(false);

  // entrance — eases in after the loader hands off (auwa-style delayed reveal)
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });
      tl.from(".nav__wordmark .char", {
        yPercent: 120,
        duration: 0.9,
        stagger: 0.04,
      }).from(
        ".nav__tool",
        { y: -18, opacity: 0, duration: 0.7, stagger: 0.12 },
        "-=0.6"
      );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // open / close overlay (tweens run directly — no context revert, so the
  // close animation is never cut short)
  useEffect(() => {
    const ov = overlay.current;
    if (!ov) return;
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    gsap.killTweensOf(ov);

    if (open) {
      lenis?.stop();
      gsap.set(ov, { pointerEvents: "auto" });
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(ov, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.1,
        ease: "expo.inOut",
      })
        .from(
          ".nav__link",
          {
            y: 48,
            opacity: 0,
            duration: 1.0,
            stagger: 0.09,
            ease: "power3.out",
            clearProps: "all",
          },
          "-=0.6"
        )
        .from(".nav__divider", { scaleX: 0, duration: 0.7 }, "-=0.45")
        .from(
          ".nav__overlay-socials > *",
          { y: 18, opacity: 0, duration: 0.6, stagger: 0.07 },
          "-=0.5"
        );
    } else {
      lenis?.start();
      gsap.to(ov, {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.9,
        ease: "expo.inOut",
        onComplete: () => gsap.set(ov, { pointerEvents: "none" }),
      });
    }
  }, [open]);

  return (
    <header className={`nav ${open ? "is-open" : ""}`} ref={root}>
      <div className="nav__bar">
        <a href="#top" className="nav__wordmark" aria-label={site.name}>
          {site.name.split("").map((c, i) => (
            <span className="char" key={i}>
              {c === " " ? " " : c}
            </span>
          ))}
        </a>

        <div className="nav__tools">
          <button
            className="nav__tool nav__menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <span className="nav__menu-icon" aria-hidden="true">
              <span className="nav__menu-line" />
              <span className="nav__menu-line" />
              <span className="nav__menu-line" />
            </span>
          </button>
        </div>
      </div>

      {/* full-screen overlay */}
      <div
        className="nav__overlay"
        ref={overlay}
        style={{ clipPath: "inset(0% 0% 100% 0%)" }}
      >
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="nav__link"
              onClick={() => setOpen(false)}
            >
              <span className="nav__link-text">
                <span className="row row--pale">{l.label}</span>
                <span className="row row--bold">{l.label}</span>
              </span>
            </a>
          ))}
        </nav>

        <div className="nav__overlay-foot">
          <span className="nav__divider" aria-hidden="true" />
          <div className="nav__overlay-socials">
            {socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </div>
    </header>
  );
}
