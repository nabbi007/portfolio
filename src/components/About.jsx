import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, hero } from "../content";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // the whole statement eases up + sharpens into focus as it enters view
      gsap.from(".about__big", {
        opacity: 0,
        y: 36,
        filter: "blur(6px)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about__statement-row", start: "top 80%" },
      });
      // portrait fades/scales in just after, slightly offset for depth
      gsap.from(".about__img", {
        opacity: 0,
        scale: 1.1,
        duration: 1.3,
        ease: "power3.out",
        delay: 0.1,
        scrollTrigger: { trigger: ".about__statement-row", start: "top 78%" },
      });
      // emphasized phrases brighten in once the row is in view
      gsap.from(".about__big .is-em", {
        opacity: 0.25,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { trigger: ".about__statement-row", start: "top 68%" },
      });
      // parallax — the portrait drifts slower than the page scrolls, with a
      // touch of scrub lag so it glides rather than tracking the cursor 1:1
      gsap.to(".about__img", {
        yPercent: -22,
        ease: "none",
        scrollTrigger: {
          trigger: ".about__statement-row",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <p className="eyebrow about__eyebrow">
          <span className="mono-index">01</span> / {about.eyebrow}
        </p>

        <div className="about__statement-row">
          <div className="about__img-wrap">
            <img className="about__img" src={hero.portrait} alt="Iliasu Abubakar" />
          </div>
          <h2 className="about__big">
            {about.statementParts.map((part, i) => (
              <span key={i} className={part.em ? "is-em" : undefined}>
                {part.text}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
