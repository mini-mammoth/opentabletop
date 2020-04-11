precision mediump float;

uniform float vpw;// Width, in pixels
uniform float vph;// Height, in pixels

uniform vec2 offset;// e.g. [-0.023500000000000434 0.9794000000000017], currently the same as the x/y offset in the mvMatrix
uniform vec2 pitch;// e.g. [50 50]

void main() {
    float lX = gl_FragCoord.x / vpw;
    float lY = gl_FragCoord.y / vph;

    float scaleFactor = 10000.0;

    float offX = (scaleFactor * offset[0]) + gl_FragCoord.x;
    float offY = (scaleFactor * offset[1]) + (1.0 - gl_FragCoord.y);

    if (int(mod(offX, pitch[0])) == 0 ||
    int(mod(offY, pitch[1])) == 0) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
    } else {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
}
