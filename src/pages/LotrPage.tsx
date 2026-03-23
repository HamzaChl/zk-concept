import EvilEye from '../components/EvilEye';

export default function LotrPage() {
  return (
    <div className="fixed inset-0 h-screen w-screen">
      <EvilEye
        eyeColor="#FF6F37"
        intensity={1.5}
        pupilSize={0.6}
        irisWidth={0.25}
        glowIntensity={0.35}
        scale={0.8}
        noiseScale={1}
        pupilFollow={1}
        flameSpeed={1}
        backgroundColor="#060010"
        introDuration={7}
        introFrom={{
          intensity: 0.5,
          pupilSize: 0.1,
          irisWidth: 0.1,
          glowIntensity: 0,
          scale: 0.2,
          noiseScale: 0.1,
          pupilFollow: 0,
          flameSpeed: 0.1,
        }}
      />
    </div>
  );
}
