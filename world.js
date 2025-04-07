import { createBlock } from './block.js';

export function initWorld(scene) {
  const width = 20;
  const depth = 20;

  for (let x = -width / 2; x < width / 2; x++) {
    for (let z = -depth / 2; z < depth / 2; z++) {
      const block = createBlock(x, 0, z, 'grass');
      scene.add(block);
    }
  }
}
