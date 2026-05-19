export default function EngineeringGrid() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none -z-20"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        opacity: 0.04
      }}
    />
  );
}
