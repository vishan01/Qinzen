const canvas=document.querySelector('canvas');
const context=canvas.getContext('2d');


//16:9 aspect ratio
canvas.width=1024
canvas.height=576



context.fillStyle='teal';
context.fillRect(0,0,canvas.width,canvas.height);