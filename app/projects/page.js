'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Projects.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '../../components/ParticlesBackground';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  const headerRef = useRef(null);
  const projectsRef = useRef([]);
  const particlesRef = useRef(null);
  const navRef = useRef(null);
  const loadingSvgRef = useRef(null);
  const loadingTextRef = useRef(null);
  const loadingContainerRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/proyects');
        if (!response.ok) {
          throw new Error('Error al cargar los proyectos');
        }
        const data = await response.json();
        setProjects(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (!loading) {
      gsap.registerPlugin(ScrollTrigger);

      if (particlesRef.current) {
        gsap.fromTo(particlesRef.current,
          { opacity: 0.2 },
          {
            opacity: 1, duration: 1,
            scrollTrigger: {
              trigger: particlesRef.current,
              start: "top top", end: "bottom bottom", scrub: 1
            }
          }
        );
      }

      if (headerRef.current) {
        gsap.fromTo(headerRef.current,
          { opacity: 0, y: -30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }

      if (navRef.current) {
        gsap.fromTo(navRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      }

      projectsRef.current.forEach((project) => {
        if (project) {
          gsap.fromTo(project,
            { opacity: 0, y: 60 },
            {
              opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
              scrollTrigger: {
                trigger: project,
                start: 'top bottom-=80',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const tl = gsap.timeline();
      tl.fromTo(loadingSvgRef.current, {
        opacity: 0, drawSVG: "0%"
      }, {
        opacity: 0.7, drawSVG: "100%", duration: 2, stroke: "#4ecdc4", repeat: -1
      });
      return () => tl.kill();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && loadingContainerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoadingComplete(true);
          loadingContainerRef.current.style.display = 'none';
        }
      });

      tl.to(loadingSvgRef.current, { drawSVG: "100%", duration: 0.7 })
        .to(loadingTextRef.current, { opacity: 1, y: 0, duration: 0.5 })
        .to(loadingContainerRef.current, { opacity: 0, duration: 0.8, delay: 0.5 });
    }
  }, [loading]);

  const addToRefs = (el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({ ...prev, [projectId]: true }));
  };

  if (loading || !loadingComplete) {
    return (
      <main className={styles.projectsContainer}>
        <div ref={loadingContainerRef} className={styles.loadingContainer}>
          <div>
            <Image ref={loadingSvgRef} src="/images/misc/loading.svg" alt="Loading" width={150} height={150} className={styles.loadingSvg} />
          </div>
          <p ref={loadingTextRef} className={styles.loadingText}>Completo</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.projectsContainer}>
        <div className={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>Intentar nuevamente</button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.projectsContainer}>
      <div ref={particlesRef} className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>

      <nav ref={navRef} className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>Federico Rodriguez Franco</Link>
        <div className={styles.navLinks}>
          <Link href="/projects" className={styles.navLink}>Proyectos</Link>
          <Link href="/contact" className={styles.navLink}>Contacto</Link>
        </div>
        <button className={styles.navHamburger} onClick={toggleMenu}>
          <Image src="/images/misc/menu.svg" alt="Menu" width={20} height={20} className={styles.menuIcon} />
        </button>
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
          <Link href="/projects" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
          <Link href="/contact" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>

      <header ref={headerRef} className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <span className={styles.headerLabel}>Portafolio</span>
          <h1 className={styles.title}>Proyectos</h1>
          <p className={styles.headerDescription}>
            Una seleccion de proyectos en los que he trabajado, desde plataformas de IA hasta juegos multijugador.
          </p>
          <div className={styles.headerLine}></div>
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.projectsList}>
          {projects.map((project, index) => (
            <article
              key={project.id}
              className={`${styles.projectRow} ${index % 2 !== 0 ? styles.reverse : ''}`}
              ref={addToRefs}
            >
              <div className={styles.projectImageSide}>
                <div className={`${styles.imageWrapper} ${project.mobileScreenshot ? styles.mobileImage : ''}`}>
                  <Image
                    src={imageErrors[project.id] ? "/images/misc/notfound.png" : project.image}
                    alt={project.title}
                    fill
                    style={{ objectFit: project.mobileScreenshot ? 'contain' : 'cover' }}
                    priority={index < 2}
                    onError={() => handleImageError(project.id)}
                  />
                  <div className={styles.imageOverlay}></div>
                </div>
                <span className={styles.projectNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              <div className={styles.projectInfo}>
                <div className={styles.projectInfoInner}>
                  <div className={styles.techStack}>
                    {project.tech.map((tech, i) => (
                      <span key={i} className={styles.techTag}>{tech}</span>
                    ))}
                  </div>

                  <h2 className={styles.projectTitle}>{project.title}</h2>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.projectLinks}>
                    {project.github && (
                      <Link href={project.github} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                        Codigo
                      </Link>
                    )}
                    {project.demo && (
                      <Link href={project.demo} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Demo
                      </Link>
                    )}
                    {project.landing && (
                      <Link href={project.landing} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Landing
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
