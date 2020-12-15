const canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

refresh() 

function refresh() {
    var w = screen.width;
    var h = screen.height;

    canvas.height = h;
    canvas.width = w;
    
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, w, h);
    
    
    for (let i = 0; i < 100; i++) {
        var nRays = [3, 5, 7, 9];
        var rays = nRays[Math.floor(Math.random() * nRays.length)];
        var len = Math.floor(Math.random() * 20) + 20;
        
        ctx.lineWidth = len / 15;
        ctx.globalAlpha = Math.random() * 0.4;
        ctx.strokeStyle = '#ADD8E6';
        
        createStar(w, h, len, rays);
    } 
}

function createStar(w, h, rad, n) {
    var m = createPoint(w, h);
    var magicNumber = Math.random() * 0.45 + 0.1;
    for (let i = 0; i < n; i++) {
        var alpha = 2 * Math.PI / n * i;
        var pO = {
            x: m.x + (Math.cos(alpha) * rad),
            y: m.y + (Math.sin(alpha) * rad)
        }
        var pM = {
            x: m.x + (Math.cos(alpha) * rad * magicNumber),
            y: m.y + (Math.sin(alpha) * rad * magicNumber)
        }
        
        var v = {
            x: pO.x - m.x,
            y: pO.y - m.y
        }
        
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(pO.x, pO.y);
        ctx.stroke();
        
        var iterations = 5;
        createBranch(pM, v, iterations, magicNumber);
        
    }
    
    function createBranch(point, vector, iterations, k) {
        var it = iterations - 1;
        var vn = {
            x: vector.y,
            y: -vector.x
        }
        
        var vn2 = {
            x: -vector.y,
            y: vector.x
        }
        
        var p1 = {
            x: point.x + k * (vn.x + vector.x),
            y: point.y + k * (vn.y + vector.y) 
        }
        
        var p2 = {
            x: point.x + k * (vn2.x + vector.x),
            y: point.y + k * (vn2.y + vector.y)   
        }
        
        if (it > 0) {
            k *= 0.9;
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            
            var vNew = {
                x: p1.x - point.x,
                y: p1.y - point.y
            }
            
            createBranch(p1, vNew, it, k);
            
            var vNew = {
                x: p2.x - point.x,
                y: p2.y - point.y
            }
            
            createBranch(p2, vNew, it, k);
        }   
    }  
}

function createPoint(w, h) {
    var p = {
        x: Math.floor(Math.random() * w),
        y: Math.floor(Math.random() * h)
    }
    return p;
}

function getColor() {
    var cols = ['#80cbad', '#96cbb6', '#7ecbac', '#61cba1', '#9ecbb9', '#b5cbc2'];
    return cols[Math.floor(Math.random() * cols.length)];
}

function getDist(p1, p2) {
    return Math.floor(Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2)));
}

function getInt(min, max) {
    return Math.floor(Math.random() * (max + 1) + min);
}