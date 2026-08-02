 (function() {
    // ----- image data (with category) -----
    const images = [
      { id: 1, src: 'https://picsum.photos/id/1015/600/600', category: 'nature', title: 'Mountain lake' },
      { id: 2, src: 'https://picsum.photos/id/1018/600/600', category: 'nature', title: 'Urban night' },
      { id: 3, src: 'https://picsum.photos/id/1039/600/600', category: 'nature', title: 'Portrait study' },
      { id: 4, src: 'https://picsum.photos/id/29/600/600', category: 'nature', title: 'Contemplation' },
      { id: 5, src: 'https://picsum.photos/id/27/600/600', category: 'nature', title: 'Color bloom' },
      { id: 6, src: 'https://picsum.photos/id/1020/600/600', category: 'nature', title: 'Forest path' },
      { id: 7, src: 'https://picsum.photos/id/1024/600/600', category: 'nature', title: 'Skyscraper' },
      { id: 8, src: 'https://picsum.photos/id/110/600/600', category: 'nature', title: 'Geometric' },
      { id: 9, src: 'https://picsum.photos/id/1044/600/600', category: 'nature', title: 'Silhouette' },
      { id: 10, src: 'https://picsum.photos/id/1049/600/600', category: 'nature', title: 'Sunset dunes' },
      { id: 11, src: 'https://picsum.photos/id/1055/600/600', category: 'nature', title: 'Bridge lights' },
      { id: 12, src: 'https://picsum.photos/id/1057/600/600', category: 'nature', title: 'Fluid motion' },

       { id: 13, src: 'https://picsum.photos/id/1015/600/600', category: 'city', title: 'Mountain lake' },
      { id: 14, src: 'https://picsum.photos/id/1018/600/600', category: 'city', title: 'Urban night' },
      { id: 15, src: 'https://picsum.photos/id/103/600/600', category: 'city', title: 'Portrait study' },
      { id: 16, src: 'https://picsum.photos/id/104/600/600', category: 'city', title: 'Contemplation' },
      { id: 17, src: 'https://picsum.photos/id/106/600/600', category: 'city', title: 'Color bloom' },
      { id: 6, src: 'https://picsum.photos/id/107/600/600', category: 'city', title: 'Forest path' },
      { id: 7, src: 'https://picsum.photos/id/108/600/600', category: 'city', title: 'Skyscraper' },
      { id: 8, src: 'https://picsum.photos/id/110/600/600', category: 'city', title: 'Geometric' },
      { id: 9, src: 'https://picsum.photos/id/111/600/600', category: 'city', title: 'Silhouette' },
      { id: 10, src: 'https://picsum.photos/id/112/600/600', category: 'city', title: 'Sunset dunes' },
      { id: 11, src: 'https://picsum.photos/id/113/600/600', category: 'city', title: 'Bridge lights' },
      { id: 12, src: 'https://picsum.photos/id/114/600/600', category: 'city', title: 'Fluid motion' },

       { id: 1, src: 'https://picsum.photos/id/1015/600/600', category: 'portrait', title: 'Mountain lake' },
      { id: 2, src: 'https://picsum.photos/id/1018/600/600', category: 'portrait', title: 'Urban night' },
      { id: 3, src: 'https://picsum.photos/id/103/600/600', category: 'portrait', title: 'Portrait study' },
      { id: 4, src: 'https://picsum.photos/id/104/600/600', category: 'portrait', title: 'Contemplation' },
      { id: 5, src: 'https://picsum.photos/id/106/600/600', category: 'portrait', title: 'Color bloom' },
      { id: 6, src: 'https://picsum.photos/id/107/600/600', category: 'portrait', title: 'Forest path' },
      { id: 7, src: 'https://picsum.photos/id/108/600/600', category: 'portrait', title: 'Skyscraper' },
      { id: 8, src: 'https://picsum.photos/id/110/600/600', category: 'portrait', title: 'Silhouette' },
      { id: 10, src: 'https://picsum.photos/id/112/600/600', category: 'portrait', title: 'Sunset dunes' },
      { id: 11, src: 'https://picsum.photos/id/113/600/600', category: 'portrait', title: 'Bridge lights' },
      { id: 12, src: 'https://picsum.photos/id/114/600/600', category: 'portrait', title: 'Fluid motion' },

       { id: 1, src: 'https://picsum.photos/id/74/600/600', category: 'tech', title: 'circut board' },
      { id: 2, src: 'https://picsum.photos/id/1018/600/600', category: 'tech', title: 'Urban night' },
      { id: 3, src: 'https://picsum.photos/id/103/600/600', category: 'tech', title: 'Portrait study' },
      { id: 4, src: 'https://picsum.photos/id/104/600/600', category: 'tech', title: 'Contemplation' },
      { id: 5, src: 'https://picsum.photos/id/106/600/600', category: 'tech', title: 'Color bloom' },
      { id: 6, src: 'https://picsum.photos/id/107/600/600', category: 'tech', title: 'Forest path' },
      { id: 7, src: 'https://picsum.photos/id/108/600/600', category: 'tech', title: 'Skyscraper' },
      { id: 8, src: 'https://picsum.photos/id/110/600/600', category: 'tech', title: 'Silhouette' },
      { id: 10, src: 'https://picsum.photos/id/112/600/600', category: 'tech', title: 'Sunset dunes' },
      { id: 11, src: 'https://picsum.photos/id/113/600/600', category: 'tech', title: 'Bridge lights' },
      { id: 12, src: 'https://picsum.photos/id/114/600/600', category: 'tech', title: 'Fluid motion' },

    ]; 
    // DOM refs
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevBtn = document.getElementById('prevImage');
    const nextBtn = document.getElementById('nextImage');
    const filterBtns = document.querySelectorAll('.filter-btn');

    let currentFilter = 'all';
    let currentItems = [...images];        // filtered array
    let currentIndex = 0;                 // index inside currentItems

    // ----- render gallery based on filter -----
    function renderGallery(filter = 'all') {
      const filtered = filter === 'all' 
        ? images 
        : images.filter(img => img.category === filter);
      
      currentItems = filtered;
      currentFilter = filter;

      if (filtered.length === 0) {
        galleryGrid.innerHTML = `<div class="empty-message"><i class="fas fa-image" style="opacity:0.4; display:block; font-size:2.8rem; margin-bottom:0.8rem;"></i>No images in this category</div>`;
        return;
      }

      let html = '';
      filtered.forEach((img, idx) => {
        html += `
          <div class="gallery-item" data-id="${img.id}" data-index="${idx}" data-category="${img.category}">
            <img src="${img.src}" alt="${img.title}" loading="lazy" />
            <div class="overlay"><i class="fas fa-tag" style="margin-right:6px;"></i>${img.category} · ${img.title}</div>
          </div>
        `;
      });
      galleryGrid.innerHTML = html;

      // attach click listeners to each item (open lightbox)
      document.querySelectorAll('.gallery-item').forEach((item) => {
        item.addEventListener('click', function(e) {
          const index = parseInt(this.dataset.index, 10);
          openLightbox(index);
        });
      });
    }

    // ----- lightbox controls -----
    function openLightbox(index) {
      if (currentItems.length === 0) return;
      // clamp index
      if (index < 0) index = 0;
      if (index >= currentItems.length) index = currentItems.length - 1;
      currentIndex = index;
      const imgData = currentItems[currentIndex];
      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.title || 'gallery image';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightboxFn() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigateLightbox(direction) {
      if (currentItems.length === 0) return;
      let newIndex = currentIndex + direction;
      if (newIndex < 0) newIndex = currentItems.length - 1;
      if (newIndex >= currentItems.length) newIndex = 0;
      currentIndex = newIndex;
      const imgData = currentItems[currentIndex];
      lightboxImg.src = imgData.src;
      lightboxImg.alt = imgData.title || 'gallery image';
    }

    // ----- event listeners -----
    closeLightbox.addEventListener('click', closeLightboxFn);
    lightbox.addEventListener('click', function(e) {
      if (e.target === this) closeLightboxFn();
    });

    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(-1);
    });
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateLightbox(1);
    });

    // keyboard support
    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightboxFn();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // ----- filter buttons -----
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        renderGallery(filter);
      });
    });

    // ----- initial render (all) -----
    renderGallery('all');

    // ----- (bonus) image filters via hover (CSS + extra filter effect) 
    // we add a subtle filter on hover using CSS, but we can also toggle a class via JS 
    // for extra effect: we add a 'filter-effect' data attribute but we do it via CSS.
    // Already included: .gallery-item:hover img { transform: scale(1.06); }
    // we also add a small sepia/grayscale bonus for variety:
    // Add random filter class to images for demonstration (optional)
    // but we keep it simple — the hover transforms are enough.
    // Additional: add a 'data-filter-effect' and style? we skip to keep clean.

    // Expose to window for debugging (not needed)
    console.log('✨ Gallery ready — filter, lightbox, smooth transitions.');
  })();