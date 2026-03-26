'use client';

import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/Contact.module.css';
import Link from 'next/link';
import Image from 'next/image';
import ParticlesBackground from '../../components/ParticlesBackground';
import gsap from 'gsap';

export default function Contact() {
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    message: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ show: false, error: false, message: '' });
  const navRef = useRef(null);
  const particlesRef = useRef(null);
  const titleRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
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
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ show: false, error: false, message: '' });

    try {
      const response = await fetch('/api/mails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ show: true, error: false, message: 'Mensaje enviado con exito. Te respondere pronto.' });
        setFormData({ email: '', subject: '', message: '' });
      } else {
        throw new Error(data.error || 'Error al enviar el mensaje');
      }
    } catch (error) {
      setStatus({ show: true, error: true, message: 'Error al enviar el mensaje. Por favor, intenta nuevamente.' });
    } finally {
      setLoading(false);
    }
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
        <button className={styles.navHamburger} onClick={toggleMenu}>
          <Image src="/images/misc/menu.svg" alt="Menu" width={20} height={20} className={styles.menuIcon} />
        </button>
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.show : ''}`}>
          <Link href="/projects" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Proyectos</Link>
          <Link href="/contact" className={styles.mobileMenuItem} onClick={() => setIsMenuOpen(false)}>Contacto</Link>
        </div>
      </nav>

      <section className={styles.contactSection}>
        <div className={styles.contactHeader}>
          <span className={styles.headerLabel}>Contacto</span>
          <h2 ref={titleRef} className={styles.title}>Hablemos</h2>
          <div className={styles.headerLine}></div>
        </div>

        <div className={styles.contactGrid}>
          <div ref={contactInfoRef} className={styles.contactInfo}>
            <p className={styles.contactText}>
              Tienes alguna pregunta o propuesta? No dudes en contactarme.
            </p>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Email</span>
                <span className={styles.contactItemValue}>fredolds180@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Telefono</span>
                <span className={styles.contactItemValue}>+57 3012699637</span>
              </div>
              <div className={styles.contactItem}>
                <span className={styles.contactItemLabel}>Ubicacion</span>
                <span className={styles.contactItemValue}>Medellin, Colombia</span>
              </div>
            </div>
          </div>

          <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">Tu correo electronico</label>
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
                placeholder="Escribe tu mensaje aqui..."
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
        </div>
      </section>
    </main>
  );
}
