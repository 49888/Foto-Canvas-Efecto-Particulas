
import { readFileAsDataURL } from "./ReadFile.js";

import { particles, stopAnimation } from "./Efecto_Particulas.js";







const $File = document.getElementById('File');
const $Select = document.getElementById('Select');
const $Color = document.getElementById('Color');

const $CanvasContainer = document.getElementById('Canvas-container');

const $Stop = document.getElementById('Stop');



$Stop.addEventListener('click', ()=>{

    stopAnimation();
});


$File.addEventListener('change', async function(e){

    let files = e.target.files;

    stopAnimation();

    $CanvasContainer.innerHTML = "";

        let canvas = document.createElement('canvas');

        canvas.width = 500; canvas.height = 600; canvas.classList.add('rounded-2');

    $CanvasContainer.appendChild(canvas);

    try {

        //Read photo
        let result = await readFileAsDataURL(files[0]);

        

        //Animation particles
        switch($Select.value){
            
            //Efecto 1
            case '1':
                particles(canvas, result, {color: $Color.value});
                break;

            //Efecto 2
            case '2':
                particles(canvas, result, {useMap: true, color: $Color.value});
                break;

            //Efecto 3        
            case '3':
                particles(canvas, result, {useMap: true, useMapColor: true});
                break;        
        }


    } catch (error) {
        
        console.log(error);
    }
})

