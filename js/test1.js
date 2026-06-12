window.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    var lenis = new Lenis({ lerp: 0.07 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // ── [1번 히어로 섹션 애니메이션 - 화이트 바탕] ──
    var pinWrap = document.querySelector('.hero-pin-wrap');
    var imgWrap = document.querySelector('.hero-img-wrap');
    var dim     = document.querySelector('.hero-dim');
    var t1el    = document.querySelector('.t1');
    var t2el    = document.querySelector('.t2');

    if (pinWrap) {
        var sp1 = new SplitType(t1el, { types: 'chars' });
        var sp2 = new SplitType(t2el, { types: 'chars' });
        gsap.set(sp1.chars, { opacity: 0, y: 50 });
        gsap.set(sp2.chars, { opacity: 0, y: 50 });

        var tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: pinWrap,
                start: 'top top',
                end: '+=3000',
                scrub: 1,
                pin: true
            }
        });
        tl1.to(imgWrap, { left: 0, top: 0, width: '100%', height: '100%', borderRadius: 0, ease: 'power1.inOut', duration: 2.0 }, 0)
           .to(dim, { opacity: 0.5, duration: 1.5 }, 0.2)
           .set(t1el, { opacity: 1 }, 2.0)
           .to(sp1.chars, { opacity: 1, y: 0, ease: 'power3.out', stagger: 0.08, duration: 1.5 }, 2.2)
           .to({}, { duration: 2.0 })
           .to(sp1.chars, { opacity: 0, y: -50, ease: 'power3.in', stagger: 0.04, duration: 1.0 })
           .set(t1el, { opacity: 0 })
           .set(t2el, { opacity: 1 })
           .to(sp2.chars, { opacity: 1, y: 0, ease: 'power3.out', stagger: 0.08, duration: 1.8 })
           .to({}, { duration: 2.5 });
    }

    // ── [🔥 2번 브랜드 하이라이트 섹션 애니메이션 - 독독 블랙 모드] ──
    var hlSec = document.querySelector('.s-hl');
    var hlBrand = document.querySelector('.hl-brand');

    if (hlSec && hlBrand) {
        // 타이틀 글자들을 쪼개주어 GSAP가 인식할 수 있게 만듭니다.
        var spBrand = new SplitType(hlBrand, { types: 'chars' });
        
        // 블랙 바탕에서 안 켜졌을 때의 어두운 회색 세팅
        gsap.set(spBrand.chars, { color: '#1f232b' });

        var tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: hlSec,
                start: 'top top', 
                end: '+=2500',
                scrub: 1,
                pin: true,
                pinSpacing: true
            }
        });
        
        // 쪼개진 글자들이 블랙 배경 위에서 선명한 흰색(#ffffff)으로 한 글자씩 채워집니다!
        tl2.to(spBrand.chars, { 
            color: '#ffffff', 
            stagger: 0.1, 
            ease: 'none', 
            duration: 2.0 
        }, 0);
        
        // 하단 서브 카피 문구 점등
        var hlWords = document.querySelectorAll('.hl-sub .word');
        hlWords.forEach(function(w, i) {
            var isAccent = w.classList.contains('accent');
            // 강조 단어는 원래 쓰시던 테일(#44a9d1) 컬러로, 일반 글자는 흰색으로 점등
            tl2.to(w, { 
                color: isAccent ? '#44a9d1' : 'rgba(255, 255, 255, 0.85)', 
                ease: 'none', 
                duration: 0.5 
            }, 1.8 + (i * 0.15));
        });
        tl2.to({}, { duration: 1.5 });
    }

    // ── [3번 CEO 인사말 섹션 애니메이션 - 화이트 바탕] ──
    var ceoSec = document.querySelector('.s-ceo');
    var ceoTitle = document.querySelector('.ceo-title');
    var ceoQuote = document.querySelector('.cn-ceo-quote');
    var ceoBody = document.querySelector('.cn-ceo-body');
    var ceoSig = document.querySelector('.cn-ceo-sig');
    var imgBoxes = document.querySelectorAll('.s-ceo .img-box');

    if (ceoSec && ceoTitle) {
        var tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: ceoSec,
                start: 'top top', 
                end: '+=2500',
                scrub: 1,
                pin: true,
                pinSpacing: true
            }
        });
        tl3.to(ceoTitle, { backgroundPosition: '0% 0', ease: 'none', duration: 2.0 })
           .to([ceoQuote, ceoBody, ceoSig], { opacity: 1, y: 0, stagger: 0.2, duration: 1.0 }, '-=0.5')
           .to(imgBoxes, { opacity: 1, y: 0, stagger: 0.3, duration: 1.2 }, '-=0.8')
           .to({}, { duration: 1.0 });
    }

    window.addEventListener('resize', function() {
        ScrollTrigger.refresh();
    });
});