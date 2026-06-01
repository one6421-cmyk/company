// FAQ 토글
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  document.querySelectorAll('.faq-a').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-q').forEach(q => q.classList.remove('open'));
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

// 스크롤 페이드인
document.addEventListener('DOMContentLoaded', function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.feature-card, .usecase-card, .plan-card, .security-card, .app-card, .spec-card, .reason-card'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    observer.observe(el);
  });

  // 부드러운 스크롤 (data-scroll 속성)
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── 탭 스크롤 + 자동 활성화 (각 페이지 섹션 ID를 자동 감지) ──
  const tabBtns = document.querySelectorAll('.tab-btn[onclick]');
  if (tabBtns.length === 0) return;

  // onclick="scrollToSection('xxx')" 에서 ID 추출 (contact 제외)
  const sections = Array.from(tabBtns)
    .map(btn => {
      const match = btn.getAttribute('onclick').match(/scrollToSection\(['"](.+?)['"]\)/);
      return match ? match[1] : null;
    })
    .filter(id => id && id !== 'contact');

  const getNavH = () => {
    const nav = document.querySelector('.tab-nav');
    return nav ? nav.offsetHeight + 32 : 80;
  };

  window.addEventListener('scroll', () => {
    let current = sections[0];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= getNavH()) current = id;
    });
    tabBtns.forEach((btn, i) => {
      btn.classList.toggle('active', sections[i] === current);
    });
  }, { passive: true });
});

// 탭 클릭 → 섹션 스크롤 (window.scrollTo 충돌 방지를 위해 scrollToSection으로 통일)
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const nav = document.querySelector('.tab-nav');
  const offset = (nav ? nav.offsetHeight : 0) + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
