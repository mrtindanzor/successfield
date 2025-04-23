import HeroSection from "../Components/HeroSection";
import SlideShowSection from "../Components/SlideShowSection";
import HomeContent from "../Components/HomeContent";

export default function Home(){
   document.title = 'Successfield College'
  return (
    <>
      <HeroSection />
      <SlideShowSection />
      <HomeContent />
    </>
  )
}