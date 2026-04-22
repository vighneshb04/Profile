"use client";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ROLES = ["AWS Solutions Architect","Blockchain Developer","AI / ML Researcher","Full-Stack Engineer","UI/UX Designer"];

function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(()=>setI(x=>(x+1)%ROLES.length),2800); return()=>clearInterval(t); }, []);
  return (
    <div style={{position:"relative",height:20,overflow:"hidden",minWidth:320}}>
      <AnimatePresence mode="wait">
        <motion.span key={i} initial={{y:24,opacity:0}} animate={{y:0,opacity:1}} exit={{y:-24,opacity:0}} transition={{duration:0.5,ease:[0.16,1,0.3,1]}}
          style={{position:"absolute",inset:0,display:"flex",alignItems:"center",fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.26em",textTransform:"uppercase",color:"var(--accent)"}}>
          {ROLES[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const {scrollYProgress} = useScroll({target:ref,offset:["start start","end start"]});
  const rawY = useTransform(scrollYProgress,[0,1],["0%","20%"]);
  const opacity = useTransform(scrollYProgress,[0,0.6],[1,0]);
  const y = useSpring(rawY,{stiffness:60,damping:20});

  const container = { hidden:{}, show:{transition:{staggerChildren:0.11,delayChildren:2.6}} };
  const item = { hidden:{opacity:0,y:60,clipPath:"inset(100% 0 0 0)"}, show:{opacity:1,y:0,clipPath:"inset(0% 0 0 0)",transition:{duration:1.1,ease:[0.16,1,0.3,1]}} };

  const S: Record<string,React.CSSProperties> = {
    section: {position:"relative",minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"0 64px 80px",overflow:"hidden"},
    scanlines: {position:"absolute",inset:0,pointerEvents:"none",backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.005) 3px,rgba(255,255,255,0.005) 4px)"},
    yearLabel: {position:"absolute",top:96,right:64,fontFamily:"var(--font-mono)",fontSize:9,letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--border-light)",writingMode:"vertical-rl"},
    name: {fontFamily:"var(--font-display)",lineHeight:0.85,letterSpacing:"0.01em",fontSize:"clamp(64px,13vw,196px)",color:"var(--white)"},
    nameGhost: {fontFamily:"var(--font-display)",lineHeight:0.85,letterSpacing:"0.01em",fontSize:"clamp(64px,13vw,196px)",color:"var(--off)",opacity:0.1},
    body: {fontSize:15,lineHeight:1.9,color:"var(--muted)",maxWidth:440},
    statsRow: {marginTop:48,display:"grid",gridTemplateColumns:"repeat(4,1fr)",borderTop:"1px solid var(--border)",paddingTop:32,gap:0},
  };

  return (
    <section ref={ref} id="hero" style={S.section}>
      <div style={S.scanlines} />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.2,duration:1}} style={S.yearLabel}>MMXXV · MMXXVI</motion.div>

      <motion.div variants={container} initial="hidden" animate="show" style={{position:"relative",zIndex:10}} {...{style:{...{position:"relative",zIndex:10},...{}}}}>
        <motion.div style={{position:"relative",zIndex:10}} variants={container} initial="hidden" animate="show">
          <motion.div variants={item} style={{display:"flex",alignItems:"center",gap:16,marginBottom:32}}>
            <span style={{height:1,width:40,background:"var(--accent)",display:"block"}} />
            <RoleRotator />
          </motion.div>

          <div style={{overflow:"hidden"}}>
            <motion.div variants={item} style={S.name}>VIGHNESH</motion.div>
          </div>
          <div style={{overflow:"hidden",display:"flex",alignItems:"baseline",gap:24}}>
            <motion.div variants={item} style={S.nameGhost}>B.</motion.div>
            <motion.span variants={item} style={{fontFamily:"var(--font-mono)",fontSize:"clamp(11px,1vw,15px)",color:"var(--muted)",letterSpacing:"0.25em",marginBottom:8}}>EST. 2003</motion.span>
          </div>

          <motion.div variants={item} style={{marginTop:40,display:"flex",flexWrap:"wrap",alignItems:"flex-end",justifyContent:"space-between",gap:32}}>
            <p style={S.body}>
              <strong style={{color:"var(--off)"}}>B.Tech CSE @ Amrita Vishwa Vidyapeetham.</strong>{" "}
              Building at the intersection of Web3, AI, and cloud infrastructure.{" "}
              <strong style={{color:"var(--off)"}}>MeitY Startup Pitch Winner · AWS Certified · IEEE Published.</strong>
            </p>
            <div style={{display:"flex",gap:12,flexShrink:0}}>
              <button className="btn-primary" onClick={()=>document.querySelector("#projects")?.scrollIntoView({behavior:"smooth"})}>
                <span>Work →</span>
              </button>
              <a href="/resume.pdf" download className="btn-ghost">Resume ↓</a>
            </div>
          </motion.div>

          <motion.div variants={item} style={S.statsRow}>
            {[["2","IEEE Publications"],["3","Internships"],["100+","Students Mentored"],["4+","Certifications"]].map(([n,l],i)=>(
              <div key={l} style={{paddingRight:32}}>
                <div className="stat-n">{n}</div>
                <div className="stat-l">{l}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:3.8,duration:1}}
        style={{position:"absolute",bottom:40,left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:12,zIndex:10}}>
        <span style={{fontFamily:"var(--font-mono)",fontSize:8,letterSpacing:"0.35em",textTransform:"uppercase",color:"var(--muted)"}}>Scroll</span>
        <div style={{width:20,height:32,borderRadius:10,border:"1px solid var(--border-light)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:6}}>
          <motion.div style={{width:2,borderRadius:2,background:"var(--accent)"}} animate={{height:["0px","12px","0px"],y:[0,8,0],opacity:[0,1,0]}} transition={{duration:1.8,repeat:Infinity,ease:"easeInOut"}} />
        </div>
      </motion.div>

      <style>{`@media(max-width:768px){#hero{padding:0 24px 64px;}}`}</style>
    </section>
  );
}
