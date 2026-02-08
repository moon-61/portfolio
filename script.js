// ===================================
// MOON CLOUDAY - PORTFOLIO JAVASCRIPT
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // INICIALIZAR AOS ANIMATIONS
    // ===================================
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

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
    // SMOOTH SCROLL NAVIGATION
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.querySelector('.header-section').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Cerrar navbar en móvil
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    // ===================================
    // ACTIVE NAVIGATION ON SCROLL
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function activateNavLink() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 200;
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        // Si está en el top, activar "Inicio"
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active');
                }
            });
        }
    }
    
    window.addEventListener('scroll', activateNavLink);

    // ===================================
    // HEADER SHADOW ON SCROLL
    // ===================================
    const header = document.querySelector('.header-section');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===================================
    // CERRAR NAVBAR AL HACER CLICK FUERA
    // ===================================
    document.addEventListener('click', function(e) {
        const navbar = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        
        if (navbar && navbar.classList.contains('show')) {
            if (!navbar.contains(e.target) && !toggler.contains(e.target)) {
                const bsCollapse = new bootstrap.Collapse(navbar);
                bsCollapse.hide();
            }
        }
    });

    // ===================================
    // PORTFOLIO FILTERS
    // ===================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // ===================================
    // PROJECT MODAL
    // ===================================
    const projectButtons = document.querySelectorAll('.btn-view-project');
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    const modalContent = document.getElementById('modalContent');
    
    // DATOS DE LOS PROYECTOS
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
            challenge: 'Crear un guante equipado con sensores, proyectado para indicar al usuario la necesidad de una pausa tras movimientos repetitivos.',
            solution: 'Desarrollamos Muva, un dispositivo wearable que integra hardware y software. El guante con sensores Arduino monitorea los movimientos repetitivos en tiempo real y proporciona feedback mediante una aplicación móvil diseñada en Figma y desarrollada en Unity, alertando al usuario cuando necesita tomar una pausa.',
            images: [
                'img/muva/electronica.png',
                'img/muva/app2.jpg',
                'img/muva/luva.jpg',
                'img/muva/ensamblagem.jpg'
            ],
            pdfUrl: 'https://drive.google.com/file/d/1LKwEpHds_10BRXDb8e-OOD8iu_mFsVKR/preview',
            figmaUrl: 'https://www.figma.com/proto/U557GDsN1lSie3KG0nPnj5/Wireframes?node-id=41-80&p=f&t=YpY6oa1gMBWKGaBU-1&scaling=contain&content-scaling=fixed&page-id=0%3A1'
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
            challenge: 'Crear un sistema de mobiliario educativo modular que se adapte a diferentes actividades de aprendizaje y edades.',
            solution: 'Loopi es un sistema de sillas modulares diseñadas con AutoCAD e Inventor que permite configuraciones flexibles para espacios educativos modernos, promoviendo la creatividad y colaboración.',
            images: [
                'img/loopi/prototipo.jpg',
                'img/loopi/otroprotoripo.jpg',
                'img/loopi/medidas.jpg',
                'img/loopi/final.jpg'
            ],
            pdfUrl: 'https://drive.google.com/file/d/1GXa45a0WtGb7hsoI67IQmeRcbYsarwFE/preview'
        },
        trevo: {
            title: 'Trevo',
            category: 'UI/UX Design',
            type: 'Universidad',
            tools: [
                { name: 'Figma', icon: 'palette' },
                { name: 'After Effects', text: 'Ae' },
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Crear una interfaz para una aplicación móvil que incentive el reciclaje urbano en São Paulo.',
            solution: 'Aplicación interactiva y social que informa sobre el reciclaje, incentiva la competencia amistosa entre usuarios y amigos para ver quién recicla más, e informa cuándo pasará el camión de reciclaje por la calle del usuario.',
            images: [
                'img/bastidores/trevu.png',
                'img/bastidores/trevo/imagen2.jpg',
                'img/bastidores/trevo/imagen3.jpg',
                'img/bastidores/trevo/imagen4.jpg'
            ],
            pdfUrl: 'https://drive.google.com/file/d/1f3MV1CTnPrR7iEAH1xSsRVKB-WnHjdYE/preview',
            figmaUrl: 'https://www.figma.com/proto/PLRp9d0Debb2SpX4chcrsb/Treevo?page-id=0%3A1&node-id=1069-511&p=f&viewport=-891%2C1044%2C0.31&t=mSiBQdtJxyJWx0GT-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=1069%3A511'
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
            challenge: 'Crear una página web personal.',
            solution: 'Página web dirigida a diseñadores principiantes o que están iniciando la carrera de diseño. Incluye blog personal, buscador de tutoriales y galería de artículos de diseño.',
            images: [
                'img/bastidores/moon.jpg',
                'img/bastidores/moon/imagen2.jpg',
                'img/bastidores/moon/imagen3.jpg',
                'img/bastidores/moon/imagen4.jpg'
            ],
            pdfUrl: null
        },
        'menu-digital': {
            title: 'Menú Digital',
            category: 'Editorial',
            type: 'Universidad',
            tools: [
                { name: 'InDesign', text: 'Id' },
                { name: 'Illustrator', text: 'Ai' }
            ],
            challenge: 'Crear un menú digital interactivo para un restaurante ficticio de tapas españolas.',
            solution: 'Creación de una identidad visual para el restaurante, investigación del menú y de los platos a servir, selección de imágenes coherentes con la identidad del restaurante, desarrollo de un menú que informe al cliente cómo se elabora cada plato de tapas, e inclusión de un botón para realizar reservas en el restaurante.',
            images: [
                'img/editorial/menu-digital.jpg'
            ],
            pdfUrl: 'https://drive.google.com/file/d/MENU_DIGITAL_PDF_ID/preview'
        },
        'revista-digital': {
            title: 'Revista Digital',
            category: 'Editorial',
            type: 'Universidad',
            tools: [
                { name: 'Canva', icon: 'palette' }
            ],
            challenge: 'Crear una revista digital de moda.',
            solution: 'Pieza editorial interactiva para tablet enfocada en moda urbana. Contiene videos, tips según el tipo de cuerpo, hipervínculos a perfiles de influencers y ubicaciones donde encontrar ropa de buena calidad a bajo costo.',
            images: [
                'img/editorial/revista-digital.jpg'
            ],
            pdfUrl: 'https://drive.google.com/file/d/REVISTA_DIGITAL_PDF_ID/preview'
        },
        'portada-libro': {
            title: 'Portada de Libro',
            category: 'Editorial',
            type: 'Personal',
            tools: [
                { name: 'Krita', text: 'Kr' },
                { name: 'Affinity', text: 'Af' }
            ],
            challenge: 'Transmitir el contenido del libro a través de una ilustración.',
            solution: 'Desarrollo de una portada tras pruebas de color y diálogo con el cliente. Diseño que une tapa y contratapa. Estilo que combina lo minimalista y lo artístico mediante el uso de texturas.',
            images: [
                'img/editorial/portada-libro.jpg'
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
            challenge: 'Dar a conocer una palabra costumbrista cruceña a un público extranjero.',
            solution: 'Afiche tipográfico digital con pequeñas ilustraciones hechas a mano.',
            images: [
                'img/posters/poster-1.jpg'
            ],
            pdfUrl: null
        },
        'poster-2': {
            title: 'It\'s Cheruche Time',
            category: 'Poster',
            type: 'Personal',
            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Mezclar un elemento globalizado con un elemento tradicional cruceño.',
            solution: 'Experimentación de texturas y tipografías en un único afiche digital.',
            images: [
                'img/posters/poster-2.jpg'
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
            challenge: 'Informar sobre el nombre coloquial o costumbrista que reciben las cigarras en Santa Cruz de la Sierra.',
            solution: 'Afiche digital que experimenta con tipografía, jerarquía visual, formas y textura de imagen.',
            images: [
                'img/posters/poster-3.jpg'
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
            challenge: 'Dar una nueva reinterpretación a El Principito.',
            solution: 'Ilustración digital con textura de crayón. Estilo realista del personaje, utilizando el crayón como recurso visual asociado a lo infantil.',
            images: [
                'img/ilustracion/ilustracion-digital.jpg'
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
            challenge: 'Documentar mediante fotografía y video el pueblo de San José de Chiquitos, Santa Cruz, Bolivia.',
            solution: null,
            images: [
                'img/audiovisual/doc-audiovisual.jpg'
            ],
            videos: [
                'videos/audiovisual/video1.mp4',
                'videos/audiovisual/video2.mp4',
                'videos/audiovisual/video3.mp4'
            ],
            photos: [
                'img/audiovisual/foto1.jpg',
                'img/audiovisual/foto2.jpg',
                'img/audiovisual/foto3.jpg'
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
            challenge: 'Dar una nueva imagen a las publicaciones de una banda alternativa pequeña de Santa Cruz de la Sierra.',
            solution: 'Desarrollo de un póster digital y creación de un conjunto de historias de Instagram animadas. Proceso basado en brief inicial y entrevistas a los músicos para definir el mensaje a transmitir.',
            images: [
                'img/posters/poster-historias.jpg'
            ],
            pdfUrl: null
        },
        'boheme': {
            title: 'Bohemé - Identidad Visual',
            category: 'Identidad Visual',
            type: 'Universidad',
            tools: [
                { name: 'Illustrator', text: 'Ai' }
            ],
            challenge: 'Desarrollar una marca ficticia.',
            solution: 'Conceptualización de una cafetería innovadora y maximalista. Marca llena de color y energía. Desarrollo completo de su identidad visual.',
            images: [
                'img/branding/boheme.jpg'
            ],
            pdfUrl: null
        }
    };
    
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                loadProjectModal(project);
                modal.show();
            }
        });
    });
    
    function loadProjectModal(project) {
        let toolsHTML = project.tools.map(tool => {
            if (tool.icon) {
                return `<span class="tool-icon" title="${tool.name}">
                    <i class="bi bi-${tool.icon}"></i>
                </span>`;
            } else {
                return `<span class="tool-icon" title="${tool.name}">${tool.text}</span>`;
            }
        }).join('');
        
        let imagesHTML = project.images.map(img => 
            `<img src="${img}" alt="${project.title}" loading="lazy">`
        ).join('');
        
        let pdfHTML = project.pdfUrl ? `
            <div class="project-pdf-viewer">
                <h4 style="font-family: 'Urbanist', sans-serif; font-weight: 700; margin-bottom: 20px;">
                    <i class="bi bi-file-earmark-pdf-fill"></i> Documentación del Proyecto
                </h4>
                <iframe src="${project.pdfUrl}" loading="lazy"></iframe>
            </div>
        ` : '';
        
        let figmaHTML = project.figmaUrl ? `
            <div class="project-figma-link">
                <a href="${project.figmaUrl}" target="_blank" class="btn-figma">
                    <i class="bi bi-palette-fill"></i>
                    Ver Prototipo en Figma
                </a>
            </div>
        ` : '';
        
        let solutionHTML = project.solution ? `
            <div class="project-info-section">
                <h4><i class="bi bi-check-circle-fill"></i> Solución</h4>
                <p>${project.solution}</p>
            </div>
        ` : '';
        
        let videosHTML = project.videos ? `
            <div class="project-videos">
                <h4 style="font-family: 'Urbanist', sans-serif; font-weight: 700; margin-bottom: 20px;">
                    <i class="bi bi-camera-video-fill"></i> Videos
                </h4>
                <div class="videos-grid">
                    ${project.videos.map(video => `
                        <video controls>
                            <source src="${video}" type="video/mp4">
                            Tu navegador no soporta el elemento de video.
                        </video>
                    `).join('')}
                </div>
            </div>
        ` : '';
        
        let photosHTML = project.photos ? `
            <div class="project-photos">
                <h4 style="font-family: 'Urbanist', sans-serif; font-weight: 700; margin-bottom: 20px;">
                    <i class="bi bi-camera-fill"></i> Fotografías
                </h4>
                <div class="photos-grid">
                    ${project.photos.map(photo => `
                        <img src="${photo}" alt="${project.title}" loading="lazy">
                    `).join('')}
                </div>
            </div>
        ` : '';
        
        modalContent.innerHTML = `
            <div class="project-detail">
                <div class="project-detail-header">
                    <h2 class="project-detail-title">${project.title}</h2>
                    <span class="project-category">${project.category}</span>
                    <div class="project-detail-tools">
                        ${toolsHTML}
                    </div>
                    <span class="project-detail-type">
                        <i class="bi bi-${project.type === 'Universidad' ? 'mortarboard-fill' : 'person-fill'}"></i>
                        ${project.type}
                    </span>
                </div>
                
                ${figmaHTML}
                
                <div class="project-info-section">
                    <h4><i class="bi bi-lightning-charge-fill"></i> Desafío</h4>
                    <p>${project.challenge}</p>
                </div>
                
                ${solutionHTML}
                
                ${imagesHTML ? `
                    <div class="project-gallery">
                        ${imagesHTML}
                    </div>
                ` : ''}
                
                ${videosHTML}
                
                ${photosHTML}
                
                ${pdfHTML}
            </div>
        `;
        
        // Agregar click en imágenes para ampliar
        modalContent.querySelectorAll('.project-gallery img, .photos-grid img').forEach(img => {
            img.addEventListener('click', function() {
                // Crear modal de imagen ampliada
                const imageModal = document.createElement('div');
                imageModal.className = 'image-zoom-modal';
                imageModal.innerHTML = `
                    <div class="image-zoom-content">
                        <span class="close-zoom">&times;</span>
                        <img src="${this.src}" alt="${project.title}">
                    </div>
                `;
                document.body.appendChild(imageModal);
                
                imageModal.querySelector('.close-zoom').addEventListener('click', () => {
                    imageModal.remove();
                });
                
                imageModal.addEventListener('click', (e) => {
                    if (e.target === imageModal) {
                        imageModal.remove();
                    }
                });
            });
        });
    }

    
    // ===================================
    // TYPEWRITER EFFECT (HERO)
    // ===================================
    const heroTitle = document.querySelector('.hero-title');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (heroTitle && !prefersReducedMotion.matches) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.opacity = '1';
        
        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            }
        }
        
        setTimeout(typeWriter, 500);
    }

    // ===================================
    // INTERSECTION OBSERVER
    // ===================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar a elementos que necesiten fade-in
    document.querySelectorAll('.skill-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `all 0.5s ease ${index * 0.05}s`;
        fadeInObserver.observe(item);
    });

    // ===================================
    // HOVER 3D EFFECT EN CARDS
    // ===================================
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    
    portfolioCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth <= 768) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // ===================================
    // CONSOLE MESSAGE
    // ===================================
    console.log(
        '%c🎨 Moon Clouday Portfolio',
        'background: linear-gradient(135deg, #B882D9, #A3CFD9); color: white; padding: 15px 30px; font-size: 18px; font-weight: bold; border-radius: 10px;'
    );
    console.log(
        '%cDiseñadora Digital | PUC-SP',
        'color: #FF9933; font-size: 14px; font-weight: bold;'
    );

    // ===================================
    // RESPONSIVE ADJUSTMENTS
    // ===================================
    function handleResize() {
        const width = window.innerWidth;
        
        // Deshabilitar parallax en móvil
        if (width <= 768) {
            document.querySelectorAll('.hero-main-image, .about-image').forEach(img => {
                img.style.transform = 'none';
            });
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // ===================================
    // ACCESSIBILITY
    // ===================================
    if (prefersReducedMotion.matches) {
        // Deshabilitar animaciones para usuarios que prefieren movimiento reducido
        document.querySelectorAll('[data-aos]').forEach(el => {
            el.removeAttribute('data-aos');
        });
        
        document.querySelectorAll('.sticker-space').forEach(sticker => {
            sticker.style.animation = 'none';
        });
    }

    // ===================================
    // BACK TO TOP (OPCIONAL)
    // ===================================
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--color-purple-dark), var(--color-purple));
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        box-shadow: 0 5px 20px rgba(184, 130, 217, 0.4);
        z-index: 999;
        transition: all 0.3s;
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'scale(1)';
    });

});

