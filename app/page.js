"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '../components/ParticlesBackground';
import TechStack from '../components/TechStack';
import Image from 'next/image';
import Link from 'next/link'; // Añadir esta importación

export default function Home() {
  const nameRef = useRef(null);
  const introRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const particlesRef = useRef(null);
  const menuRef = useRef(null);
  const scrollIconRef = useRef(null);
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    

    // Animación del nombre
    gsap.from(nameRef.current, {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: "power4.out"
    });
    
    
    gsap.fromTo(nameRef.current, {
      scale: 1,  
    }, {
      scale: 0.5,
      duration: 1,
      ease: "ease.inOut",
      scrollTrigger: {
        trigger: "section1",
        start: "top 15%", // Ajustado
        end: "50% center", // Ajustado
        scrub: true,
        toggleActions: "play none none reverse",
      }
    })


    // Animación del intro
    gsap.fromTo(introRef.current,
      {
        scale: 1,
        opacity: 1,
        clipPath: "circle(100% at 50% 50%)"
      },
      {
        scale: 0,
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)",
        duration: 1,
        ease: "power2.outIn",
        scrollTrigger: {
          trigger: "section1",
          start: "10% 15%", // Ajustado
          end: "40% center", // Ajustado
          scrub: true,
          toggleActions: "play none none reverse",
        }
      }
    );

    // Animación del botón "Ver proyectos"
    gsap.fromTo(buttonRef.current,
      {
        scale: 0,
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)"
      },
      {
        scale: 1,
        opacity: 1,
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section3",
          start: "40% 15%", 
          end: "75% 50%", 
          scrub: true,
          
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Animación del botón "Contactame"
    gsap.fromTo(buttonRef2.current,
      {
        scale: 0,
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)"
      },
      {
        scale: 1,
        opacity: 1,
        clipPath: "circle(100% at 50% 50%)",
        duration: 1,
        ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section3",
          start: "40% 15%", 
          end: "75% 50%", 
          scrub: true,
          
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación de las partículas
    gsap.fromTo(particlesRef.current, {
      opacity: 0,
    },
    {
      opacity: 1,
      duration: 1,
      scrollTrigger: {
        trigger: ".section1",
        start: "top 10%",
        end: "bottom bottom",
        scrub: 1
      }
    });

    // Animación del menú y logo
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
        scrollTrigger: {
          trigger: ".section2",
          start: "top 15%", // Ajustado
          end: "50% center", // Ajustado
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del ícono de scroll (animación continua)
    gsap.to(scrollIconRef.current, {
      scale: 1.1,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    gsap.to(scrollIconRef.current,
      {
        opacity: 0,        
        scrollTrigger: {        
        trigger: "container",
        start: "80% 70%", 
        end: "90% 90%",
        toggleActions: "play none none reverse"
        
      },
      
    });

    // Animación del texto
    gsap.fromTo(textRef.current,
      {
        scale: 0,
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)"
      },
      {
        scale: 1,
        opacity: 1,
        clipPath: "circle(100% at 50% 50%)",
        duration: 1.5,
        ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section2",
          start: "top 15%", // Ajustado
          end: "50% center", // Ajustado
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animación del intro
    gsap.fromTo(textRef.current,
      {
        scale: 1,
        opacity: 1,
        clipPath: "circle(100% at 50% 50%)"
      },
      {
        scale: 0,
        opacity: 0,
        clipPath: "circle(0% at 50% 50%)",
        duration: 1,
        ease: "power2.outIn",
        scrollTrigger: {
          trigger: "section3",
          start: "60% center", // Ajustado
          end: "80% center", // Ajustado
          scrub: true,
          
          toggleActions: "play none none reverse",
        }
      }
    );




  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <main className={styles.container}>  
      <div ref={particlesRef} className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>    
      

      <div ref={logoRef} className={styles.menuContainer} style={{ left: '2rem', right: 'auto' }}>
        <Link href="/">
          <button className={styles.menuButton}>
            FR
          </button>
        </Link>
      </div>
      

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
      

      <div ref={scrollIconRef} className={styles.scrollIcon}>
        <span className={styles.scrollText}>Keep Scrolling</span>
        <Image 
          src="/images/misc/keep-scrolling.svg" 
          alt="Scroll down" 
          width={34} 
          height={14}
          className={styles.scrollIconImage}
        />
      </div>
      <header ref={nameRef} className={styles.header}>
  <h1 className={styles.name}>Federico Rodriguez Franco</h1>
</header>
      

      
      
      <section className={styles.hero}>
        
        
        <p ref={introRef} className={styles.intro}>
          Soy desarrollador de software y actualmente estudiante de Ingeniería de Sistemas. Tengo 23 años y soy una persona
sumamente curiosa y apasionada por esta profesión. Disfruto del aprendizaje, la resolución de problemas y trabajar
en equipo. Me gusta crear todo tipo de soluciones y así aprender nuevas tecnologías constantemente.


        </p>
      </section>
      
      <section className={styles.section2}>
        <div ref={textRef} className={styles.animatedText}>
          <p>
           A lo largo de mi carrera he trabajado con múltiples tecnologías, frameworks y lenguajes de programación.
Aunque aún me considero un desarrollador junior, también considero que tengo una vasta experiencia adquirida durante el
proceso de mi carrera profesional, tanto en proyectos universitarios, personales como laborales.
          </p>
        </div>
        <TechStack />
        
      </section>
      
      <section className={styles.section3}>
        <h2>Estás interesado en mi trabajo?</h2>
        <div className={styles.buttonContainer}>
          <Link href="/projects">
            <div ref={buttonRef} className={styles.animatedButton}>
              <span>Ver proyectos</span>
            </div>
          </Link>
          <Link href="/contact">
            <div ref={buttonRef2} className={styles.animatedButton}>
              <span>Contáctame</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
