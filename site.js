(function(){
  const body=document.body;
  const quoteModal=document.getElementById('quote-modal');
  const openQuote=()=>{ if(quoteModal){ quoteModal.classList.add('is-open'); body.classList.add('modal-open'); quoteModal.setAttribute('aria-hidden','false'); } };
  const closeQuote=()=>{ if(quoteModal){ quoteModal.classList.remove('is-open'); body.classList.remove('modal-open'); quoteModal.setAttribute('aria-hidden','true'); } };
  document.querySelectorAll('[data-quote-trigger]').forEach(el=>el.addEventListener('click',e=>{
    if(window.matchMedia('(min-width: 901px)').matches){e.preventDefault();openQuote();}
  }));
  document.querySelectorAll('[data-quote-close]').forEach(el=>el.addEventListener('click',closeQuote));
  document.addEventListener('keydown',e=>{if(e.key==='Escape') closeQuote();});

  const lightbox=document.getElementById('lightbox');
  const galleryItems=[...document.querySelectorAll('.gallery img')];
  if(lightbox && galleryItems.length){
    const lbImage=lightbox.querySelector('.lightbox-image');
    const counter=lightbox.querySelector('.lightbox-counter');
    let index=0, startX=0, startY=0;
    const show=i=>{
      index=(i+galleryItems.length)%galleryItems.length;
      const img=galleryItems[index];
      lbImage.src=img.src; lbImage.alt=img.alt||'Miller Tree & Ground Services project photo';
      counter.textContent=(index+1)+' / '+galleryItems.length;
    };
    const open=i=>{show(i);lightbox.classList.add('is-open');body.classList.add('modal-open');lightbox.setAttribute('aria-hidden','false');};
    const close=()=>{lightbox.classList.remove('is-open');body.classList.remove('modal-open');lightbox.setAttribute('aria-hidden','true');};
    galleryItems.forEach((img,i)=>img.addEventListener('click',()=>open(i)));
    lightbox.querySelector('[data-prev]').addEventListener('click',()=>show(index-1));
    lightbox.querySelector('[data-next]').addEventListener('click',()=>show(index+1));
    lightbox.querySelector('[data-lightbox-close]').addEventListener('click',close);
    lightbox.addEventListener('click',e=>{if(e.target===lightbox)close();});
    lightbox.addEventListener('touchstart',e=>{startX=e.changedTouches[0].screenX;startY=e.changedTouches[0].screenY;},{passive:true});
    lightbox.addEventListener('touchend',e=>{const dx=e.changedTouches[0].screenX-startX;const dy=e.changedTouches[0].screenY-startY;if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)){dx<0?show(index+1):show(index-1);}},{passive:true});
    document.addEventListener('keydown',e=>{if(!lightbox.classList.contains('is-open'))return;if(e.key==='ArrowRight')show(index+1);if(e.key==='ArrowLeft')show(index-1);if(e.key==='Escape')close();});
  }
})();
