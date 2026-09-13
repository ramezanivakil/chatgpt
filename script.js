document.addEventListener('DOMContentLoaded', function () {

    // عناصر مودال
    const phoneModal = document.getElementById('phoneModal');
    const headerCallBtn = document.getElementById('headerCallBtn');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const copyPhoneBtn = document.getElementById('copyPhoneBtn');
    const modalPhoneNumber = document.getElementById('modalPhoneNumber');
    const copyToast = document.getElementById('copyToast');

    // باز کردن مودال با کلیک روی دکمه تماس هدر
    if (headerCallBtn) {
        headerCallBtn.addEventListener('click', function () {
            phoneModal.classList.add('active');
        });
    }

    // بستن مودال
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', function () {
            phoneModal.classList.remove('active');
        });
    }

    // بستن مودال با کلیک روی پس‌زمینه
    if (phoneModal) {
        phoneModal.addEventListener('click', function (e) {
            if (e.target === phoneModal) {
                phoneModal.classList.remove('active');
            }
        });
    }

    // کپی کردن شماره تلفن
    if (copyPhoneBtn && modalPhoneNumber) {
        copyPhoneBtn.addEventListener('click', function () {
            const phone = modalPhoneNumber.textContent.trim();
            navigator.clipboard.writeText(phone).then(function () {
                copyToast.classList.add('show');
                setTimeout(function () {
                    copyToast.classList.remove('show');
                }, 2000);
            }).catch(function () {
                // روش جایگزین برای مرورگرهای قدیمی
                const tempInput = document.createElement('input');
                tempInput.value = phone;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand('copy');
                document.body.removeChild(tempInput);
                copyToast.classList.add('show');
                setTimeout(function () {
                    copyToast.classList.remove('show');
                }, 2000);
            });
        });
    }

    // بستن مودال با کلید Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && phoneModal.classList.contains('active')) {
            phoneModal.classList.remove('active');
        }
    });

});
