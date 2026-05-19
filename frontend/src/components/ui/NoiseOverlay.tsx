export default function NoiseOverlay() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-10 mix-blend-soft-light"
      style={{
        backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
        opacity: 0.03
      }}
    />
  );
}
