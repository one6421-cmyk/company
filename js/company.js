(function () {

  // 스크롤 페이드인
  const fades = document.querySelectorAll('.ab2-fade');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('show'), i * 100);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  fades.forEach(el => io.observe(el));

  // 매출 그래프 애니메이션
  const bars = document.querySelectorAll('.ab2-bar-inner');
  const vals = document.querySelectorAll('.ab2-bar-val');
  const chartEl = document.getElementById('ab2-chart-bars');
  let done = false;

  if (chartEl) {
    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !done) {
          done = true;
          bars.forEach((bar, i) => {
            setTimeout(() => {
              bar.style.height = bar.dataset.height + '%';
              if (vals[i]) vals[i].classList.add('show');
            }, i * 180);
          });
        }
      });
    }, { threshold: 0.25 }).observe(chartEl);
  }

  // 숫자 카운팅 애니메이션
  const statNums = document.querySelectorAll('.ab2-count');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 1200;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { start = target; clearInterval(timer); }
          el.textContent = Math.floor(start).toLocaleString() + suffix;
        }, 16);
        countIO.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => countIO.observe(el));

  // ── 컨설팅 프로세스: 원+선 함께 순차 등장 ──
  const procWrap = document.querySelector('.ab2-biz-process');
  if (procWrap) {
    const items   = Array.from(procWrap.querySelectorAll('.ab2-proc-item'));
    const line    = procWrap.querySelector('.proc-line');
    const total   = items.length;        // 4
    const STEP    = 750;                 // 각 단계 간격(ms)
    // 선의 전체 범위는 14%~86% (72%), 각 구간: 72/3 = 24%
    const lineSteps = [0, 24, 48, 72];  // 각 원 등장 시 선 너비(%)

    procWrap.classList.add('proc-started'); // 배경 트랙 표시

    new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          items.forEach((item, i) => {
            setTimeout(() => {
              item.classList.add('proc-lit');
              if (line) line.style.width = lineSteps[i] + '%';
            }, i * STEP);
          });
        }
      });
    }, { threshold: 0.3 }).observe(procWrap);
  }

})();