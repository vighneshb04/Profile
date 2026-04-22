"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
const ITEMS = ["Next.js","Solidity","AWS","PyTorch","Ethereum","React","TypeScript","Python","Docker","IPFS","Figma","Node.js","TensorFlow","Kubernetes","Web3.js","PostgreSQL","Go","Tailwind","Deep Learning"];
const doubled = [...ITEMS,...ITEMS,...ITEMS];
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const {scrollYProgress} = useScroll({target:ref,offset:["start end","end start"]});
  const opacity = useTransform(scrollYProgress,[0,0.1,0.9,1],[0,1,1,0]);
  return (
    <motion.div ref={ref} style={{position:"relative",zIndex:10,padding:"24px 0",overflow:"hidden",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",opacity}}>
      <div style={{position:"absolute",inset:"0 0 0 0",background:"linear-gradient(90deg,var(--black),transparent)",width:96,zIndex:10,pointerEvents:"none"}} />
      <div style={{position:"absolute",inset:"0 0 0 auto",background:"linear-gradient(-90deg,var(--black),transparent)",width:96,zIndex:10,pointerEvents:"none"}} />
      <motion.div style={{display:"flex",gap:40,whiteSpace:"nowrap",flexShrink:0,willChange:"transform"}} animate={{x:["0%","-33.33%"]}} transition={{duration:55,ease:"linear",repeat:Infinity}}>
        {doubled.map((item,i)=>(
          <span key={i} style={{display:"flex",alignItems:"center",gap:40,fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.25em",textTransform:"uppercase",color:"var(--muted)",flexShrink:0}}>
            {item}<span style={{width:4,height:4,borderRadius:"50%",background:"var(--border-light)",display:"block",flexShrink:0}} />
          </span>
        ))}
      </motion.div>
    </motion.div>
  );
}
