import React, { useEffect } from "react";

const BackgroundCanvas: React.FC = () => {
    useEffect(() => {
        const canvas = document.getElementById("canvas") as HTMLCanvasElement;
        const gl = canvas.getContext("webgl2");
        const dpr = window.devicePixelRatio;

        const vertexSource = `#version 300 es
      in vec2 position;
      void main() {
          gl_Position = vec4(position, 0., 1.);
      }`;

        const fragmentSource = `#version 300 es
      precision highp float;
      out vec4 fragColor;
      uniform vec2 resolution;
      uniform float time;

      #define S smoothstep
      #define T .112358+time

      float rnd(vec2 p) {
          return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 p) {
          vec2 f = fract(p), i = floor(p);
          float a = rnd(i), b = rnd(i + vec2(1, 0));
          float c = rnd(i + vec2(0, 1)), d = rnd(i + vec2(1, 1));
          vec2 u = f * f * (3. - 2. * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1. - u.x) + (d - b) * u.y * u.x;
      }

      void main() {
          vec2 uv = (gl_FragCoord.xy - .5 * resolution.xy) / min(resolution.x, resolution.y);
          float t = T * .1;
          vec3 col = vec3(0);
          vec2 p = vec2(noise(uv + vec2(0, 1)), noise(uv + vec2(1, 0)));
          p = 8. * (vec2(sin(t), -cos(t)) * .15 - p);
          float s = .35;
          for(float i = .0; i < 6.; i++) {
              p.x += s * sin(2. * t - i * 1.5 * p.y) + t;
              p.y += s * cos(2. * t + i * 1.5 * p.x) - t;
          }
          col += sin(t + p.x + p.y);
          col = pow(S(vec3(0.2), vec3(1.4), col), vec3(4));
          col = mix(vec3(0.247, 0.443, 0.227) * col, col, col);
          fragColor = vec4(col, .9);
      }`;

        let time: WebGLUniformLocation | null, buffer: WebGLBuffer | null, program: WebGLProgram | null, resolution: WebGLUniformLocation | null;
        let vertices: number[] = [];

        function resize() {
            if (!gl) return;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }

        function compile(shader: WebGLShader, source: string) {
            if (!gl) return;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
            }
        }

        function setup() {
            if (!gl) return;
            const vs = gl.createShader(gl.VERTEX_SHADER)!;
            const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
            program = gl.createProgram();
            compile(vs, vertexSource);
            compile(fs, fragmentSource);
            gl.attachShader(program!, vs);
            gl.attachShader(program!, fs);
            gl.linkProgram(program!);
            vertices = [-1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0];
            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            const position = gl.getAttribLocation(program!, "position");
            gl.enableVertexAttribArray(position);
            gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
            time = gl.getUniformLocation(program!, "time");
            resolution = gl.getUniformLocation(program!, "resolution");
        }

        function draw(now: number) {
            if (!gl || !program || !time || !resolution) return;
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.useProgram(program);
            gl.uniform1f(time, now * 0.001);
            gl.uniform2f(resolution, canvas.width, canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5);
        }

        function loop(now: number) {
            draw(now);
            requestAnimationFrame(loop);
        }

        setup();
        resize();
        loop(0);
        window.addEventListener("resize", resize);
    }, []);

    return <canvas id="canvas" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }} />;
};

export default BackgroundCanvas;
