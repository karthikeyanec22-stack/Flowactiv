'use client';

export function scrollToContact(e) {
  if (e && e.preventDefault) e.preventDefault();

  const targetEl =
    document.getElementById('contact') ||
    document.getElementById('contact-wrapper') ||
    document.getElementById('footer');

  if (targetEl) {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    const headerOffset = isMobile ? 70 : 0;
    const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: Math.max(0, elementPosition),
      behavior: 'smooth',
    });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  }
}
