import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Trailer from "@/components/Trailer";
import Problem from "@/components/Problem";
import Materials from "@/components/Materials";
import Method from "@/components/Method";
import CinematicResults from "@/components/CinematicResults";
import DataTrack from "@/components/DataTrack";
import BigFinding from "@/components/BigFinding";
import Gallery from "@/components/Gallery";
import Poster from "@/components/Poster";
import Conclusion from "@/components/Conclusion";
import Team from "@/components/Team";

export default function Home() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main-content">
        Skip to the study
      </a>
      <Nav />
      <main id="main-content" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Trailer />
        <Problem />
        <Poster />
        <Materials />
        <Method />
        <CinematicResults />
        <DataTrack />
        <BigFinding />
        <Conclusion />
        <Gallery />
      </main>
      <Team />
    </SmoothScroll>
  );
}
