document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let isOpen = false; // ������ ��������� �����

    if (!menuIcon || !dropdownMenu) {
        console.error("Menu icon or dropdown menu not found");
        return;
    }

    // �������� ��� ��������/�������� ���� �� ���� �� ������
    menuIcon.addEventListener('click', function (e) {
        e.preventDefault();
        isOpen = !isOpen; // ���������� ����
        if (isOpen) {
            dropdownMenu.classList.add('show');
            console.log("Menu opened.");
        } else {
            dropdownMenu.classList.remove('show');
            console.log("Menu closed.");
        }
    });

    // ��������� ���� ��� ���� ���� ���
    document.addEventListener('click', function (event) {
        if (isOpen && !menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            isOpen = false; // ��������� ����
            console.log("Clicked outside. Dropdown menu closed.");
        }
    });
});
