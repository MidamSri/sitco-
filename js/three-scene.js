/* ========================================
   SITCO — Three.js Radiator (balanced)
   Clean wireframe radiator with detail
   ======================================== */

(function () {
    if (typeof THREE === 'undefined') return;

    const container = document.getElementById('hero3d');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.offsetWidth / container.offsetHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Materials
    const edgeBlue = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.4 });
    const edgeCyan = new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 });
    const edgeDim = new THREE.LineBasicMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.12 });

    const radiator = new THREE.Group();

    // --- Fins ---
    const FIN_COUNT = 9;
    const FIN_HEIGHT = 2.6;
    const FIN_DEPTH = 1.4;
    const FIN_THICK = 0.03;
    const FIN_SPACING = 0.34;
    const totalW = (FIN_COUNT - 1) * FIN_SPACING;

    for (let i = 0; i < FIN_COUNT; i++) {
        const x = -totalW / 2 + i * FIN_SPACING;

        // Fin outline (box edges)
        const finGeo = new THREE.BoxGeometry(FIN_THICK, FIN_HEIGHT, FIN_DEPTH);
        const finEdges = new THREE.EdgesGeometry(finGeo);
        const finLine = new THREE.LineSegments(finEdges, edgeBlue);
        finLine.position.set(x, 0, 0);
        radiator.add(finLine);

        // Horizontal corrugation lines on each fin
        const ridges = 4;
        for (let r = 1; r <= ridges; r++) {
            const y = -FIN_HEIGHT / 2 + (FIN_HEIGHT / (ridges + 1)) * r;
            const pts = [
                new THREE.Vector3(x, y, -FIN_DEPTH / 2),
                new THREE.Vector3(x, y, FIN_DEPTH / 2),
            ];
            const ridgeGeo = new THREE.BufferGeometry().setFromPoints(pts);
            radiator.add(new THREE.Line(ridgeGeo, edgeDim));
        }
    }

    // --- Header pipes (cylinders at top & bottom) ---
    const pipeR = 0.06;
    const pipeLen = totalW + 0.5;
    const pipeGeo = new THREE.CylinderGeometry(pipeR, pipeR, pipeLen, 8);
    const pipeEdges = new THREE.EdgesGeometry(pipeGeo);

    const topPipe = new THREE.LineSegments(pipeEdges, edgeCyan);
    topPipe.rotation.z = Math.PI / 2;
    topPipe.position.set(0, FIN_HEIGHT / 2 + pipeR + 0.02, 0);
    radiator.add(topPipe);

    const botPipe = new THREE.LineSegments(pipeEdges.clone(), edgeCyan);
    botPipe.rotation.z = Math.PI / 2;
    botPipe.position.set(0, -FIN_HEIGHT / 2 - pipeR - 0.02, 0);
    radiator.add(botPipe);

    // --- Small nozzle stubs ---
    const nozGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.25, 6);
    const nozEdges = new THREE.EdgesGeometry(nozGeo);

    const noz1 = new THREE.LineSegments(nozEdges, edgeCyan);
    noz1.position.set(-totalW / 2, FIN_HEIGHT / 2 + pipeR + 0.15, 0);
    radiator.add(noz1);

    const noz2 = new THREE.LineSegments(nozEdges.clone(), edgeCyan);
    noz2.position.set(totalW / 2, -FIN_HEIGHT / 2 - pipeR - 0.15, 0);
    radiator.add(noz2);

    // --- Vertical connection stubs between headers and outer fins ---
    [-(totalW / 2), totalW / 2].forEach(x => {
        const pts = [
            new THREE.Vector3(x, FIN_HEIGHT / 2, 0),
            new THREE.Vector3(x, FIN_HEIGHT / 2 + pipeR + 0.02, 0),
        ];
        radiator.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), edgeDim));
        const pts2 = [
            new THREE.Vector3(x, -FIN_HEIGHT / 2, 0),
            new THREE.Vector3(x, -FIN_HEIGHT / 2 - pipeR - 0.02, 0),
        ];
        radiator.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts2), edgeDim));
    });

    // --- Subtle heat-rise particles ---
    const HEAT_COUNT = 15;
    const heatPos = new Float32Array(HEAT_COUNT * 3);
    const heatSpeeds = [];
    for (let i = 0; i < HEAT_COUNT; i++) {
        heatPos[i * 3] = (Math.random() - 0.5) * totalW;
        heatPos[i * 3 + 1] = (Math.random() - 0.5) * FIN_HEIGHT;
        heatPos[i * 3 + 2] = (Math.random() - 0.5) * FIN_DEPTH * 0.5;
        heatSpeeds.push(0.004 + Math.random() * 0.006);
    }
    const heatGeo = new THREE.BufferGeometry();
    heatGeo.setAttribute('position', new THREE.BufferAttribute(heatPos, 3));
    const heatMat = new THREE.PointsMaterial({
        color: 0x06b6d4, size: 0.03, transparent: true, opacity: 0.4,
    });
    radiator.add(new THREE.Points(heatGeo, heatMat));

    scene.add(radiator);

    // Mouse parallax
    let mx = 0, my = 0, sx = 0, sy = 0;
    document.addEventListener('mousemove', e => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);

        sx += (mx - sx) * 0.025;
        sy += (my - sy) * 0.025;

        radiator.rotation.y += 0.003;
        radiator.rotation.y += sx * 0.003;
        radiator.rotation.x = sy * 0.12;

        // Animate heat particles
        const p = heatGeo.attributes.position.array;
        for (let i = 0; i < HEAT_COUNT; i++) {
            p[i * 3 + 1] += heatSpeeds[i];
            if (p[i * 3 + 1] > FIN_HEIGHT / 2 + 0.4) {
                p[i * 3 + 1] = -FIN_HEIGHT / 2;
                p[i * 3] = (Math.random() - 0.5) * totalW;
            }
        }
        heatGeo.attributes.position.needsUpdate = true;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight);
    });
})();
