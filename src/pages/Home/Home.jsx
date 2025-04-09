import HeroSection from "../../Components/HeroSection/HeroSection";
import SlideShowSection from "../../Components/SlideShowSection/SlideShowSection";
import HomeContent from "../../Components/HomeContent/HomeContent";

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