---
layout: default
title: "16. The Landing Page"
parent: Tutorial
nav_order: 16
has_children: false
---

#### Prof. Dr. Lena Gieseke | lena.gieseke@filmuniversitaet.de  
  
# Tutorial - A Portfolio Page

### Previous

* [1. Tech Stack](portfolio_tutorial_01_stack)
* [2. Project Setup](portfolio_tutorial_02_setup)
* [3. Routing](portfolio_tutorial_03_routing)
* [4. Header and Footer](portfolio_tutorial_04_header_footer)
* [5. Tailwind CSS](portfolio_tutorial_05_tailwind)
* [6. Navigation](portfolio_tutorial_06_navigation)
* [7. The Home Page](portfolio_tutorial_07_home)
* [8. The About Page – Overview](portfolio_tutorial_08_about_overview)
* [9. The About Page – Accordion](portfolio_tutorial_09_about_accordion)
* [10. Impressum](portfolio_tutorial_10_impressum)
* [11. Contact](portfolio_tutorial_11_contact)
* [12. Projects](portfolio_tutorial_12_projects)
* [13. Fonts](portfolio_tutorial_13_fonts)
* [14. Summary](portfolio_tutorial_14_summary)
* [15. Build and Deploy](portfolio_tutorial_15_deploy)




## 16. The Landing Page

