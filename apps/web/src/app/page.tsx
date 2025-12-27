import type { NextPage } from "next";
import { About, Contact, Hero } from "@/containers";

const Home: NextPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Contact />
    </>
  );
};

export default Home;
