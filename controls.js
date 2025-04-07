import * as THREE from './lib/three.module.js';

let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false;
let velocity = new THREE.Vector3();

export function setupControls(camera, domElement) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'w') moveForward = true;
    if (e.key === 's') moveBackward = true;
    if (e.key === 'a') moveLeft = true;
    if (e.key === 'd') moveRight = true;
  });

  document.addEventListener('keyup', (e) => {
    if (e.key === 'w') moveForward = false;
    if (e.key === 's') moveBackward = false;
    if (e.key === 'a') moveLeft = false;
    if (e.key === 'd') moveRight = false;
  });

  domElement.addEventListener('click', () => {
    domElement.requestPointerLock();
  });

  let rotation = 0;

  document.addEventListener('mousemove', (e) => {
    if (document.pointerLockElement === domElement) {
      camera.rotation.y -= e.movementX * 0.002;
      camera.rotation.x -= e.movementY * 0.002;
    }
  });

  const clock = new THREE.Clock();

  function update() {
    const delta = clock.getDelta();
    velocity.set(0, 0, 0);

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    if (moveForward) velocity.add(direction);
    if (moveBackward) velocity.sub(direction);
    if (moveLeft) velocity.add(new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)));
    if (moveRight) velocity.sub(new THREE.Vector3().crossVectors(direction, new THREE.Vector3(0, 1, 0)));

    velocity.normalize().multiplyScalar(5 * delta);
    camera.position.add(velocity);

    requestAnimationFrame(update);
  }

  update();
}
