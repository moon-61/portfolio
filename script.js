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
    // PORTFOLIO FILTERS
    // ===================================

    const filterButtons =
        document.querySelectorAll('.filter-btn');

    const portfolioItems =
        document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {

        button.addEventListener('click', function () {

            const filter =
                this.getAttribute('data-filter');

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            this.classList.add('active');

            portfolioItems.forEach(item => {

                const category =
                    item.getAttribute('data-category');

                if (
                    filter === 'all' ||
                    category === filter
                ) {
                    item.classList.remove('hidden');

                    // Reiniciar animación visual si AOS está disponible
                    item.classList.remove('aos-animate');

                    requestAnimationFrame(() => {
                        item.classList.add('aos-animate');
                    });

                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===================================
    // DATOS DE LOS PROYECTOS
    // ===================================

    const projectsData = {

        muva: {
            title: 'Muva',
            category: 'UI/UX + Physical Computing',
            type: 'Universidad',

            tools: [
                { name: 'Figma', icon: 'palette' },
                { name: 'Unity', icon: 'controller' },
                { name: 'Arduino', icon: 'cpu' },
                { name: 'Photoshop', text: 'Ps' },
                { name: 'Illustrator', text: 'Ai' }
            ],

            challenge:
                'Crear un guante equipado con sensores, proyectado para indicar al usuario la necesidad de una pausa tras movimientos repetitivos.',

            solution:
                'Desarrollamos Muva, un dispositivo wearable que integra hardware y software. El guante con sensores Arduino monitorea los movimientos repetitivos en tiempo real y proporciona feedback mediante una aplicación móvil diseñada en Figma y desarrollada en Unity, alertando al usuario cuando necesita tomar una pausa.',

            images: [
                'img/muva/electronica.png',
                'img/muva/app2.jpg',
                'img/muva/luva.jpg',
                'img/muva/ensamblagem.jpg'
            ],

            pdfUrl:
                'https://drive.google.com/file/d/1LKwEpHds_10BRXDb8e-OOD8iu_mFsVKR/preview',

            figmaUrl:
                'https://www.figma.com/proto/U557GDsN1lSie3KG0nPnj5/Wireframes?node-id=41-80&p=f&t=YpY6oa1gMBWKGaBU-1&scaling=contain&content-scaling=fixed&page-id=0%3A1'
        },

        loopi: {
            title: 'Loopi',
            category: 'Diseño de Producto',
            type: 'Universidad',

            tools: [
                { name: 'AutoCAD', text: 'CAD' },
                { name: 'Inventor', text: 'Inv' },
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' },
                { name: 'Gemini AI', icon: 'stars' }
            ],

            challenge:
                'Crear un sistema de mobiliario educativo modular que se adapte a diferentes actividades de aprendizaje y edades.',

            solution:
                'Loopi es un sistema de sillas modulares diseñadas con AutoCAD e Inventor que permite configuraciones flexibles para espacios educativos modernos, promoviendo la creatividad y colaboración.',

            images: [
                'img/loopi/prototipo.jpg',
                'img/loopi/otroprotoripo.jpg',
                'img/loopi/medidas.jpg',
                'img/loopi/final.jpg'
            ],

            pdfUrl:
                'https://drive.google.com/file/d/1GXa45a0WtGb7hsoI67IQmeRcbYsarwFE/preview'
        },

        treevo: {
            title: 'Treevo',
            category: 'UI/UX Design',
            type: 'Universidad',

            tools: [
                { name: 'Figma', icon: 'palette' },
                { name: 'After Effects', text: 'Ae' },
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Crear una interfaz para una aplicación móvil que incentive el reciclaje urbano en São Paulo.',

            solution:
                'Aplicación interactiva y social que informa sobre el reciclaje, incentiva la competencia amistosa entre usuarios y amigos para ver quién recicla más, e informa cuándo pasará el camión de reciclaje por la calle del usuario.',

            images: [
                'img/treevo/wireframes.jpg',
                'img/treevo/componentes.jpg',
                'img/treevo/treevo.jpg',
                'img/treevo/exploracion.jpg'
            ],

            pdfUrl:
                'https://drive.google.com/file/d/1f3MV1CTnPrR7iEAH1xSsRVKB-WnHjdYE/preview',

            figmaUrl:
                'https://www.figma.com/proto/PLRp9d0Debb2SpX4chcrsb/Treevo?page-id=0%3A1&node-id=1069-511&p=f&viewport=-891%2C1044%2C0.31&t=mSiBQdtJxyJWx0GT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1069%3A511'
        },

        moonclouday: {
            title: 'MoonClouday',
            category: 'Desarrollo Web',
            type: 'Personal',

            tools: [
                { name: 'VS Code', icon: 'code-slash' },
                { name: 'GitHub', icon: 'github' },
                { name: 'Bootstrap', icon: 'bootstrap' },
                { name: 'Photoshop', text: 'Ps' },
                { name: 'Illustrator', text: 'Ai' }
            ],

            challenge:
                'Crear una página web personal.',

            solution:
                'Página web dirigida a diseñadores principiantes o que están iniciando la carrera de diseño. Incluye blog personal, buscador de tutoriales y galería de artículos de diseño.',

            images: [
                'img/moon/notas3.jpg',
                'img/moon/notas4.jpg',
                'img/moon/figma.jpg',
                'img/moon/CODIGO.jpg'
            ],

            pdfUrl: null,

            websiteUrl:
                'https://moon-61.github.io/moonclouday/html/home-ES.html'
        },

        'menu-digital': {
            title: 'Menú Digital',
            category: 'Editorial',
            type: 'Universidad',

            tools: [
                { name: 'InDesign', text: 'Id' },
                { name: 'Illustrator', text: 'Ai' }
            ],

            challenge:
                'Crear un menú digital interactivo para un restaurante ficticio de tapas españolas.',

            solution:
                'Creación de una identidad visual para el restaurante, investigación del menú y de los platos a servir, selección de imágenes coherentes con la identidad del restaurante, desarrollo de un menú que informe al cliente cómo se elabora cada plato de tapas, e inclusión de un botón para realizar reservas en el restaurante.',

            images: [
                'img/editorial/ideamuch.png'
            ],

            pdfUrl:
                'https://drive.google.com/file/d/14rTEEShni_J2DE2KUD_LF9noLFsI--Tu/preview'
        },

        'revista-digital': {
            title: 'Revista Digital',
            category: 'Editorial',
            type: 'Universidad',

            tools: [
                { name: 'Canva', icon: 'palette' }
            ],

            challenge:
                'Crear una revista digital de moda.',

            solution:
                'Pieza editorial interactiva para tablet enfocada en moda urbana. Contiene videos, tips según el tipo de cuerpo, hipervínculos a perfiles de influencers y ubicaciones donde encontrar ropa de buena calidad a bajo costo.',

            images: [
                'img/editorial/portadarevista.jpg'
            ],

            pdfUrl:
                'https://drive.google.com/file/d/1jXt23QzmH_rLlU9EukSRtTtoQIlrBA_n/preview'
        },

        'portada-libro': {
            title: 'Portada de Libro',
            category: 'Editorial',
            type: 'Personal',

            tools: [
                { name: 'Krita', text: 'Kr' },
                { name: 'Affinity', text: 'Af' }
            ],

            challenge:
                'Transmitir el contenido del libro a través de una ilustración.',

            solution:
                'Desarrollo de una portada tras pruebas de color y diálogo con el cliente. Diseño que une tapa y contratapa. Estilo que combina lo minimalista y lo artístico mediante el uso de texturas.',

            images: [
                'img/editorial/portada.jpg'
            ],

            pdfUrl: null
        },

        'poster-1': {
            title: 'Póster Creativo 1',
            category: 'Poster',
            type: 'Personal',

            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Dar a conocer una palabra costumbrista cruceña a un público extranjero.',

            solution:
                'Afiche tipográfico digital con pequeñas ilustraciones hechas a mano.',

            images: [
                'img/posters/horneao.jpg'
            ],

            pdfUrl: null
        },

        'poster-2': {
            title: "It's Cheruche Time",
            category: 'Poster',
            type: 'Personal',

            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Mezclar un elemento globalizado con un elemento tradicional cruceño.',

            solution:
                'Experimentación de texturas y tipografías en un único afiche digital.',

            images: [
                'img/posters/cheruje.jpg'
            ],

            pdfUrl: null
        },

        'poster-3': {
            title: 'Póster Creativo 3',
            category: 'Poster',
            type: 'Personal',

            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Informar sobre el nombre coloquial o costumbrista que reciben las cigarras en Santa Cruz de la Sierra.',

            solution:
                'Afiche digital que experimenta con tipografía, jerarquía visual, formas y textura de imagen.',

            images: [
                'img/posters/cuco.jpg'
            ],

            pdfUrl: null
        },

        'ilustracion-digital': {
            title: 'Ilustración Digital',
            category: 'Ilustración',
            type: 'Universidad',

            tools: [
                { name: 'Krita', text: 'Kr' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Dar una nueva reinterpretación a El Principito.',

            solution:
                'Ilustración digital con textura de crayón. Estilo realista del personaje, utilizando el crayón como recurso visual asociado a lo infantil.',

            images: [
                'img/posters/elprincipito.png'
            ],

            pdfUrl: null
        },

        'doc-audiovisual': {
            title: 'Documentación Audiovisual',
            category: 'Audiovisual',
            type: 'Universidad',

            tools: [
                { name: 'After Effects', text: 'Ae' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Documentar mediante fotografía y video el pueblo de San José de Chiquitos, Santa Cruz, Bolivia.',

            solution: null,

            images: [],

            videos: [
                'img/documentacion/videos.mp4'
            ],

            photos: [
                'img/documentacion/foto1.jpg',
                'img/documentacion/foto2.jpg',
                'img/documentacion/foto3.jpg'
            ],

            pdfUrl: null
        },

        'poster-historias': {
            title: 'Póster Digital + Historias Instagram',
            category: 'Poster + Social Media',
            type: 'Universidad',

            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],

            challenge:
                'Dar una nueva imagen a las publicaciones de una banda alternativa pequeña de Santa Cruz de la Sierra.',

            solution:
                'Desarrollo de un póster digital y creación de un conjunto de historias de Instagram animadas. Proceso basado en brief inicial y entrevistas a los músicos para definir el mensaje a transmitir.',

            images: [
                'img/posters/Rebis.gif',
                'img/posters/Rebis1.gif',
                'img/posters/Rebis2.gif'
            ],

            pdfUrl: null
        },

        boheme: {
            title: 'Bohemé - Identidad Visual',
            category: 'Identidad Visual',
            type: 'Universidad',

            tools: [
                { name: 'Illustrator', text: 'Ai' }
            ],

            challenge:
                'Desarrollar una marca ficticia.',

            solution:
                'Conceptualización de una cafetería innovadora y maximalista. Marca llena de color y energía. Desarrollo completo de su identidad visual.',

            images: [
                'img/identidad/folleto.jpg',
                'img/identidad/gafetes.jpg',
                'img/identidad/stickers.jpg',
                'img/identidad/tarjetas.jpg'
            ],

            pdfUrl: null
        }
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

        const typeIcon =
            project.type === 'Universidad'
                ? 'mortarboard-fill'
                : 'person-fill';

        modalContent.innerHTML = `

            <div class="project-detail">

                <div class="project-detail-header">

                    <h2 class="project-detail-title">
                        ${escapeHTML(project.title)}
                    </h2>

                    <span class="project-category">
                        ${escapeHTML(project.category)}
                    </span>

                    <div class="project-detail-tools">
                        ${toolsHTML}
                    </div>

                    <span class="project-detail-type">

                        <i class="bi bi-${typeIcon}"></i>

                        ${escapeHTML(project.type)}

                    </span>

                </div>

                ${figmaHTML}
                ${websiteHTML}

                <div class="project-info-section">

                    <h4>
                        <i class="bi bi-lightning-charge-fill"></i>
                        Desafío
                    </h4>

                    <p>
                        ${escapeHTML(project.challenge || '')}
                    </p>

                </div>

                ${solutionHTML}

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
                '2026 – Actualidad · Pasantía hasta diciembre de 2026',

            area:
                'Diseño Digital / UX/UI',

            summary:
                'Participación en proyectos de diseño digital orientados a soluciones tecnológicas, FinTech y servicios para el sector financiero y corporativo, trabajando de manera colaborativa en comunicación visual, identidad de marca, diseño UX/UI y desarrollo de recursos para productos y eventos corporativos.',

            sections: [

                {
                    title: 'Comunicación Visual',
                    icon: 'bi-megaphone-fill',
                    items: [
                        'Diseño de contenido y piezas de comunicación para LinkedIn y redes sociales corporativas',
                        'Diseño de banners y material gráfico para eventos',
                        'Desarrollo de presentaciones institucionales y corporativas',
                        'Creación de currículums y credenciales corporativas',
                        'Desarrollo creativo y conceptual de propuestas gráficas',
                        'Adaptación y rediseño de piezas corporativas bajo lineamientos de marca'
                    ]
                },

                {
                    title: 'Identidad Visual y Branding',
                    icon: 'bi-palette-fill',
                    items: [
                        'Creación de identidades visuales para nuevos productos y servicios digitales',
                        'Desarrollo de sistemas visuales y adaptación de identidades a diferentes formatos y canales',
                        'Participación en procesos de rebranding y construcción de identidad de marca',
                        'Desarrollo de componentes visuales y sistemas gráficos en Figma',
                        'Aplicación de criterios de color, tipografía, composición, jerarquía visual y consistencia de marca'
                    ]
                },

                {
                    title: 'UX/UI y Diseño Digital',
                    icon: 'bi-phone-fill',
                    items: [
                        'Diseño de experiencias e interfaces de usuario (UX/UI)',
                        'Diseño de landing pages en Figma',
                        'Creación de wireframes y propuestas de interfaces digitales',
                        'Desarrollo de sistemas visuales, paletas de color y mejoras de interfaz',
                        'Creación de prototipos y documentación de interfaces',
                        'Aplicación de criterios de usabilidad, jerarquía visual y consistencia en productos digitales',
                        'Uso de Figma para diseño, prototipado, creación de componentes y documentación'
                    ]
                },

                {
                    title: 'Proyectos Destacados',
                    icon: 'bi-stars',
                    items: [
                        '<strong>Carrusel de Niveles de Adopción de la IA — MC4 × Platzi:</strong> desarrollo conceptual y visual de una pieza de seis láminas para LinkedIn, orientada a posicionar a MC4 dentro del ecosistema de inteligencia artificial y generar interés en el programa ejecutivo MC4 × Platzi. La pieza obtuvo una recepción notable tras su publicación.',

                        '<strong>Diseño UX/UI para onboarding de servicio bancario:</strong> diseño y mejora de pantallas para el proceso de onboarding de un servicio bancario, tomando decisiones orientadas a optimizar la experiencia de usuario. Participación en la implementación de mejoras, gestión de correcciones y ajustes de las interfaces, incorporando continuamente el feedback del cliente (banco) para perfeccionar la solución final.',

                        '<strong>Identidad Visual — Open Finance Bolivia Summit 2026:</strong> desarrollo del sistema visual integral del evento MC4 × Sensedia, aplicado a redes sociales, correo electrónico, presentaciones y material físico. Se trabajó con un sistema de componentes compartidos en Figma y una integración de las identidades visuales de ambas empresas.',

                        '<strong>Identidad de Marca "d10" — Rebranding de UniColegios:</strong> desarrollo de la identidad visual completa para el nuevo sistema de pagos de MC4, orientado a ampliar el alcance del producto más allá del sector educativo. El proyecto incluyó exploración conceptual, desarrollo de isologo, tipografía personalizada y sistema cromático. La identidad fue aprobada internamente y presentada favorablemente al Banco.'
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

                        <span>Empresa</span>

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
        '%c🎨 Moon Clouday Portfolio',
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