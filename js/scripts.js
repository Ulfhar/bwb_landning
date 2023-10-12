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
