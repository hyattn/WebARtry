import { MeshStandardMaterial, Vector3, Group, MathUtils, TextureLoader, Mesh } from "three";
import SimpleRoomGltfUrl from "/src/gltf/SimpleRoom.gltf";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

function setupNavigationAreaGeometry() {
    // create occluder material
    const occluderMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
    occluderMaterial.colorWrite = false;

    // create room map
    const navigationArea = new Group();
    // Assuming your GLTF file represents the room, load it here
    const roomLoader = new GLTFLoader();
    roomLoader.load(SimpleRoomGltfUrl, function (gltf) {
        gltf.scene.traverse(function (child) {
            if (child.isMesh) {
                child.material = occluderMaterial;
            }
        });
        navigationArea.add(gltf.scene);
    });

    // navigation area parent for easier placement
    const navigationAreaParent = new Group();
    navigationAreaParent.add(navigationArea);

    return navigationAreaParent;
}

export { setupNavigationAreaGeometry };
