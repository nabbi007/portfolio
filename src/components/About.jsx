import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { about, hero } from "../content";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const PROMPT = `${about.terminal.promptUser}:${about.terminal.promptPath}$`;

// a command is typed letter by letter, then "enter" reveals its output
// (which prints instantly, like a real shell) before the next command
// starts typing
const SEQUENCE = [
  { kind: "cmd", text: about.terminal.whoamiCmd },
  { kind: "out", text: about.terminal.whoamiOutput },
  { kind: "cmd", text: about.terminal.scriptCmd },
  ...about.terminal.lines.map((text) => ({ kind: "out", text })),
];

const TYPE_SPEED = 65; // ms per char — deliberate keystrokes
const ENTER_PAUSE = 280; // ms "thinking" pause after pressing enter
const LINE_PAUSE = 550; // ms before the next command starts typing

export default function About() {
  const root = useRef(null);
  const [started, setStarted] = useState(false);
  const [itemIndex, setItemIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [committed, setCommitted] = useState(false); // cmd typed, enter pressed, waiting for output

  // "idle" → waiting for a click · "typing" → command being typed ·
  // "committed" → enter pressed, pausing before the list prints · "done" → list shown
  const [certsPhase, setCertsPhase] = useState("idle");
  const [certsChars, setCertsChars] = useState(0);
  const certsText = about.terminal.certsCmd;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about__img", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about__row",
          start: "top 78%",
          // replay every time this scrolls into view, not just once
          toggleActions: "play reverse play reverse",
        },
      });
      gsap.to(".about__img", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: ".about__row",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      // retype the terminal sequence each time it scrolls into view
      const retype = () => {
        setStarted(false);
        setItemIndex(0);
        setCharCount(0);
        setCommitted(false);
        setCertsPhase("idle");
        setCertsChars(0);
        requestAnimationFrame(() => setStarted(true));
      };
      ScrollTrigger.create({
        trigger: ".about__terminal",
        start: "top 78%",
        onEnter: retype,
        onEnterBack: retype,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!started || itemIndex >= SEQUENCE.length) return;
    const current = SEQUENCE[itemIndex];

    // output lines just appear instantly once it's their turn
    if (current.kind === "out") {
      const t = setTimeout(() => {
        setItemIndex((i) => i + 1);
        setCharCount(0);
      }, LINE_PAUSE);
      return () => clearTimeout(t);
    }

    // commands type out char by char
    if (charCount < current.text.length) {
      const t = setTimeout(() => setCharCount((c) => c + 1), TYPE_SPEED);
      return () => clearTimeout(t);
    }
    if (!committed) {
      const t = setTimeout(() => setCommitted(true), ENTER_PAUSE);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setItemIndex((i) => i + 1);
      setCharCount(0);
      setCommitted(false);
    }, LINE_PAUSE);
    return () => clearTimeout(t);
  }, [started, itemIndex, charCount, committed]);

  // types the clicked "cat certifications.txt" command, then prints the list
  useEffect(() => {
    if (certsPhase === "typing") {
      if (certsChars < certsText.length) {
        const t = setTimeout(() => setCertsChars((c) => c + 1), TYPE_SPEED);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setCertsPhase("committed"), ENTER_PAUSE);
      return () => clearTimeout(t);
    }
    if (certsPhase === "committed") {
      const t = setTimeout(() => setCertsPhase("done"), LINE_PAUSE);
      return () => clearTimeout(t);
    }
  }, [certsPhase, certsChars, certsText]);

  return (
    <section className="about section" id="about" ref={root}>
      <div className="container">
        <p className="eyebrow about__eyebrow">
          <span className="mono-index">01</span> / {about.eyebrow}
        </p>

        <div className="about__row">
          <div className="about__img-wrap">
            <img className="about__img" src={hero.portrait} alt="Illiasu Nabbi" />
          </div>

          <div className="about__terminal">
            <div className="about__terminal-bar">
              <span className="about__terminal-dots" aria-hidden="true">
                <i /> <i /> <i />
              </span>
              <span className="about__terminal-title">
                {about.terminal.promptUser}: {about.terminal.promptPath}
              </span>
            </div>
            <div className="about__terminal-body">
              {SEQUENCE.map((item, i) => {
                if (i > itemIndex) return null;
                const isActive = i === itemIndex;

                if (item.kind === "cmd") {
                  const text = isActive ? item.text.slice(0, charCount) : item.text;
                  const showCursor = isActive;
                  return (
                    <p className="about__line is-cmd" key={i}>
                      <span className="about__prompt">{PROMPT}</span>
                      <span>{text}</span>
                      {showCursor && <span className="about__cursor" />}
                    </p>
                  );
                }
                return (
                  <p className="about__line is-out" key={i}>
                    {item.text}
                  </p>
                );
              })}
              {itemIndex >= SEQUENCE.length && certsPhase === "idle" && (
                <p className="about__line is-cmd">
                  <span className="about__prompt">{PROMPT}</span>
                  <button
                    type="button"
                    className="about__certs-btn"
                    onClick={() => setCertsPhase("typing")}
                  >
                    {certsText}
                  </button>
                  <span className="about__cursor" />
                </p>
              )}

              {certsPhase !== "idle" && (
                <p className="about__line is-cmd">
                  <span className="about__prompt">{PROMPT}</span>
                  <span>{certsText.slice(0, certsPhase === "typing" ? certsChars : certsText.length)}</span>
                  {certsPhase === "typing" && <span className="about__cursor" />}
                </p>
              )}

              {certsPhase === "done" && (
                <>
                  {about.certifications.map((c) => (
                    <p className="about__line is-out" key={c.name}>
                      {c.name}, {c.year}
                    </p>
                  ))}
                  <p className="about__line is-cmd">
                    <span className="about__prompt">{PROMPT}</span>
                    <span className="about__cursor" />
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
