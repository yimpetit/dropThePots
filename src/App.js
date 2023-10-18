import "./styles.css";
import { Canvas, useLoader } from "@react-three/fiber";
import { Physics, usePlane, useCylinder } from "@react-three/cannon";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import _ from "lodash";
import { OrbitControls } from "@react-three/drei";

function Plane(props) {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    ...props
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[1000, 1000]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
}

function Pot(props) {
  const obj = useLoader(OBJLoader, "pot.obj");
  const [ref] = useCylinder(() => ({
    mass: 1,
    args: [0.6, 0.6, 0.1, 12],
    ...props
  }));
  return (
    <group ref={ref}>
      {_.map(obj.children, (mesh, index) => (
        <mesh
          castShadow
          receiveShadow
          geometry={mesh.geometry}
          position={[0, -0.45, 0.09]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.5}
          key={index}
        >
          <meshStandardMaterial
            color={
              index === 10 ||
              index === 3 ||
              index === 11 ||
              index === 2 ||
              index === 6 ||
              index === 7
                ? "white"
                : "hotPink"
            }
            roughness={1}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function App() {
  return (
    <div className="App">
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ alpha: false }}
        camera={{
          position: [-20, 20, -20],
          fov: 45
        }}
      >
        <color attach="background" args={["hotpink"]} />
        <ambientLight />
        <directionalLight
          position={[10, 10, 10]}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <Physics>
          <Plane position={[0, -2.5, 0]} />
          {_.map(Array(100), (item, idx) => (
            <Pot
              position={[
                Math.random() * (3 - 0) + 0,
                idx,
                Math.random() * (3 - 0) + 0
              ]}
              rotation={[
                (-Math.PI / Math.random()) * (2 - 1) + 1,
                (-Math.PI / Math.random()) * (2 - 1) + 1,
                (-Math.PI / Math.random()) * (2 - 1) + 1
              ]}
              key={idx}
            />
          ))}
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
