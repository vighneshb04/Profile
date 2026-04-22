"use client";
import { SectionHeader } from "./Reveal";
import { motion, useInView } from "framer-motion";
import { useState, FormEvent, useRef } from "react";

const socials = [
  { label:"Email", value:"vighnesh.b@hotmail.com", href:"mailto:vighnesh.b@hotmail.com" },
  { label:"LinkedIn", value:"linkedin.com/in/vighneshb04", href:"https://linkedin.com/in/vighneshb04" },
  { label:"GitHub", value:"github.com/vighneshb04", href:"https://github.com/vighneshb04" },
  { label:"Instagram", value:"@vighneshhb", href:"https://instagram.com/vighneshhb" },
  { label:"Figma", value:"@vighneshofficia", href:"https://www.figma.com/@vighneshofficia" },
  { label:"Phone", value:"+91 7012091461", href:"tel:+917012091461" },
];

function Field({id,label,type="text",textarea=false}:{id:string;label:string;type?:string;textarea?:boolean}) {
  const [focused,setFocused] = useState(false);
  const [val,setVal] = useState("");
  const lifted = focused||val.length>0;
  const inputStyle: React.CSSProperties = {width:"100%",background:"transparent",border:"none",outline:"none",fontFamily:"var(--font-sans)",fontSize:15,paddingTop:24,paddingBottom:8,color:"var(--off)",resize:"none" as const};
  return (
    <div style={{position:"relative",borderBottom:`1px solid ${focused?"var(--accent)":"var(--border)"}`,transition:"border-color 0.35s"}}>
      <label htmlFor={id} style={{position:"absolute",pointerEvents:"none",fontFamily:"var(--font-mono)",fontSize:lifted?8:10,letterSpacing:"0.22em",textTransform:"uppercase",color:focused?"var(--accent)":"var(--muted)",top:lifted?4:18,transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)"}}>{label}</label>
      {textarea
        ? <textarea id={id} rows={4} style={inputStyle} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setVal(e.target.value)} value={val} />
        : <input id={id} type={type} style={inputStyle} onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} onChange={e=>setVal(e.target.value)} value={val} />
      }
    </div>
  );
}

export default function Contact() {
  const [sent,setSent] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref,{once:true,margin:"-80px"});

  return (
    <section id="contact" className="section" style={{overflow:"hidden"}}>
      <motion.div style={{position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",fontFamily:"var(--font-display)",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none",fontSize:"clamp(80px,18vw,240px)",color:"transparent",WebkitTextStroke:"1px rgba(255,255,255,0.022)",letterSpacing:"0.06em",lineHeight:1}} initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:1.2}}>CONNECT</motion.div>
      <SectionHeader index="08" title="CONTACT" />
      <div ref={ref} style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:96}} className="contact-grid">
        <motion.div initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9}}>
          <div style={{fontFamily:"var(--font-display)",fontSize:"clamp(50px,7vw,100px)",lineHeight:0.88,letterSpacing:"0.04em",color:"var(--white)",marginBottom:32}}>
            LET&apos;S<br/><span style={{color:"var(--accent)"}}>WORK</span><br/>TOGETHER
          </div>
          <p style={{fontSize:14,lineHeight:1.8,color:"var(--muted)",maxWidth:340,marginBottom:40}}>Open to collaborations, research opportunities, and interesting conversations about blockchain, AI, and the future of the web.</p>
          {socials.map((s,i)=>(
            <motion.a key={s.label} href={s.href} target={s.href.startsWith("http")?"_blank":undefined} rel="noreferrer"
              style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 0",borderBottom:"1px solid var(--border)",textDecoration:"none",transition:"padding-left 0.2s"}}
              initial={{opacity:0,x:-20}} animate={inView?{opacity:1,x:0}:{}} transition={{delay:i*0.07+0.3}}
              onMouseEnter={e=>(e.currentTarget.style.paddingLeft="12px")}
              onMouseLeave={e=>(e.currentTarget.style.paddingLeft="0")}>
              <span className="label">{s.label}</span>
              <div style={{display:"flex",alignItems:"center",gap:12}}>
                <motion.span style={{fontSize:13,color:"var(--off)"}} whileHover={{color:"var(--accent)"}} transition={{duration:0.2}}>{s.value}</motion.span>
                <span style={{color:"var(--muted)"}}>↗</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
        <motion.form onSubmit={e=>{e.preventDefault();setSent(true);setTimeout(()=>setSent(false),3500);}} style={{display:"flex",flexDirection:"column",gap:28}} initial={{opacity:0,y:40}} animate={inView?{opacity:1,y:0}:{}} transition={{duration:0.9,delay:0.15}}>
          <Field id="name" label="Your Name" />
          <Field id="email" label="Email Address" type="email" />
          <Field id="subject" label="Subject" />
          <Field id="message" label="Message" textarea />
          <div style={{paddingTop:8}}>
            <button type="submit" className="btn-primary"><span>{sent?"Message Sent ✓":"Send Message →"}</span></button>
          </div>
        </motion.form>
      </div>
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important;gap:48px!important;}}`}</style>
    </section>
  );
}
