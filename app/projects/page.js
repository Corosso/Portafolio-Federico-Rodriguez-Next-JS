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
  const titleRef = useRef(null);
  const projectsRef = useRef([]);
  const particlesRef = useRef(null);
  const menuRef = useRef(null);
  const logoRef = useRef(null);
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

      // Animación de las partículas
      if (particlesRef.current) {
        gsap.fromTo(particlesRef.current,
          { opacity: 0.2 },
          {
            opacity: 1,
            duration: 1,
            scrollTrigger: {
              trigger: particlesRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1
            }
          }
        );
      }

      // Animación del título
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.5,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top bottom-=100',
              toggleActions: 'play none none reverse'
            }
          }
        );
      }

      // Animación de los proyectos
      projectsRef.current.forEach((project, index) => {
        if (project) {
          gsap.fromTo(project,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              delay: index * 0.2,
              scrollTrigger: {
                trigger: project,
                start: 'top bottom-=100',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

      // Animación para el menú y logo
      if (menuRef.current && logoRef.current) {
        gsap.fromTo([menuRef.current, logoRef.current],
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.outIn",
          }
        );
      }
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      const tl = gsap.timeline();
      
      tl.fromTo(loadingSvgRef.current, {
        opacity: 0,
        drawSVG: "0%"
      }, {
        opacity: 0.7,
        drawSVG: "100%",
        duration: 2,
        stroke: "#4ecdc4",
        repeat: -1
      });

      return () => tl.kill();
    }
  }, [loading]);

  useEffect(() => {
    if (!loading && loadingContainerRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoadingComplete(true);
          // Remove the loading container from DOM after animation
          loadingContainerRef.current.style.display = 'none';
        }
      });

      tl.to(loadingSvgRef.current, {
        drawSVG: "100%",
        duration: 0.7
      })
      .to(loadingTextRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5
      })
      .to(loadingContainerRef.current, {
        opacity: 0,
        duration: 0.8,
        delay: 0.5
      });
    }
  }, [loading]);

  const addToRefs = (el) => {
    if (el && !projectsRef.current.includes(el)) {
      projectsRef.current.push(el);
    }
  };

  const handleImageError = (projectId) => {
    setImageErrors(prev => ({
      ...prev,
      [projectId]: true
    }));
  };

  if (loading || !loadingComplete) {
    return (
      <main className={styles.projectsContainer}>
        <div ref={loadingContainerRef} className={styles.loadingContainer}>
          <div>
            <Image
              ref={loadingSvgRef}
              src="/images/misc/loading.svg"
              alt="Loading"
              width={150}
              height={150}
              className={styles.loadingSvg}
            />
          </div>
          <p ref={loadingTextRef} className={styles.loadingText}>
            Completo
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.projectsContainer}>
        <div className={styles.errorContainer}>
          <p>Error: {error}</p>
          <button onClick={() => window.location.reload()}>
            Intentar nuevamente
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.projectsContainer}>
      <div ref={particlesRef} className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>

      {/* Añadir el logo FR */}
      <div ref={logoRef} className={styles.menuContainer} style={{ left: '2rem', right: 'auto' }}>
        <Link href="/">
          <button className={styles.menuButton}>
            FR
          </button>
        </Link>
      </div>

      {/* Añadir el menú */}
      <div ref={menuRef} className={styles.menuContainer}>
        <button 
          className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}>
          <Image 
            src="/images/misc/menu.svg" 
            alt="Menu" 
            width={24} 
            height={24}
            className={styles.menuIcon}
          />
        </button>
        
        <div className={`${styles.menuContent} ${isMenuOpen ? styles.show : ''}`}>
          <Link href="/contact" className={styles.menuItem}>Contacto</Link>
          <Link href="/projects" className={styles.menuItem}>Proyectos</Link>
        </div>
      </div>

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>
          Mis Proyectos
        </h1>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={styles.projectCard}
              ref={addToRefs}
            >
              <div className={styles.imageContainer}>
                <Image
                  src={imageErrors[project.id] ? "/images/misc/notfound.png" : project.image}
                  alt={project.title}
                  width={500}
                  height={300}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                  priority={true}
                  onError={() => handleImageError(project.id)}
                />
              </div>
              <div className={styles.projectContent}>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <div className={styles.techStack}>
                  {project.tech.map((tech, i) => (
                    <span key={i} className={styles.techTag}>{tech}</span>
                  ))}
                </div>
                <div className={styles.projectLinks}>
                  {project.github && (
                    <Link href={project.github} target="_blank" rel="noopener noreferrer">
                      Ver código
                    </Link>
                  )}
                  {project.demo && (
                    <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                      Ver demo
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
