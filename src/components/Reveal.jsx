import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Wraps content and fades/slides it in when it scrolls into view.
 * `as` sets the element tag, `stagger` animates direct children instead.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  stagger = 0,
  y = 40,
  delay = 0,
  className = "",
  ...rest
}) {
  const el = useRef(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const targets = stagger ? node.children : node;

    const anim = gsap.from(targets, {
      y,
      opacity: 0,
      duration: 1,
      delay,
      ease: "power3.out",
      stagger: stagger || 0,
      scrollTrigger: {
        trigger: node,
        start: "top 82%",
        // replay every time this scrolls into view, not just once
        toggleActions: "play reverse play reverse",
      },
    });

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [stagger, y, delay]);

  return (
    <Tag ref={el} className={className} {...rest}>
      {children}
    </Tag>
  );
}
