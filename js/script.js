/* ============================================================
   John Aldwin Arguelles — Portfolio
   Vanilla JS: nav, theme, reveal, counters, typing, carousels,
   project modal, AI chatbot, back-to-top, current year.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initNav();
  initMobileMenu();
  initThemeToggle();
  initActiveSection();
  initRevealAnimations();
  initCounters();
  initTypingEffect();
  initExperienceCarousel();
  initExperienceDetail();
  initProjectModal();
  initBackToTop();
  initFooterYear();
  initChatbot();
});

/* ---------- Sticky / blurred nav on scroll ---------- */
function initNav() {
  const nav = document.getElementById('siteNav');
  const apply = () => {
    if (window.scrollY > 24) {
      nav.classList.add('bg-white/80', 'dark:bg-[#0B0B0C]/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-line', 'dark:border-white/10');
    } else {
      nav.classList.remove('bg-white/80', 'dark:bg-[#0B0B0C]/80', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-line', 'dark:border-white/10');
    }
  };
  apply();
  window.addEventListener('scroll', apply, { passive: true });
}

/* ---------- Mobile hamburger menu ---------- */
function initMobileMenu() {
  const btn = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const icon = btn.querySelector('i');

  let open = false;

  const toggle = () => {
    open = !open;
    btn.setAttribute('aria-expanded', String(open));
    if (open) {
      menu.style.maxHeight = menu.scrollHeight + 'px';
      icon.setAttribute('data-lucide', 'x');
    } else {
      menu.style.maxHeight = '0px';
      icon.setAttribute('data-lucide', 'menu');
    }
    if (window.lucide) lucide.createIcons();
  };

  btn.addEventListener('click', toggle);

  menu.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      if (open) toggle();
    });
  });
}

/* ---------- Dark / light mode toggle ---------- */
function initThemeToggle() {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');

  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (stored === 'dark' || (!stored && prefersDark)) {
    root.classList.add('dark');
  }

  btn.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
}

