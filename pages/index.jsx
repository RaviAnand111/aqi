import Feed from "../components/Feed";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <div className="h-screen ">
        <Navbar />
        <Feed />
      </div>
    </>
  );
}
