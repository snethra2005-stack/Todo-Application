let current = 0;
const pages = document.querySelectorAll('.page');
const stops = document.querySelectorAll('.journey .stop');
const legs = document.querySelectorAll('.journey .leg');

function goTo(i) {
    pages.forEach(p => p.classList.toggle('active', +p.dataset.page === i));
    stops.forEach(s => {
        const si = +s.dataset.i;
        s.classList.toggle('done', si < i);
        s.classList.toggle('current', si === i);
    });
    legs.forEach(l => {
        const li = +l.dataset.i;
        l.classList.toggle('done', li < i);
    });
    current = i;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function dodge() {
    const btn = document.getElementById('noBtn');
    const isMobile = window.innerWidth < 600;
    const maxX = isMobile ? 60 : 110;
    const maxY = isMobile ? 50 : 40;
    const x = (Math.random() - 0.5) * 2 * maxX;
    const y = (Math.random() - 0.5) * 2 * maxY;
    btn.style.transform = `translate(${x}px, ${y}px)`;
}

function celebrate() {
    const layer = document.getElementById('leafLayer');
    const colors = ['#A23B52', '#3B6B53', '#E8C77E', '#E892A6'];
    for (let i = 0; i < 32; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        const size = 8 + Math.random() * 8;
        leaf.style.width = size + 'px';
        leaf.style.height = size + 'px';
        leaf.style.left = Math.random() * 100 + 'vw';
        leaf.style.background = colors[Math.floor(Math.random() * colors.length)];
        leaf.style.borderRadius = '0 60% 0 60%';
        leaf.style.animationDuration = (3 + Math.random() * 3) + 's';
        leaf.style.animationDelay = (Math.random() * 1.2) + 's';
        layer.appendChild(leaf);
    }
    document.getElementById('celebration').classList.add('show');
}

// ambient sky: stars + glow orbs + falling petals
(function() {
    const sky = document.getElementById('sky');
    for (let i = 0; i < 60; i++) {
        const s = document.createElement('div');
        s.className = 'star';
        const size = 1 + Math.random() * 2;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = Math.random() * 100 + 'vh';
        s.style.animationDelay = (Math.random() * 3.5) + 's';
        sky.appendChild(s);
    }
    for (let i = 0; i < 14; i++) {
        const p = document.createElement('div');
        p.className = 'petal';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (8 + Math.random() * 8) + 's';
        p.style.animationDelay = (Math.random() * 10) + 's';
        sky.appendChild(p);
    }
})();

// ===== Page 1: the quiz =====
(function(){
    function shower(emoji, count){
        for(let i=0;i<count;i++){
            setTimeout(()=>{
                const s=document.createElement('span');
                s.className='shower-emoji';
                s.textContent=emoji;
                s.style.left=Math.random()*100+'vw';
                s.style.fontSize=(Math.random()*18+22)+'px';
                s.style.animationDuration=(Math.random()*1.5+2.2)+'s';
                document.body.appendChild(s);
                setTimeout(()=>s.remove(), 4000);
            }, i*70);
        }
    }

    function goNextQ(currentId, nextId){
        if(nextId){
            document.getElementById(nextId).classList.add('active');
            setTimeout(()=>{
                document.getElementById(nextId).scrollIntoView({behavior:'smooth', block:'center'});
            }, 150);
        }
    }

    const order = {q1:'q2', q2:'q3', q3:'q4', q4:'q5', q5:'finale'};

    // ---- Q1 & Q5 : multiple choice ----
    document.querySelectorAll('.quiz-scope .card').forEach(card=>{
        card.querySelectorAll('.choice-btn').forEach(btn=>{
            btn.addEventListener('click', ()=>{
                const cardId = card.id;
                const fb = document.getElementById('fb'+cardId.slice(1));
                const nextBtn = document.getElementById('next'+cardId.slice(1));
                if(btn.dataset.answer === 'right'){
                    fb.className='feedback right';
                    fb.innerHTML = cardId==='q1'
                        ? 'Super Madhan 😊<div class="big-emoji">😄</div>'
                        : 'ioo correct uh🫣<div class="big-emoji">🫣</div>';
                    shower(cardId==='q1' ? '😊' : '🫣', 22);
                    nextBtn.style.display='inline-block';
                    card.querySelectorAll('.choice-btn').forEach(b=> b.disabled = true);
                } else {
                    fb.className='feedback wrong';
                    fb.textContent='Thappu da Erume 👊';
                }
            });
        });
    });

    // ---- Q2, Q3, Q4 : text input ----
    ['2','3','4'].forEach(n=>{
        const input = document.getElementById('input'+n);
        const btn = document.querySelector('.quiz-scope .submit-btn[data-target="'+n+'"]');
        const fb = document.getElementById('fb'+n);
        const nextBtn = document.getElementById('next'+n);

        function check(){
            const val = input.value.trim().toLowerCase();
            if(val === 'madhan'){
                fb.className='feedback right';
                fb.innerHTML = 'Correct uh 😘<div class="big-emoji">😘</div>';
                shower('😘', 20);
                nextBtn.style.display='inline-block';
                input.disabled = true;
                btn.disabled = true;
            } else {
                fb.className='feedback wrong';
                fb.textContent='Thappu da Erume 👊';
            }
        }

        btn.addEventListener('click', check);
        input.addEventListener('keydown', e=>{ if(e.key==='Enter') check(); });
    });

    // ---- next buttons ----
    Object.keys(order).forEach(qid=>{
        const btn = document.getElementById('next'+qid.slice(1));
        if(btn){
            btn.addEventListener('click', ()=> goNextQ(qid, order[qid]));
        }
    });
})();