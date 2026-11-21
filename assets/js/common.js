const OAG={
 async j(u){const r=await fetch(u);if(!r.ok)throw new Error(u);return r.json()},
 wa(msg){return `https://wa.me/${OAG.site.whatsapp}?text=${encodeURIComponent(msg)}`},
 fill(){document.title=OAG.site.brand.name;
  document.querySelectorAll('[data-t]').forEach(e=>{const v=e.dataset.t.split('.').reduce((a,k)=>a?.[k],OAG.site);if(v)e.textContent=v});
  document.querySelectorAll('[data-ph]').forEach(e=>e.placeholder=e.dataset.ph.split('.').reduce((a,k)=>a?.[k],OAG.site));
  const c=OAG.wa(OAG.site.wa.general);['wa-head','wa-foot'].forEach(i=>{const e=document.getElementById(i);if(e){e.href=c;e.target='_blank';e.rel='noopener'}});
  const n=document.getElementById('nav');if(n)n.innerHTML=OAG.site.nav.links.map(l=>`<a href="${l.href}">${l.label}</a>`).join('')},
 card(d,catName){const b=document.createElement('button');b.className='card';
  b.innerHTML=`<div class="th" style="background:${d.thumb}">${d.badge?`<span class="tag">${d.badge}</span>`:''}</div><div class="in"><small>${catName||''}</small><h3>${d.name}</h3><div>${d.price} ${d.currency}</div></div>`;
  b.onclick=()=>OAG.open(d);return b},
 async open(d){const S=OAG.site.modal;let m=document.getElementById('m');if(m)m.remove();
  m=document.createElement('dialog');m.id='m';const url=new URL(d.preview,new URL('./',location.href)).href;
  const msg=OAG.site.wa.design.replace('{name}',d.name).replace('{id}',d.id).replace('{price}',d.price+' '+d.currency).replace('{url}',url);
  m.innerHTML=`<div class="mh"><div><h3 style="margin:0">${d.name}</h3><small class="muted">${d.price} ${d.currency}</small></div><button class="x" aria-label="${S.close}">✕</button></div>
  <div class="mb"><p style="margin:0">${d.description}</p><ul>${d.features.map(f=>`<li>${f}</li>`).join('')}</ul><div id="pv" class="muted">${OAG.site.ui.loading}</div>
  <div class="row" style="margin:0"><a class="btn" target="_blank" rel="noopener" href="${OAG.wa(msg)}">${S.order}</a><a class="btn ghost" target="_blank" rel="noopener" href="${url}">${S.full}</a></div></div>`;
  document.body.append(m);document.body.style.overflow='hidden';m.showModal();
  const end=()=>{m.querySelector('iframe')?.remove();m.close()};
  m.querySelector('.x').onclick=end;m.onclick=e=>{if(e.target===m)end()};
  m.onclose=()=>{m.querySelector('iframe')?.remove();document.body.style.overflow=''};
  const pv=m.querySelector('#pv');
  try{const r=await fetch(url,{method:'HEAD'});if(!r.ok)throw 0;const f=document.createElement('iframe');f.title=d.name;f.loading='lazy';f.sandbox='allow-scripts allow-same-origin';f.src=url;pv.replaceWith(f)}catch{pv.textContent=OAG.site.ui.error}}
};
