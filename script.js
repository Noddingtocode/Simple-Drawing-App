const canvas = document.getElementById('drawing-canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.getElementById('clear-btn');
const saveBtn = document.getElementById('save-btn');
const colorPicker = document.getElementById('color-picker');
const brushSize = document.getElementById('brush-size');
const brushType = document.getElementById('brush-type');

let drawing = false;
let brushColor = colorPicker.value;
let brushWidth = brushSize.value;
let brushStyle = brushType.value;

// Set canvas size to full screen
canvas.width = window.innerWidth * 0.8; // 80% of the window width
canvas.height = window.innerHeight * 0.8; // 80% of the window height

// Update canvas size on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * 1;
    canvas.height = window.innerHeight * 1;
});

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw on the canvas
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.lineWidth = brushWidth;
        ctx.strokeStyle = brushColor;

        if (brushStyle === 'round') {
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
        } else if (brushStyle === 'square') {
            ctx.lineCap = 'square';
            ctx.lineJoin = 'square';
        } else if (brushStyle === 'dashed') {
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'miter';
            ctx.setLineDash([5, 15]); // Set dashed line pattern
        }

        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }
});

// Stop drawing
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

// Clear the canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the drawing
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'drawing.png';
    link.click();
});

// Update brush color
colorPicker.addEventListener('input', (e) => {
    brushColor = e.target.value;
});

// Update brush size
brushSize.addEventListener('input', (e) => {
    brushWidth = e.target.value;
});

// Update brush type
brushType.addEventListener('change', (e) => {
    brushStyle = e.target.value;
});
