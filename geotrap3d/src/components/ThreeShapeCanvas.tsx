"use client";

// Kanvas 3D (Three.js) untuk persegi panjang / trapesium.
// Garis biru = sisi sejajar, hijau = sisi miring, merah = tinggi, ungu = segitiga Pythagoras.
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { ThreeParams } from "@/types";

interface Props {
  params: ThreeParams;
  showHeight: boolean;
  showPythagoras: boolean;
  /** 0 = trapesium utuh, 1 = potongan segitiga sudah diputar (bentuk persegi panjang). */
  slice: number;
  /** Naikkan angka ini untuk mengembalikan sudut pandang ke posisi awal. */
  resetSignal: number;
}

interface SceneRefs {
  rootGroup: THREE.Group;
  heightGroup: THREE.Group;
  pythagorasGroup: THREE.Group;
  rightTriangleMesh: THREE.Mesh | null;
  depth: number;
}

export default function ThreeShapeCanvas({ params, showHeight, showPythagoras, slice, resetSignal }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRefs | null>(null);

  // Status tombol terakhir disimpan di ref agar pembuatan scene tidak diulang setiap kali tombol ditekan.
  const toggleRef = useRef({ showHeight, showPythagoras });

  // 1. Membuat scene saat komponen dipasang
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 245;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#F8FAFC");

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, -1.6, 13.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Three.js versi baru memakai satuan cahaya fisik; dikali π agar terang seperti versi r128.
    scene.add(new THREE.AmbientLight(0xffffff, 0.88 * Math.PI));
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.55 * Math.PI);
    dirLight.position.set(5, 8, 10);
    scene.add(dirLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const scale = 0.65;
    const topW = params.topWidth * scale;
    const botW = params.bottomWidth * scale;
    const h = params.height * scale;
    const depth = 0.35;

    const extrudeSettings = {
      steps: 1,
      depth,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 2,
    };

    const mainMat = new THREE.MeshStandardMaterial({ color: "#FEF08A", roughness: 0.55 });
    const sliceMat = new THREE.MeshStandardMaterial({ color: "#FDBA74", roughness: 0.55 });

    let rightTriangleMesh: THREE.Mesh | null = null;
    const wing = (botW - topW) / 2;

    if (params.shape === "rectangle") {
      const rectShape = new THREE.Shape();
      rectShape.moveTo(-botW / 2, -h / 2);
      rectShape.lineTo(botW / 2, -h / 2);
      rectShape.lineTo(botW / 2, h / 2);
      rectShape.lineTo(-botW / 2, h / 2);
      rectShape.closePath();

      const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(rectShape, extrudeSettings), mainMat);
      mesh.position.z = -depth / 2;
      rootGroup.add(mesh);

      const gridHelper = new THREE.GridHelper(
        Math.max(botW, h),
        Math.max(params.bottomWidth, params.height),
        "#94A3B8",
        "#CBD5E1"
      );
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.z = depth / 2 + 0.04;
      gridHelper.scale.set(botW / Math.max(botW, h), 1, h / Math.max(botW, h));
      rootGroup.add(gridHelper);
    } else {
      const bodyShape = new THREE.Shape();
      bodyShape.moveTo(-botW / 2, -h / 2);
      bodyShape.lineTo(topW / 2, -h / 2);
      bodyShape.lineTo(topW / 2, h / 2);
      bodyShape.lineTo(-topW / 2, h / 2);
      bodyShape.closePath();

      const bodyMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(bodyShape, extrudeSettings), mainMat);
      bodyMesh.position.z = -depth / 2;
      rootGroup.add(bodyMesh);

      if (wing > 0.01) {
        const triShape = new THREE.Shape();
        triShape.moveTo(topW / 2, -h / 2);
        triShape.lineTo(botW / 2, -h / 2);
        triShape.lineTo(topW / 2, h / 2);
        triShape.closePath();

        rightTriangleMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(triShape, extrudeSettings), sliceMat);
        rightTriangleMesh.position.z = -depth / 2;
        rootGroup.add(rightTriangleMesh);
      }
    }

    const makeLine = (p1: [number, number, number], p2: [number, number, number], colorHex: string) => {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p1), new THREE.Vector3(...p2)]);
      return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: colorHex }));
    };

    const zFront = depth / 2 + 0.06;
    rootGroup.add(makeLine([-topW / 2, h / 2, zFront], [topW / 2, h / 2, zFront], "#2563EB"));
    rootGroup.add(makeLine([-botW / 2, -h / 2, zFront], [botW / 2, -h / 2, zFront], "#2563EB"));
    rootGroup.add(makeLine([-botW / 2, -h / 2, zFront], [-topW / 2, h / 2, zFront], "#059669"));
    rootGroup.add(makeLine([botW / 2, -h / 2, zFront], [topW / 2, h / 2, zFront], "#059669"));

    const heightGroup = new THREE.Group();
    const xH = params.shape === "rectangle" ? -botW / 2 : -topW / 2;
    const sq = 0.25;
    heightGroup.add(makeLine([xH, -h / 2, zFront + 0.02], [xH, h / 2, zFront + 0.02], "#DC2626"));
    heightGroup.add(makeLine([xH, -h / 2 + sq, zFront + 0.02], [xH + sq, -h / 2 + sq, zFront + 0.02], "#DC2626"));
    heightGroup.add(makeLine([xH + sq, -h / 2 + sq, zFront + 0.02], [xH + sq, -h / 2, zFront + 0.02], "#DC2626"));
    heightGroup.visible = toggleRef.current.showHeight;
    rootGroup.add(heightGroup);

    const pythagorasGroup = new THREE.Group();
    if (params.shape === "trapezoid" && wing > 0.01) {
      const z = zFront + 0.03;
      pythagorasGroup.add(makeLine([topW / 2, -h / 2, z], [topW / 2, h / 2, z], "#7C3AED"));
      pythagorasGroup.add(makeLine([topW / 2, -h / 2, z], [botW / 2, -h / 2, z], "#7C3AED"));
      pythagorasGroup.add(makeLine([topW / 2 + sq, -h / 2, z], [topW / 2 + sq, -h / 2 + sq, z], "#7C3AED"));
      pythagorasGroup.add(makeLine([topW / 2, -h / 2 + sq, z], [topW / 2 + sq, -h / 2 + sq, z], "#7C3AED"));
    }
    pythagorasGroup.visible = toggleRef.current.showPythagoras;
    rootGroup.add(pythagorasGroup);

    sceneRef.current = { rootGroup, heightGroup, pythagorasGroup, rightTriangleMesh, depth };

    // Putar objek dengan sentuhan / geser mouse
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    const onDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      if (!isDragging) return;
      rootGroup.rotation.y = Math.max(-0.85, Math.min(0.85, rootGroup.rotation.y + (e.clientX - prevX) * 0.01));
      rootGroup.rotation.x = Math.max(-0.65, Math.min(0.65, rootGroup.rotation.x + (e.clientY - prevY) * 0.01));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      isDragging = false;
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Bersihkan saat pindah halaman agar tidak boros memori
    return () => {
      cancelAnimationFrame(frameId);
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      container.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, [params]);

  // 2. Tampilkan / sembunyikan garis tinggi
  useEffect(() => {
    toggleRef.current.showHeight = showHeight;
    if (sceneRef.current) sceneRef.current.heightGroup.visible = showHeight;
  }, [showHeight]);

  // 3. Tampilkan / sembunyikan segitiga Pythagoras
  useEffect(() => {
    toggleRef.current.showPythagoras = showPythagoras;
    if (sceneRef.current) sceneRef.current.pythagorasGroup.visible = showPythagoras;
  }, [showPythagoras]);

  // 4. Animasi potong-geser segitiga (pembuktian rumus luas trapesium)
  useEffect(() => {
    const s = sceneRef.current;
    if (!s || !s.rightTriangleMesh) return;
    s.rightTriangleMesh.position.z = -s.depth / 2 + Math.sin(slice * Math.PI) * 0.6;
    s.rightTriangleMesh.rotation.z = slice * Math.PI;
  }, [slice]);

  // 5. Reset sudut pandang
  useEffect(() => {
    if (sceneRef.current) sceneRef.current.rootGroup.rotation.set(0, 0, 0);
  }, [resetSignal]);

  return <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />;
}
