import type { NextPage } from 'next';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Landing from '../components/layout/Landing';
import Navbar2 from '../components/Navbar2';
import Portofolio from '../components/Portofolio';
import Service from '../components/Service';
import Testimoni from '../components/Testimoni';

const Home: NextPage = () => {
  return (
    <Landing
      data={{
        title:
          'AlsoProject | Solusi pembuatan website, aplikasi, mobile app, ecommerce, dan web company profile',
      }}
    >
      <Navbar2 />
      <Hero />
      <About />
      <Service />
      <Portofolio />
      <Testimoni />
      <Contact />
      <Footer />
    </Landing>
  );
};

export default Home;
