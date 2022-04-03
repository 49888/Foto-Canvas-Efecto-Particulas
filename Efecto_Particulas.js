

//Particula
class Particle {

    constructor(Canvas, options = {}){

        this.Canvas = Canvas;   this.Graficos = Canvas.getContext('2d');

        this.options = options;

        //PPosicion
            this.x = Math.random() * this.Canvas.width;     this.y = 0;

        //Tamaño 1 a 2.5 pixeles
            this.size = Math.random() * 1.5 + 1;

    
        //Velocidad
            this.velocity = Math.random() * 2.5;


        this.speed = 0;

        //Coordenadas del Mapa
            this.mapX = Math.floor(this.x);     this.mapY = Math.floor(this.y);
    }

    update(){

        let movement = this.velocity;

        //Reaccionando al Mapa
        if(this.options.useMap){

            this.mapX = Math.floor(this.x);     this.mapY = Math.floor(this.y);

            this.speed = this.options.photoMap[this.mapY][this.mapX].brillo;

            movement = (2.9 - this.speed) + this.velocity;
        }
        
        
        this.y += movement;


        //Reinicia la posicion a arriba
        if( this.y >= this.Canvas.height ){

            this.x = Math.random() * this.Canvas.width;     this.y = 0; 
        }
    }

    draw(){

        if(this.options.useMap){

            
            if(this.options.useMapColor){

                this.Graficos.fillStyle = this.options.photoMap[this.mapY][this.mapX].color;
            }
            else {
                this.Graficos.fillStyle = this.options.color ? this.options.color : '#fff';
            }

            this.Graficos.globalAlpha = this.speed * 0.5;
 
        }
        else {
            this.Graficos.fillStyle = this.options.color ? this.options.color : '#fff';

            this.Graficos.globalAlpha = 0.5;
        }

        
        
        


        this.Graficos.beginPath();
        
        this.Graficos.arc(this.x, this.y, this.size, 0, Math.PI*2);

        this.Graficos.fill();
    }

    set setColor(color){

        this.options.color = color;
    }

    get getColor(){

        return this.options.color;
    }
}


//Photo Map de los Pixeles del Canvas
function getPhotoMap(Canvas){

    let Graficos = Canvas.getContext('2d');

    let ImageData = Graficos.getImageData(0, 0, Canvas.width, Canvas.height);

    Graficos.clearRect(0, 0, Canvas.width, Canvas.height);

    let map = [];


    for(let y = 0; y < ImageData.height; y++){

        let Row = [];

        for(let x = 0; x < ImageData.width; x++){

            let R = ImageData.data[(y * 4 * ImageData.width) + (x * 4)];
            let G = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 1)];
            let B = ImageData.data[(y * 4 * ImageData.width) + (x * 4 + 2)];

            let I = Math.sqrt((R*R)*0.299 + (G*G)*0.587 + (B*B)*0.114)/100;

            let cell = {
                brillo: I,
                color: `rgb(${R}, ${G}, ${B})`
            }

            Row.push(cell);
        }

        map.push(Row);
    }

    return map;
}


//ID de la Animacion
let ID = 0;


//Animacion
/* Configuracion:
    options {
        useMap
        photoMap
        useColorMap

        color
    }

    Efecto 1 - lluvia con custom color, por defecto '#fff': 
    
        {color: '#025'} {}

    Efecto 2 - Dibuja la Foto con lluvia

        {useMap:true,  color: '#025'}

    Efecto 3

        {useMap:true,  useMapColor:true}   
*/ 
function particles(Canvas, photoURL, options = {}){

    let Graficos = Canvas.getContext('2d');

    Graficos.clearRect(0, 0, Canvas.width, Canvas.height);

    


    let Foto = new Image();

    Foto.src = photoURL;

    Foto.onload = function(e){

        Graficos.drawImage(Foto, 0, 0);

        //Creando el Mapa
        if(options.useMap){

            options.photoMap = getPhotoMap(Canvas);
        }
    

        let Particles = [];

        for(let i = 0; i < 5000; i++){

            Particles.push(new Particle(Canvas, options));
        }


        //Animacion
        function animar(){

            if(!options.useMap){

                Graficos.drawImage(Foto, 0, 0);
            }

            
        
            Graficos.globalAlpha = 0.05;
        
            //Limpiar la pantalla
                Graficos.fillStyle = "#000";
        
                Graficos.fillRect(0, 0, Canvas.width, Canvas.height);
        

            //Dibujar las particulas  
                Particles.forEach((i)=>{

                    i.update();

                    i.draw();

                })
        
            ID = requestAnimationFrame(animar);
        }
    
        animar();
    }
}


//Detener la Animacion
function stopAnimation(){

    if(ID != 0){
        console.log('Stop in: ', ID);
        cancelAnimationFrame(ID);

        ID = 0;
    }
    else {

        console.log('No hay animacion');
    }   
}

//Comprobar si hay una animacion
function isAnimation(){

    return ID != 0;
}




export { particles, stopAnimation, isAnimation }