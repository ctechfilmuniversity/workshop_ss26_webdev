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
                if (!container) return; // component may have unmounted while loading

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
                controls.enableDamping    = true;
                controls.dampingFactor    = 0.05;
                controls.autoRotate       = true;
                controls.autoRotateSpeed  = 1.5;
                controls.minDistance      = 2;
                controls.maxDistance      = 10;

                // --- Geometry and material ---------------------------------------
                const geometry = new THREE.TorusKnotGeometry(0.8, 0.25, 120, 20);
                const material = new THREE.MeshStandardMaterial({
                    color:     0xf420ed,
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