/* ---------- Smooth scroll + active section indicator ---------- */
function initActiveSection() {
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((l) => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ---------- Scroll reveal animations ---------- */
function initRevealAnimations() {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  items.forEach((el) => observer.observe(el));
}

/* ---------- Animated statistics (counters) ---------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  const animate = (el) => {
    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => observer.observe(c));
}

/* ---------- Typing animation for hero name ---------- */
function initTypingEffect() {
  const el = document.getElementById('typedName');
  if (!el) return;
  const full = 'Alds';
  el.textContent = '';

  let i = 0;
  const type = () => {
    if (i <= full.length) {
      el.textContent = full.slice(0, i);
      i++;
      setTimeout(type, 110);
    }
  };
  setTimeout(type, 400);
}

/* ============================================================
   PROFESSIONAL EXPERIENCE — data, carousel, and detail panel
   ============================================================ */
const EXPERIENCES = [
  {
    id: 'Admin Office Support',
    title: 'FiberHome Phils Inc',
    date: 'Febuary 2026',
    image: 'assets/images/experience/Fiberhome.jpg',
    shortDescription: 'Supported daily administrative and operational activities, including equipment tracking, documentation, and coordination with technicians.',
    description: 'Completed a 250-hour On-the-Job Training (OJT) internship at Fiberhome Phils Inc, applying classroom knowledge to real day-to-day office operations.',
    responsibilities: ['Technician tool assistance', 'Vehicle fuel monitoring', 'Spreadsheet data entry', 'Record compilation', 'Administrative support', 'Administrative support', 'Field operation support'],
    skills: ['Data Entry', 'Microsoft Excel', 'Client communication', 'Technical support'],
    learning: 'Gained hands-on experience supporting field technicians, managing records, and using spreadsheets for daily operations.',
  },
  {
    id: 'Operations and Technical Support',
    title: 'FiberHome Phils Inc',
    date: 'March 2026 ',
    image: 'assets/images/experience/fiberhome1.jpg',
    shortDescription: 'Supported daily administrative and operational activities, including equipment tracking,  and coordination with technicians.',
    description: 'Assisted field technicians by preparing required tools, monitoring vehicle fuel usage, and organizing operational records.  ',
    responsibilities: ['Checking Vehicle Status,', 'Monitoting Cleanliness', 'Audit for Hand Tools', 'Assisting Technicians'],
    skills: ['Communication', 'Companionship', 'Marker',],
    learning: 'Gained practical experience in administrative work, data management, and supporting technicians with their daily field operations.',
  },
  {
    id: 'Lgu ',
    title: 'LGU Mataasnakahiy - MSWDO',
    date: 'April - May 2026',
    image: 'assets/images/experience/mataasnakahoy.jpg',
    shortDescription: 'On-the-job training focused on administrative support, client-based, data encoding, document organization, and records management.',
    description: "Completed on-the-job training at the Municipal Social Welfare and Development Office (MSWDO) of the Local Government Unit of Mataasnakahoy, providing administrative and data support through document processing, record encoding, organization, and filing.",
    responsibilities: ['Assisting in the processing and organization of documents related to social welfare programs and services', 'Encoding and updating beneficiary records to maintain accurate and organized records', 'Preparing, sorting, and filing official documents', 'Maintaining confidentiality and data accuracy when handling records','Providing administrative support for day-to-day office tasks'],
    skills: ['Data Encoding', 'Record Management', 'Document Organization', 'Data Accuracy','Technical Documentation'],
    learning: 'Gained practical experience in handling beneficiary records, organizing official documents, maintaining data accuracy and confidentiality, and supporting day-to-day administrative operations in a government office.',
  },
  {
    id: 'Tisda',
    title: 'Computer Systems Servicing NCII',
    date: 'September 2026',
    image: 'assets/images/tesdacert.png',
    shortDescription: 'Hands-on training in computer assembly, installation, configuration and troubleshooting.',
    description: 'Completed Computer Systems Servicing NCII training with hands-on experience in assembling computers. I also worked on system installation and configuration while practicing basic hardware and software troubleshooting.',
    responsibilities: ['Assembling computer systems', 'Installing computer hardware and software', 'Configuring computer systems','Troubleshooting hardware and software problems','Performing basic computer maintenance'],
    skills: ['Computer Assembly', 'Hardware Troubleshooting', 'Software Installation','System Configuration','Computer Maintenance'],
    learning: 'Learned how to assemble and configure computer systems. I also gained experience in finding and fixing basic hardware and software problems.',
  },
  {
    id: 'Tisda1',
    title: 'IT & Network TroubleShooting',
    date: 'September 2026',
    image: 'assets/images/cablingtesda.jpg',
    shortDescription: 'Hands-on practice in computer troubleshooting and basic network setup.',
    description: 'Developed practical IT skills through hands-on training. I worked on computer troubleshooting and basic network setup while learning how to maintain computer systems.',
    responsibilities: ['Troubleshooting computer hardware and software', 'Setting up basic network connections', 'Maintaining network connections', 'Diagnosing common technical problems', ],
    skills: ['IT Support', 'Network Setups', 'Network Troubleshooting ', 'Hardware Troubleshooting', 'System Configuration'],
    learning: 'Learned how to approach common computer and network problems. I gained more confidence in troubleshooting issues and keeping systems working properly.',
  },
];

const PLACEHOLDER_IMAGE = 'assets/images/experience/experience-placeholder.svg';

function initExperienceCarousel() {
  const track = document.getElementById('expTrack');
  if (!track) return;

  const prevBtn = document.getElementById('expPrev');
  const nextBtn = document.getElementById('expNext');
  const dotsWrap = document.getElementById('expDots');
  

  track.innerHTML = EXPERIENCES.map((exp) => `
    <article class="exp-card snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[calc(33.333%-16px)] rounded-3xl border border-line dark:border-white/10 overflow-hidden bg-white dark:bg-white/[0.02]">
      <div class="aspect-[4/3] overflow-hidden bg-paper-soft dark:bg-white/5">
        <img src="${exp.image}" data-fallback="${PLACEHOLDER_IMAGE}" alt="Photo representing ${exp.title}" class="w-full h-full object-cover" loading="lazy" onerror="this.onerror=null;this.src=this.dataset.fallback;" />
      </div>
      <div class="p-6">
        <h3 class="font-display text-lg font-semibold leading-snug">${exp.title}</h3>
        <p class="mt-2 text-sm leading-relaxed text-ink-soft dark:text-white/60">${exp.shortDescription}</p>
        ${exp.date ? `<p class="mt-3 text-xs text-ink-soft dark:text-white/40">${exp.date}</p>` : ''}
        <button type="button" class="exp-view-details mt-4 inline-flex items-center gap-1.5 text-sm font-medium hover:text-brand transition-colors" data-exp="${exp.id}">
          View Details <i data-lucide="arrow-up-right" class="w-4 h-4"></i>
        </button>
      </div>
    </article>
  `).join('');


  if (window.lucide) lucide.createIcons();

  const cards = Array.from(track.children);

  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'exp-dot';
    dot.setAttribute('aria-label', `Go to experience card ${i + 1}`);
    dot.addEventListener('click', () => {
      cards[i].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    });
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  const setActiveDot = () => {
    const trackLeft = track.scrollLeft;
    let closestIndex = 0;
    let closestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.offsetLeft - trackLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    dots.forEach((d, i) => d.classList.toggle('active', i === closestIndex));
  };

  const scrollByCard = (dir) => {
    const cardWidth = cards[0].getBoundingClientRect().width + 24; // gap-6 = 24px
    track.scrollBy({ left: dir * cardWidth, behavior: 'smooth' });
  };

  prevBtn?.addEventListener('click', () => scrollByCard(-1));
  nextBtn?.addEventListener('click', () => scrollByCard(1));

  track.addEventListener('scroll', () => {
    window.requestAnimationFrame(setActiveDot);
  }, { passive: true });

  track.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') scrollByCard(1);
    if (e.key === 'ArrowLeft') scrollByCard(-1);
  });

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.classList.add('cursor-grabbing');
    startX = e.pageX;
    scrollStart = track.scrollLeft;
  });
  window.addEventListener('mouseup', () => {
    isDown = false;
    track.classList.remove('cursor-grabbing');
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    track.scrollLeft = scrollStart - (e.pageX - startX);
  });

  setActiveDot();
  


  // Wire up "View Details" buttons
  track.querySelectorAll('.exp-view-details').forEach((btn) => {
    btn.addEventListener('click', () => openExperienceDetail(btn.getAttribute('data-exp')));
  });
}

