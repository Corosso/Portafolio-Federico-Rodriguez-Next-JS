'use client';

import Link from 'next/link';
import styles from '../styles/Logo.module.css';

export default function Logo({ href, children }) {
  return (
    <div ref={logoRef} className={styles.menuContainer} style={{ left: '2rem', right: 'auto' }}>
      <button className={styles.menuButton}>
        FR
      </button>
    </div>
  );
}
