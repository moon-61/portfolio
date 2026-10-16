// ===================================
// MOON CLOUDAY - PORTFOLIO JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function () {

    // ===================================
    // INICIALIZAR AOS
    // ===================================

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }

    // ===================================
    // FAVICON
    // ===================================

    (function ensureFavicon() {
        if (!document.querySelector('link[rel*="icon"]')) {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/png';
            link.href = 'img/stickers_blog/star.png';
            link.sizes = '32x32';
            document.head.appendChild(link);
        }
    })();

    // ===================================
    // REFERENCIAS GENERALES
    // ===================================

    const header = document.querySelector('.header-section');
    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    );

    const certificateModalLabel =
        document.getElementById('certificateModalLabel');
    const certificateModalImage =
        document.getElementById('certificateModalImage');

    document.querySelectorAll('.course-certificate-trigger').forEach(button => {
        button.addEventListener('click', function () {
            const title = this.dataset.certificateTitle;
            const image = this.dataset.certificateImage;

            if (!title || !image || !certificateModalLabel || !certificateModalImage) {
                console.error('No se pudo cargar el certificado seleccionado.');
                return;
            }

            certificateModalLabel.textContent = title;
            certificateModalImage.src = image;
            certificateModalImage.alt = `Certificado de ${title}`;
        });
    });

    // ===================================
    // SMOOTH SCROLL NAVIGATION
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const href = this.getAttribute('href');

            if (!href || href === '#' || href.length <= 1) {
                return;
            }

            const target = document.querySelector(href);

            if (!target) {
                return;
            }

            e.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Cerrar navbar en móvil
            const navbarCollapse =
                document.querySelector('.navbar-collapse');

            if (
                navbarCollapse &&
                navbarCollapse.classList.contains('show') &&
                typeof bootstrap !== 'undefined'
            ) {
                const bsCollapse =
                    bootstrap.Collapse.getOrCreateInstance(
                        navbarCollapse
                    );

                bsCollapse.hide();
            }
        });
    });

    // ===================================
    // ACTIVE NAVIGATION ON SCROLL
    // ===================================

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function activateNavLink() {

        const scrollY = window.pageYOffset;
        const offset = 220;

        let currentSection = 'home';

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - offset;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                scrollY >= sectionTop &&
                scrollY < sectionBottom
            ) {
                currentSection = section.id;
            }
        });

        navLinks.forEach(link => {

            link.classList.remove('active');

            const href =
                link.getAttribute('href');

            if (href === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener(
        'scroll',
        activateNavLink,
        { passive: true }
    );

    activateNavLink();

    // ===================================
    // HEADER SHADOW
    // ===================================

    function updateHeaderShadow() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener(
        'scroll',
        updateHeaderShadow,
        { passive: true }
    );

    updateHeaderShadow();

    // ===================================
    // CERRAR NAVBAR AL HACER CLICK FUERA
    // ===================================

    document.addEventListener('click', function (e) {

        const navbar =
            document.querySelector('.navbar-collapse');

        const toggler =
            document.querySelector('.navbar-toggler');

        if (
            !navbar ||
            !navbar.classList.contains('show') ||
            !toggler
        ) {
            return;
        }

        if (
            !navbar.contains(e.target) &&
            !toggler.contains(e.target)
        ) {
            if (typeof bootstrap !== 'undefined') {
                const bsCollapse =
                    bootstrap.Collapse.getOrCreateInstance(
                        navbar
                    );

                bsCollapse.hide();
            }
        }
    });

    // ===================================
    // DATOS DE LOS PROYECTOS
    // ===================================

    const projectsData = {

        muva: {
            title: 'Muva',
            category: 'UX/UI Design',

            tools: [
                { name: 'Figma', icon: 'palette' },
                { name: 'Unity', icon: 'controller' },
                { name: 'Arduino', icon: 'cpu' }
            ],

            sections: [
                {
                    title: 'Ficha del proyecto',
                    icon: 'info-circle-fill',
                    body: 'Proyecto académico en PUC-SP, São Paulo. Febrero–abril de 2025; dos meses en total: un mes de investigación y cuatro semanas de desarrollo. Éramos cuatro personas. Me encargué de desarrollar la aplicación en Unity, crear las animaciones y transferir el prototipo de Figma a Unity. Mis compañeras desarrollaron el hardware y la programación en Arduino.'
                },
                {
                    title: 'El problema',
                    icon: 'heart-pulse',
                    body: 'El síndrome del túnel carpiano es una compresión del nervio mediano en la muñeca. Puede desarrollarse lentamente y pasar inadvertido hasta que el dolor se vuelve constante. Afecta especialmente a quienes realizan movimientos repetitivos durante muchas horas, como digitadores, cajeros, costureras y trabajadores de producción. La falta de pausas es un factor de riesgo importante en las lesiones por esfuerzo repetitivo.'
                },
                {
                    title: 'Investigación',
                    icon: 'search',
                    body: 'Revisamos fuentes brasileñas de salud y entrevistamos a tres fisioterapeutas. Un estudio con 200 trabajadores hospitalarios reportó que el 34% tenía el síndrome confirmado por ultrasonido. Uno de los artículos citaba datos del INSS según los cuales las LER/DORT son la segunda causa de licencia laboral en Brasil.',
                    items: [
                        'Las fisioterapeutas señalaron que el daño no depende solo de la cantidad de movimientos: también importan la duración del esfuerzo sostenido y la presión.',
                        'El riesgo está relacionado con la costumbre de no hacer pausas. Por eso, la solución debía considerar el tiempo de esfuerzo, no limitarse a mostrar un aviso genérico para descansar.'
                    ]
                },
                {
                    title: 'La solución',
                    icon: 'lightbulb-fill',
                    body: 'Muva es un guante conectado a una aplicación móvil. Incluye un sensor de presión en la base de la mano y otro de flexión sobre la muñeca, donde pasa el nervio mediano. La persona inicia una sesión en la aplicación y elige una actividad: diseñar o programar. El sistema registra el esfuerzo sostenido y, tras un periodo prolongado —por ejemplo, 45 minutos—, avisa que es momento de descansar y ofrece ejercicios de movilidad para la mano.',
                    items: [
                        'La aplicación también incluye una guía de uso antes de la primera sesión y una sección informativa con señales de alerta del síndrome.',
                        'La vibración no se usa para dar masajes: quedó únicamente como aviso discreto de concentración prolongada, para notificar sin obligar a mirar el celular.',
                        'Muva es una herramienta de prevención y aviso temprano; no reemplaza la atención de un fisioterapeuta ni de un médico.'
                    ]
                },
                {
                    title: 'Decisiones de diseño',
                    icon: 'palette-fill',
                    body: 'Diseñé la interfaz con un tono médico y tranquilo, una paleta de azules y colores pastel, tipografías sans serif modernas y pocos elementos decorativos. La pantalla de inicio muestra las actividades recientes para facilitar el comienzo de una sesión y mantiene siempre visible el acceso a la información. Durante el desarrollo definí animaciones suaves e iconografía médica.'
                },
                {
                    title: 'Materiales, resultados y límites',
                    icon: 'clipboard-check-fill',
                    body: 'La propuesta contempla un guante de poliéster con un bolsillo para extraer el sistema interno y poder lavarlo. Para el prototipo y la demostración usamos lana; su apariencia no representaba bien el material final y los profesores observaron que no parecía un guante. A partir de ese feedback investigamos telas más adecuadas para el uso prolongado.',
                    items: [
                        'Los profesores valoraron positivamente el funcionamiento del código y los sensores, e indicaron que la interfaz necesitaba más trabajo.',
                        'Probamos el prototipo con una persona durante una semana. Funcionó, pero no hubo tiempo para medir resultados a largo plazo.'
                    ]
                },
                {
                    title: 'Lo que aprendí',
                    icon: 'mortarboard-fill',
                    body: 'Aprendí a trabajar con hardware y software en paralelo, y a evaluar una idea desde la experiencia física de quien la usa. Descartar la vibración como masaje fue la decisión más importante: la investigación cambió la solución. También confirmé que la interfaz necesita el mismo cuidado que la electrónica.'
                }
            ],

            figmaUrl:
                'https://www.figma.com/proto/U557GDsN1lSie3KG0nPnj5/Wireframes?node-id=41-80&p=f&t=YpY6oa1gMBWKGaBU-1&scaling=contain&content-scaling=fixed&page-id=0%3A1'
        },

        treevo: {
            title: 'Treevo',
            category: 'UX/UI · Prototipo en Figma',

            tools: [
                { name: 'Figma', icon: 'palette' }
            ],

            sections: [
                {
                    title: 'Ficha del proyecto',
                    icon: 'info-circle-fill',
                    body: 'Proyecto académico del módulo de UX/UI en PUC-SP, São Paulo, realizado entre agosto y octubre de 2025. Éramos cuatro personas. Me encargué de organizar el trabajo, construir componentes en Figma y definir la lógica del prototipo. El proyecto se desarrolló en Figma con prototipado interactivo; no hubo programación.'
                },
                {
                    title: 'El contexto y el problema',
                    icon: 'recycle',
                    body: 'En São Paulo, la recolección selectiva domiciliaria llega a los 96 distritos, pero la información práctica puede ser difícil de encontrar: qué día pasa el camión, qué materiales se aceptan y dónde llevar lo que no se recoge en casa. Según las fuentes consultadas para el proyecto, la ciudad también cuenta con ecopontos y puntos de entrega voluntaria. Durante la investigación identificamos que textiles como ropa usada o retazos podían terminar en la basura común cuando las personas no sabían cómo desecharlos.',
                    items: [
                        'La Política Nacional de Resíduos Sólidos (Ley 12.305/2010) establece la separación de residuos según su composición.',
                        'El reto era reunir en un solo lugar opciones e información para reciclar, desde la recolección domiciliaria hasta la entrega en un punto específico.'
                    ]
                },
                {
                    title: 'La propuesta',
                    icon: 'lightbulb-fill',
                    body: 'Treevo propone una experiencia móvil que concentra opciones e información para facilitar el reciclaje cotidiano. La idea funciona como un “Uber del reciclaje”: permite solicitar la recolección en casa, marcar un día para llevar residuos a un punto específico y consultar contenido educativo sobre cómo separar y preparar cada material.',
                    items: [
                        'Incluye recompensas y misiones para motivar la participación.',
                        'Una mascota —una planta que crece y se convierte en un melón personalizable— acompaña el progreso.',
                        'Permite agregar amistades y comparar cuánto recicla cada persona.'
                    ]
                },
                {
                    title: 'Mi proceso y aporte',
                    icon: 'diagram-3-fill',
                    body: 'Al inicio me costó integrarme al equipo, que estaba formado por personas que no conocía. Con el tiempo, ayudé a ordenar el trabajo y a clarificar las tareas para que cada integrante supiera qué debía avanzar. También detecté que crear cada pantalla por separado hacía que el archivo de Figma fuera difícil de mantener.',
                    items: [
                        'Estudié componentes y variantes de Figma, tomando como base la introducción del profesor, y convertí elementos repetidos en componentes reutilizables.',
                        'Organicé la estructura para que la interfaz quedara más modular y fuera más sencillo actualizar elementos sin rehacer pantallas.',
                        'Definí conexiones y respuestas entre pantallas para que las acciones principales pudieran recorrerse en el prototipo interactivo.'
                    ]
                },
                {
                    title: 'Decisiones y aprendizajes',
                    icon: 'palette-fill',
                    body: 'El cambio principal fue pasar de pantallas independientes a un sistema de componentes. Esto ordenó el archivo y facilitó los ajustes de interfaz. Aprendí que diseñar interfaces también implica organizar, reutilizar y prever distintos casos, y que la claridad debe evaluarse desde la perspectiva de quien necesita usar el producto.'
                },
                {
                    title: 'Resultado y alcance',
                    icon: 'clipboard-check-fill',
                    body: 'El resultado fue un prototipo completo y coherente en Figma, con componentes reutilizables y navegación definida para sus funciones principales. No se realizaron pruebas de uso ni se recopilaron métricas, por lo que Treevo se presenta como una propuesta de diseño, no como un producto validado.',
                    items: [
                        'Treevo es un prototipo académico, no un servicio oficial.',
                        'Para convertirse en un servicio real, las agendas y los puntos de recolección tendrían que integrarse con la Prefeitura de São Paulo o con las concesionarias.'
                    ]
                },
                {
                    title: 'Fuentes consultadas',
                    icon: 'journal-text',
                    items: [
                        'Prefeitura de São Paulo y SP Regula: recolección selectiva domiciliaria en los 96 distritos y canales de atención SP156.',
                        'Prefeitura de São Paulo (SECOM): información sobre ecopontos y puntos de entrega voluntaria.',
                        'Ley Federal 12.305/2010, Política Nacional de Resíduos Sólidos.',
                        'Agência Câmara (2013): explicación sobre la separación en origen tras la implantación de la recolección selectiva.'
                    ]
                }
            ],

            figmaUrl:
                'https://www.figma.com/proto/PLRp9d0Debb2SpX4chcrsb/Treevo?page-id=0%3A1&node-id=1069-511&p=f&viewport=-891%2C1044%2C0.31&t=mSiBQdtJxyJWx0GT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1069%3A511&desktop-link-click-timestamp=1792166704546&desktop-ul-exp-bucket=po&desktop-ul-pref-conflict=1'
        },

        moonclouday: {
            title: 'MoonClouday',
            category: 'Diseño y desarrollo frontend',

            tools: [
                { name: 'HTML', text: 'HTML' },
                { name: 'CSS', text: 'CSS' },
                { name: 'JavaScript', text: 'JS' },
                { name: 'Bootstrap', icon: 'bootstrap' },
                { name: 'GitHub Pages', icon: 'github' }
            ],

            sections: [
                {
                    title: 'Ficha del proyecto',
                    icon: 'info-circle-fill',
                    body: 'Proyecto personal creado durante mi intercambio académico en PUC-SP, São Paulo, en 2025. Lo diseñé y desarrollé de forma individual con HTML, CSS, JavaScript, Bootstrap y GitHub Pages, usando herramientas de IA como apoyo para consultar y resolver dudas. La duración estimada es de octubre a noviembre de 2025 y está por confirmar.'
                },
                {
                    title: 'El reto: encontrar una dirección',
                    icon: 'compass-fill',
                    body: 'La idea comenzó cuando un amigo de mi primer grupo me sugirió escribir un blog sobre mi experiencia en Brasil. Al intentar definir su identidad visual, exploré cuatro direcciones: una estética indie retro de los años 90, una propuesta corporativa, una inspirada en un cuaderno de notas y una opción más estándar que no terminaba de convencerme. En las entregas semanales me costaba justificar por qué debía elegir una sobre las demás.'
                },
                {
                    title: 'Feedback y cambio de enfoque',
                    icon: 'chat-square-text-fill',
                    body: 'Al presentar las primeras tres versiones, recibí opiniones como “me gusta la A” o “prefiero la C”, sin explicar las razones. Aprendí que una preferencia aislada no basta como feedback de diseño: es más útil saber qué funciona, qué no y por qué. Las observaciones de los profesores sobre los aciertos y problemas de cada propuesta me ayudaron a dejar de buscar una versión perfecta y combinar lo mejor de varias direcciones.',
                    items: [
                        'El concepto evolucionó de un blog a un sitio personal que muestra mis proyectos, mi proceso y mis aprendizajes.',
                        'Quise compartir también errores, bloqueos y soluciones para que otros estudiantes que se sienten perdidos pudieran reconocer un proceso real.'
                    ]
                },
                {
                    title: 'La solución',
                    icon: 'lightbulb-fill',
                    body: 'MoonClouday es un sitio personal con cuatro secciones principales: Inicio, Sobre mí, Blog y Contacto. También reúne páginas de proyectos —“Detrás de escena”—, trucos de diseño y novedades. Está disponible en español, portugués e inglés.',
                    items: [
                        'El blog funciona como un diario mensual del intercambio, de febrero a octubre de 2025. Cada entrada incluye una imagen, un resumen y el tiempo de lectura.',
                        'La página de proyectos reúne cuatro trabajos: Muva, Loopi, Treevo y el propio MoonClouday.',
                        'La portada ofrece tarjetas de acceso directo a los contenidos principales.'
                    ]
                },
                {
                    title: 'Decisiones de diseño y desarrollo',
                    icon: 'palette-fill',
                    body: 'La identidad combina referencias retro de los años 90, stickers y detalles personales con una estructura pensada para mantener la legibilidad. Bakugo aparece como un motivo recurrente y una elección consciente para expresar la energía con la que quería trabajar.',
                    items: [
                        'Diseñé una navegación sencilla y una estructura adaptable a distintos tamaños de pantalla desde una misma base de código.',
                        'Organicé tarjetas, encabezados y botones con clases reutilizables de Bootstrap y CSS propio.',
                        'Planifiqué el contenido en español, portugués e inglés, considerando desde el inicio cómo se organiza y presenta en cada idioma.'
                    ]
                },
                {
                    title: 'Resultado y alcance actual',
                    icon: 'globe',
                    body: 'El sitio está publicado en GitHub Pages. Algunas entradas del blog, incluida la de noviembre, siguen pendientes y se muestran como “próximamente”; algunas páginas de proyectos también necesitan mejoras. El proyecto documenta una experiencia personal y un proceso de diseño y desarrollo, no un producto con métricas de uso.'
                },
                {
                    title: 'Lo que aprendí',
                    icon: 'mortarboard-fill',
                    body: 'Aprendí que incluso un proyecto personal necesita criterio para elegir, justificar y cerrar una dirección visual. También practiqué recibir feedback de forma más útil y convertir críticas en decisiones concretas. La estructura del código y la organización del contenido en tres idiomas forman parte de la experiencia: el código también es una decisión de diseño.'
                }
            ],

            websiteUrl:
                'https://moon-61.github.io/moonclouday/html/home-ES.html',

            repositoryUrl:
                'https://github.com/moon-61/moonclouday'
        },

    };

    // ===================================
    // PROJECT MODAL
    // ===================================

    const projectModalElement =
        document.getElementById('projectModal');

    const modalContent =
        document.getElementById('modalContent');

    let projectModal = null;

    if (
        projectModalElement &&
        typeof bootstrap !== 'undefined'
    ) {
        projectModal =
            bootstrap.Modal.getOrCreateInstance(
                projectModalElement
            );
    }

    const projectButtons =
        document.querySelectorAll('.btn-view-project');

    projectButtons.forEach(button => {

        button.addEventListener('click', function () {

            const projectId =
                this.getAttribute('data-project');

            const project =
                projectsData[projectId];

            if (!project) {
                console.warn(
                    `No se encontró el proyecto: ${projectId}`
                );
                return;
            }

            loadProjectModal(project);

            if (projectModal) {
                projectModal.show();
            }
        });
    });

    // ===================================
    // FUNCIÓN PARA CONSTRUIR TOOLS
    // ===================================

    function renderTools(tools = []) {

        return tools.map(tool => {

            if (tool.icon) {

                return `
                    <span
                        class="tool-icon"
                        title="${escapeHTML(tool.name)}">
                        <i class="bi bi-${escapeHTML(tool.icon)}"></i>
                    </span>
                `;
            }

            return `
                <span
                    class="tool-icon"
                    title="${escapeHTML(tool.name)}">
                    ${escapeHTML(tool.text || '')}
                </span>
            `;

        }).join('');
    }

    // ===================================
    // CARGAR PROJECT MODAL
    // ===================================

    function loadProjectModal(project) {

        if (!modalContent) {
            return;
        }

        const toolsHTML =
            renderTools(project.tools || []);

        const images =
            Array.isArray(project.images)
                ? project.images
                : [];

        const isSingleImage =
            images.length === 1;

        const galleryClass =
            isSingleImage
                ? 'project-gallery single-image'
                : 'project-gallery';

        const imagesHTML =
            images.map(image => {

                return `
                    <img
                        src="${escapeAttribute(image)}"
                        alt="${escapeAttribute(project.title)}"
                        loading="lazy">
                `;

            }).join('');

        const pdfHTML =
            project.pdfUrl
                ? `
                    <div class="project-pdf-viewer">

                        <h4
                            style="
                                font-family: 'Urbanist', sans-serif;
                                font-weight: 700;
                                margin-bottom: 20px;
                            ">
                            <i class="bi bi-file-earmark-pdf-fill"></i>
                            Documentación del Proyecto
                        </h4>

                        <iframe
                            src="${escapeAttribute(project.pdfUrl)}"
                            loading="lazy"
                            title="Documentación de ${escapeAttribute(project.title)}">
                        </iframe>

                    </div>
                `
                : '';

        const figmaHTML =
            project.figmaUrl
                ? `
                    <div class="project-figma-link">

                        <a
                            href="${escapeAttribute(project.figmaUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-figma">

                            <i class="bi bi-palette-fill"></i>
                            Ver Prototipo en Figma

                        </a>

                    </div>
                `
                : '';

        const websiteHTML =
            project.websiteUrl
                ? `
                    <div class="project-figma-link">

                        <a
                            href="${escapeAttribute(project.websiteUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-website">

                            <i class="bi bi-globe"></i>
                            Ir a Página

                        </a>

                    </div>
                `
                : '';

        const repositoryHTML =
            project.repositoryUrl
                ? `
                    <div class="project-figma-link">
                        <a
                            href="${escapeAttribute(project.repositoryUrl)}"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="btn-website">
                            <i class="bi bi-github"></i>
                            Ver repositorio en GitHub
                        </a>
                    </div>
                `
                : '';

        const solutionHTML =
            project.solution
                ? `
                    <div class="project-info-section">

                        <h4>
                            <i class="bi bi-check-circle-fill"></i>
                            Solución
                        </h4>

                        <p>
                            ${escapeHTML(project.solution)}
                        </p>

                    </div>
                `
                : '';

        const videos =
            Array.isArray(project.videos)
                ? project.videos
                : [];

        const photos =
            Array.isArray(project.photos)
                ? project.photos
                : [];

        const videosHTML =
            videos.length
                ? `
                    <div class="project-videos">

                        <h4
                            style="
                                font-family: 'Urbanist', sans-serif;
                                font-weight: 700;
                                margin-bottom: 20px;
                            ">
                            <i class="bi bi-camera-video-fill"></i>
                            Videos
                        </h4>

                        <div class="videos-grid">

                            ${videos.map(video => `
                                <video controls preload="metadata">
                                    <source
                                        src="${escapeAttribute(video)}"
                                        type="video/mp4">
                                    Tu navegador no soporta el elemento de video.
                                </video>
                            `).join('')}

                        </div>
                    </div>
                `
                : '';

        const photosHTML =
            photos.length
                ? `
                    <div class="project-photos">

                        <h4
                            style="
                                font-family: 'Urbanist', sans-serif;
                                font-weight: 700;
                                margin-bottom: 20px;
                            ">
                            <i class="bi bi-camera-fill"></i>
                            Fotografías
                        </h4>

                        <div class="photos-grid">

                            ${photos.map(photo => `
                                <img
                                    src="${escapeAttribute(photo)}"
                                    alt="${escapeAttribute(project.title)}"
                                    loading="lazy">
                            `).join('')}

                        </div>

                    </div>
                `
                : '';

        const projectSectionsHTML =
            Array.isArray(project.sections)
                ? project.sections.map(section => {
                    const itemsHTML =
                        Array.isArray(section.items) && section.items.length
                            ? `<ul>${section.items.map(item => `<li>${escapeHTML(item)}</li>`).join('')}</ul>`
                            : '';

                    const bodyHTML =
                        section.body
                            ? `<p>${escapeHTML(section.body)}</p>`
                            : '';

                    return `
                        <section class="project-info-section">
                            <h4>
                                <i class="bi bi-${escapeHTML(section.icon)}"></i>
                                ${escapeHTML(section.title)}
                            </h4>
                            ${bodyHTML}
                            ${itemsHTML}
                        </section>
                    `;
                }).join('')
                : '';

        const projectOverviewHTML =
            projectSectionsHTML
                ? projectSectionsHTML
                : `
                    <div class="project-info-section">
                        <h4>
                            <i class="bi bi-lightning-charge-fill"></i>
                            Desafío
                        </h4>
                        <p>${escapeHTML(project.challenge || '')}</p>
                    </div>
                    ${solutionHTML}
                `;

        modalContent.innerHTML = `

            <div class="project-detail">

                <div class="project-detail-header">

                    <h2 class="project-detail-title" id="projectModalLabel">
                        ${escapeHTML(project.title)}
                    </h2>

                    <span class="project-category">
                        ${escapeHTML(project.category)}
                    </span>

                    <div class="project-detail-tools">
                        ${toolsHTML}
                    </div>

                </div>

                ${figmaHTML}
                ${websiteHTML}
                ${repositoryHTML}

                ${projectOverviewHTML}

                ${
                    imagesHTML
                        ? `
                            <div class="${galleryClass}">
                                ${imagesHTML}
                            </div>
                        `
                        : ''
                }

                ${videosHTML}
                ${photosHTML}
                ${pdfHTML}

            </div>
        `;

        addImageZoomListeners(modalContent, project.title);
    }

    // ===================================
    // EXPERIENCE MODAL
    // ===================================

    const experienceModalElement =
        document.getElementById('experienceModal');

    const experienceModalContent =
        document.getElementById('experienceModalContent');

    let experienceModal = null;

    if (
        experienceModalElement &&
        typeof bootstrap !== 'undefined'
    ) {
        experienceModal =
            bootstrap.Modal.getOrCreateInstance(
                experienceModalElement
            );
    }

    // Datos de la experiencia laboral
    const experienceData = {

        mc4: {

            title:
                'Pasante de Diseño Digital',

            company:
                'MC4 SRL — Bolivia',

            period:
                'Febrero de 2026 – Actualidad',

            area:
                'Diseño Digital / UX/UI',

            summary:
                'En MC4, diseñé experiencias e interfaces para productos digitales financieros y corporativos. Mi trabajo abarcó el análisis del negocio, la arquitectura de información, el prototipado y la colaboración con desarrollo.',

            sections: [

                {
                    title: 'Investigación y arquitectura de información',
                    icon: 'bi-search',
                    items: [
                        'Analicé el mercado y la empresa para comprender su misión, visión, objetivos y necesidades.',
                        'Definí la arquitectura de información, las pantallas y la agrupación de módulos según los requerimientos del sistema.',
                        'Apliqué criterios de WCAG, design systems, consistencia, feedback y aislamiento según el producto y el negocio.'
                    ]
                },

                {
                    title: 'Diseño UX/UI y prototipado',
                    icon: 'bi-phone-fill',
                    items: [
                        'Diseñé flujos, pantallas, componentes y diagramas para presentar y validar soluciones antes del desarrollo.',
                        'Creé prototipos interactivos de baja, media y alta fidelidad, incorporando la identidad visual de cada marca.',
                        'Diseñé un onboarding financiero con lógica condicional para perfilar usuarios, validar identidad y realizar verificación biométrica.',
                        'Diseñé pantallas para una aplicación web interna que reemplaza procesos manuales en Excel, con tablas complejas, filtros, escenarios y estados de aprobación.'
                    ]
                },

                {
                    title: 'Colaboración con desarrollo',
                    icon: 'bi-code-slash',
                    items: [
                        'Colaboré con desarrollo en la implementación de componentes dinámicos con React, Angular y TypeScript.',
                        'Utilicé herramientas de IA como apoyo para convertir propuestas de diseño en interfaces funcionales.',
                        'Fundamenté mis decisiones de diseño con patrones enterprise, WCAG y design systems ante QA, desarrollo y clientes.'
                    ]
                },

                {
                    title: 'Aportes',
                    icon: 'bi-stars',
                    items: [
                        'Mejoré el look and feel y adapté la experiencia de usuario a las necesidades de cada cliente.',
                        'Creé diagramas de flujo con lógica condicional para escenarios financieros.',
                        'Diseñé interfaces de negocio para visualizar y filtrar datos complejos.',
                        'Colaboré en la implementación y validación de interfaces con distintas áreas.'
                    ]
                }

            ]
        }

    };

    const experienceTriggers =
        document.querySelectorAll(
            '[data-experience]'
        );

    experienceTriggers.forEach(trigger => {

        trigger.addEventListener('click', function () {

            const experienceId =
                this.getAttribute('data-experience');

            const experience =
                experienceData[experienceId];

            if (!experience) {
                console.warn(
                    `No se encontró la experiencia: ${experienceId}`
                );
                return;
            }

            loadExperienceModal(experience);

            if (experienceModal) {
                experienceModal.show();
            }
        });
    });

    function loadExperienceModal(experience) {

        if (!experienceModalContent) {
            return;
        }

        const sectionsHTML =
            experience.sections.map(section => {

                const itemsHTML =
                    section.items.map(item => {

                        /*
                         * Los proyectos destacados tienen <strong>
                         * intencionalmente, por eso no hacemos escape
                         * de todo el contenido aquí.
                         */
                        return `
                            <li>
                                ${item}
                            </li>
                        `;

                    }).join('');

                return `
                    <section class="experience-detail-section">

                        <h3>
                            <i class="bi ${escapeHTML(section.icon)}"></i>
                            ${escapeHTML(section.title)}
                        </h3>

                        <ul class="experience-detail-list">
                            ${itemsHTML}
                        </ul>

                    </section>
                `;

            }).join('');

        experienceModalContent.innerHTML = `

            <div class="experience-detail">

                <div class="experience-detail-intro">

                    <div class="experience-detail-meta">

                        <span>Puesto</span>

                        <strong>
                            ${escapeHTML(experience.title)}
                        </strong>

                    </div>

                    <div class="experience-detail-meta">

                        <span>Organización</span>

                        <strong>
                            ${escapeHTML(experience.company)}
                        </strong>

                    </div>

                    <div class="experience-detail-meta">

                        <span>Área</span>

                        <strong>
                            ${escapeHTML(experience.area)}
                        </strong>

                    </div>

                </div>

                <div class="experience-detail-section">

                    <h3>
                        <i class="bi bi-person-workspace"></i>
                        Resumen
                    </h3>

                    <p>
                        ${escapeHTML(experience.summary)}
                    </p>

                </div>

                ${sectionsHTML}

            </div>
        `;
    }

    // ===================================
    // IMAGE ZOOM
    // ===================================

    function addImageZoomListeners(container, title) {

        if (!container) {
            return;
        }

        const images =
            container.querySelectorAll(
                '.project-gallery img, .photos-grid img'
            );

        images.forEach(img => {

            img.addEventListener('click', function () {

                openImageZoom(
                    this.src,
                    title
                );
            });
        });
    }

    function openImageZoom(src, title) {

        const existing =
            document.querySelector('.image-zoom-modal');

        if (existing) {
            existing.remove();
        }

        const imageModal =
            document.createElement('div');

        imageModal.className =
            'image-zoom-modal';

        imageModal.setAttribute(
            'role',
            'dialog'
        );

        imageModal.setAttribute(
            'aria-label',
            `Imagen ampliada de ${title}`
        );

        imageModal.innerHTML = `

            <div class="image-zoom-content">

                <button
                    type="button"
                    class="close-zoom"
                    aria-label="Cerrar imagen">
                    &times;
                </button>

                <img
                    src="${escapeAttribute(src)}"
                    alt="${escapeAttribute(title)}">

            </div>
        `;

        document.body.appendChild(imageModal);

        document.body.style.overflow = 'hidden';

        const closeButton =
            imageModal.querySelector('.close-zoom');

        const closeZoom = () => {

            imageModal.remove();

            document.body.style.overflow = '';

            document.removeEventListener(
                'keydown',
                handleEscape
            );
        };

        const handleEscape = event => {

            if (event.key === 'Escape') {
                closeZoom();
            }
        };

        closeButton.addEventListener(
            'click',
            closeZoom
        );

        imageModal.addEventListener(
            'click',
            event => {

                if (event.target === imageModal) {
                    closeZoom();
                }
            }
        );

        document.addEventListener(
            'keydown',
            handleEscape
        );
    }

    // ===================================
    // TYPEWRITER EFFECT
    // ===================================

    const heroTitle =
        document.querySelector('.hero-title');

    if (
        heroTitle &&
        !prefersReducedMotion.matches
    ) {

        const text =
            heroTitle.textContent.trim();

        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';

        let index = 0;

        function typeWriter() {

            if (index < text.length) {

                heroTitle.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(
                    typeWriter,
                    65
                );
            }
        }

        setTimeout(
            typeWriter,
            450
        );
    }

    // ===================================
    // INTERSECTION OBSERVER
    // ===================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = '1';
                        entry.target.style.transform =
                            'translateY(0)';

                        fadeInObserver.unobserve(
                            entry.target
                        );
                    }
                });

            },
            observerOptions
        );

    // Usar la nueva estructura de skills
    document.querySelectorAll(
        '.skill-card'
    ).forEach((item, index) => {

        if (prefersReducedMotion.matches) {
            return;
        }

        item.style.opacity = '0';

        item.style.transform =
            'translateY(20px)';

        item.style.transition =
            `all 0.5s ease ${index * 0.05}s`;

        fadeInObserver.observe(item);
    });

    // Compatibilidad con estructura anterior
    document.querySelectorAll(
        '.skill-item'
    ).forEach((item, index) => {

        if (prefersReducedMotion.matches) {
            return;
        }

        item.style.opacity = '0';

        item.style.transform =
            'translateY(20px)';

        item.style.transition =
            `all 0.5s ease ${index * 0.05}s`;

        fadeInObserver.observe(item);
    });

    // ===================================
    // 3D HOVER EFFECT EN PROJECT CARDS
    // ===================================

    const portfolioCards =
        document.querySelectorAll(
            '.portfolio-card'
        );

    portfolioCards.forEach(card => {

        card.addEventListener(
            'mousemove',
            function (e) {

                if (
                    window.innerWidth <= 768 ||
                    prefersReducedMotion.matches
                ) {
                    return;
                }

                const rect =
                    card.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 22;

                const rotateY =
                    (centerX - x) / 22;

                card.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-10px)`;
            }
        );

        card.addEventListener(
            'mouseleave',
            function () {

                card.style.transform =
                    '';
            }
        );
    });

    // ===================================
    // EXPERIENCE MODULE HOVER
    // ===================================

    const experienceModule =
        document.querySelector(
            '.experience-module'
        );

    if (
        experienceModule &&
        !prefersReducedMotion.matches
    ) {

        experienceModule.addEventListener(
            'mousemove',
            function (e) {

                if (window.innerWidth <= 768) {
                    return;
                }

                const rect =
                    experienceModule.getBoundingClientRect();

                const x =
                    e.clientX - rect.left;

                const y =
                    e.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    (y - centerY) / 70;

                const rotateY =
                    (centerX - x) / 70;

                this.style.transform =
                    `perspective(1400px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;
            }
        );

        experienceModule.addEventListener(
            'mouseleave',
            function () {

                this.style.transform =
                    '';
            }
        );
    }

    // ===================================
    // RESPONSIVE
    // ===================================

    function handleResize() {

        const width =
            window.innerWidth;

        if (width <= 768) {

            document
                .querySelectorAll(
                    '.hero-main-image, .about-image'
                )
                .forEach(img => {
                    img.style.transform = 'none';
                });

            if (experienceModule) {
                experienceModule.style.transform = '';
            }

            portfolioCards.forEach(card => {
                card.style.transform = '';
            });
        }
    }

    window.addEventListener(
        'resize',
        handleResize
    );

    handleResize();

    // ===================================
    // ACCESSIBILITY / REDUCED MOTION
    // ===================================

    if (prefersReducedMotion.matches) {

        document
            .querySelectorAll('[data-aos]')
            .forEach(element => {
                element.removeAttribute('data-aos');
            });

        document
            .querySelectorAll('.sticker-space')
            .forEach(sticker => {
                sticker.style.animation = 'none';
            });
    }

    // ===================================
    // BACK TO TOP
    // ===================================

    const backToTop =
        document.createElement('button');

    backToTop.className =
        'back-to-top';

    backToTop.type =
        'button';

    backToTop.setAttribute(
        'aria-label',
        'Volver al inicio'
    );

    backToTop.innerHTML =
        '<i class="bi bi-arrow-up"></i>';

    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(
            135deg,
            var(--color-purple-dark),
            var(--color-purple)
        );
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow:
            0 5px 20px rgba(184, 130, 217, 0.4);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    document.body.appendChild(
        backToTop
    );

    function updateBackToTop() {

        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }

    window.addEventListener(
        'scroll',
        updateBackToTop,
        { passive: true }
    );

    backToTop.addEventListener(
        'click',
        () => {

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    );

    backToTop.addEventListener(
        'mouseenter',
        () => {
            backToTop.style.transform =
                'scale(1.1)';
        }
    );

    backToTop.addEventListener(
        'mouseleave',
        () => {
            backToTop.style.transform =
                'scale(1)';
        }
    );

    updateBackToTop();

    // ===================================
    // UTILIDADES
    // ===================================

    function escapeHTML(value) {

        if (value === null || value === undefined) {
            return '';
        }

        return String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    function escapeAttribute(value) {
        return escapeHTML(value);
    }

    // ===================================
    // CONSOLE MESSAGE
    // ===================================

    console.log(
        '%c🎨 Claudia Rojas Portfolio',
        `
            background: linear-gradient(
                135deg,
                #B882D9,
                #A3CFD9
            );
            color: white;
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            border-radius: 10px;
        `
    );

    console.log(
        '%cDiseñadora Digital | PUC-SP',
        `
            color: #FF9933;
            font-size: 14px;
            font-weight: bold;
        `
    );
});


// ===================================
// ESTILOS ADICIONALES PARA IMAGE ZOOM
// ===================================

(function injectAdditionalStyles() {

    if (document.getElementById(
        'moon-clouday-extra-styles'
    )) {
        return;
    }

    const style =
        document.createElement('style');

    style.id =
        'moon-clouday-extra-styles';

    style.textContent = `

        .image-zoom-modal {
            position: fixed;
            inset: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.92);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            padding: 30px;
            animation: moonFadeIn 0.3s ease;
        }

        @keyframes moonFadeIn {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

        .image-zoom-content {
            position: relative;
            max-width: 92vw;
            max-height: 92vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-zoom-content img {
            max-width: 100%;
            max-height: 88vh;
            border-radius: 12px;
            box-shadow:
                0 10px 50px rgba(0, 0, 0, 0.5);
            object-fit: contain;
        }

        .close-zoom {
            position: absolute;
            top: -48px;
            right: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--color-orange);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 30px;
            line-height: 1;
            cursor: pointer;
            transition:
                transform 0.3s ease,
                background 0.3s ease;
            z-index: 2;
        }

        .close-zoom:hover {
            transform:
                rotate(90deg)
                scale(1.1);
            background: var(--color-purple-dark);
        }

        .project-figma-link {
            text-align: center;
            margin: 30px 0;
        }

        .btn-figma {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            background:
                linear-gradient(
                    135deg,
                    #B882D9,
                    #A3CFD9
                );
            color: white;
            padding: 15px 35px;
            border-radius: 50px;
            font-family: 'Urbanist', sans-serif;
            font-weight: 700;
            text-decoration: none;
            transition: all 0.3s ease;
            box-shadow:
                0 5px 20px
                rgba(184, 130, 217, 0.3);
        }

        .btn-figma:hover {
            transform: translateY(-3px);
            box-shadow:
                0 8px 30px
                rgba(184, 130, 217, 0.5);
            color: white;
        }

        .videos-grid,
        .photos-grid {
            display: grid;
            grid-template-columns:
                repeat(
                    auto-fit,
                    minmax(250px, 1fr)
                );
            gap: 20px;
            margin: 20px 0;
        }

        .videos-grid video {
            width: 100%;
            border-radius: 15px;
            border: 3px dashed var(--color-blue);
            background: #000;
        }

        .photos-grid img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 15px;
            border: 3px dashed var(--color-blue);
            transition: all 0.3s ease;
            cursor: pointer;
        }

        .photos-grid img:hover {
            transform: scale(1.03);
            border-style: solid;
        }

        .project-videos,
        .project-photos {
            margin: 30px 0;
        }

        .project-videos h4,
        .project-photos h4 {
            color: var(--color-dark);
        }

        @media (max-width: 768px) {

            .image-zoom-modal {
                padding: 20px;
            }

            .close-zoom {
                top: -48px;
                right: 0;
            }

            .image-zoom-content {
                max-width: 95vw;
                max-height: 90vh;
            }

            .image-zoom-content img {
                max-height: 82vh;
            }

            .videos-grid,
            .photos-grid {
                grid-template-columns: 1fr;
            }
        }

        @media (max-width: 576px) {

            .image-zoom-modal {
                padding: 15px;
            }

            .close-zoom {
                width: 36px;
                height: 36px;
                font-size: 26px;
                top: -44px;
            }
        }

        @media (prefers-reduced-motion: reduce) {

            .image-zoom-modal {
                animation: none;
            }

            .close-zoom,
            .photos-grid img,
            .btn-figma {
                transition: none;
            }
        }
    `;

    document.head.appendChild(style);

})();