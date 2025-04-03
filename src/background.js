/* ============ SETUP ============ */
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const crm = 0.6;

function resizeCanvas() {
    const cw = window.innerWidth * crm;
    const ch = window.innerHeight * crm;
    canvas.width = cw;
    canvas.height = ch;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
}

resizeCanvas();
window.addEventListener("resize", () => {
    resizeCanvas();
    render();
});

/* ============ ANIMATION ============ */
let nt = 0;

function getPrimaryColor() {
    const rootStyles = getComputedStyle(document.documentElement);
    return rootStyles.getPropertyValue('--color-primary').trim();
}

function drawWave(n) {
    nt += 0.002;
    const primaryColor = getPrimaryColor();
    ctx.filter = "blur(25px) brightness(0.4)";

    for (let i = 0; i < n; i++) {
        ctx.beginPath();
        ctx.globalCompositeOperation = "lighter";
        ctx.lineWidth = 30;
        ctx.strokeStyle = primaryColor;
        for (let x = -30; x < canvas.width + 60; x += 30) {
            let y = noise.simplex3(x / 80, i * 0.2, nt) * 150;
            ctx.lineTo(x, y + canvas.height / 2);
        }
        ctx.stroke();
        ctx.closePath();
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWave(7);
    requestAnimationFrame(render);
}

render();