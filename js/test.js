(function () {

    // ── vh 변수 설정 ──
    function setVh() {
        document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
    }
    setVh();
    window.addEventListener('resize', setVh);

    // GSAP + ScrollTrigger 등록
    gsap.registerPlugin(ScrollTrigger);

    // ══ 1번 섹션 ══
    const heroSec   = document.querySelector('.cn-hero-sec');
    const visualImg = document.querySelector('.cn-visual-img');
    const visualDim = document.querySelector('.cn-visual-dim');
    const r1 = document.querySelector('.cn-reveal-1');
    const r2 = document.querySelector('.cn-reveal-2');

    if (heroSec && visualImg) {

        // SplitType: 글로벌 클래스는 SplitType (대문자)
        let words1 = [], words2 = [];

        if (r1) {
            const s1 = new SplitType(r1, { types: 'words' });
            words1 = s1.words;
            gsap.set(words1, { opacity: 0 });
        }
        if (r2) {
            const s2 = new SplitType(r2, { types: 'words' });
            words2 = s2.words;
            gsap.set(words2, { opacity: 0 });
        }

        const scrollDist = window.innerHeight * 5;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: heroSec,
                start: 'top top',
                end: `+=${scrollDist}`,
                scrub: 1.2,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
            }
        });

        // 배경 카드 → 풀스크린
        tl.to(visualImg, {
            left: 0,
            top: '50%',
            width: '100%',
            height: '100%',
            borderRadius: 0,
            ease: 'power2.inOut',
            duration: 2
        }, 0)
        .to(visualDim, { opacity: 1, duration: 1.5 }, 0.5);

        // 텍스트 1 등장
        if (words1.length) {
            tl.to(words1, {
                opacity: 1,
                ease: 'none',
                stagger: 0.3,
                duration: 0.1
            }, 2);
        }

        // 텍스트 2 등장
        if (words2.length) {
            tl.to(words2, {
                opacity: 1,
                ease: 'none',
                stagger: 0.2,
                duration: 0.1
            }, 3.5);
        }

        // 여백
        tl.to({}, { duration: 1.5 });
    }

    // ══ 2번 섹션: 하이라이트 단어 점등 ══
    const hlSec   = document.querySelector('.cn-highlight-sec');
    const hlWords = document.querySelectorAll('.cn-highlight-sec .cn-word');

    if (hlSec && hlWords.length) {
        ScrollTrigger.create({
            trigger: hlSec,
            start: 'top top',
            end: `+=${window.innerHeight * 3}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
        });

        hlWords.forEach((word, i) => {
            const isAccent = word.classList.contains('cn-word-accent');
            gsap.fromTo(word,
                { color: 'rgba(255,255,255,0.12)' },
                {
                    color: isAccent ? '#44a9d1' : 'rgba(255,255,255,0.88)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: hlSec,
                        start: `top+=${(i / hlWords.length) * window.innerHeight * 2} top`,
                        end:   `top+=${((i + 1.2) / hlWords.length) * window.innerHeight * 2} top`,
                        scrub: true,
                    }
                }
            );
        });
    }

    // ══ 사업분야 탭 전환 ══
    const tabs   = document.querySelectorAll('.cn-biz-tab');
    const panels = document.querySelectorAll('.cn-biz-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const idx = +tab.dataset.idx;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            if (panels[idx]) panels[idx].classList.add('active');
        });
    });

    // ══ 일반 스크롤 reveal ══
    document.querySelectorAll('.cn-reveal-elem').forEach(el => {
        ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            onEnter: () => el.classList.add('visible')
        });
    });

})();