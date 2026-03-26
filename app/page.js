"use client";

import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ParticlesBackground from '../components/ParticlesBackground';
import TechStack from '../components/TechStack';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const introRef = useRef(null);
  const buttonRef = useRef(null);
  const buttonRef2 = useRef(null);
  const particlesRef = useRef(null);
  const navRef = useRef(null);
  const scrollIconRef = useRef(null);
  const textRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animacion del intro
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
          start: "10% 15%",
          end: "40% center",
          scrub: true,
          toggleActions: "play none none reverse",
        }
      }
    );

    // Animacion del boton "Ver proyectos"
    gsap.fromTo(buttonRef.current,
      { scale: 0, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
      {
        scale: 1, opacity: 1, clipPath: "circle(100% at 50% 50%)",
        duration: 1, ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section3",
          start: "40% 15%",
          end: "75% 50%",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animacion del boton "Contactame"
    gsap.fromTo(buttonRef2.current,
      { scale: 0, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
      {
        scale: 1, opacity: 1, clipPath: "circle(100% at 50% 50%)",
        duration: 1, ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section3",
          start: "40% 15%",
          end: "75% 50%",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animacion de las particulas
    gsap.fromTo(particlesRef.current,
      { opacity: 0 },
      {
        opacity: 1, duration: 1,
        scrollTrigger: {
          trigger: ".section1",
          start: "top 10%",
          end: "bottom bottom",
          scrub: 1
        }
      }
    );

    // Animacion del navbar
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: "power2.out",
        scrollTrigger: {
          trigger: ".section2",
          start: "top 15%",
          end: "50% center",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animacion del icono de scroll
    gsap.to(scrollIconRef.current, {
      scale: 1.1, duration: 1, repeat: -1, yoyo: true, ease: "power1.inOut"
    });

    gsap.to(scrollIconRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: "container",
        start: "80% 70%",
        end: "90% 90%",
        toggleActions: "play none none reverse"
      },
    });

    // Animacion del texto
    gsap.fromTo(textRef.current,
      { scale: 0, opacity: 0, clipPath: "circle(0% at 50% 50%)" },
      {
        scale: 1, opacity: 1, clipPath: "circle(100% at 50% 50%)",
        duration: 1.5, ease: "power2.outIn",
        scrollTrigger: {
          trigger: ".section2",
          start: "top 15%",
          end: "50% center",
          scrub: true,
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(textRef.current,
      { scale: 1, opacity: 1, clipPath: "circle(100% at 50% 50%)" },
      {
        scale: 0, opacity: 0, clipPath: "circle(0% at 50% 50%)",
        duration: 1, ease: "power2.outIn",
        scrollTrigger: {
          trigger: "section3",
          start: "60% center",
          end: "80% center",
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

      <nav ref={navRef} className={styles.navbar}>
        <Link href="/" className={styles.navLogo}>Federico Rodriguez Franco</Link>
        <div className={styles.navLinks}>
          <Link href="/projects" className={styles.navLink}>Proyectos</Link>
          <Link href="/contact" className={styles.navLink}>Contacto</Link>
        </div>
        <button
          className={`${styles.navHamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
        >
          <Image src="/images/misc/menu.svg" alt="Menu" width={20} height={20} className={styles.menuIcon} />
        </button>
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
          <Link href="/projects" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
          <Link href="/contact" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>

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

      <section className={styles.hero}>
        <p ref={introRef} className={styles.intro}>
          Soy desarrollador de software y actualmente estudiante de Ingeniería de Sistemas. Tengo 24 años y soy una persona sumamente curiosa y apasionada por esta profesión. Disfruto del aprendizaje, la resolución de problemas y trabajar en equipo. Me gusta crear todo tipo de soluciones y así aprender nuevas tecnologías constantemente.
        </p>
      </section>

      <section className={styles.section2}>
        <div ref={textRef} className={styles.animatedText}>
          <p>
            A lo largo de mi carrera he trabajado con múltiples tecnologías, frameworks y lenguajes de programación. He acumulado experiencia sólida a través de proyectos universitarios, personales y laborales que me han permitido desarrollar un criterio técnico amplio y la capacidad de adaptarme rápidamente a nuevos entornos.
          </p>
        </div>
        <TechStack />
      </section>

      <section className={styles.section3}>
        <h2>Estas interesado en mi trabajo?</h2>
        <div className={styles.buttonContainer}>
          <Link href="/projects">
            <div ref={buttonRef} className={styles.animatedButton}>
              <span>Ver proyectos</span>
            </div>
          </Link>
          <Link href="/contact">
            <div ref={buttonRef2} className={styles.animatedButton}>
              <span>Contactame</span>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
