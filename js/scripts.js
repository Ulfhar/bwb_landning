
function expandImage(element) {
    const expandedBG = document.createElement('div');
    expandedBG.className = 'expanded-bg';
    expandedBG.onclick = closeImage;

    const expandedImg = document.createElement('img');
    expandedImg.src = element.src;
    expandedImg.className = 'expanded-image';

    const closeIcon = document.createElement('img');
    closeIcon.src = 'images/x.png';
    closeIcon.className = 'close-icon';
    closeIcon.onclick = closeImage;

    expandedBG.appendChild(expandedImg);
    expandedBG.appendChild(closeIcon);
    document.body.appendChild(expandedBG);

    expandedBG.style.display = 'block';
}

function closeImage() {
    const expandedBG = document.querySelector('.expanded-bg');
    if (expandedBG) {
        document.body.removeChild(expandedBG);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    menuIcon.addEventListener('click', function() {
        toggleDropdown();
    });

    document.addEventListener('click', function(event) {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = 'none';
        }
    });

    function toggleDropdown() {
        if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === '') {
            dropdownMenu.style.display = 'block';
        } else {
            dropdownMenu.style.display = 'none';
        }
    }
});
