import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Affordability from "@/components/Affordability";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import MyWorks from "@/components/MyWorks"; //Myworks 

const Home = () => {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <Affordability />
        <Services />
        <Skills />
         <MyWorks />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Home;