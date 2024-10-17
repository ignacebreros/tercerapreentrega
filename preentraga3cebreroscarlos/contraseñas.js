(function() {
    let app = document.getElementById('app');
    let inputCaracteres = document.getElementById('numero-caracteres');

    let configuracion = {
        caracteres: parseInt(inputCaracteres.value),
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true
    };

    let caracteres = { 
        numeros: '0 1 2 3 4 5 6 7 8 9',
        simbolos: '! # $ % & *',
        mayusculas: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        minusculas: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    };
    

    
    app.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    
    app.elements.namedItem('btn-mas-uno').addEventListener('click', function() {
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
        console.log(configuracion.caracteres);
    });

    app.elements.namedItem('btn-menos-uno').addEventListener('click', function() {
        if (configuracion.caracteres > 1) {
            configuracion.caracteres--;
            inputCaracteres.value = configuracion.caracteres;
        }
    });

   
    const toggleButton = document.getElementById('toggleButton');
    toggleButton.addEventListener('click', function() {
        this.innerText = this.innerText === 'Sí' ? 'No' : 'Sí';
        this.classList.toggle('active');
        configuracion.simbolos = !configuracion.simbolos;
    });

    
    const toggleButton2 = document.getElementById('toggleButton2');
    toggleButton2.addEventListener('click', function() {
        this.innerText = this.innerText === 'Sí' ? 'No' : 'Sí';
        this.classList.toggle('active');
        configuracion.numeros = !configuracion.numeros;
    });

    
    const toggleButton3 = document.getElementById('toggleButton3');
    toggleButton3.addEventListener('click', function() {
        this.innerText = this.innerText === 'Sí' ? 'No' : 'Sí';
        this.classList.toggle('active');
        configuracion.mayusculas = !configuracion.mayusculas;
    });

    
    app.elements.namedItem('btn-generar').addEventListener('click', function() {
        generarPassword();
    });

    function generarPassword() {
        let caracteresFinales = '';
        let password = '';

        
        for (let propiedad in configuracion) {
            if (configuracion[propiedad] === true && propiedad !== 'caracteres') {
                caracteresFinales += caracteres[propiedad] + ' ';
            }
        }

        
        let arrayCaracteres = caracteresFinales.trim().split(' ');

        
        for (let i = 0; i < configuracion.caracteres; i++) {
            password += arrayCaracteres[Math.floor(Math.random() * arrayCaracteres.length)];
        }

        console.log('Contraseña generada:', password);
        app.elements.namedItem('input-contraseña').value = password;
    }
    
})();
