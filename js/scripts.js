// utils.js
const Utils = {
  isElement(element) {
    return element instanceof Element || element instanceof HTMLDocument;
  },

  safeRemove(element) {
    if (this.isElement(element) && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  },

  createElement(tag, className, attributes = {}) {
    const element = document.createElement(tag);
    if (className) {
      element.className = className;
    }
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
    
    return element;
  }
};

// imageGallery.js
class ImageGallery {
  constructor() {
    this.galleryImages = document.querySelectorAll('.gallery-image');
    this.expandedBG = null;
  }

  init() {
    this.setupGallery();
  }

  setupGallery() {
    this.galleryImages.forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      img.addEventListener('click', () => this.expandImage(img));
    });
  }

  expandImage(element) {
    try {
      this.expandedBG = Utils.createElement('div', 'expanded-bg');
      
      const expandedImg = Utils.createElement('img', 'expanded-image', {
        src: element.src,
        alt: element.alt || 'Expanded image'
      });
      
      const closeIcon = Utils.createElement('button', 'close-icon', {
        'aria-label': 'Close image'
      });
      
      const closeHandler = () => this.closeImage();
      
      this.expandedBG.addEventListener('click', closeHandler);
      closeIcon.addEventListener('click', closeHandler);
      
      this.expandedBG.append(expandedImg, closeIcon);
      document.body.appendChild(this.expandedBG);
    } catch (error) {
      console.error('Error expanding image:', error);
    }
  }

  closeImage() {
    if (this.expandedBG) {
      Utils.safeRemove(this.expandedBG);
      this.expandedBG = null;
    }
  }
}

// mobileMenu.js
class MobileMenu {
  constructor() {
    this.menuIcon = document.getElementById('menu-icon');
    this.dropdownMenu = document.querySelector('.dropdown-menu');
    this.isOpen = false;
  }

  init() {
    if (!this.menuIcon || !this.dropdownMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    this.bindEvents();
  }

  bindEvents() {
    this.menuIcon.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    document.addEventListener('click', (e) => {
      if (!this.menuIcon.contains(e.target) && !this.dropdownMenu.contains(e.target)) {
        this.closeMenu();
      }
    });

    // Закриваємо меню при натисканні Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.dropdownMenu.classList.toggle('visible');
    this.menuIcon.setAttribute('aria-expanded', this.isOpen);
  }

  closeMenu() {
    this.isOpen = false;
    this.dropdownMenu.classList.remove('visible');
    this.menuIcon.setAttribute('aria-expanded', false);
  }
}

// main.js
document.addEventListener('DOMContentLoaded', () => {
  // Ініціалізація мобільного меню
  const mobileMenu = new MobileMenu();
  mobileMenu.init();

  // Ініціалізація галереї зображень
  const imageGallery = new ImageGallery();
  imageGallery.init();
});

// styles.css (доповнення для нової функціональності)
.dropdown-menu {
  display: none;
  position: absolute;
  top: 100%;
  right: 0;
  background: var(--header-bg);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.dropdown-menu.visible {
  display: block;
}

.expanded-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.expanded-image {
  max-width: 90%;
  max-height: 90vh;
  object-fit: contain;
}

.close-icon {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.close-icon:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Додавання підтримки focus-visible для кращої доступності */
.close-icon:focus-visible,
.gallery-image:focus-visible {
  outline: 2px solid var(--accent-color, #4A90E2);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .gallery-image,
  .close-icon {
    transition: none;
  }
}
