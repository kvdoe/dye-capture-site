import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Trailer from "@/components/Trailer";
import Problem from "@/components/Problem";
import CinematicResults from "@/components/CinematicResults";
import DataTrack from "@/components/DataTrack";
import BigFinding from "@/components/BigFinding";
import Gallery from "@/components/Gallery";
import Poster from "@/components/Poster";
import Conclusion from "@/components/Conclusion";
import Team from "@/components/Team";
import StudyPages from "@/components/StudyPages";

export default function Home() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main-content">
        Skip to the study
      </a>
      <Nav />
      <main id="main-content" className="w-full max-w-full overflow-x-clip">
        <Hero />
        <Problem />
        <Poster />
        <StudyPages />
        <CinematicResults />
        <DataTrack />
        <BigFinding />
        <Conclusion />
        <Gallery />
        <Trailer />
      </main>
      <Team />
    </SmoothScroll>
  );
}
