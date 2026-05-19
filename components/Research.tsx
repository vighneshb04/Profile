"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const pubs = [
  { year:"2026", venue:"TQCEBT'26 · Christ University, Pune", title:"Explainable Transformer-Based Attention Network for Temporal Relation Modeling and Context-Aware Fine-Grained Video Captioning", authors:"Vighnesh B, K. Namitha, S. Reshma Sri", tag:"Deep Learning" },
  { year:"2025", venue:"ICCCNT · IIT Indore", title:"Facial Expression Recognition Using Multi-Modal Deep Learning with Graph Attention Networks", authors:"Vighnesh B, K. Namitha, S. Reshma Sri, D. Aditya Kiran", tag:"Computer Vision" },
];

export default function Research() {
  return (
    <section id="research" className="section">
      <SectionHeader index="05" title="RESEARCH" />
      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:"var(--border)",marginBottom:64}} className="research-stats">
        {[["2","Papers"],["2","Venues"],["5","Co-Authors"],["IIT","Indore"]].map(([n,l])=>(
          <div key={l} style={{background:"var(--surface)",padding:32}}><div className="stat-n">{n}</div><div className="stat-l">{l}</div></div>
        ))}
      </div>
      {pubs.map((p,i)=>{
        const ref = useRef(null);
        const inView = useInView(ref,{once:true,margin:"-60px"});
        return (
          <motion.div key={p.title} ref={ref} style={{display:"grid",gridTemplateColumns:"100px 1fr",gap:80,padding:"48px 0",borderBottom:"1px solid var(--border)",position:"relative",overflow:"hidden"}} className="pub-row" initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.6,delay:i*0.15}}>
            {/* Hover sweep */}
            <motion.div style={{position:"absolute",inset:0,background:"rgba(184,164,138,0.025)",originX:0,pointerEvents:"none"}} initial={{scaleX:0}} whileHover={{scaleX:1}} transition={{duration:0.6,ease:[0.76,0,0.24,1]}} />
            <motion.div style={{fontFamily:"var(--font-display)",fontSize:"clamp(44px,5.5vw,76px)",color:"var(--accent)",lineHeight:1,position:"relative",zIndex:1}} initial={{opacity:0,x:-30}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.8,delay:i*0.15+0.1}} whileHover={{color:"var(--accent-dim)"}}>{p.year}</motion.div>
            <motion.div style={{position:"relative",zIndex:1}} initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.85,delay:i*0.15+0.15}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                <span style={{fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.24em",textTransform:"uppercase",color:"var(--accent)"}}>{p.venue}</span>
                <span style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:"0.15em",textTransform:"uppercase",padding:"3px 8px",border:"1px solid var(--border)",color:"var(--muted)"}}>{p.tag}</span>
              </div>
              <div style={{fontFamily:"var(--font-sans)",fontWeight:600,fontSize:17,lineHeight:1.5,color:"var(--white)",marginBottom:12,maxWidth:620}}>{p.title}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.04em",color:"var(--muted)"}}>{p.authors}</div>
            </motion.div>
          </motion.div>
        );
      })}
      <style>{`@media(max-width:768px){.pub-row{grid-template-columns:1fr!important;gap:16px!important;}.research-stats{grid-template-columns:1fr 1fr!important;}}`}</style>
    </section>
  );
}
