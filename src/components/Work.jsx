import { useRef } from "react";
import { projects } from "../content";
import Reveal from "./Reveal";
import "./Work.css";

function ProjectRow({ p }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <a
      className="work__row"
      href={p.link}
      ref={ref}
      onMouseMove={onMove}
      target="_blank"
      rel="noreferrer"
    >
      <span className="work__index">{p.index}</span>

      <div className="work__main">
        <h3 className="work__title display">{p.title}</h3>
        <p className="work__blurb">{p.blurb}</p>
        <div className="work__tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      <div className="work__side">
        <span className="work__year">{p.year}</span>
        <span className="work__arrow" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M7 17L17 7M17 7H9M17 7v8"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function Work() {
  return (
    <section className="work section" id="work">
      <div className="container">
        <Reveal className="work__head" stagger={0.1}>
          <p className="eyebrow">
            <span className="mono-index">03</span> / Selected Work
          </p>
          <h2 className="work__heading display">Things I&apos;ve shipped</h2>
        </Reveal>

        <div className="work__list">
          {projects.map((p) => (
            <ProjectRow key={p.index} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
