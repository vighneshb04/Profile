"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const jobs = [
  { period:"Aug 2025 — Present", company:"AMRITA CREATE", role:"Full Stack Developer Intern", points:["Developed a department-level school management system for academic and administrative workflows.","Built REST APIs, authentication, role-based access, and database-backed modules.","Coordinated with faculty stakeholders to convert operational needs into scalable features."] },
  { period:"Aug 2024 — Jan 2025", company:"ARTSY TECHNOLOGIES", role:"Web UI/UX Developer Intern", points:["Developed responsive, production-grade UI/UX components using Next.js and Tailwind CSS.","Integrated frontend components with backend APIs for seamless user experience.","Improved UI/UX consistency, accessibility, and cross-device performance."] },
  { period:"Jan 2024", company:"INFOGATEWAY IT SOLUTIONS", role:"Web Designer Intern", points:["Designed, deployed, and maintained multiple client websites end-to-end.","Deployed websites on hosting platforms and managed billing and payment flows.","Supported delivery from UI design through production deployment."] },
];

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHeader index="03" title="EXPERIENCE" />
      {jobs.map((job,i)=>{
        const ref = useRef(null);
        const inView = useInView(ref,{once:true,margin:"-60px"});
        return (
          <motion.div key={job.company} ref={ref} style={{display:"grid",gridTemplateColumns:"180px 1fr",gap:56,padding:"56px 0",borderBottom:"1px solid var(--border)",position:"relative"}} className="exp-row" initial={{opacity:0}} animate={inView?{opacity:1}:{}} transition={{duration:0.6,delay:i*0.1}}>
            {/* Left accent bar */}
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:1,overflow:"hidden"}}>
              <motion.div style={{width:"100%",height:"100%",background:"var(--accent)",originY:0}} initial={{scaleY:0}} whileHover={{scaleY:1}} transition={{duration:0.4,ease:[0.76,0,0.24,1]}} />
            </div>
            <motion.div style={{fontFamily:"var(--font-mono)",fontSize:11,letterSpacing:"0.04em",color:"var(--muted)",lineHeight:1.7,paddingTop:4}} initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{duration:0.7,delay:i*0.1+0.2}}>{job.period}</motion.div>
            <motion.div initial={{opacity:0,y:20}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.8,delay:i*0.1+0.15}}>
              <div style={{fontFamily:"var(--font-display)",fontSize:32,letterSpacing:"0.08em",color:"var(--white)",marginBottom:6}}>{job.company}</div>
              <div style={{fontFamily:"var(--font-mono)",fontSize:10,letterSpacing:"0.22em",textTransform:"uppercase",color:"var(--accent)",marginBottom:24}}>{job.role}</div>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:10}}>
                {job.points.map((p,j)=>(
                  <motion.li key={j} style={{fontSize:13,lineHeight:1.7,color:"var(--muted)",paddingLeft:20,position:"relative"}} initial={{opacity:0,x:-10}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:i*0.1+j*0.08+0.4}}>
                    <span style={{position:"absolute",left:0,top:10,width:8,height:1,background:"var(--border-light)",display:"block"}} />
                    {p}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        );
      })}
      <style>{`@media(max-width:768px){.exp-row{grid-template-columns:1fr!important;gap:16px!important;}}`}</style>
    </section>
  );
}
