(() => {
    let app = document.getElementById('app');
    let inputCaracteres = document.getElementById('numero-caracteres');
    let inputPassword = document.getElementById('input-contraseña');

    if (!app || !inputCaracteres || !inputPassword) {
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

    app.addEventListener('submit', function (e) {
        e.preventDefault();
    });

    document.getElementById('btn-mas-uno')?.addEventListener('click', function (e) {
        e.preventDefault();
        configuracion.caracteres++;
        inputCaracteres.value = configuracion.caracteres;
    });

    document.getElementById('btn-menos-uno')?.addEventListener('click', function (e) {
        e.preventDefault();
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
            toggleButton.addEventListener('click', function () {
                this.innerText = this.innerText === 'Sí' ? 'No' : 'Sí';
                this.classList.toggle('active');
                configuracion[button.key] = !configuracion[button.key];
            });
        }
    });

    document.getElementById('btn-generar')?.addEventListener('click', function (e) {
        e.preventDefault();
        let password = generarPassword();
        inputPassword.value = password;

       
        verificarConApi(password);
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
            Swal.fire({
                icon: "warning",
                title: "Configuración inválida",
                text: "Selecciona al menos un tipo de carácter para generar una contraseña."
            });
            return '';
        }

        for (let i = 0; i < configuracion.caracteres; i++) {
            password += caracteresFinales[Math.floor(Math.random() * caracteresFinales.length)];
        }

        return password;
    }

    function verificarConApi(password) {
        
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta de la API:', data);

                
                const segura = password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[!#$%&*]/.test(password);

                Swal.fire({
                    icon: segura ? 'success' : 'warning',
                    title: segura ? 'Contraseña segura' : 'Contraseña insegura',
                    text: segura
                        ? 'Estas totalmente seguro'
                        : 'Intenta usar una contraseña más larga y con más variedad de caracteres.'
                });
            })
            .catch(error => {
                console.error('Error al verificar la contraseña:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al verificar',
                    text: 'No se pudo conectar al servicio de verificación. Inténtalo más tarde.'
                });
            });
    }
})();
