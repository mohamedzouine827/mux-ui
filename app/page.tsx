
import Navbar from "./_components/Navbar";
import HeroSection from "./_components/HeroSection";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-[#1D4ED8] to-black">
      <Navbar />
      <main className="flex-grow w-full">
        <HeroSection />
      </main>
      <Footer />
    </div>
  );
}