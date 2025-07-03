export default function HeroBanner() {
  return (
    <div className="relative h-[400px] bg-cover bg-center"
         style={{ backgroundImage: "url('/assets/dummy/a_japanese_temple_version_3.webp')" }}>
      <div className="absolute bottom-0 left-0 right-0 px-8 py-4 bg-gradient-to-t from-black/70">
        <h1 className="text-4xl font-bold text-white">SALE</h1>
        <p className="text-white text-sm">Now thru July 10th @ 10 AM PT</p>
      </div>
    </div>
  )
}
