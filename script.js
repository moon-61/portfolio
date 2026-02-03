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
            challenge: 'Diseñar un wearable que ayude a mejorar la postura corporal combinando tecnología física y digital.',
            solution: 'Desarrollamos Muva, un dispositivo wearable con sensores Arduino que monitorea la postura en tiempo real y proporciona feedback a través de una aplicación móvil diseñada en Figma y desarrollada en Unity.',
            images: [
                'img/bastidores/muva.png'
            ],
            pdfUrl: null
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
                'img/bastidores/loopi.png',
                'img/bastidores/loopi/prototipo.jpg',
                'img/bastidores/loopi/otroprotoripo.jpg',
                'img/bastidores/loopi/medidas.jpg',
                'img/bastidores/loopi/final.jpg'
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
            challenge: 'Diseñar una interfaz de usuario intuitiva y atractiva para una aplicación móvil.',
            solution: 'Creamos un prototipo completo en Figma con animaciones en After Effects, siguiendo principios de diseño centrado en el usuario y realizando pruebas de usabilidad iterativas.',
            images: [
                'img/bastidores/trevu.png'
            ],
            pdfUrl: null
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
            challenge: 'Crear un portfolio personal que refleje mi identidad como diseñadora digital y muestre mis proyectos de manera efectiva.',
            solution: 'Desarrollé este sitio web responsive usando Bootstrap y JavaScript vanilla, implementando animaciones suaves y un diseño colorido que representa mi estilo personal.',
            images: [
                'img/bastidores/moon.jpg'
            ],
            pdfUrl: null
        },
        // NUEVOS PROYECTOS
        'menu-digital': {
            title: 'Menú Digital',
            category: 'Editorial',
            type: 'Universidad',
            tools: [
                { name: 'InDesign', text: 'Id' },
                { name: 'Illustrator', text: 'Ai' }
            ],
            challenge: 'Crear un menú digital interactivo para restaurante que sea atractivo y funcional.',
            solution: 'Diseñé un menú digital usando InDesign con hipervínculos interactivos, combinando ilustraciones en Illustrator para crear una experiencia visual cohesiva.',
            images: [
                'img/editorial/menu-digital.jpg'
            ],
            pdfUrl: null
        },
        'revista-digital': {
            title: 'Revista Digital',
            category: 'Editorial',
            type: 'Universidad',
            tools: [
                { name: 'Canva', icon: 'palette' }
            ],
            challenge: 'Desarrollar una revista digital con navegación interactiva mediante hipervínculos.',
            solution: 'Utilicé Canva para crear una revista digital completamente funcional con sistema de hipervínculos que permite navegación fluida entre secciones.',
            images: [
                'img/editorial/revista-digital.jpg'
            ],
            pdfUrl: null
        },
        'portada-libro': {
            title: 'Portada de Libro',
            category: 'Editorial',
            type: 'Personal',
            tools: [
                { name: 'Krita', text: 'Kr' },
                { name: 'Affinity', text: 'Af' }
            ],
            challenge: 'Diseñar una portada de libro que capture la esencia de la narrativa y atraiga al lector.',
            solution: 'Combiné ilustración digital en Krita con composición y tipografía en Affinity para crear una portada visualmente impactante.',
            images: [
                'img/editorial/portada-libro.jpg'
            ],
            pdfUrl: null
        },
        'poster-1': {
            title: 'Poster Creativo 1',
            category: 'Poster',
            type: 'Personal',
            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Crear un poster con un enfoque experimental que explore conceptos visuales innovadores.',
            solution: 'Desarrollé un poster usando técnicas mixtas entre Illustrator y Photoshop, combinando elementos vectoriales con texturas fotográficas.',
            images: [
                'img/posters/poster-1.jpg'
            ],
            pdfUrl: null
        },
        'poster-2': {
            title: 'Poster Creativo 2',
            category: 'Poster',
            type: 'Personal',
            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Diseñar un poster conceptual que comunique una idea abstracta de forma visual.',
            solution: 'Creé una composición visual única utilizando geometría en Illustrator y efectos atmosféricos en Photoshop.',
            images: [
                'img/posters/poster-2.jpg'
            ],
            pdfUrl: null
        },
        'poster-3': {
            title: 'Poster Creativo 3',
            category: 'Poster',
            type: 'Personal',
            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Desarrollar un poster artístico que explore la relación entre forma y color.',
            solution: 'Experimenté con paletas de color vibrantes y formas orgánicas, combinando ilustración vectorial con acabados digitales.',
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
            challenge: 'Crear una ilustración digital original que demuestre dominio técnico y visión artística.',
            solution: 'Desarrollé una ilustración completa usando Krita para el proceso de pintura digital, con retoques finales en Photoshop.',
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
            challenge: 'Crear un proyecto de documentación visual que registre y presente información de manera efectiva.',
            solution: 'Produje un proyecto audiovisual completo usando After Effects para animación y edición, con gráficos diseñados en Photoshop.',
            images: [
                'img/audiovisual/doc-audiovisual.jpg'
            ],
            pdfUrl: null
        },
        'poster-historias': {
            title: 'Poster Digital + Historias Instagram',
            category: 'Poster + Social Media',
            type: 'Universidad',
            tools: [
                { name: 'Illustrator', text: 'Ai' },
                { name: 'Photoshop', text: 'Ps' }
            ],
            challenge: 'Desarrollar una campaña visual coherente para poster digital e historias de Instagram.',
            solution: 'Creé un sistema visual unificado adaptado para múltiples formatos, manteniendo consistencia en la identidad visual de la campaña.',
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
            challenge: 'Desarrollar una identidad visual completa para una marca, incluyendo logo, paleta de colores y aplicaciones.',
            solution: 'Creé un sistema de identidad visual cohesivo en Illustrator, desarrollando manual de marca con todas las aplicaciones y lineamientos de uso.',
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
                
                <div class="project-info-section">
                    <h4><i class="bi bi-lightning-charge-fill"></i> Desafío</h4>
                    <p>${project.challenge}</p>
                </div>
                
                <div class="project-info-section">
                    <h4><i class="bi bi-check-circle-fill"></i> Solución</h4>
                    <p>${project.solution}</p>
                </div>
                
                ${imagesHTML ? `
                    <div class="project-gallery">
                        ${imagesHTML}
                    </div>
                ` : ''}
                
                ${pdfHTML}
            </div>
        `;
        
        // Agregar click en imágenes para ampliar
        modalContent.querySelectorAll('.project-gallery img').forEach(img => {
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
`;
document.head.appendChild(style);