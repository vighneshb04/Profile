"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { label:"Cloud & Infra", abbr:"CLD", items:["AWS","VPC","Docker","Kubernetes","EC2","S3","Lambda"], glow:"rgba(100,160,220,0.12)" },
  { label:"Blockchain & Web3", abbr:"WEB3", items:["Solidity","Ethereum","Web3.js","ERC-721","IPFS","Smart Contracts"], glow:"rgba(160,100,220,0.12)" },
  { label:"Frontend & UI", abbr:"FE", items:["Next.js","React.js","React Native","Tailwind CSS","Figma","TypeScript"], glow:"rgba(100,200,160,0.1)" },
  { label:"AI / ML", abbr:"AI", items:["Deep Learning","CNN","Graph Attention","PyTorch","TensorFlow","Python"], glow:"rgba(220,140,100,0.1)" },
  { label:"Backend & Data", abbr:"BE", items:["Node.js","REST APIs","SQL","PostgreSQL","Go","Java","C"], glow:"rgba(184,164,138,0.1)" },
  { label:"Analytics & Tools", abbr:"DA", items:["AWS QuickSight","Tableau","LaTeX","Git","Linux","Data Analysis"], glow:"rgba(180,100,100,0.1)" },
];

export default function Skills() {
  return (
    <section id="skills" className="section" style={{background:"var(--surface)"}}>
      <SectionHeader index="02" title="SKILLS" />
      <div className="grid-3">
        {skills.map((s,i)=>{
          const ref = useRef(null);
          const inView = useInView(ref,{once:true,margin:"-50px"});
          return (
            <motion.div key={s.label} ref={ref} className="card" initial={{opacity:0,y:50}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.85,delay:i*0.08,ease:[0.16,1,0.3,1]}} whileHover={{y:-4}}>
              <div className="top-line" />
              <motion.div className="absolute inset-0 pointer-events-none opacity-0" style={{background:`radial-gradient(ellipse at 50% 0%,${s.glow},transparent 70%)`}} whileHover={{opacity:1}} transition={{duration:0.4}} />
              <div style={{fontFamily:"var(--font-display)",fontSize:44,lineHeight:1,marginBottom:20,color:"var(--accent)",position:"relative",zIndex:1}}>{s.abbr}</div>
              <div style={{fontFamily:"var(--font-sans)",fontWeight:600,fontSize:15,marginBottom:20,color:"var(--white)",position:"relative",zIndex:1}}>{s.label}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,position:"relative",zIndex:1}}>
                {s.items.map((item,j)=>(
                  <motion.span key={item} className="tag" initial={{opacity:0,scale:0.85}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:i*0.08+j*0.04+0.3,duration:0.4}}>{item}</motion.span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
