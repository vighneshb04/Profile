"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const achievements = [
  { abbr:"GOI", title:"MeitY Startup Hub — National Winner", desc:"GENESIS EIR Cohort-2, Government of India. National-level startup pitch deck competition.", year:"2025" },
  { abbr:"AWD", title:"Spirit of Innovation Award", desc:"CAUSE 2025 Ideathon, CMR University, Bengaluru.", year:"2025" },
  { abbr:"IEEE", title:"Dual IEEE Publication", desc:"Published at IIT Indore ICCCNT 2025 and Christ University TQCEBT 2026.", year:"25/26" },
  { abbr:"OSS", title:"Hacktoberfest Contributor", desc:"Multiple accepted open-source pull requests across public repositories.", year:"2025" },
  { abbr:"ACM", title:"ACM Web Lead & Mentor", desc:"Mentored 100+ students in web development, cloud infrastructure, and blockchain.", year:"2024–" },
  { abbr:"ICPC", title:"ICPC Volunteer Coordinator", desc:"Coordinated teams and logistics for Asia West Amritapuri Regionals 2026.", year:"2026" },
];

export default function Achievements() {
  return (
    <section id="achievements" className="section" style={{background:"var(--surface)"}}>
      <SectionHeader index="06" title="ACHIEVEMENTS" />
      <div className="grid-3">
        {achievements.map((a,i)=>{
          const ref = useRef(null);
          const inView = useInView(ref,{once:true,margin:"-50px"});
          return (
            <motion.div key={a.title} ref={ref} style={{background:"var(--surface)",padding:40,position:"relative",overflow:"hidden"}} initial={{opacity:0,y:50}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.85,delay:i*0.08,ease:[0.16,1,0.3,1]}} whileHover={{y:-3}}>
              {/* Corner diamonds */}
              <motion.div style={{position:"absolute",bottom:-40,right:-40,width:128,height:128,border:"1px solid var(--border)",rotate:"45deg"}} whileHover={{scale:1.2,borderColor:"var(--accent-dim)"}} transition={{duration:0.5}} />
              <motion.div style={{position:"absolute",bottom:-24,right:-24,width:64,height:64,border:"1px solid var(--border-light)",rotate:"45deg"}} whileHover={{scale:1.3,borderColor:"var(--accent)"}} transition={{duration:0.5,delay:0.05}} />
              {/* Top sweep */}
              <div style={{position:"absolute",top:0,left:0,right:0,height:1,overflow:"hidden"}}>
                <motion.div style={{height:"100%",background:"var(--accent)",originX:0}} initial={{scaleX:0}} whileHover={{scaleX:1}} transition={{duration:0.4,ease:[0.76,0,0.24,1]}} />
              </div>
              <span style={{position:"absolute",top:32,right:32,fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.22em",textTransform:"uppercase",color:"var(--border-light)"}}>{a.year}</span>
              <div style={{fontFamily:"var(--font-display)",fontSize:40,lineHeight:1,letterSpacing:"0.06em",color:"var(--accent)",marginBottom:20,position:"relative",zIndex:1}}>{a.abbr}</div>
              <div style={{fontFamily:"var(--font-sans)",fontWeight:600,fontSize:15,lineHeight:1.4,color:"var(--white)",marginBottom:12,position:"relative",zIndex:1}}>{a.title}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,lineHeight:1.7,letterSpacing:"0.04em",color:"var(--muted)",position:"relative",zIndex:1}}>{a.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
