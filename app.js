'use strict';
const raw=window.EX_ALUNOS_DATA;
function normalize(s){return s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim()}
function skeleton(s){return s.replace(/[i1]/g,'l').replace(/0/g,'o')}
const records=raw.map(r=>({...r,key:normalize(r.name),tokens:normalize(r.name).split(' ')}));
const byId=new Map(records.map(r=>[r.id,r]));
const $=id=>document.getElementById(id);
for(let y=2000;y<=2025;y++)$('year').add(new Option(y,y));
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function distance(a,b,max){
 if(Math.abs(a.length-b.length)>max)return max+1;
 let prev=Array.from({length:b.length+1},(_,i)=>i);
 for(let i=1;i<=a.length;i++){
  const cur=Array(b.length+1).fill(max+1);cur[0]=i;
  for(let j=Math.max(1,i-max);j<=Math.min(b.length,i+max);j++)cur[j]=Math.min(prev[j]+1,cur[j-1]+1,prev[j-1]+(a[i-1]!==b[j-1]));
  if(Math.min(...cur)>max)return max+1;
  prev=cur;
 }return prev[b.length];
}
function score(r,q){
 if(!q)return 0;
 if(r.key===q)return 0;
 if(r.key.includes(q))return 1;
 if(r.id.toLowerCase()===q)return 0;
 const qt=q.split(' '),used=new Set();let total=0;
 for(const t of qt){
  let best=Infinity,index=-1;
  for(let i=0;i<r.tokens.length;i++){
   if(used.has(i))continue;
   const word=r.tokens[i];let value=Infinity;
   if(word===t)value=0;
   else if(word.startsWith(t))value=.15;
   else if(t.length>=3&&word.includes(t))value=.3;
   else if(t.length>=3&&skeleton(word)===skeleton(t))value=.4;
   else if(t.length>=4){const max=t.length<=5?1:2;const d=distance(skeleton(word),skeleton(t),max);if(d<=max)value=1+d/10;}
   if(value<best){best=value;index=i;}
  }
  if(index<0)return Infinity;
  used.add(index);total+=best;
 }
 return 2+total;
}
let results=[],page=0;const PAGE_SIZE=50;
function search(){
 const q=normalize($('query').value),year=Number($('year').value),only=$('reviewOnly').checked,sort=$('sort').value;
 results=[];
 for(const r of records){if(year&&r.year!==year||only&&!r.review)continue;const s=score(r,q);if(Number.isFinite(s))results.push({r,s});}
 results.sort((a,b)=>sort==='name'?a.r.name.localeCompare(b.r.name,'pt-BR')||a.r.year-b.r.year:sort==='year'?a.r.year-b.r.year||a.r.name.localeCompare(b.r.name,'pt-BR'):a.s-b.s||a.r.name.localeCompare(b.r.name,'pt-BR')||a.r.year-b.r.year);
 page=0;render();
}
function render(){
 const total=results.length,pages=Math.max(1,Math.ceil(total/PAGE_SIZE));
 $('resultCount').textContent=total.toLocaleString('pt-BR')+(total===1?' registro encontrado':' registros encontrados');
 $('queryHint').textContent=total?'Mostrando '+(page*PAGE_SIZE+1)+' a '+Math.min((page+1)*PAGE_SIZE,total):'Tente um sobrenome, outra grafia ou todos os anos.';
 $('rows').innerHTML=total?results.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE).map(({r,s})=>{
  const related=r.related.map(id=>{const v=byId.get(id);return v?`${id} (${v.year})`:id;});
  const flags=r.flags.filter(f=>f!=='Nome repetido em anos diferentes');
  let flag=flags.length?'<span class="pill">Conferir</span><div class="meta">'+flags.map(esc).join('<br>')+'</div>':r.flags.length?'<span class="info">Nome igual em outro ano</span>':'<span class="info">Sem alerta automático</span>';
  if(related.length)flag+='<div class="meta">Relacionados: '+related.map(esc).join(', ')+'</div>';
  return '<tr><td><div class="name">'+esc(r.name)+'</div><div class="meta">'+esc(r.id)+(s>=3?' · Possível correspondência':'')+'</div></td><td>'+r.year+'</td><td>Página '+r.page+'<div class="meta">Nº '+r.number+' na lista</div></td><td class="reason">'+flag+'</td></tr>';
 }).join(''):'<tr><td colspan="4" class="empty">Nenhum registro encontrado com esses filtros.</td></tr>';
 $('pageLabel').textContent='Página '+(page+1)+' de '+pages;$('prev').disabled=page===0;$('next').disabled=page>=pages-1;
}
$('searchForm').addEventListener('submit',e=>{e.preventDefault();search()});
let timer;$('query').addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(search,180)});
for(const id of ['year','reviewOnly','sort'])$(id).addEventListener('change',search);
$('prev').addEventListener('click',()=>{page--;render()});$('next').addEventListener('click',()=>{page++;render()});
search();