// ===================================
// ESTILOS ADICIONALES PARA IMAGE ZOOM
// ===================================
const style = document.createElement('style');
style.textContent = `
    .image-zoom-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .image-zoom-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
    }
    
    .image-zoom-content img {
        max-width: 100%;
        max-height: 90vh;
        border-radius: 10px;
        box-shadow: 0 10px 50px rgba(0, 0, 0, 0.5);
    }
    
    .close-zoom {
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s;
    }
    
    .close-zoom:hover {
        color: #FF9933;
        transform: rotate(90deg);
    }
    
    /* Estilos para botón Figma */
    .project-figma-link {
        text-align: center;
        margin: 30px 0;
    }
    
    .btn-figma {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        background: linear-gradient(135deg, #B882D9, #A3CFD9);
        color: white;
        padding: 15px 35px;
        border-radius: 50px;
        font-family: 'Urbanist', sans-serif;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.3s;
        box-shadow: 0 5px 20px rgba(184, 130, 217, 0.3);
    }
    
    .btn-figma:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 30px rgba(184, 130, 217, 0.5);
        color: white;
    }
    
    /* Estilos para videos y fotos */
    .videos-grid,
    .photos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin: 20px 0;
    }
    
    .videos-grid video {
        width: 100%;
        border-radius: 15px;
        border: 3px dashed var(--color-blue);
    }
    
    .photos-grid img {
        width: 100%;
        height: 250px;
        object-fit: cover;
        border-radius: 15px;
        border: 3px dashed var(--color-blue);
        transition: all 0.3s;
        cursor: pointer;
    }
    
    .photos-grid img:hover {
        transform: scale(1.05);
        border-style: solid;
    }
    
    .project-videos,
    .project-photos {
        margin: 30px 0;
    }
`;
document.head.appendChild(style);