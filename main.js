// di sini akan buat fungsi2 

function main(){
    var canvas = document.getElementById("myCanvas");
    var gl  = canvas.getContext("webgl");

    var vertexShaderSource = `
    void main(){

    }
    `;

    var fragmentShaderSource = `
    void main(){

    }
    `;

    // membuat .c di gpu
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // kompilasi .c agar menjadi .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // menyiapkan wadah untuk .exe nya (shader program)
    var shaderProgram = gl.createProgram();

    // masukkan .0 ke dalam wadah .exe
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // campur antar .o agar menjadi runnable context
    // cat siap pakai atau di dalam .exe tadi
    gl.linkProgram(shaderProgram);

    // Mulai menggunakan context / cat 
    gl.useProgram(shaderProgram);

    // milih warna dasar 
    gl.clearColor(0, 0, 0, 1);

    // eksekusi pewarnaan :
    gl.clear(gl.COLOR_BUFFER_BIT);
}