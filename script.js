/* ==========================================================================
   Southern Summit Outdoor — Interactive Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Custom Cursor
  const cursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('customCursorDot');

  if (cursor && cursorDot) {
    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      cursorDot.style.left = `${e.clientX}px`;
      cursorDot.style.top = `${e.clientY}px`;
    });

    const hoverElements = document.querySelectorAll('a, button, .spatial-hotspot, .chip-option, .gallery-card');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('active'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });
  }

  // 2. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Spatial Vision Lens Slider Logic
  const lensContainer = document.getElementById('spatialLens');
  const lensRender = document.getElementById('lensRender');
  const lensHandle = document.getElementById('lensHandle');

  if (lensContainer && lensRender && lensHandle) {
    let isDraggingLens = false;

    const updateLensPosition = (clientX) => {
      const rect = lensContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      lensRender.style.width = `${percentage}%`;
      lensHandle.style.left = `${percentage}%`;
    };

    lensHandle.addEventListener('mousedown', () => isDraggingLens = true);
    window.addEventListener('mouseup', () => isDraggingLens = false);
    window.addEventListener('mousemove', (e) => {
      if (isDraggingLens) updateLensPosition(e.clientX);
    });

    // Touch events for mobile
    lensHandle.addEventListener('touchstart', () => isDraggingLens = true);
    window.addEventListener('touchend', () => isDraggingLens = false);
    window.addEventListener('touchmove', (e) => {
      if (isDraggingLens && e.touches[0]) updateLensPosition(e.touches[0].clientX);
    });
  }

  // 4. Before & After Slider Logic
  const baContainer = document.getElementById('baContainer');
  const baAfter = document.getElementById('baAfter');
  const baHandle = document.getElementById('baHandle');

  if (baContainer && baAfter && baHandle) {
    let isDraggingBA = false;

    const updateBAPosition = (clientX) => {
      const rect = baContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      baAfter.style.width = `${percentage}%`;
      baHandle.style.left = `${percentage}%`;
    };

    baHandle.addEventListener('mousedown', () => isDraggingBA = true);
    window.addEventListener('mouseup', () => isDraggingBA = false);
    window.addEventListener('mousemove', (e) => {
      if (isDraggingBA) updateBAPosition(e.clientX);
    });

    baHandle.addEventListener('touchstart', () => isDraggingBA = true);
    window.addEventListener('touchend', () => isDraggingBA = false);
    window.addEventListener('touchmove', (e) => {
      if (isDraggingBA && e.touches[0]) updateBAPosition(e.touches[0].clientX);
    });
  }

  // 5. 3D Master Plan Architect Tool (Estimator)
  const chipOptions = document.querySelectorAll('.chip-option');
  const estDesignFee = document.getElementById('estDesignFee');
  const estBuildRange = document.getElementById('estBuildRange');

  if (chipOptions.length > 0) {
    chipOptions.forEach(chip => {
      chip.addEventListener('click', function() {
        const group = this.dataset.group;
        // Toggle or single select per group
        if (group === 'scope') {
          document.querySelectorAll(`.chip-option[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
          this.classList.add('selected');
        } else {
          this.classList.toggle('selected');
        }
        calculateEstimate();
      });
    });
  }

  function calculateEstimate() {
    let baseDesignFee = 2500;
    let baseBuildMin = 35000;
    let baseBuildMax = 60000;

    const selectedChips = document.querySelectorAll('.chip-option.selected');
    selectedChips.forEach(chip => {
      const feeAdd = parseInt(chip.dataset.feeAdd || 0);
      const buildAddMin = parseInt(chip.dataset.buildMin || 0);
      const buildAddMax = parseInt(chip.dataset.buildMax || 0);

      baseDesignFee += feeAdd;
      baseBuildMin += buildAddMin;
      baseBuildMax += buildAddMax;
    });

    if (estDesignFee) estDesignFee.textContent = `$${baseDesignFee.toLocaleString()}`;
    if (estBuildRange) estBuildRange.textContent = `$${(baseBuildMin/1000).toFixed(0)}k - $${(baseBuildMax/1000).toFixed(0)}k+`;
  }

  // 6. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      galleryCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 7. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(btn => {
    btn.addEventListener('click', function() {
      const item = this.parentElement;
      const isActive = item.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
});
