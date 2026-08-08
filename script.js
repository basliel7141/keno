const numbers = document.getElementById('numbers');
const selectedCount = document.getElementById('selectedCount');
const message = document.getElementById('message');
const selected = new Set();

for(let i=1;i<=40;i++){
  const btn=document.createElement('button');
  btn.className='number';
  btn.textContent=String(i).padStart(2,'0');
  btn.onclick=()=>{
    if(selected.has(i)){selected.delete(i);btn.classList.remove('active')}
    else if(selected.size<5){selected.add(i);btn.classList.add('active')}
    else {showMessage('You can select only 5 numbers.')}
    selectedCount.textContent=selected.size;
  };
  numbers.appendChild(btn);
}

document.getElementById('clearBtn').onclick=()=>{
  selected.clear();
  document.querySelectorAll('.number').forEach(b=>b.classList.remove('active'));
  selectedCount.textContent='0';
  showMessage('');
};

document.getElementById('playBtn').onclick=()=>{
  if(selected.size!==5){showMessage('Please select exactly 5 numbers.');return}
  showMessage('Selection saved: '+[...selected].sort((a,b)=>a-b).map(n=>String(n).padStart(2,'0')).join(', '));
};

function showMessage(text){message.textContent=text}

let seconds=15*60;
setInterval(()=>{
  seconds--;
  if(seconds<0) seconds=15*60;
  const h=String(Math.floor(seconds/3600)).padStart(2,'0');
  const m=String(Math.floor(seconds%3600/60)).padStart(2,'0');
  const s=String(seconds%60).padStart(2,'0');
  document.getElementById('countdown').textContent=`${h}:${m}:${s}`;
},1000);
