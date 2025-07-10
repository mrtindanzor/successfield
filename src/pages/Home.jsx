import HeroSection from "../Components/HeroSection";
import SlideShowSection from "../Components/SlideShowSection";
import HomeContent from "../Components/HomeContent";

export default function Home(){
   document.title = 'Successfield'
  return (
    <>
      <HeroSection />
      <SlideShowSection />
      <HomeContent />
    </>
  )
}