/* ---------- Professional Experience detail panel ---------- */
function openExperienceDetail(id) {
  const exp = EXPERIENCES.find((e) => e.id === id);
  if (!exp) return;

  const panel = document.getElementById('expDetailPanel');
  document.getElementById('expDetailDate').textContent = exp.date || '';
  document.getElementById('expDetailDate').style.display = exp.date ? '' : 'none';
  document.getElementById('expDetailTitle').textContent = exp.title;
  document.getElementById('expDetailDescription').textContent = exp.description;

  const respWrap = document.getElementById('expDetailResponsibilitiesWrap');
  const respList = document.getElementById('expDetailResponsibilities');
  if (exp.responsibilities.length) {
    respWrap.style.display = '';
    respList.innerHTML = exp.responsibilities
      .map((r) => `<li class="flex items-start gap-2 text-sm text-ink-soft dark:text-white/60"><i data-lucide="check" class="w-4 h-4 text-brand mt-0.5 shrink-0"></i>${r}</li>`)
      .join('');
  } else {
    respWrap.style.display = 'none';
  }

  const skillsWrap = document.getElementById('expDetailSkillsWrap');
  const skillsEl = document.getElementById('expDetailSkills');
  if (exp.skills.length) {
    skillsWrap.style.display = '';
    skillsEl.innerHTML = exp.skills
      .map((s) => `<span class="text-xs px-3 py-1 rounded-full bg-white dark:bg-white/10 border border-line dark:border-white/10">${s}</span>`)
      .join('');
  } else {
    skillsWrap.style.display = 'none';
  }

  const learningWrap = document.getElementById('expDetailLearningWrap');
  if (exp.learning) {
    learningWrap.style.display = '';
    document.getElementById('expDetailLearning').textContent = exp.learning;
  } else {
    learningWrap.style.display = 'none';
  }

  if (window.lucide) lucide.createIcons();

  panel.classList.add('is-open');
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeExperienceDetail() {
  document.getElementById('expDetailPanel')?.classList.remove('is-open');
}

function initExperienceDetail() {
  const panel = document.getElementById('expDetailPanel');
  if (!panel) return;
  document.getElementById('expDetailClose')?.addEventListener('click', closeExperienceDetail);
}

/* ---------- Back to top button ---------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  const toggle = () => {
    if (window.scrollY > 500) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100');
    }
  };

  window.addEventListener('scroll', toggle, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Auto current year in footer ---------- */
function initFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   PROJECT DETAIL MODAL (image carousel + info)
   ============================================================ */
const PROJECTS_DATA = {
  redspartandata: {
    category: 'Web Platform',
    title: 'SpartanData',
    description: "An automated web-based reporting platform designed to centralize data collection and reduce duplicated Excel-based reports across university offices. It replaces scattered spreadsheets with a single, consistent source of truth for staff.",
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    images: ['assets/images/about.png', 'assets/images/features.png', 'assets/images/loginpage.png'],
    github: 'https://github.com/alds45r/spartandata/',
  },
  safehaven: {
    category: 'Web Platform',
    title: 'Safe Haven',
    description: 'A web-based platform designed to provide accessible reporting tools, emergency resources, educational materials, and support information.',
    tags: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    images: ['assets/images/safehaven1.png', 'assets/images/safehaven2.png', 'assets/images/safehaven3.png', 'assets/images/safehaven5.jpg'],
    github: 'https://github.com/alds45r/safehaven',
  },
};

function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const track = document.getElementById('modalCarouselTrack');
  const dotsWrap = document.getElementById('modalDots');
  const prevBtn = document.getElementById('modalPrev');
  const nextBtn = document.getElementById('modalNext');
  const closeBtn = document.getElementById('modalClose');

  const categoryEl = document.getElementById('modalCategory');
  const titleEl = document.getElementById('modalProjectTitle');
  const descEl = document.getElementById('modalDescription');
  const tagsEl = document.getElementById('modalTags');
  const githubEl = document.getElementById('modalGithub');

  let currentIndex = 0;
  let currentImages = [];
  let lastFocusedEl = null;

  const renderSlides = (images) => {
    track.innerHTML = images
      .map((src) => `<div class="modal-carousel-slide h-full"><img src="${src}" alt="" class="w-full h-full object-cover" loading="lazy" /></div>`)
      .join('');

    dotsWrap.innerHTML = '';
    images.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'modal-dot';
      dot.setAttribute('aria-label', `Go to image ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    });
  };

  const updateSlidePosition = () => {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    Array.from(dotsWrap.children).forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  };

  const goTo = (index) => {
    currentIndex = (index + currentImages.length) % currentImages.length;
    updateSlidePosition();
  };

  const open = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    lastFocusedEl = document.activeElement;

    categoryEl.textContent = data.category;
    titleEl.textContent = data.title;
    descEl.textContent = data.description;
    githubEl.href = data.github;

    tagsEl.innerHTML = data.tags
      .map((tag) => `<span class="text-xs px-3 py-1 rounded-full bg-paper-soft dark:bg-white/10 border border-line dark:border-white/10">${tag}</span>`)
      .join('');

    currentImages = data.images;
    currentIndex = 0;
    renderSlides(currentImages);
    updateSlidePosition();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 200);
    lastFocusedEl?.focus();
  };

  document.querySelectorAll('.view-project-link').forEach((btn) => {
    btn.addEventListener('click', () => open(btn.getAttribute('data-project')));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  // Click outside the panel closes the modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) close();
  });

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });
}

/* ============================================================
   FLOATING AI CHATBOT
   ============================================================ */
function initChatbot() {
  const root = document.getElementById('chatbotRoot');
  if (!root) return;

  const toggleBtn = document.getElementById('chatToggle');
  const iconOpen = document.getElementById('chatToggleIconOpen');
  const iconClose = document.getElementById('chatToggleIconClose');
  const windowEl = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatClose');
  const messagesEl = document.getElementById('chatMessages');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const quickActions = document.getElementById('chatQuickActions');

  const RESPONSES = {
    about: "Alds is an Information Technology graduate at Batangas State University Lipa Campus, Major in Network Technology, with interests in web development, networking, database systems, system administration, IT support and such office work staff.",
    skills: 'Alds has experience with web development, networking, databases, system administration, IT support, HTML, CSS, JavaScript, PHP, MySQL, and other technologies shown in his portfolio, also has experience in other fields such as Telco and LGU Workloads.',
    experience: "Alds professional experience includes a 250-hour OJT at the Municipal Social Welfare and Development Office of the Municipality of Mataasnakahoy and another 250 hours at FiberHome Phils Inc., along with web development projects, networking coursework, and IT support work — you can see the full breakdown in the Professional Experience section.",
    projects: "Alds has worked on projects including SpartanData and Safe Haven. You can explore them in the Projects section.",
    education: "Alds is a Graduate of a Bachelor of Science in Information Technology, majoring in Network Technology, at Batangas State University (2022 — 2026).",
    contact: "You can contact Alds through the email and social links in the Let's Work Together section.",
  };

  const FALLBACK_RESPONSE = "Isa lamang akong tamak na taga bigay ng kaunting kaalaman tungkol kay alds! tanong ko lang po sayo? 'Sabog ka po ba?";

  const KEYWORDS = [
    { topic: 'about', words: ['about', 'who', 'student', 'university', 'network technology'] },
    { topic: 'skills', words: ['skill', 'tech', 'technology', 'stack', 'language', 'tool', 'know'] },
    { topic: 'experience', words: ['experience', 'ojt', 'internship', 'intern', 'job'] },
    { topic: 'projects', words: ['project', 'redspartan', 'safe haven', 'work', 'built', 'portfolio piece'] },
    { topic: 'education', words: ['education', 'school', 'degree', 'course', 'bsit', 'college'] },
    { topic: 'contact', words: ['contact', 'email', 'reach', 'hire', 'linkedin', 'github', 'facebook'] },
  ];

  let hasOpenedOnce = false;
  let isOpen = false;

  const scrollToBottom = () => {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  };

  const addMessage = (text, sender) => {
    const row = document.createElement('div');
    row.className = `chat-row ${sender}`;
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${sender}`;
    bubble.textContent = text;
    row.appendChild(bubble);
    messagesEl.appendChild(row);
    scrollToBottom();
  };

  const showTyping = () => {
    const row = document.createElement('div');
    row.className = 'chat-row bot';
    row.id = 'typingRow';
    row.innerHTML = `<div class="chat-bubble bot flex items-center gap-1"><span class="typing-dots"><span></span><span></span><span></span></span></div>`;
    messagesEl.appendChild(row);
    scrollToBottom();
  };

  const hideTyping = () => {
    document.getElementById('typingRow')?.remove();
  };

  const respondTo = (topic) => {
    showTyping();
    setTimeout(() => {
      hideTyping();
      addMessage(RESPONSES[topic] || FALLBACK_RESPONSE, 'bot');
    }, 700 + Math.random() * 400);
  };

  const detectTopic = (text) => {
    const lower = text.toLowerCase();
    const match = KEYWORDS.find((k) => k.words.some((w) => lower.includes(w)));
    return match ? match.topic : null;
  };

  const handleUserText = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    const topic = detectTopic(trimmed);
    if (topic) {
      respondTo(topic);
    } else {
      showTyping();
      setTimeout(() => {
        hideTyping();
        addMessage(FALLBACK_RESPONSE, 'bot');
      }, 700);
    }
  };

  quickActions.querySelectorAll('.quick-action-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const topic = btn.getAttribute('data-topic');
      const label = btn.textContent.trim();
      addMessage(label, 'user');
      respondTo(topic);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserText(input.value);
    input.value = '';
  });

  const openChat = () => {
    isOpen = true;
    windowEl.hidden = false;
    requestAnimationFrame(() => windowEl.classList.add('is-open'));
    toggleBtn.setAttribute('aria-expanded', 'true');
    toggleBtn.setAttribute('aria-label', "Close Portfolio Assistant chat");
    iconOpen.classList.add('hidden');
    iconClose.classList.remove('hidden');

    if (!hasOpenedOnce) {
      hasOpenedOnce = true;
      addMessage("Hi! I'm John's portfolio assistant. What would you like to know?", 'bot');
    }
    setTimeout(() => input.focus(), 200);
  };

  const closeChat = () => {
    isOpen = false;
    windowEl.classList.remove('is-open');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', "Open Portfolio Assistant chat");
    iconOpen.classList.remove('hidden');
    iconClose.classList.add('hidden');
    setTimeout(() => {
      if (!isOpen) windowEl.hidden = true;
    }, 250);
  };

  toggleBtn.addEventListener('click', () => (isOpen ? closeChat() : openChat()));
  closeBtn.addEventListener('click', closeChat);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeChat();
  });
}
