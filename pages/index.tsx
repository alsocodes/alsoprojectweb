import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Landing from '../components/layout/Landing';
import Navbar from '../components/Navbar';
import Navbar2 from '../components/Navbar2';
import Portofolio from '../components/Portofolio';
import Service from '../components/Service';
import Testimoni from '../components/Testimoni';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Landing data={{title: "AlsoProject | Solusi pembuatan website, aplikasi, mobile app, ecommerce, dan web company profile"}}>
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
