// Общие функции для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    // Установка текущего года в подвале
    const currentYearElements = document.querySelectorAll('#current-year');
    const currentYear = new Date().getFullYear();
    currentYearElements.forEach(element => {
        element.textContent = currentYear;
    });
    
    // Установка текущего месяца и года на странице расписания
    const currentMonthYearElement = document.getElementById('current-month-year');
    if (currentMonthYearElement) {
        const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        const now = new Date();
        const currentMonth = months[now.getMonth()];
        currentMonthYearElement.textContent = `${currentMonth} ${now.getFullYear()}`;
    }
    
    // Установка минимальной даты для формы (текущая дата + 1 день)
    const dateInput = document.getElementById('preferred-date');
    if (dateInput) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowFormatted = tomorrow.toISOString().split('T')[0];
        dateInput.min = tomorrowFormatted;
        dateInput.value = tomorrowFormatted;
    }
    
    // Мобильное меню
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
            mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Закрытие мобильного меню при клике на ссылку
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });
    
    // Табы на странице расписания
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Убираем активный класс у всех кнопок и контента
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Добавляем активный класс текущей кнопке и соответствующему контенту
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Переключение деталей инструкторов
    const toggleDetailBtns = document.querySelectorAll('.toggle-details');
    
    toggleDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const instructorCard = this.closest('.instructor-card');
            const details = instructorCard.querySelector('.instructor-details');
            
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Скрыть';
            } else {
                this.textContent = 'Подробнее';
            }
        });
    });
    
    // Обработка формы записи на пробный урок
    const trialForm = document.getElementById('trial-lesson-form');
    const formSuccess = document.getElementById('form-success');
    
    if (trialForm) {
        trialForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Простая валидация формы
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const lessonType = document.getElementById('lesson-type').value;
            const preferredDate = document.getElementById('preferred-date').value;
            const preferredTime = document.getElementById('preferred-time').value;
            const consent = document.getElementById('consent').checked;
            
            if (!name || !phone || !email || !lessonType || !preferredDate || !preferredTime || !consent) {
                alert('Пожалуйста, заполните все обязательные поля (отмеченные *)');
                return;
            }
            
            // В реальном приложении здесь был бы код отправки данных на сервер
            // Для демонстрации просто показываем сообщение об успехе
            
            // Скрываем форму, показываем сообщение об успехе
            trialForm.style.display = 'none';
            formSuccess.classList.remove('hidden');
            
            // Прокручиваем к сообщению об успехе
            formSuccess.scrollIntoView({ behavior: 'smooth' });
            
            // В реальном приложении здесь бы отправлялись данные на сервер
            console.log('Данные формы:', {
                name,
                phone,
                email,
                lessonType,
                yogaStyle: document.getElementById('yoga-style').value,
                preferredDate,
                preferredTime,
                experience: document.getElementById('experience').value,
                healthNotes: document.getElementById('health-notes').value,
                comments: document.getElementById('comments').value
            });
        });
    }
    
    // Добавляем иконку закрытия для мобильного меню
    if (mobileMenuBtn) {
        const menuIcon = mobileMenuBtn.querySelector('i');
        if (!menuIcon.classList.contains('fa-times')) {
            menuIcon.classList.add('fa-bars');
        }
    }
});