"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const tags = ["Blockchain","Next.js","Solidity","AWS","Deep Learning","React","Python","Go","Figma","Docker","Kubernetes","Web3.js","Node.js","TypeScript"];
const info = [
  {label:"Location",value:"Kollam, Kerala, India"},
  {label:"University",value:"Amrita Vishwa Vidyapeetham"},
  {label:"Degree",value:"B.Tech CSE — CGPA 7.82"},
  {label:"Email",value:"vighnesh.b@hotmail.com",href:"mailto:vighnesh.b@hotmail.com"},
  {label:"GitHub",value:"vighneshb04",href:"https://github.com/vighneshb04"},
  {label:"LinkedIn",value:"vighneshb04",href:"https://linkedin.com/in/vighneshb04"},
  {label:"Phone",value:"+91 7012091461",href:"tel:+917012091461"},
  {label:"Languages",value:"English · Malayalam · Hindi · Tamil"},
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:"-80px"});
  return (
    <section id="about" ref={ref} className="section">
      <SectionHeader index="01" title="ABOUT" />
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:96}} className="about-grid">
        <div>
          {[
            <><strong style={{color:"var(--off)"}}>Vighnesh B</strong> — Computer Science undergrad from Kollam, Kerala, at Amrita Vishwa Vidyapeetham. Working across <strong style={{color:"var(--off)"}}>blockchain</strong>, full-stack, <strong style={{color:"var(--off)"}}>AI/ML</strong>, and cloud infrastructure.</>,
            <><strong style={{color:"var(--off)"}}>MeitY Startup Pitch Winner</strong> (Govt. of India), published IEEE researcher, and ACM Web Lead who has mentored <strong style={{color:"var(--off)"}}>100+ students</strong> in web dev, cloud, and blockchain.</>,
            <>Driven by a belief that the best technology is invisible in its elegance — from <strong style={{color:"var(--off)"}}>decentralized judicial systems</strong> to emotion-recognition deep learning models.</>,
          ].map((text,i)=>(
            <motion.p key={i} style={{fontSize:15,lineHeight:1.9,color:"var(--muted)",marginBottom:20}} initial={{opacity:0,y:30}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:i*0.12,ease:[0.16,1,0.3,1]}}>{text}</motion.p>
          ))}
          <motion.div style={{display:"flex",flexWrap:"wrap",gap:8,marginTop:32}} initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.5}}>
            {tags.map((t,i)=>(
              <motion.span key={t} className="tag" style={{cursor:"default"}} initial={{opacity:0,scale:0.8}} animate={inView?{opacity:1,scale:1}:{}} transition={{delay:0.55+i*0.04,duration:0.4}} whileHover={{scale:1.06}}>{t}</motion.span>
            ))}
          </motion.div>
        </div>
        <motion.div initial={{opacity:0,x:40}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.9,delay:0.2,ease:[0.16,1,0.3,1]}}>
          {info.map((row,i)=>(
            <motion.div key={row.label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:"1px solid var(--border)"}} initial={{opacity:0,x:20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:0.25+i*0.07,duration:0.65}}>
              <span className="label">{row.label}</span>
              {row.href
                ? <motion.a href={row.href} target={row.href.startsWith("http")?"_blank":undefined} rel="noreferrer" style={{fontSize:13,color:"var(--off)",textDecoration:"none"}} whileHover={{color:"var(--accent)"}} transition={{duration:0.2}}>{row.value}</motion.a>
                : <span style={{fontSize:13,color:"var(--off)"}}>{row.value}</span>
              }
            </motion.div>
          ))}
          <motion.div style={{marginTop:32}} initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{delay:0.9}}>
            <a href="/resume.pdf" download className="btn-primary"><span>Download Resume ↓</span></a>
          </motion.div>
        </motion.div>
      </div>
      <style>{`@media(max-width:768px){.about-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}
