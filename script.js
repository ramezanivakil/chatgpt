document.addEventListener('DOMContentLoaded', function () {

    // دکمه‌های شناور پیمایش
    const scrollUp = document.getElementById('scrollUp');
    const scrollDown = document.getElementById('scrollDown');

    if (scrollUp) {
        scrollUp.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (scrollDown) {
        scrollDown.addEventListener('click', function () {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
    }

    // فرم مشاوره (نمونه ساده)
    const form = document.getElementById('consultationForm');
    const formStatus = document.getElementById('formStatus');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !phone || !message) {
                if (formStatus) {
                    formStatus.textContent = 'لطفاً تمام فیلدها را پر کنید.';
                    formStatus.style.color = '#dc2626';
                }
                return;
            }

            if (formStatus) {
                formStatus.textContent = 'درخواست شما با موفقیت ثبت شد. به زودی تماس گرفته می‌شود.';
                formStatus.style.color = '#16a34a';
            }

            form.reset();
        });
    }

});
