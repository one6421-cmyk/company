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