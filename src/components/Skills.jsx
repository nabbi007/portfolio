import { skills } from "../content";
import Reveal from "./Reveal";
import "./Skills.css";

export default function Skills() {
  return (
    <section className="skills section" id="stack">
      <div className="container">
        <Reveal className="skills__head" stagger={0.1}>
          <p className="eyebrow">
            <span className="mono-index">02</span> / Stack
          </p>
          <h2 className="skills__title display">
            Tools of the trade
          </h2>
        </Reveal>
        <Reveal className="skills__grid" stagger={0.12}>
          {skills.map((g) => (
            <div className="skills__col" key={g.group}>
              <h3 className="skills__group">{g.group}</h3>
              <ul>
                {g.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
