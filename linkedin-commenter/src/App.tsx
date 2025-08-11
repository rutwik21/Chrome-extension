// import { useState } from 'react'
import './App.css'
import { LoginForm } from './components/login-form'

function App() {
  // const [count, setCount] = useState(0)

  // const CHECK_INTERVAL = 1500;

  // function createIcon() {
  //   const btn = document.createElement('button');
  //   btn.className = 'lg-genie-btn';
  //   btn.title = 'Generate comment with Comment Genie';
  //   btn.innerText = '💬';
  //   btn.style.cursor = 'pointer';
  //   return btn;
  // }

  // function findPostCaption(commentBox: Element) {
  //   let el = commentBox;
  //   for (let i=0;i<9;i++){
  //     if(!el) break;
  //     if(el.getAttribute && (el.getAttribute('data-urn') || (el.className && el.className.includes('feed-shared')))) break;
  //     el = el.parentElement;
  //   }
  //   const selectorCandidates = [
  //     'div.feed-shared-update__description', 
  //     'span.break-words', 
  //     'div.update-components-text',
  //     'div.feed-shared-text'
  //   ];
  //   for (const sel of selectorCandidates) {
  //     const found = (el || document).querySelector(sel);
  //     if (found && found.innerText && found.innerText.trim().length>0) return found.innerText.trim();
  //   }
  //   const paragraphs = (el||document).querySelectorAll('p,span,div');
  //   for (const p of paragraphs) {
  //     if (p.innerText && p.innerText.length>30) {
  //       return p.innerText.trim();
  //     }
  //   }
  //   return null;
  // }

  // function scanAndInject() {
  //   const editors = Array.from(document.querySelectorAll('[contenteditable="true"], textarea, input'));
  //   editors.forEach(editor => {
  //     if (editor.dataset.lgInjected) return;
  //     if (!editor.offsetParent) return;
  //     const caption = findPostCaption(editor);
  //     if (!caption) return;
  //     const btn = createIcon();
  //     btn.style.marginLeft = '6px';
  //     btn.addEventListener('click', (ev)=>{
  //       ev.stopPropagation();
  //       openPanel(editor, caption);
  //     });
  //     try {
  //       editor.parentElement.appendChild(btn);
  //       editor.dataset.lgInjected = '1';
  //     } catch(e){}
  //   });
  // }

  // let panel: HTMLDivElement | null = null;
  // let currentEditor: null = null;
  // let currentCaption: null = null;
  // function createPanel() {
  //   const panel = document.createElement('div');
  //   panel.className = 'lg-genie-panel';
  //   panel.innerHTML = `
  //     <div class="lg-genie-panel-inner">
  //       <h4>Comment Genie</h4>
  //       <div id="lg-status">Please sign-in via extension toolbar (click the extension icon).</div>
  //       <div style="margin-top:8px;">
  //         <div id="lg-quota"></div>
  //         <textarea id="lg-output" rows="4" placeholder="Generated comment will appear here"></textarea>
  //         <div style="display:flex;gap:8px;margin-top:8px;">
  //           <button id="lg-generate">Generate</button>
  //           <button id="lg-insert">Insert to comment</button>
  //           <button id="lg-close">Close</button>
  //         </div>
  //       </div>
  //     </div>`;
  //   return panel;
  // }

  // function openPanel(editor: Element, caption: any) {
  //   currentEditor = editor;
  //   currentCaption = caption;
  //   if (!panel) {
  //     panel = createPanel();
  //     document.body.appendChild(panel);
  //     panel.querySelector('#lg-close').addEventListener('click', ()=> panel.style.display='none');
  //     panel.querySelector('#lg-generate').addEventListener('click', generateComment);
  //     panel.querySelector('#lg-insert').addEventListener('click', insertComment);
  //   }
  //   panel.style.display = 'block';
  //   panel.style.position = 'fixed';
  //   panel.style.right = '20px';
  //   panel.style.bottom = '20px';
  //   panel.querySelector('#lg-status').innerText = 'Ready. Caption detected.';
  //   panel.querySelector('#lg-output').value = '';
  //   updateQuotaDisplay();
  // }

  // const BACKEND = 'http://localhost:4000';

  // async function updateQuotaDisplay(){
  //   const qEl = panel && panel.querySelector('#lg-quota');
  //   if(!qEl) return;
  //   const token = localStorage.getItem('lg_token');
  //   if(!token){ qEl.innerText = 'Not signed in. Remaining: -'; return; }
  //   try {
  //     const res = await fetch(BACKEND + '/auth/me', {headers:{'authorization':'Bearer '+token}});
  //     if(!res.ok){ qEl.innerText = 'Failed to fetch quota'; return; }
  //     const data = await res.json();
  //     qEl.innerText = `Remaining requests: ${data.remainingRequests} / 10`;
  //   } catch(e) {
  //     qEl.innerText = 'Failed to reach backend';
  //   }
  // }

  // async function generateComment(){
  //   const token = localStorage.getItem('lg_token');
  //   if(!token){ alert('Please sign in via extension toolbar (click the extension icon).'); return; }
  //   panel.querySelector('#lg-status').innerText = 'Generating...';
  //   try {
  //     const res = await fetch(BACKEND + '/generate-comment', {
  //       method:'POST',
  //       headers:{'content-type':'application/json','authorization':'Bearer '+token},
  //       body: JSON.stringify({caption: currentCaption})
  //     });
  //     const data = await res.json();
  //     if(res.ok){
  //       panel.querySelector('#lg-output').value = data.comment;
  //       panel.querySelector('#lg-status').innerText = 'Generated. You can insert or copy.';
  //       updateQuotaDisplay();
  //     } else {
  //       panel.querySelector('#lg-status').innerText = data.message || 'failed to generate';
  //       updateQuotaDisplay();
  //     }
  //   } catch(e) {
  //     panel.querySelector('#lg-status').innerText = 'Failed to reach backend';
  //   }
  // }

  // function insertComment(){
  //   const text = panel.querySelector('#lg-output').value;
  //   if(!text){ alert('no comment to insert'); return; }
  //   const editor = currentEditor;
  //   if(!editor){ alert('editor not found'); return; }
  //   if(editor.tagName === 'TEXTAREA' || editor.tagName === 'INPUT') {
  //     editor.value = text;
  //     editor.dispatchEvent(new Event('input', {bubbles:true}));
  //   } else {
  //     editor.focus();
  //     editor.innerText = text;
  //     editor.dispatchEvent(new Event('input', {bubbles:true}));
  //   }
  //   alert('Inserted into the comment box (you may need to press post).');
  // }

  // setInterval(scanAndInject, CHECK_INTERVAL);
  // scanAndInject();

  return (
    <>
    <div className="flex  w-full items-center justify-center p-0 m-0">
      <div className="w-full p-0 m-0 ">
        <LoginForm />
      </div>
    </div>
    </>
  )
}

export default App
