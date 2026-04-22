"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

export function Reveal({ children, delay = 0, dir = "up" }: { children: ReactNode; delay?: number; dir?: "up"|"left"|"right"|"none" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const init = { up:{opacity:0,y:40}, left:{opacity:0,x:-40}, right:{opacity:0,x:40}, none:{opacity:0} }[dir];
  return (
    <motion.div ref={ref} initial={init} animate={inView ? {opacity:1,y:0,x:0} : {}} transition={{duration:0.85,delay,ease:[0.16,1,0.3,1]}}>
      {children}
    </motion.div>
  );
}

export function SectionHeader({ index, title }: { index: string; title: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="sec-header">
      <motion.span className="sec-index" initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,ease:[0.16,1,0.3,1]}}>{index}</motion.span>
      <div style={{overflow:"hidden"}}>
        <motion.h2 className="sec-title" initial={{y:"110%"}} animate={inView?{y:"0%"}:{}} transition={{duration:0.9,delay:0.1,ease:[0.16,1,0.3,1]}}>{title}</motion.h2>
      </div>
    </div>
  );
}
