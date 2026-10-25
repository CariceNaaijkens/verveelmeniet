const data={challenges:['Doe 20 seconden een gek dansje.','Teken een dier met je ogen dicht.','Noem vijf ronde dingen.','Verzin een naam voor een planeet.'],predictions:['Je krijgt binnenkort een goed idee.','Iemand gaat je laten lachen.','Je ontdekt iets nieuws.'],personalities:['De Uitvinder 🧠','De Grappenmaker 😂','De Avonturier 🗺️','De Chaos-kampioen 🤪'],powers:['Supersnelheid ⚡','Met dieren praten 🐾','Teleporteren 🚀','Onzichtbaarheid 👻'],animals:['Drakoe 🐉','Wolkenkat ☁️🐱','Sterrenhert 🦌','Mini-draakje 🐲'],places:['Reykjavík 🇮🇸','Kyoto 🇯🇵','Barcelona 🇪🇸','Een onbewoond eiland 🏝️'],food:['Pizza 🍕','Pannenkoeken 🥞','Pasta 🍝','Taco’s 🌮']};
const fortuneCopy={challenges:'De bol zegt dat jouw volgende missie een glimlach oplevert. Durf jij de uitdaging aan?',predictions:'Ik zie een klein beetje magie in jouw dag. Let op: er kan zomaar iets leuks gebeuren!',personalities:'De sterren zien iemand met een eigen stijl. Vertrouw op je fantasie en wees lekker jezelf.',powers:'Een verborgen kracht ontwaakt! Misschien kun jij vandaag iemand helpen of iets nieuws proberen.',animals:'In een verborgen vallei leeft dit wonderlijke wezen. Kijk hoe het door de magische wereld zweeft!',places:'De bol opent een portaal naar deze plek. Stel je voor welk avontuur daar op je wacht.',food:'De sterren hebben honger… en ze hebben een smakelijk idee voor je gevonden!'};
const movieAnimals=['🐉','🦄','🐲','🦊','🦋','🐺','🦕','🐈‍⬛'];let lastRandomKey='animals';
function pick(k){lastRandomKey=k;const list=k==='all'?Object.values(data).flat():data[k];const chosen=list[Math.random()*list.length|0];document.getElementById('result').textContent=chosen;document.getElementById('fortuneTitle').textContent=chosen;document.getElementById('fortuneText').textContent=fortuneCopy[k==='all'?(['challenges','predictions','personalities','powers','animals','places','food'][Math.random()*7|0]):k]||fortuneCopy.animals;const emojiMatch=chosen.match(/🐉|🐲|🐱|🦌|☁️/);document.getElementById('movieCreature').textContent=k==='animals'&&emojiMatch?(emojiMatch[0]==='☁️'?'☁️🐱':emojiMatch[0]):movieAnimals[Math.random()*movieAnimals.length|0];document.getElementById('movieStatus').textContent='MAGISCH FILMPJE SPEELT';document.getElementById('randomMenu').hidden=true;document.getElementById('fortuneScene').hidden=false;document.getElementById('fortuneScene').scrollIntoView({behavior:'smooth',block:'start'});}
function pickAgain(){pick(lastRandomKey)}function backToRandom(){stopMagicMusic();document.getElementById('fortuneScene').hidden=true;document.getElementById('randomMenu').hidden=false;document.getElementById('randomMenu').scrollIntoView({behavior:'smooth',block:'start'})}function fun(s){document.getElementById('fun').textContent=s}function cat(){return ['🐱 Miauw!','😺 Hallo kattenmens!','😹 Deze kat is verbaasd.','😻 Kattenliefde!'][Math.random()*4|0]}function potato(){return ['🥔 Deze aardappel heeft haast.','🥔 Aardappel.exe gestart.','🥔 Een zeer aardappelachtige dag.'][Math.random()*3|0]}function cheese(){return ['🧀 Cheddar is een bekende kaassoort.','🧀 Kaas wordt vaak van melk gemaakt.','🧀 Tosti + kaas = klassieker.'][Math.random()*3|0]}function useless(){return ['🎈 Helemaal niets.','🦖 Opeens een dinosaurus!','🍌 Banaan.','✨ Je drukte op een knop. Gefeliciteerd.'][Math.random()*4|0]}function sound(){try{let c=new(window.AudioContext||window.webkitAudioContext)(),o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.frequency.value=[220,440,660,880][Math.random()*4|0];g.gain.value=.12;o.start();o.stop(c.currentTime+.18);fun('🔊 Piep!')}catch(e){fun('🔊 Je browser kan dit geluid niet afspelen.')}}function daily(){document.getElementById('result').textContent=data.challenges[Math.random()*data.challenges.length|0]}function highscore(){document.getElementById('result').textContent='🔥 Klikspel-highscore: '+(localStorage.getItem('klikHighscore')||0)}function points(){document.getElementById('result').textContent='⭐ Punten: '+(localStorage.getItem('points')||0)}
// Rustige, zelfgemaakte magische achtergrondmuziek via de browser (geen extern audiobestand nodig).
let magicAudioContext=null, magicMusicTimer=null, magicNoteIndex=0, magicMusicOn=false;
function toggleMagicMusic(){
  const button=document.getElementById('musicButton');
  if(magicMusicOn){stopMagicMusic();return;}
  try{
    const AudioCtx=window.AudioContext||window.webkitAudioContext;
    if(!AudioCtx){document.getElementById('movieStatus').textContent='MUZIEK WORDT NIET ONDERSTEUND';return;}
    magicAudioContext=magicAudioContext||new AudioCtx();
    if(magicAudioContext.state==='suspended')magicAudioContext.resume();
    magicMusicOn=true;magicNoteIndex=0;
    const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,587.33,659.25,392];
    const playNote=()=>{
      if(!magicAudioContext||magicAudioContext.state==='closed')return;
      const now=magicAudioContext.currentTime;
      const osc=magicAudioContext.createOscillator(),gain=magicAudioContext.createGain();
      osc.type='sine';osc.frequency.setValueAtTime(notes[magicNoteIndex%notes.length],now);
      gain.gain.setValueAtTime(0.0001,now);gain.gain.exponentialRampToValueAtTime(0.035,now+0.08);gain.gain.exponentialRampToValueAtTime(0.0001,now+0.8);
      osc.connect(gain);gain.connect(magicAudioContext.destination);osc.start(now);osc.stop(now+0.85);magicNoteIndex++;
    };
    playNote();magicMusicTimer=setInterval(playNote,720);
    button.textContent='🔇 Zet magische muziek uit';button.setAttribute('aria-pressed','true');
    document.getElementById('movieStatus').textContent='MAGISCH FILMPJE + MUZIEK';
  }catch(e){document.getElementById('movieStatus').textContent='MUZIEK KON NIET STARTEN';}
}
function stopMagicMusic(){
  magicMusicOn=false;if(magicMusicTimer){clearInterval(magicMusicTimer);magicMusicTimer=null;}
  const button=document.getElementById('musicButton');if(button){button.textContent='🎵 Zet magische muziek aan';button.setAttribute('aria-pressed','false');}
  const status=document.getElementById('movieStatus');if(status)status.textContent='MAGISCH FILMPJE SPEELT';
}
