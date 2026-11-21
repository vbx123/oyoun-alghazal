(async()=>{try{
 OAG.site=await OAG.j('data/site.json');OAG.fill();
 const id=new URLSearchParams(location.search).get('c');
 const cat=(await OAG.j('data/categories.json')).find(c=>c.id===id&&c.active);
 if(!cat)throw 0;
 document.title=cat.name+' — '+OAG.site.brand.name;
 crumb.textContent=cat.name;ct.textContent=cat.name;cd.textContent=cat.description;
 const all=(await OAG.j(cat.data)).filter(d=>d.status==='active');
 sort.innerHTML=OAG.site.ui.sorts.map(s=>`<option value="${s.k}">${s.l}</option>`).join('');
 const draw=()=>{const t=q.value.trim();let l=all.filter(d=>(d.name+d.description).includes(t));
  l.sort(sort.value==='price'?(a,b)=>a.price-b.price:(a,b)=>a.order-b.order);
  grid.replaceChildren(...l.map(d=>OAG.card(d,cat.name)));state.textContent=l.length?'':OAG.site.ui.empty};
 q.oninput=sort.onchange=draw;draw();
}catch{state.textContent=OAG.site.ui?.error||'تعذّر تحميل القسم'}})();
