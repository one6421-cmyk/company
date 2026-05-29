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
});


// 탭 클릭 → 섹션 스크롤 + 탭 활성화
function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = document.querySelector('.tab-nav').offsetHeight + 16;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

// 스크롤 시 탭 자동 활성화
const sections = ['cc-single', 'cct-pro', 'acrobat', 'substance'];
const tabBtns = document.querySelectorAll('.tab-btn');
const navH = () => document.querySelector('.tab-nav').offsetHeight + 32;

window.addEventListener('scroll', () => {
  let current = sections[0];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= navH()) current = id;
  });
  tabBtns.forEach((btn, i) => {
    btn.classList.toggle('active', sections[i] === current);
  });
}, { passive: true });