* [16. The Landing Page](#16-the-landing-page)
    * [16.1 P5 Canvas](#161-p5-canvas)
        * [16.1.1 Why useEffect and useRef](#1611-why-useeffect-and-useref)
    * [16.2 Three.js Canvas](#162-threejs-canvas)
        * [16.2.1 Why `useEffect` and `useRef`](#1621-why-useeffect-and-useref)
    * [16.3 Video Carousel](#163-video-carousel)
    * [16.4 GLSL Fragment Shader](#164-glsl-fragment-shader)
        * [16.4.1 What Is a Fragment Shader](#1641-what-is-a-fragment-shader)
        * [16.4.2 The Vertex Shader](#1642-the-vertex-shader)
        * [16.4.3 The Fragment Shader](#1643-the-fragment-shader)
        * [16.4.4 ShaderCanvas.tsx](#1644-shadercanvastsx)
        * [16.4.5 ShaderCanvas as a Full-Page Background](#1645-shadercanvas-as-a-full-page-background)
    * [Next](#next)


As of now, we only have a large image on the landing page as our hero element. In the following I will give a couple of options to have something more fancy than an image. Choose up to your liking.

In each case the newly developed canvas component is a child of `HeroCanvas` in `app/page.tsx` as a replacement for `HeroImage`:

**`app/page.tsx`**:
```tsx
<HeroCanvas>
    <YourCanvasComponent />   {/* replaces <HeroImage> */}
</HeroCanvas>
```

---

### 16.1 P5 Canvas

p5.js is a JavaScript library that wraps a `<canvas>` element in a beginner-friendly drawing API with its function `setup()` running once at the start and `draw()` running every frame.

Because p5 reads `window` and `document`, it cannot run during Next.js's server-side rendering. We dynamically import it inside `useEffect` so it only loads in the browser.

Install:
```bash
npm install p5
npm install --save-dev @types/p5
```

**`app/components/P5Canvas.tsx`**:
```tsx
"use client";
// "use client" is required because this component uses browser APIs (useRef, useEffect,
// and p5 itself which reads window and document). Without it, Next.js would try to
// run this code on the server during build — where there is no DOM — and crash.

import { useEffect, useRef } from "react";

const P5Canvas = () => {
    // useRef gives us a stable reference to the DOM element across re-renders.
    // We need it to (a) tell p5 where to attach its canvas, and (b) read the
    // container's current pixel size when creating or resizing the canvas.
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // useEffect runs only in the browser, after the component has mounted.
        // This is the correct place to set up anything that requires the DOM.

        // p5's TypeScript types use the old CommonJS `export =` pattern which
        // cannot be used as an instance type annotation. We use `any` here —
        // the only method we call on p5Instance is .remove() in cleanup, so
        // no type safety is lost in practice.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let p5Instance: any = null;

        // --- Dynamic import -------------------------------------------------------
        // p5 accesses window, document, and navigator at module load time.
        // A static `import p5 from "p5"` at the top of the file would run on the
        // server during Next.js's static generation step, where those globals don't
        // exist. Dynamic import("p5") delays loading until this line executes —
        // which only happens inside useEffect, safely in the browser.
        import("p5").then(({ default: P5 }) => {
            // Safety check: the component might have unmounted between when
            // useEffect fired and when the async import resolved.
            if (!containerRef.current) return;

            // --- Instance mode ----------------------------------------------------
            // p5 has two modes:
            //   Global mode: p5 attaches setup/draw directly to window. Fine for
            //     standalone sketches, but breaks in React because it pollutes the
            //     global scope and conflicts with the rest of the app.
            //   Instance mode: `new P5(sketch => { ... })` keeps everything inside
            //     one object. The callback receives `sketch` — a p5 instance you
            //     call methods on (sketch.circle, sketch.background, etc.) rather
            //     than calling them as free functions.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            p5Instance = new P5((sketch: any) => {
                // t accumulates each frame to drive the time-based animation.
                // We declare it here (outside setup/draw) so it persists across frames.
                let t = 0;

                // setup() runs once when p5 first initializes.
                sketch.setup = () => {
                    // createCanvas returns a p5.Element wrapping a <canvas>.
                    // We size it to the container so it fills HeroCanvas exactly.
                    const canvas = sketch.createCanvas(
                        containerRef.current!.offsetWidth,
                        containerRef.current!.offsetHeight
                    );
                    // canvas.parent() moves the <canvas> DOM node inside our
                    // container <div>. Without this, p5 appends it to <body>.
                    canvas.parent(containerRef.current!);
                    sketch.noStroke();
                };

                // draw() is called by p5 every frame (~60 fps by default).
                sketch.draw = () => {
                    sketch.background(10, 10, 20);
                    t += 0.01;

                    const cols = 20;
                    const rows = 12;
                    const cellW = sketch.width / cols;
                    const cellH = sketch.height / rows;

                    for (let i = 0; i < cols; i++) {
                        for (let j = 0; j < rows; j++) {
                            const x = i * cellW + cellW / 2;
                            const y = j * cellH + cellH / 2;

                            // Distance from mouse
                            const dx = sketch.mouseX - x;
                            const dy = sketch.mouseY - y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            const influence = Math.max(0, 1 - dist / 250);

                            // Size: large base, extreme growth near cursor, strong pulse.
                            // sin() ranges from -1 to 1, so we shift it to [0, 1] with
                            // (0.5 + 0.5 * sin) to guarantee a minimum size everywhere.
                            const pulse = 0.5 + 0.5 * Math.sin(t + i * 0.4 + j * 0.3);
                            const size = 8 + 40 * influence + 12 * pulse;

                            // Hue shifts across the grid and with time
                            const hue = (i * 18 + j * 12 + t * 30) % 360;
                            sketch.fill(`hsl(${hue}, 70%, ${40 + 40 * influence}%)`);
                            sketch.circle(x, y, size);
                        }
                    }
                };

                // windowResized() is called by p5 whenever the browser window resizes.
                // We must also resize the canvas to match the container's new size —
                // otherwise the drawing scales up/down incorrectly.
                sketch.windowResized = () => {
                    if (containerRef.current) {
                        sketch.resizeCanvas(
                            containerRef.current.offsetWidth,
                            containerRef.current.offsetHeight
                        );
                    }
                };
            });
        });

        // --- Cleanup --------------------------------------------------------------
        // React calls this return function when the component unmounts (e.g. the
        // user navigates away). p5Instance.remove() stops the draw loop, removes
        // the <canvas> element from the DOM, and frees all p5 resources.
        // Without cleanup, the old loop keeps running in the background every time
        // React re-mounts the component, leaking memory and CPU.
        return () => {
            p5Instance?.remove();
        };

        // The empty dependency array [] means useEffect runs once after the first
        // render and never re-runs. This is correct here: we only want to create the
        // p5 sketch once, not rebuild it on every state change.
    }, []);

    // The component renders a plain <div> that fills its parent (HeroCanvas).
    // p5 will append its <canvas> inside this div via canvas.parent() above.
    return <div ref={containerRef} className="w-full h-full" />;
};

export default P5Canvas;

```

- `"use client"` — required because p5 uses browser APIs
- `import("p5")` inside `useEffect` — dynamic import delays loading until the component is in the browser; without this Next.js would try to run p5 on the server and crash
- **Instance mode** — `new P5(sketch => { ... })` attaches p5 to a specific container `<div>` instead of taking over the whole page
- `p5Instance.remove()` in the cleanup destroys the canvas and stops the draw loop when the component unmounts


Use it in `app/page.tsx`:
```tsx
// CHANGE:
import P5Canvas from "@/app/components/P5Canvas";

// CHANGE:
<HeroCanvas>
    <P5Canvas />
</HeroCanvas>
```

#### 16.1.1 Why useEffect and useRef

**`useEffect` — "React, please do this after you've updated the screen"**

For p5 to work, we need access to the html elements and with that browser functionalities of `window` and `document` the moment it is loaded. If you imported p5 at the top of the file with a regular `import`, the server would try to load it, find no `window`, and crash.

With `useEffect` React gives us the option of saying: "run this code only after the component has been painted into a real browser page." It never runs on the server. Everything inside `useEffect`, including the dynamic `import("p5")`, is therefore guaranteed to have a real DOM available, which p5 must have.

**`useRef` — "React, please remember this, but don't bother re-drawing when it changes"**

Every time React re-renders a component, it re-runs the component function from top to bottom. Any ordinary variable declared inside the function is recreated from scratch and with that it does not survive between renders.

We need a stable, persistent pointer to the actual `<div>` element in the browser DOM, namely one that:
1. stays the same object across re-renders (so p5 keeps pointing to the right element), and
2. does not cause a re-render when its value changes (unlike `useState`).

That is exactly what `useRef` provides. Think of it as a small box that React keeps alive for the lifetime of the component. The box has a `.current` property that holds the DOM element once it is created. When we write `ref={containerRef}` on the `<div>`, React fills in `containerRef.current` with the real element as soon as it appears in the page.

We use `containerRef` in two places:
- `canvas.parent(containerRef.current!)` — tells p5 to put its `<canvas>` inside our `<div>` rather than appending it to `<body>`
- `containerRef.current.offsetWidth` and `containerRef.current.offsetHeight` — reads the container's actual pixel size so the canvas is created at the right dimensions


---

### 16.2 Three.js Canvas

Three.js is a 3D library that wraps WebGL in a higher-level API. You work with objects, lights, and cameras instead of raw shaders. The scene here shows a torus knot that rotates automatically and responds to mouse interaction via `OrbitControls`: drag to rotate freely, scroll to zoom in and out.

Install:
```bash
npm install three
npm install --save-dev @types/three
```

**`app/components/ThreeCanvas.tsx`**:
```tsx
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeCanvas = () => {
    // useRef holds a stable pointer to the container <div>.
    // Three.js needs it to (a) append its canvas element, and
    // (b) read the pixel size for the camera aspect ratio.
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // useEffect guarantees the <div> is mounted in a real browser DOM.
        // Three.js can be imported at the top of the file without crashing,
        // but WebGLRenderer.domElement needs document to exist — which it does
        // here, because useEffect never runs on the server.

        const container = mountRef.current;
        if (!container) return;

        // cleanupFn is set once the async addon load completes so the
        // useEffect return can always call it, even if the import is slow.
        let cleanupFn: (() => void) | null = null;

        // OrbitControls lives in three/addons/ — dynamic import avoids
        // potential Turbopack export-map issues and surfaces errors in the console.
        import("three/addons/controls/OrbitControls.js")
            .then(({ OrbitControls }) => {
                if (!container) return;

                // --- Scene -------------------------------------------------------
                const scene = new THREE.Scene();

                // --- Camera ------------------------------------------------------
                const camera = new THREE.PerspectiveCamera(
                    60,
                    container.offsetWidth / container.offsetHeight,
                    0.1,
                    100
                );
                camera.position.z = 3;

                // --- Renderer ----------------------------------------------------
                // alpha: true keeps the canvas background transparent so the page
                // background color shows through instead of a solid black fill.
                const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
                renderer.setSize(container.offsetWidth, container.offsetHeight);
                renderer.setPixelRatio(window.devicePixelRatio);
                container.appendChild(renderer.domElement);

                // --- OrbitControls -----------------------------------------------
                // Drag   → rotate
                // Scroll → zoom
                // enableDamping gives the camera a smooth inertial feel.
                // autoRotate keeps the shape spinning when the user is not interacting.
                const controls = new OrbitControls(camera, renderer.domElement);
                controls.enableDamping   = true;
                controls.dampingFactor   = 0.05;
                controls.autoRotate      = true;
                controls.autoRotateSpeed = 1.5;
                controls.minDistance     = 2;
                controls.maxDistance     = 10;

                // --- Geometry and material ---------------------------------------
                const geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 120, 20);
                const material = new THREE.MeshStandardMaterial({
                    color:     0x8844cc,
                    roughness: 0.3,
                    metalness: 0.6,
                });
                const mesh = new THREE.Mesh(geometry, material);
                scene.add(mesh);

                // --- Lights ------------------------------------------------------
                scene.add(new THREE.AmbientLight(0xffffff, 0.7));

                const light1 = new THREE.DirectionalLight(0xff6600, 1.8); // warm orange — top right front
                light1.position.set(3, 4, 2);
                scene.add(light1);

                const light2 = new THREE.DirectionalLight(0x0088ff, 1.5); // cyan-blue — left
                light2.position.set(-4, -1, 3);
                scene.add(light2);

                const light3 = new THREE.DirectionalLight(0xcc00ff, 1.4); // violet — bottom back
                light3.position.set(1, -4, -3);
                scene.add(light3);

                // --- Animation loop ----------------------------------------------
                let frameId: number;
                const animate = () => {
                    frameId = requestAnimationFrame(animate);
                    controls.update(); // required every frame when damping or autoRotate is active
                    renderer.render(scene, camera);
                };
                animate();

                // --- Resize ------------------------------------------------------
                const onResize = () => {
                    camera.aspect = container.offsetWidth / container.offsetHeight;
                    camera.updateProjectionMatrix();
                    renderer.setSize(container.offsetWidth, container.offsetHeight);
                };
                window.addEventListener("resize", onResize);

                // --- Cleanup -----------------------------------------------------
                cleanupFn = () => {
                    cancelAnimationFrame(frameId);
                    window.removeEventListener("resize", onResize);
                    controls.dispose();
                    renderer.dispose();
                    geometry.dispose();
                    material.dispose();
                    if (container.contains(renderer.domElement)) {
                        container.removeChild(renderer.domElement);
                    }
                };
            })
            .catch((err) => console.error("ThreeCanvas: failed to load OrbitControls", err));

        return () => {
            cleanupFn?.();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-full" />;
};

export default ThreeCanvas;
```

- **`OrbitControls`** — drag to rotate, scroll to zoom. `enableDamping` adds smooth inertia so the camera coasts to a stop after dragging. `autoRotate` keeps the shape spinning when the user is idle; any drag gesture temporarily takes over.
- `controls.update()` must be called every frame when either `enableDamping` or `autoRotate` is active — without it neither feature works.
- `alpha: true` on the renderer makes the canvas background transparent so the page background color shows through.
- `renderer.dispose()` in the cleanup frees GPU memory — without it, navigating between pages leaks resources.

#### 16.2.1 Why `useEffect` and `useRef`

**`useEffect` — "run this only after the page has rendered in a real browser"**

Three.js itself can be imported at the top of the file without any problem — unlike p5, it does not read `window` at module load time. However, `new THREE.WebGLRenderer()` immediately calls `document.createElement('canvas')` to create its drawing surface. `document` does not exist on the server. Running that line during Next.js's server-side build step would crash.

`useEffect` only runs after the component has been painted into a real browser page. Wrapping the entire Three.js setup inside it guarantees `document` and the container `<div>` are both available.

**`useRef` — "give me a stable reference to this DOM element"**

Every time React re-renders a component it re-runs the component function from top to bottom, discarding all local variables. A plain variable pointing at a DOM element would be lost between renders.

`useRef` is a small box that React keeps alive for the full lifetime of the component. Its `.current` property holds the actual `<div>` element once the component mounts. Writing `ref={mountRef}` on the `<div>` tells React to fill that box in.

We need `mountRef.current` in three specific places:
- `container.appendChild(renderer.domElement)` — places the Three.js canvas inside our `<div>`
- `container.offsetWidth / offsetHeight` — reads the container's pixel dimensions to set the renderer size and camera aspect ratio
- `container.removeChild(renderer.domElement)` — clean removal on unmount

Use it in `app/page.tsx`:
```tsx
// CHANGE:
import ThreeCanvas from "@/app/components/ThreeCanvas";

// CHANGE:
<HeroCanvas>
    <ThreeCanvas />
</HeroCanvas>
```

---

### 16.3 Video Carousel

A carousel cycles through a list of videos one at a time. This implementation uses no external library, a single `useState` tracks the current index, and two buttons step forward and backward. 

Place your video files at `public/img/home/video1.mp4` etc. and adjust the `videos` array accordingly.

**`app/components/VideoCarousel.tsx`**:
```tsx
"use client";

import { useState, useEffect } from "react";

const videos = [
    { src: "/img/home/video1.mp4", label: "Project 1" },
    { src: "/img/home/video2.mp4", label: "Project 2" },
    { src: "/img/home/video3.mp4", label: "Project 3" },
];

const VideoCarousel = () => {
    const [current, setCurrent] = useState(0);

    const prev = () => setCurrent((i) => (i - 1 + videos.length) % videos.length);
    const next = () => setCurrent((i) => (i + 1) % videos.length);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft")  prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <div className="relative w-full h-full overflow-hidden">

            {/* All videos rendered at once; only the active one is visible */}
            {videos.map((v, i) => (
                <video
                    key={v.src}
                    src={v.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                        i === current ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}

            {/* Prev / Next buttons */}
            <button
                onClick={prev}
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
            >
                ‹
            </button>
            <button
                onClick={next}
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors"
            >
                ›
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {videos.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        aria-label={`Go to video ${i + 1}`}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            i === current ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoCarousel;
```

- All videos are rendered in the DOM at once; switching is done by toggling `opacity` via a CSS transition — the new video is already loaded and playing in the background, so there is no flash on switch
- `muted` and `playsInline` are required by browsers for autoplay to work without user interaction
- `% videos.length` wraps the index so stepping past the last item returns to the first

Use it in `app/page.tsx`:
```tsx
// CHANGE:
import VideoCarousel from "@/app/components/VideoCarousel";

// CHANGE:
<HeroCanvas>
    <VideoCarousel />
</HeroCanvas>
```


For a portfolio with just 3–5 videos, the hand-rolled version in the tutorial is fine and keeps the dependency count low. External libraries providing a video carousel become worth it when you need touch/swipe on mobile, complex transitions, or lazy loading for many items.
* [Swiper](https://swiperjs.com/) (swiper) — the most popular by far. Touch/swipe support, autoplay, pagination, lazy loading, loop modes, and dozens of effect transitions (fade, cube, coverflow). Has a React component wrapper. Heavy but feature-complete.
* [Embla Carousel](https://www.embla-carousel.com/) (embla-carousel-react) — lightweight, no opinions on styling, just the scroll/drag engine. You build the UI yourself. Good choice if you want full control over appearance.
* [Keen Slider](https://keen-slider.io/) (keen-slider) — similar philosophy to Embla, minimal and performant, good touch support.

---

### 16.4 GLSL Fragment Shader

A GLSL fragment shader runs directly on the GPU and computes a colour for every pixel on the canvas, every frame. Because the GPU has thousands of parallel cores, it can do this for millions of pixels simultaneously.

#### 16.4.1 What Is a Fragment Shader

WebGL renders geometry through a two-stage pipeline:

1. The **vertex shader** runs once per corner of the geometry. Here we draw a single rectangle covering the full canvas; the vertex shader simply passes its four corners through unchanged.
2. The **fragment shader** runs once per pixel. It receives the pixel's screen position and a set of **uniforms** — values sent from JavaScript that are the same for every pixel — and outputs a colour.

The result is that every pixel's colour is computed from scratch every frame, based on its position (`gl_FragCoord`), the current time (`u_time`), and the mouse position (`u_mouse`).

#### 16.4.2 The Vertex Shader

The fullscreen rectangle has four corners at `(-1,-1)`, `(1,-1)`, `(-1,1)`, `(1,1)`. These are already in the GPU's clip-space coordinate system, so the vertex shader just passes them through:

```glsl
#version 300 es

in vec2 a_position;

void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
}
```

`#version 300 es` must be the first line, it selects GLSL ES 3.00, the version required by WebGL 2.

#### 16.4.3 The Fragment Shader

This shader draws a soft glowing light that follows the mouse over a slowly shifting dark background:

```glsl
#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

out vec4 fragColor;

void main() {
    // Normalise pixel position: y in [-1, 1], x aspect-corrected
    vec2 p = (2.0 * gl_FragCoord.xy - u_resolution) / u_resolution.y;

    // Normalise mouse to the same coordinate system
    vec2 m = (2.0 * u_mouse - u_resolution) / u_resolution.y;

    // Distance from the current pixel to the mouse
    float d = length(p - m);

    // Inverse-distance glow: bright at the cursor, fades outward
    // The + 0.3 prevents a division-by-zero spike exactly at the cursor
    float glow = 0.3 / (d + 0.3);

    // Slow wave across the canvas based on distance from centre and time
    float wave = 0.5 + 0.5 * sin(u_time * 0.5 + length(p) * 2.0);

    // Dark blue-violet background that breathes slowly with the wave
    vec3 bg    = mix(vec3(0.04, 0.04, 0.12), vec3(0.08, 0.04, 0.18), wave);

    // Add the purple glow on top
    vec3 color = bg + vec3(0.5, 0.2, 1.0) * glow * 0.6;

    fragColor = vec4(color, 1.0);
}
```

- `p` — the pixel's position, centred at `(0,0)` with `y ∈ [-1, 1]`
- `m` — the mouse in the same coordinate system
- `glow` — an inverse-distance falloff: very bright at the cursor, near-zero far away
- `wave` — a `sin` over the distance from the canvas centre, drifting slowly with time, giving the background a breathing pulse
- `bg` — a dark blue-violet that shifts between two shades as the wave changes
- The final colour adds the purple glow on top of the background

#### 16.4.4 ShaderCanvas.tsx

The React component compiles both shaders, draws a fullscreen rectangle, and updates the three uniforms on every frame via `requestAnimationFrame`.

**`app/components/ShaderCanvas.tsx`**:
```tsx
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
    vec2 m = (2.0 * u_mouse      - u_resolution) / u_resolution.y;

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
        canvas.addEventListener("pointermove", onPointerMove);

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
            canvas.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ShaderCanvas;
```

- The shaders are stored as template strings at the top of the file — the simplest approach for short shaders
- `TRIANGLE_STRIP` with four vertices draws two triangles covering the whole canvas without repeating any vertex
- The mouse y-coordinate is flipped (`canvas.height - ...`) because WebGL's `y=0` is at the bottom while the browser's `y=0` is at the top
- `resize()` is called inside the render loop, not only on the `resize` event, so the canvas stays sharp when the browser window is resized

Use it in `app/page.tsx`:
```tsx
// CHANGE:
import ShaderCanvas from "@/app/components/ShaderCanvas";

// CHANGE:
<HeroCanvas>
    <ShaderCanvas />
</HeroCanvas>
```

To customise the effect, edit the `FRAG` string. Any GLSL ES 3.00 fragment shader that reads the same three uniforms (`u_time`, `u_resolution`, `u_mouse`) is a drop-in replacement.

---

#### 16.4.5 ShaderCanvas as a Full-Page Background

Instead of limiting the shader to the hero area, you can make it the background of the entire home page. It stays fixed while the rest of the content scrolls over it.

Two things need to change.

##### 16.4.5.1 Move the `pointermove` listener to `window`

When the canvas sits behind all other content (`z-index: -10`), mouse events never reach it directly. Change the listener in `ShaderCanvas.tsx` from `canvas` to `window`:

**`app/components/ShaderCanvas.tsx`** — find and replace the two listener lines:
```ts
// CHANGE:
window.addEventListener("pointermove", onPointerMove);

// CHANGE (in cleanup):
window.removeEventListener("pointermove", onPointerMove);
```

The coordinate calculation stays exactly the same and `canvas.getBoundingClientRect()` still returns the correct rect whether the event comes from the canvas or the window.

##### 16.4.5.2 Render the canvas as a fixed background in `app/page.tsx`

Remove `ShaderCanvas` from inside `HeroCanvas` and place it in a fixed container that covers the full viewport at `z-index: -10`. The rest of the page renders on top as normal.

**`app/page.tsx`**:
```tsx
// ADD:
import ShaderCanvas from "@/app/components/ShaderCanvas";

const Home = () => {
    return (
        <>
            {/* ADD: full-page shader background — fixed so it stays put while content scrolls */}
            <div className="fixed inset-0 -z-10">
                <ShaderCanvas />
            </div>

            {/* The rest of the page is unchanged */}
            <div className="content-center py-4 sm:py-6 lg:py-10">
                <p className="intro">[One sentence capturing what you do.]</p>
            </div>
            <HeroCanvas>
                <HeroImage
                    src="/img/home/home-hero.jpg"
                    alt="[Description of the image]"
                    priority
                />
            </HeroCanvas>
            <HeroSectionText
                title="[YOUR TITLE]"
                text="[A short paragraph introducing your field or practice.]"
            />
        </>
    );
};
```

`fixed inset-0` makes the canvas fill the entire viewport and stay in place during scroll. `-z-10` (Tailwind's `z-index: -10`) places it behind every other element on the page.

##### 16.4.5.3 Check text readability

The shader's dark navy background suits white or light-colored text well. If any text sections look hard to read, add a subtle semi-transparent backdrop. For example, in `globals.css`:

```css
@layer components {
    .content-on-shader {
        @apply bg-black/30 backdrop-blur-sm rounded-sm px-4 py-2;
    }
}
```

Apply `content-on-shader` to any section that needs more contrast against the shader background.

##### 16.4.5.4 Make the header and footer transparent

The header and footer are styled in `globals.css`. The header already has `backdrop-blur` which creates a frosted-glass effect but it just needs its white background reduced. The footer only needs `bg-white` removed.

**`app/globals.css`** — find and update the two rules inside `@layer components`:

```css
.site-header {
    /* bg-white/10 + backdrop-blur-md: frosted glass that works over both
       the dark shader on home and white backgrounds on other pages */
    @apply sticky top-0 z-50 flex items-center justify-between
           bg-white/10 backdrop-blur-md;
}

.site-footer {
    @apply border-t border-white/20 bg-transparent;
}
```

`bg-white/10` keeps the tiniest hint of white so the header doesn't fully disappear on pages without a shader. `backdrop-blur-md` blurs whatever is behind it — the animated shader on home, plain white on other pages. `border-white/20` replaces the solid grey footer border with a subtle white-tinted line that reads well on both light and dark backgrounds.

---

### Next

* [17. References and Links](portfolio_tutorial_17_references)
