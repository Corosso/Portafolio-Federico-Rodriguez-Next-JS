import { useEffect, useRef } from 'react';
import styles from '../styles/TechStack.module.css';
import Image from 'next/image';

const technologies = [
  { name: 'Python', icon: '/images/tech/python.svg' },
  { name: 'Linux', icon: '/images/tech/linux.svg' },
  { name: 'CSS', icon: '/images/tech/css.svg' },
  { name: 'Java', icon: '/images/tech/java.svg' },
  { name: 'Pygame', icon: '/images/tech/python.svg' },
  { name: 'C#', icon: '/images/tech/csharp.svg' },
  { name: '.NET', icon: '/images/tech/dotnet.svg' },
  { name: 'JavaScript', icon: '/images/tech/javascript.svg' },
  { name: 'HTML', icon: '/images/tech/html.svg' },
  { name: 'Flask', icon: '/images/tech/flask.svg' },
  { name: 'Django', icon: '/images/tech/django.svg' },
  { name: 'OpenCV', icon: '/images/tech/opencv.svg' },
  { name: 'SQL Server', icon: '/images/tech/sqlserver.svg' },
  { name: 'SQL Developer', icon: '/images/tech/sqldeveloper.svg' },
  { name: 'Azure DevOps', icon: '/images/tech/azuredevops.svg' },
  { name: 'Git', icon: '/images/tech/git.svg' },
  { name: 'Docker', icon: '/images/tech/docker.svg' },
  
  
];

export default function TechStack() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let animationFrame;
    let position = 0;
    const speed = 0.5;

    const animate = () => {
      position -= speed;
      if (position <= -container.scrollWidth / 2) {
        position = 0;
      }
      container.style.transform = `translateX(${position}px)`;
      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div className={styles.techStackContainer}>
      <div ref={containerRef} className={styles.techStack}>
        {technologies.map((tech, index) => (
          <div key={index} className={styles.techItem}>
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className={styles.techIcon}
            />
            <span className={styles.techName}>{tech.name}</span>
          </div>
        ))}
        {/* Duplicamos los elementos para crear un efecto continuo */}
        {technologies.map((tech, index) => (
          <div key={`duplicate-${index}`} className={styles.techItem}>
            <Image
              src={tech.icon}
              alt={tech.name}
              width={40}
              height={40}
              className={styles.techIcon}
            />
            <span className={styles.techName}>{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}