let els = document.querySelectorAll('.siri-container');

els.forEach(el => {
  let siri = new SiriWave({
    container: el,
    width: 640,
    height: 200,
    autostart: true,
    speed: 0.01 * (Math.floor(Math.random() * 10) + 1),
    amplitude: 0.5,
  });
})

const copyToClipboard = str => {
   const el = document.createElement('textarea');
   el.value = str;
   document.body.appendChild(el);
   el.select();
   document.execCommand('copy');
   document.body.removeChild(el);
 };

document.getElementById('go').addEventListener('click', function(e){
   e.preventDefault();

   let text = document.getElementById('text').value;
   let rounds = document.getElementById('rounds').value;

   let textArray = text.split("");
   let store = [];
   let output = "";

   for (let x = 0; x < parseInt(rounds); x++) {
      for (let i = 0; i < textArray.length; i++) {
         if (store.length > 0) {
            let unido = store.join("");
            let palabra = unido + textArray[i];

            if (palabra.charAt(palabra.length - 1) !== " ") {
               output += palabra + '\n';
            }
         } else if (store.length == 0) {
            output += `${textArray[i]}\n`;
         }
         
         store.push(textArray[i]);
      }

      if (store.length == textArray.length) {
         for (let j = 0; j < textArray.length; j++) {
            store.pop();
            let unido2 = store.join("");

            if (unido2.charAt(unido2.length - 1) !== " " && unido2 !== "") {
               output += `${unido2}\n`;
            }
         }
      }
   }
   
   document.getElementById('output').value = output;
});

document.getElementById('copy').addEventListener('click', function(){
   copyToClipboard(document.getElementById('output').value);

   const boton = this;
   boton.classList.add('success');
   boton.innerHTML = "Copied!";

   setTimeout(function() {
    boton.classList.remove('success');
    boton.innerHTML = "Copy to clipboard";
   }, 2000);
});