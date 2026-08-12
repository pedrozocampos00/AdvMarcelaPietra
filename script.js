const header = document.querySelector('.header');
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');
const year = document.querySelector('#year');
if(year) year.textContent = new Date().getFullYear();

const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive:true });

menuBtn?.addEventListener('click', () => {
  const open = menuBtn.classList.toggle('active');
  nav?.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
  menuBtn?.classList.remove('active'); nav?.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false');
}));

if(window.matchMedia('(hover:hover) and (pointer:fine)').matches){
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width/2;
      const y = e.clientY - r.top - r.height/2;
      el.style.transform = `translate(${x*.055}px,${y*.08}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

if(window.gsap && window.ScrollTrigger && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  gsap.registerPlugin(ScrollTrigger);

  const tl = gsap.timeline({ defaults:{ ease:'power3.out' }});
  tl.from('.hero-kicker',{opacity:0,y:20,duration:.65},.15)
    .from('.hero-line',{opacity:0,y:85,duration:1.05,stagger:.09},.25)
    .from('.hero-text',{opacity:0,y:25,duration:.7},.72)
    .from('.hero-actions',{opacity:0,y:20,duration:.65},.82)
    .from('.hero-meta',{opacity:0,y:18,duration:.6},.92)
    .from('.hero-image-wrap',{opacity:0,x:35,scale:.97,duration:1.15},.38)
    .from('.hero-badge',{opacity:0,y:18,duration:.6,stagger:.12},.9);

  gsap.utils.toArray('.reveal').forEach(el => {
    if(el.closest('.hero')) return;
    gsap.from(el,{opacity:0,y:34,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',once:true}});
  });
  gsap.utils.toArray('.reveal-card').forEach((el,i) => {
    gsap.from(el,{opacity:0,y:42,duration:.75,delay:(i%3)*.06,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
  });
  gsap.utils.toArray('.reveal-row').forEach(el => {
    gsap.from(el,{opacity:0,x:-25,duration:.7,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 91%',once:true}});
  });
  gsap.utils.toArray('.reveal-image').forEach(el => {
    if(el.closest('.hero')) return;
    gsap.from(el,{opacity:0,scale:.96,y:28,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 84%',once:true}});
  });

  gsap.fromTo('.statement-rule',{scaleX:0},{scaleX:1,duration:1.15,ease:'power2.inOut',scrollTrigger:{trigger:'.statement-rule',start:'top 88%',once:true}});
  gsap.to('.hero-image-card img',{yPercent:6,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:.6}});
  gsap.fromTo('.about-photo img',{scale:1.08},{scale:1,ease:'none',scrollTrigger:{trigger:'.about-photo',start:'top bottom',end:'bottom top',scrub:.6}});
  gsap.to('.hero-bg-word',{xPercent:-7,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
}
