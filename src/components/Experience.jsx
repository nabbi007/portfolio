import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experience, hero } from "../content";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const root = useRef(null);
  const trackRef = useRef(null);
  const stRef = useRef(null);
  const [active, setActive] = useState(0);
  const total = experience.length;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const stages = gsap.utils.toArray(".exp__stage");
      const steps = stages.length - 1;
      if (steps <= 0) return;

      // every stage after the first waits stacked just below the viewport,
      // dimmed to a faint "shade" preview — not fully hidden — so you can
      // see the next photo and text coming as it rises into place
      gsap.set(stages.slice(1), { yPercent: 100 });
      gsap.set(
        stages
          .slice(1)
          .flatMap((s) => s.querySelectorAll(".exp__col, .exp__img-wrap")),
        { opacity: 0.16 }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: "top top",
          end: () => `+=${steps * window.innerHeight * 0.75}`,
          pin: true,
          scrub: 0.4,
          snap: 1 / steps,
          onUpdate(self) {
            setActive(Math.min(steps, Math.round(self.progress * steps)));
          },
        },
      });
      stRef.current = tl.scrollTrigger;

      stages.slice(1).forEach((stage, i) => {
        const content = stage.querySelectorAll(".exp__col, .exp__img-wrap");
        // the panel rises as a dim preview of the photo/text, then sharpens
        // to full brightness right as it settles into place
        tl.to(stage, { yPercent: 0, ease: "none", duration: 1 }, i).to(
          content,
          { opacity: 1, ease: "power1.in", duration: 1 },
          i
        );
      });
    }, root);
    return () => ctx.revert();
  }, [total]);

  const skip = () => {
    const st = stRef.current;
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (!st) return;
    if (lenis) lenis.scrollTo(st.end, { duration: 1.2 });
    else window.scrollTo({ top: st.end, behavior: "smooth" });
  };

  return (
    <section className="exp" id="experience" ref={root}>
      <div className="exp__track" ref={trackRef}>
        <p className="eyebrow exp__eyebrow">
          <span className="mono-index">04</span> / Journey
        </p>

        {experience.map((e, i) => (
          <div
            className="exp__stage"
            key={e.org}
            style={{ zIndex: i + 1 }}
            aria-hidden={i !== active}
          >
            <div className="exp__col exp__col--title">
              <h2 className="exp__title">{e.org}</h2>
              <p className="exp__org">{e.role}</p>
              <p className="exp__period">{e.period}</p>
            </div>

            <div className="exp__img-wrap">
              <img className="exp__img" src={hero.portrait} alt="" />
            </div>

            <div className="exp__col exp__col--note">
              <p className="exp__note">{e.note}</p>
            </div>
          </div>
        ))}

        {active < total - 1 && (
          <button className="exp__skip" onClick={skip} type="button">
            Skip <span>»</span>
          </button>
        )}

        <div className="exp__counter">
          <svg
            className="exp__counter-icon"
            viewBox="0 0 24 14"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" fill="none" strokeWidth="2" />
            <circle cx="17" cy="7" r="6" fill="none" strokeWidth="2" />
          </svg>
          {active + 1}/{total}
        </div>
      </div>
    </section>
  );
}
