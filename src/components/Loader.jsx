import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { deploySteps, site } from "../content";
import "./Loader.css";

export default function Loader({ onComplete }) {
  const root = useRef(null);
  const cb = useRef(onComplete);
  cb.current = onComplete;
  const [activeStage, setActiveStage] = useState(-1);
  const [doneStages, setDoneStages] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => cb.current?.(),
      });

      // intro: pipeline frame fades up
      tl.from(".loader__frame", { y: 24, opacity: 0, duration: 0.6 });
      tl.from(".loader__topbar", { opacity: 0, duration: 0.4 }, "<0.1");

      // run each stage in sequence — running -> success, one at a time
      deploySteps.forEach((_, i) => {
        tl.call(() => setActiveStage(i), null, "+=0.1");
        tl.to({}, { duration: 0.55 }); // stage "runs"
        tl.call(() => setDoneStages((s) => [...s, i]), null);
      });

      // success flash
      tl.call(() => {
        setActiveStage(-1);
        setDone(true);
      }, null, "+=0.1");
      tl.to(".loader__status", { opacity: 1, y: 0, duration: 0.5 }, "+=0.05");
      tl.to(".loader__body", { opacity: 0, duration: 0.4 }, "+=0.7");

      // curtain reveal — panels slide up to expose the site
      tl.to(
        ".loader__panel",
        {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.9,
          ease: "power4.inOut",
          stagger: 0.08,
        },
        "+=0.05"
      );
      tl.set(root.current, { pointerEvents: "none", autoAlpha: 0 });
    }, root);

    return () => ctx.revert();
    // run exactly once — onComplete is read through a ref so a changing
    // prop identity never restarts the deploy sequence
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="loader" ref={root}>
      {/* curtain panels that lift away at the end */}
      <div className="loader__panels" aria-hidden="true">
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
        <span className="loader__panel" />
      </div>

      <div className="loader__body">
        <div className="loader__frame">
          <div className="loader__topbar">
            <span className="loader__dots">
              <i /> <i /> <i />
            </span>
            <span className="loader__title">
              Pipeline · {site.name.toLowerCase().replace(/\s+/g, "-")} #1
            </span>
            <span className={`loader__pct ${done ? "is-done" : ""}`}>
              {done ? "SUCCESS" : "RUNNING"}
            </span>
          </div>

          {/* Jenkins-style stage view: boxes connected by a track line */}
          <div className="loader__stages">
            {deploySteps.map((step, i) => {
              const isDone = doneStages.includes(i);
              const isActive = activeStage === i;
              return (
                <div className="loader__stage-wrap" key={step.stage}>
                  <div
                    className={`loader__stage ${isDone ? "is-done" : ""} ${
                      isActive ? "is-active" : ""
                    }`}
                  >
                    <span className="loader__stage-dot" />
                    <span className="loader__stage-name">{step.stage}</span>
                    <span className="loader__stage-time">{step.time}</span>
                  </div>
                  {i < deploySteps.length - 1 && (
                    <span
                      className={`loader__connector ${
                        isDone ? "is-done" : ""
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* live log line for whichever stage is currently running */}
          <div className="loader__log">
            <span className="loader__prompt">$</span>
            <span className="loader__cmd">
              {activeStage >= 0
                ? deploySteps[activeStage].cmd
                : done
                ? "pipeline finished"
                : ""}
            </span>
            {activeStage >= 0 && doneStages.includes(activeStage) && (
              <span className="loader__ok">
                <b>✓</b> {deploySteps[activeStage].ok}
              </span>
            )}
          </div>

          <div className={`loader__status ${done ? "is-done" : ""}`}>
            <span className="loader__badge">DEPLOYMENT SUCCESSFUL</span>
            <span className="loader__url">
              https://{site.name.toLowerCase().replace(/\s+/g, "")}.dev
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
