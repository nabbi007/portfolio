import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site, socials } from "../content";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const root = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact__word", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ".contact__big", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const year = 2026;

  return (
    <footer className="contact section" id="contact" ref={root}>
      <div className="container">
        <p className="eyebrow contact__eyebrow">
          <span className="mono-index">05</span> / Contact
        </p>

        <a href={`mailto:${site.email}`} className="contact__big display">
          <span className="contact__line">
            <span className="contact__word">Let&apos;s</span>{" "}
            <span className="contact__word">build</span>
          </span>
          <span className="contact__line">
            <span className="contact__word">something</span>{" "}
            <span className="contact__word contact__word--em">reliable.</span>
          </span>
        </a>

        <div className="contact__grid">
          <div className="contact__col">
            <span className="contact__label">Email</span>
            <a href={`mailto:${site.email}`} className="contact__link">
              {site.email}
            </a>
          </div>
          <div className="contact__col">
            <span className="contact__label">Elsewhere</span>
            <div className="contact__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="contact__link"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div className="contact__col">
            <span className="contact__label">Résumé</span>
            <a href={site.resumeUrl} className="contact__link">
              Download CV ↗
            </a>
          </div>
        </div>

        <div className="contact__footer">
          <span>
            © {year} {site.name}
          </span>
          <span className="contact__built">
            Built with React · GSAP · plenty of YAML
          </span>
          <a href="#top" className="contact__top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
