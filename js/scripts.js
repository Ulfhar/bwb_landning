function expandImage(element) {
    let expandedBG = document.querySelector('.expanded-bg');
    if (!expandedBG) {
        expandedBG = document.createElement('div');
        expandedBG.className = 'expanded-bg';
        expandedBG.onclick = closeImage;
        document.body.appendChild(expandedBG);
    }
    expandedBG.innerHTML = '';

    const expandedImg = document.createElement('img');
    expandedImg.src = element.src;
    expandedImg.className = 'expanded-image';

    const closeIcon = document.createElement('img');
    closeIcon.src = 'images/x.png';
    closeIcon.className = 'close-icon';
    closeIcon.onclick = closeImage;

    expandedBG.appendChild(expandedImg);
    expandedBG.appendChild(closeIcon);
    expandedBG.style.display = 'block';
}

function closeImage() {
    const expandedBG = document.querySelector('.expanded-bg');
    if (expandedBG) {
        document.body.removeChild(expandedBG);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuIcon.addEventListener('click', () => {
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', function (event) {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });
});
