document.addEventListener('DOMContentLoaded', function () {

    // ========== دکمه‌های شناور پیمایش ==========
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

    // ========== تنظیمات تلگرام و واتساپ ==========
    const TELEGRAM_BOT_TOKEN = '8810828685:AAGkevUapCVHQrn50KPozWhq5QXLFupNC-s';   // توکن ربات خودت را اینجا بگذار
    const TELEGRAM_CHAT_ID   = '8810828685';
    const WHATSAPP_NUMBER    = '989127442394';

    // ========== فرم مشاوره ==========
    const form = document.getElementById('consultationForm');
    const formStatus = document.getElementById('formStatus');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');

    if (!form) return;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // ضد اسپم
        const honeypot = document.getElementById('honeypot');
        if (honeypot && honeypot.value) return;

        const name    = document.getElementById('name').value.trim();
        let phone     = document.getElementById('phone').value.trim().replace(/\s|-/g, '');
        const city    = document.getElementById('city').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        // تبدیل اعداد فارسی به انگلیسی
        phone = phone.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));

        // ========== اعتبارسنجی ==========
        if (name.length < 3) {
            showStatus('لطفاً نام و نام خانوادگی را به درستی وارد کنید.', 'error');
            return;
        }

        // اعتبارسنجی شماره موبایل ایرانی
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showStatus('شماره موبایل باید ۱۱ رقم و با ۰۹ شروع شود (مثال: ۰۹۱۲۳۴۵۶۷۸۹).', 'error');
            return;
        }

        if (city.length < 2) {
            showStatus('لطفاً نام شهر را وارد کنید.', 'error');
            return;
        }

        if (!subject) {
            showStatus('لطفاً موضوع مشاوره را انتخاب کنید.', 'error');
            return;
        }

        if (message.length < 10) {
            showStatus('لطفاً توضیحات بیشتری درباره موضوع بنویسید.', 'error');
            return;
        }

        // حالت بارگذاری
        setLoading(true);
        showStatus('در حال ارسال درخواست...', 'loading');

        // ساخت متن پیام
        const fullMessage =
`🔹 درخواست مشاوره جدید

👤 نام: ${name}
📱 موبایل: ${phone}
🏙 شهر: ${city}
📌 موضوع: ${subject}

📝 توضیحات:
${message}

⏰ زمان: ${new Date().toLocaleString('fa-IR')}`;

        try {
            // ۱. ارسال به تلگرام
            const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

            const telegramResponse = await fetch(telegramUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: fullMessage
                })
            });

            const telegramResult = await telegramResponse.json();

            if (!telegramResult.ok) {
                throw new Error('خطا در ارسال به تلگرام');
            }

            // ۲. باز کردن واتساپ با متن آماده
            const whatsappText = encodeURIComponent(fullMessage);
            const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`;
            window.open(whatsappUrl, '_blank');

            // موفقیت
            showStatus('درخواست شما با موفقیت ثبت شد. به زودی با شما تماس گرفته می‌شود.', 'success');
            form.reset();

        } catch (error) {
            console.error(error);
            showStatus('خطا در ارسال. لطفاً دوباره تلاش کنید یا مستقیماً تماس بگیرید.', 'error');
        } finally {
            setLoading(false);
        }
    });

    // توابع کمکی
    function showStatus(text, type) {
        if (!formStatus) return;
        formStatus.textContent = text;

        if (type === 'success') {
            formStatus.style.color = '#16a34a';
        } else if (type === 'error') {
            formStatus.style.color = '#dc2626';
        } else {
            formStatus.style.color = '#0f172a';
        }
    }

    function setLoading(isLoading) {
        if (!submitBtn || !btnText) return;
        submitBtn.disabled = isLoading;
        btnText.textContent = isLoading ? 'در حال ارسال...' : 'ارسال درخواست مشاوره';
    }
});
