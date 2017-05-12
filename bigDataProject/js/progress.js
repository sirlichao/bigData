
$(document).ready(function() {
   //drawProcess();
   i = 0;
    var t = setInterval("addNum(100,100)",80);
    if(i==100){
        clearInterval(t);
    }

});
function addNum(percent,width) {
    if(i<percent){
        i++;
        $('canvas.process').text(i+"%");
        drawProcess(width);
    }else if(i==80){
        alert("hshshss....")
    }
}

function drawProcess(width) {
    $('canvas.process').each(function() {
        var text = $(this).text();
        var process = text.substring(0, text.length-1);
        var canvas = this;
        var context = canvas.getContext('2d');
        context.clearRect(0, 0, width, width);

        context.beginPath();
        context.moveTo(width/2, width/2);
        context.arc(width/2, width/2, width/2, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = '#ddd';
        context.fill();

        context.beginPath();
        context.moveTo(width/2, width/2);
        context.arc(width/2, width/2, width/2, 0, Math.PI * 2 * process / 100, false);
        context.closePath();
        context.fillStyle = '#2a2';
        context.fill();

        context.beginPath();
        context.moveTo(width/2, width/2);
        context.arc(width/2, width/2, width/2 - 10, 0, Math.PI * 2, true);
        context.closePath();
        context.fillStyle = 'rgba(255,255,255,1)';
        context.fill();

        context.beginPath();
        context.arc(width/2, width/2, width/2 - 20, 0, Math.PI * 2, true);
        context.closePath();
        context.strokeStyle = '#ddd';
        context.stroke();
        context.font = "bold 9pt Arial";
        context.fillStyle = '#2a2';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.moveTo(width/2, width/2);
        context.fillText(text, width/2, width/2);
    });
}