const modals = {
    music: document.getElementById('music-modal'),
    letter: document.getElementById('letter-modal'),
    image: document.getElementById('image-modal'),
    gift: document.getElementById('gift-modal')
};

const buttons = {
    music: document.getElementById('btn-music'),
    letter: document.getElementById('btn-letter'),
    image: document.getElementById('btn-image'),
    gift: document.getElementById('btn-gift')
};

const openModal = (modal) => modal.style.display = 'block';
const closeModal = (modal) => modal.style.display = 'none';

Object.keys(buttons).forEach(key => {
    buttons[key].addEventListener('click', () => openModal(modals[key]));
});

document.querySelectorAll('.close').forEach(btn => {
    btn.addEventListener('click', () => {
        Object.values(modals).forEach(modal => closeModal(modal));
        stopMusic(); 
    });
});

window.onclick = (event) => {
    Object.values(modals).forEach(modal => {
        if (event.target === modal) closeModal(modal);
    });
};

const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.querySelector('.play-pause');
const stopBtn = document.querySelector('.stop');

function stopMusic() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}
const diskImage = document.getElementById('disk-image');

playPauseBtn.onclick = function() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        this.innerHTML = '<i class="fas fa-pause"></i>';
        diskImage.classList.add('playing'); 
    } else {
        audioPlayer.pause();
        this.innerHTML = '<i class="fas fa-play"></i>';
        diskImage.classList.remove('playing'); 
    }
};

stopBtn.onclick = function() {
    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    diskImage.classList.remove('playing'); 
};

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '<i class="fas fa-heart"></i>';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 15 + 10 + "px";
    heart.style.animationDuration = Math.random() * 3 + 3 + "s";
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 300);

const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.gallery-slide img');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let currentIdx = 0;

function updateSlide() {
    const step = slides[0].clientWidth + 20; 
    slider.style.transform = `translateX(${-step * currentIdx}px)`;

    slides.forEach((img, index) => {
        img.classList.toggle('active', index === currentIdx);
    });
}

nextBtn.onclick = () => {
    currentIdx = (currentIdx + 1) % slides.length;
    updateSlide();
};

prevBtn.onclick = () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    updateSlide();
};

let autoSlide = setInterval(() => nextBtn.onclick(), 4000);

[nextBtn, prevBtn].forEach(btn => {
    btn.addEventListener('mouseenter', () => clearInterval(autoSlide));
    btn.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => nextBtn.onclick(), 4000);
    });
});

updateSlide();
slides.forEach(img => {
    img.addEventListener('click', function() {
        const fullScreen = document.createElement('div');
        fullScreen.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.92); display: flex; align-items: center;
            justify-content: center; z-index: 3000; cursor: zoom-out;
            backdrop-filter: blur(5px);
        `;
        
        const bigImg = document.createElement('img');
        bigImg.src = this.src;
        bigImg.style.cssText = "max-width: 90%; max-height: 85%; border-radius: 15px; box-shadow: 0 0 50px #ff80ab; border: 2px solid #ff80ab;";
        
        fullScreen.appendChild(bigImg);
        document.body.appendChild(fullScreen);
        fullScreen.onclick = () => fullScreen.remove();
    });
});
const message = `
Thật ra mình không giỏi nói những lời hoa mỹ, nhưng hôm nay mình vẫn muốn viết vài dòng cho bạn. Từ khi quen và nói chuyện với bạn, mình mới nhận ra có những người chỉ cần xuất hiện thôi cũng khiến mọi thứ xung quanh trở nên dễ chịu hơn. Với mình, bạn là người như vậy.
Bạn có một nụ cười rất đặc biệt, kiểu khiến người khác cảm thấy ấm áp và muốn nhìn thấy nó thêm nhiều lần nữa. Mỗi lần nói chuyện với bạn, mình đều thấy ngày hôm đó vui hơn một chút.
Nhân ngày 8/3, mình chúc bạn luôn xinh đẹp, luôn vui vẻ và luôn gặp thật nhiều điều tốt đẹp trong cuộc sống. Và nếu được, mình hy vọng sau này mình vẫn có thể ở đâu đó gần bạn — để tiếp tục nghe bạn kể chuyện, cùng bạn cười, và quan tâm bạn nhiều hơn một chút.
Chúc cô gái đặc biệt này có một ngày 8/3 thật ngọt ngào 🌷
`;

let i = 0;
let typingTimer = null; 

const btnLetter = document.getElementById('btn-letter');
const letterModal = document.getElementById('letter-modal');
const typingDisplay = document.getElementById('typing-text');

if (btnLetter) {
    btnLetter.onclick = function() {

        if (letterModal) letterModal.style.display = 'block';

        if (typingDisplay) {
            typingDisplay.innerHTML = "";
            i = 0;

            clearTimeout(typingTimer);
            
            startTyping();
        }
    };
}

function startTyping() {
    if (i < message.length) {
        typingDisplay.innerHTML += message.charAt(i);
        i++;
        const modalBody = document.querySelector('.letter-paper');
        if (modalBody) modalBody.scrollTop = modalBody.scrollHeight;
        
        typingTimer = setTimeout(startTyping, 40); 
    }
}
const giftBtn = document.getElementById('open-gift-btn');
const giftArea = document.getElementById('gift-area');
const giftContainer = document.getElementById('gift-box-container');
const giftTitle = document.getElementById('gift-title');

if (giftBtn) {
    giftBtn.onclick = function() {
        giftContainer.classList.add('shaking');
        setTimeout(() => {
            giftContainer.classList.remove('shaking');
            giftArea.innerHTML = '<div class="boom-animation">BOOM! 💥</div>';
            if(giftTitle) giftTitle.style.display = 'none';
            setTimeout(() => {
                giftArea.innerHTML = `
                    <div style="text-align:center; padding: 50px 0;">
                        <p style="color: #555; font-style: italic;">(Lỗi 404: Món quà đã bị nổ tan xác 🤡)</p>
                        <p style="font-size: 20px; color: #555;"> Đùa tí thôi, chúc bạn 8/3 vui vẻ nhé!</p>
                    </div>
                `;
            }, 600);
        }, 500);
    };
}