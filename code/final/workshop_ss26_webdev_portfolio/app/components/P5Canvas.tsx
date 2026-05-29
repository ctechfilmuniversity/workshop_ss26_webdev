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
                    sketch.background(255);
                    t += 0.01;

                    const cols = 20;
                    const rows = 12;
                    const cellW = sketch.width / cols;
                    const cellH = sketch.height / rows;

                    // sketch.width is the actual canvas pixel width — checked every frame
                    // so it stays correct after a resize. Below 768 px (mobile) we halve
                    // the size to prevent circles from overlapping on narrow screens.
                    const sizeScale = sketch.width < 768 ? 0.5 : 1.0;

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
                            const size = (8 + 40 * influence + 16 * pulse) * sizeScale;

                            // Hue shifts across the grid and with time
                            const hue = (i * 18 + j * 12 + t * 30) % 360;
                            sketch.fill(`hsl(${hue}, 100%, ${60 + 20 * influence}%)`);
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
