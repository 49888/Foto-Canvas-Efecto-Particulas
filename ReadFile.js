function readFileAsDataURL(File){

    let promesa = new Promise(function(resolve, reject){

        let reader = new FileReader();
    
    
        reader.addEventListener('load', function(e){
    
            resolve(reader.result);
        });
    
        reader.addEventListener('error', function(e){
    
            reject(reader.error);
        });
    
        reader.readAsDataURL(File);
    });

    return promesa;
}


function readFileAsText(File){

    let promesa = new Promise(function(resolve, reject){

        let reader = new FileReader();
    
    
        reader.addEventListener('load', function(e){
    
            resolve(reader.result);
        });
    
        reader.addEventListener('error', function(e){
    
            reject(reader.error);
        });
    
        reader.readAsText(File);
    });

    return promesa;
}

export { readFileAsDataURL, readFileAsText };