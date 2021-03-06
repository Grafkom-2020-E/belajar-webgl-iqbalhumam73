// [unya humem]
function main() {
  var canvas = document.getElementById("myCanvas");
  var gl = canvas.getContext("webgl");

  // Definisi data verteks 3 buah titik
  /**
   * Titik A (-0.5, -0.5)
   * Titik B ( 0.5, -0.5)
   * Titik C ( 0.5,  0.5)
   * Titik D (-0.5,  0.5)
   */
  var vertices = [
    -0.5, -0.5, 0.0, 1.0, 0.0,       // Titik A
    0.5, -0.5, 0.0, 0.0, 1.0,       // Titik B
    0.5, 0.5, 0.0, 1.0, 1.0,         // Titik C
    0.5, 0.5, 0.0, 0.0, 0.0,         // Titik C
    -0.5,  0.5, 0.0, 0.0, 1.0,       // TItik D
    -0.5, -0.5, 0.0, 1.0, 1.0       // Titik A
  ];

  var vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  var vertexShaderSource = document.getElementById("vertexShaderSource").text;
  var fragmentShaderSource = document.getElementById("fragmentShaderSource").text;

  // Buat .c di GPU
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  // Kompilasi .c agar menjadi .o
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);
  // Siapkan wadah untuk .exe (shader program)
  var shaderProgram = gl.createProgram();
  // Masukkan .o ke dalam wadah .exe
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  // Sambungkan antar .o agar bisa menjadi
  //    runnable context di dalam wadah .exe tadi
  gl.linkProgram(shaderProgram);
  // Mulai menggunakan konteks (cat)
  gl.useProgram(shaderProgram);

  // Ajarkan attribute a_Position di GPU
  //  tentang pengambilan data verteks dari ARRAY_BUFFER
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  var aPositionLoc = gl.getAttribLocation(shaderProgram, "a_Position");
  var aColor = gl.getAttribLocation(shaderProgram, "a_Color");
  gl.vertexAttribPointer(
    aPositionLoc, 
    2, 
    gl.FLOAT, 
    false, 
    5 * Float32Array.BYTES_PER_ELEMENT, 
    0);
  gl.vertexAttribPointer(
    aColor, 
    3, 
    gl.FLOAT, 
    false, 
    5 * Float32Array.BYTES_PER_ELEMENT, 
    2 * Float32Array.BYTES_PER_ELEMENT);
  gl.enableVertexAttribArray(aPositionLoc);
  gl.enableVertexAttribArray(aColor);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  // gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // gl.clear(gl.COLOR_BUFFER_BIT);
  gl.viewport(100, 0, canvas.height, canvas.height);

  var primitive = gl.TRIANGLES;
  var offset = 0;
  var nVertex = 6;

  var uD = gl.getUniformLocation(shaderProgram, 'u_d');
  var d = [0.5, 0.5];
  // gl.uniform2fv(uD, d);

  // gl.drawArrays(primitive, offset, nVertex);

  function render() {
    d[0] -= 0.001;
    d[1] -= 0.001;
    gl.uniform2fv(uD, d);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(primitive, offset, nVertex);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
  d[0] = 0.0;
  d[1] = 0.0;
}