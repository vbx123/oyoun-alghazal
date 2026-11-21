(async()=>{try{
 const [site,cats,feat]=await Promise.all(['data/site.json','data/categories.json','data/featured.json'].map(OAG.j));
 OAG.site=site;OAG.fill();
 const act=cats.filter(c=>c.active).sort((a,b)=>a.order-b.order);
 document.getElementById('cat-grid').innerHTML=act.map(c=>`<a class="card ${c.type==='tool'?'tool':''}" href="${c.page}"><div class="th" style="background:${c.cover}"></div><div class="in"><h3>${c.name}</h3><small>${c.description}</small></div></a>`).join('');
 document.getElementById('why').innerHTML=site.why.items.map(i=>`<li>${i}</li>`).join('');
 document.getElementById('steps').innerHTML=site.steps.items.map(i=>`<li>${i}</li>`).join('');
 const g=document.getElementById('feat-grid');
 const files={};for(const f of feat.items)files[f.category]??=cats.find(c=>c.id===f.category);
 const data={};await Promise.all(Object.entries(files).map(async([k,c])=>data[k]=await OAG.j(c.data)));
 feat.items.forEach(f=>{const d=data[f.category].find(x=>x.id===f.id);if(d)g.append(OAG.card(d,files[f.category].name))});
}catch(e){document.body.insertAdjacentHTML('afterbegin','<p style="padding:20px">تعذّر تحميل البيانات. شغّل الموقع عبر سيرفر محلي أو GitHub Pages.</p>')}})();
