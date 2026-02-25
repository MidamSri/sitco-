/* ========================================
   SITCO — Form Submission (Web3Forms)
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('quoteForm');
    if (!form) return;

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const btnArrow = submitBtn.querySelector('.btn-arrow');
    const formSuccess = document.getElementById('formSuccess');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const name = form.querySelector('#name').value.trim();
        const email = form.querySelector('#email').value.trim();
        const phone = form.querySelector('#phone').value.trim();
        const productEl = form.querySelector('#product');
        const product = productEl ? productEl.value : null;

        if (!name || !email || !phone || (productEl && !product)) {
            shakeButton(submitBtn);
            return;
        }

        // Email format check
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            shakeButton(submitBtn);
            return;
        }

        // Show loading state
        btnText.style.display = 'none';
        btnArrow.style.display = 'none';
        btnLoading.style.display = 'inline-flex';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                // Show success
                form.style.display = 'none';
                formSuccess.style.display = 'block';
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            // Reset button
            btnText.style.display = 'inline';
            btnArrow.style.display = 'inline';
            btnLoading.style.display = 'none';
            submitBtn.disabled = false;

            // Show error feedback
            submitBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
            btnText.textContent = 'Error — Try Again';
            setTimeout(() => {
                submitBtn.style.background = '';
                btnText.textContent = 'Submit Enquiry';
            }, 3000);
        }
    });

    function shakeButton(btn) {
        btn.style.animation = 'shake 0.4s ease';
        btn.addEventListener('animationend', () => {
            btn.style.animation = '';
        }, { once: true });
    }

    // Add shake animation dynamically
    const style = document.createElement('style');
    style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
    document.head.appendChild(style);
});
