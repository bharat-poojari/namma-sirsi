import Journey from "@/components/Journey";
import { Beyond, Culture, Discover, Hero, Identity, People, Sacred, Taste, Wild } from "@/components/chapters/Chapters";
import { Explore } from "@/components/chapters/Explore";
import { Sources } from "@/components/chapters/Sources";
import { Loader, Nav, Sheet } from "@/components/ui/Shell";

export default function Home() {
  return (
    <>
      <Loader />
      <Nav />
      <Journey>
        <main id="main">
          <Hero />
          <Discover />
          <Sacred />
          <Wild />
          <Culture />
          <Taste />
          <People />
          <Beyond />
          <Explore />
          <Identity />
        </main>
        <Sources />
      </Journey>
      <Sheet />
    </>
  );
}
