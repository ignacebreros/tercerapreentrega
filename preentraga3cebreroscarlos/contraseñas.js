(function() {
    let app = document.getElementById('app');
    let inputCaracteres = document.getElementById('numero-caracteres');

    if (!app || !inputCaracteres) {
        console.error('Error: Elementos necesarios no encontrados en el DOM.');
        return;
    }

    let configuracion = {
        caracteres: parseInt(inputCaracteres.value) || 8,
        simbolos: true,
        numeros: true,
        mayusculas: true,
        minusculas: true
    };

    let caracteres = { 
        numeros: '0123456789',
        simbolos: '!#$%&*',
        mayusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        minusculas: 'abcdefghijklmnopqrstuvwxyz'
    };

    app.addEventListener('submit', function(e) {
        e.preventDefault();
    });

    app.elements.namedItem('btn-mas-uno')?.addEventListener('click', function() {
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
    });

    app.elements.namedItem('btn-menos-uno')?.addEventListener('click', function() {
        if (configuracion.caracteres > 1) {
            configuracion.caracteres--;
            inputCaracteres.value = configuracion.caracteres;
        }
    });

    const toggleButtons = [
        { id: 'toggleButton', key: 'simbolos' },
        { id: 'toggleButton2', key: 'numeros' },
        { id: 'toggleButton3', key: 'mayusculas' }
    ];

    toggleButtons.forEach(button => {
        const toggleButton = document.getElementById(button.id);
        if (toggleButton) {
            toggleButton.addEventListener('click', function() {
                this.innerText = this.innerText === 'Sí' ? 'No' : 'Sí';
                this.classList.toggle('active');
                configuracion[button.key] = !configuracion[button.key];
            });
        }
    });

    app.elements.namedItem('btn-generar')?.addEventListener('click', function() {
        generarPassword();
    });

    function generarPassword() {
        let caracteresFinales = '';
        let password = '';

        for (let propiedad in configuracion) {
            if (configuracion[propiedad] === true && propiedad !== 'caracteres') {
                caracteresFinales += caracteres[propiedad];
            }
        }

        if (caracteresFinales.length === 0) {
            console.warn('Configuración inválida: se debe seleccionar al menos un tipo de carácter.');
            return;
        }

        for (let i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        }

        console.log('Contraseña generada:', password);

        
        if (typeof Swal !== 'undefined') {
            setTimeout(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Contraseña generada con éxito",
                    text: `Tu nueva contraseña es: ${password}`,
                    showConfirmButton: true,
                    confirmButtonText: "Aceptar"
                });
            }, 1000); 
        } else {
            console.warn("SweetAlert no está disponible.");
        }
    }
            
})()
