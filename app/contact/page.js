'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Contact.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ParticlesBackground from '../../components/ParticlesBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, error: false, message: '' });
  const menuRef = useRef(null);
  const logoRef = useRef(null);
  const particlesRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

  

    // Animaciones para los elementos
    gsap.fromTo([menuRef.current, logoRef.current],
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.outIn" }
    );

    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    gsap.fromTo(contactInfoRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.2 }
    );

    gsap.fromTo(formRef.current,
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, delay: 0.4 }
    );
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ show: false, error: false, message: '' });

    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          show: true,
          error: false,
          message: '¡Mensaje enviado con éxito! Te responderé pronto.'
        });
        setFormData({ email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus({
        show: true,
        error: true,
        message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <div ref={particlesRef} className={styles.particlesWrapper}>
        <ParticlesBackground />
      </div>

      <div ref={logoRef} className={styles.menuContainer} style={{ left: '2rem', right: 'auto' }}>
        <Link href="/">
          <button className={`${styles.menuButton} ${styles.logoButton}`}>
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

      <section className={styles.contactSection}>
        <h2 ref={titleRef} className={styles.title}>
          Contacto
        </h2>

        <div ref={contactInfoRef} className={styles.contactInfo}>
          <p className={styles.contactText}>
            ¿Tienes alguna pregunta o propuesta? No dudes en contactarme.
          </p>
          <div className={styles.contactDetails}>
            <p>Email: fredolds180@gmail.com</p>
            <p>Tel: +57 3012699637</p>
            <p>Ubicación: Medellín, Colombia</p>
          </div>
        </div>

        <form
          ref={formRef}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="email">Tu correo electrónico</label>
            <input
              className={styles.input}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="ejemplo@correo.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="subject">Asunto</label>
            <input
              className={styles.input}
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              placeholder="Asunto del mensaje"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="message">Mensaje</label>
            <textarea
              className={styles.textarea}
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Escribe tu mensaje aquí..."
              rows="6"
            />
          </div>

          <button
            className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </button>

          {status.show && (
            <div className={`${styles.statusMessage} ${status.error ? styles.error : styles.success}`}>
              {status.message}
            </div>
          )}
        </form>
      </section>
    </main>
  );
}