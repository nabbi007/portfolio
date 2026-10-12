import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { hero } from "../content";
import "./Hero.css";

export default function Hero({ ready }) {
  const root = useRef(null);
  const trackRefs = useRef([]);

  // infinite marquee — one tween per row, alternating direction.
  // each tween slows down while its letters pass over the portrait, so the
  // face stays readable instead of flickering under fast-moving type.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tweens = trackRefs.current.filter(Boolean).map((track, i) => {
        const dir = i % 2 === 0 ? -1 : 1;
        // content is duplicated, so animating one half-width loops seamlessly
        gsap.set(track, { xPercent: dir === 1 ? -50 : 0 });
        const tween = gsap.to(track, {
          xPercent: dir === 1 ? 0 : -50,
          duration: 26 + i * 6,
          ease: "none",
          repeat: -1,
          onUpdate() {
            const portrait = root.current?.querySelector(".hero__portrait");
            const row = track.closest(".hero__row");
            if (!portrait || !row) return;
            const pRect = portrait.getBoundingClientRect();
            const rRect = row.getBoundingClientRect();
            const center = pRect.left + pRect.width / 2 - rRect.left;
            const half = pRect.width / 2;
            // find how close any duplicated span is to the portrait's center
            let closest = Infinity;
            for (const span of track.children) {
              const s = span.getBoundingClientRect();
              const mid = s.left + s.width / 2 - rRect.left;
              const dist = Math.abs(mid - center);
              if (dist < closest) closest = dist;
            }
            const t = Math.min(closest / (half * 1.6), 1);
            // ease from 0.22x (over the face) up to full speed
            const scale = 0.22 + 0.78 * t;
            if (Math.abs(tween.timeScale() - scale) > 0.03) {
              tween.timeScale(scale);
            }
          },
        });
        return tween;
      });
      return () => tweens.forEach((t) => t.kill());
    }, root);
    return () => ctx.revert();
  }, []);

  // Hide the intro elements IMMEDIATELY on mount. While the deploy loader is
  // covering the screen (and during its curtain reveal) the hero must already
  // be hidden — otherwise it's revealed in its final state and then "pops"
  // again when the intro runs. Set here = shown exactly once, on hand-off.
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero__portrait-inner", { opacity: 0, yPercent: 12, scale: 1.08 });
      gsap.set(".hero__row", { opacity: 0, filter: "blur(12px)" });
      gsap.set(".hero__foot > *", { opacity: 0, y: 20 });
    }, root);
    return () => ctx.revert();
  }, []);

  // play the intro exactly once, when the loader hands off
  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".hero__portrait-inner", {
        opacity: 1,
        yPercent: 0,
        scale: 1,
        duration: 1.4,
      })
        .to(
          ".hero__row",
          { opacity: 1, filter: "blur(0px)", duration: 1, stagger: 0.12 },
          "-=1.1"
        )
        .to(
          ".hero__foot > *",
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
          "-=0.7"
        );
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section className="hero" id="top" ref={root}>
      {/* portrait sits BEHIND the type; the type blends over it.
          the outer element keeps the centering transform; the inner element
          is what the intro animates, so centering is never disturbed. */}
      <div className="hero__portrait">
        <div className="hero__portrait-inner">
          <img src={hero.portrait} alt="Portrait" />
        </div>
      </div>

      <div className="hero__rows" aria-hidden="true">
        {hero.roles.map((role, i) => (
          <div className="hero__row" key={role}>
            <div
              className="hero__track"
              ref={(el) => (trackRefs.current[i] = el)}
            >
              {/* duplicated content for a seamless loop */}
              {Array.from({ length: 8 }).map((_, k) => (
                <span key={k}>
                  {role}
                  <i>✦</i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* screen-reader accessible heading (visually hidden) */}
      <h1 className="hero__sr">
        {hero.roles.join(", ")}, portfolio.
      </h1>

      <div className="hero__foot">
        <span className="hero__scroll">Scroll to explore ↓</span>
      </div>
    </section>
  );
}
