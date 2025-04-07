import * as THREE from './lib/three.module.js';

const blockSize = 1;

export function createBlock(x, y, z, type = 'grass') {
  let color = {
    grass: 0x00ff00,
    dirt: 0x964B00,
    stone: 0x808080
  }[type] || 0xffffff;

  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize);
  const material = new THREE.MeshLambertMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  return cube;
}
