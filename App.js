
import { readFileAsDataURL } from "./ReadFile.js";

import { particles, stopAnimation } from "./Efecto_Particulas.js";







const $File = document.getElementById('File');
const $Select = document.getElementById('Select');
const $Color = document.getElementById('Color');

const $Main = document.getElementById('Main-container');

const $Stop = document.getElementById('Stop');

$Stop.addEventListener('click', ()=>{

    stopAnimation();
});


$File.addEventListener('change', async function(e){

    stopAnimation();

    $Main.innerHTML = '';

    let files = e.target.files;

    try {

        //Read photo
        let url = await readFileAsDataURL(files[0]);


        //Resize
        let result = await Resize(url, $Main);
        
        $Main.innerHTML = '';
        
        let canvas = document.createElement('canvas');

        canvas.width = 500; canvas.height = 750; 
        canvas.classList.add('rounded-2');
        canvas.style.display = 'block'; 
        canvas.style.margin = 'auto';

        $Main.appendChild(canvas);
        
        //Start Animation particles
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
        //*/


    } catch (error) {
        
        console.log(error);
    }
})



function Resize(url, component){

    
    return new Promise((resolve, reject)=>{

        let template = document.getElementById('resize-template');
        let $resize = template.content.cloneNode(true);

        
        let img = $resize.querySelector('#Img');
        img.src = url;
        
        //Cropper JS
            let cropper = new Cropper(img, {aspectRatio: 2 / 3});//<---


        $resize.querySelector('#resize').addEventListener('click', (e)=>{

            let canvas = cropper.getCroppedCanvas({width: 500, height: 750});//<---

            
            resolve(canvas.toDataURL());//<---
        });

        $resize.querySelector('#cancel').addEventListener('click', (e)=>{

            component.innerHTML = '';

            reject('Has cancelado el redimensionado de la foto');
        });

        component.appendChild($resize);
    })
}

