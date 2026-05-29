"use client";

import { useEffect, useRef } from "react";

// ----- shaders --------------------------------------------------------

const VERT = `#version 300 es
in vec2 a_position;
void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;
    vec2 m = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    float d    = length(p - m);
    float glow = 1.4 / (d + 0.3);
    float wave = 0.5 + 0.5 * sin(u_time * 0.5 + length(p) * 2.0);

    vec3 bg    = mix(vec3(0.4, 0.1, 0.8), vec3(0.04, 0.04, 0.1), wave);
    vec3 color = bg + vec3(0.5, 0.2, 1.0) * glow * 0.6;

    fragColor  = vec4(color, 1.0);
}`;

// ----- helpers --------------------------------------------------------

function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
        throw new Error(gl.getShaderInfoLog(shader) ?? "Shader compile error");
    return shader;
}

function createProgram(gl: WebGL2RenderingContext, vert: string, frag: string) {
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compileShader(gl, gl.VERTEX_SHADER,   vert));
    gl.attachShader(prog, compileShader(gl, gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
        throw new Error(gl.getProgramInfoLog(prog) ?? "Program link error");
    return prog;
}

// ----- component ------------------------------------------------------

const ShaderCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl2");
        if (!gl) { console.error("WebGL 2 not supported"); return; }

        // Compile shaders and link into a program
        const program = createProgram(gl, VERT, FRAG);
        gl.useProgram(program);

        // Fullscreen quad: four vertices form two triangles via TRIANGLE_STRIP
        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1,  1, -1,  -1, 1,  1, 1]),
            gl.STATIC_DRAW
        );
        const posLoc = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        // Uniform locations
        const uTime       = gl.getUniformLocation(program, "u_time");
        const uResolution = gl.getUniformLocation(program, "u_resolution");
        const uMouse      = gl.getUniformLocation(program, "u_mouse");

        // Start mouse at canvas centre
        let mouseX = canvas.width  / 2;
        let mouseY = canvas.height / 2;

        const onPointerMove = (e: PointerEvent) => {
            const r = canvas.getBoundingClientRect();
            mouseX = (e.clientX - r.left) * (canvas.width  / r.width);
            // Flip y: WebGL origin is bottom-left, browser origin is top-left
            mouseY = canvas.height - (e.clientY - r.top) * (canvas.height / r.height);
        };
        window.addEventListener("pointermove", onPointerMove);

        // Match canvas pixel size to its CSS size
        const resize = () => {
            canvas.width  = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        };
        resize();
        window.addEventListener("resize", resize);

        // Animation loop
        const start = performance.now();
        let frameId: number;
        const render = () => {
            resize();
            const t = (performance.now() - start) * 0.001; // seconds
            gl.uniform1f(uTime, t);
            gl.uniform2f(uResolution, canvas.width, canvas.height);
            gl.uniform2f(uMouse, mouseX, mouseY);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            frameId = requestAnimationFrame(render);
        };
        render();

        // Cleanup — cancel the loop and remove listeners
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ShaderCanvas;