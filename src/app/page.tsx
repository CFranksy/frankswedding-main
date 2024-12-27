import Banner from "@/components/Banner";
import CountdownTitle from "@/components/CountDownTitle";
import FindOutMore from "@/components/FindOutMore";
import HEADER_Text from "@/components/HEADER_Text";
import MoreInfo from "@/components/MoreInfo";
import QuestionsAndAnswers from "@/components/QuestionsAndAnswers";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen w-dvw relative">
        <div className="bg-gradient-to-t from-gray-800/60 via-gray-800/30 to-gray-800/30 h-screen w-full absolute top-0 left-0 backdrop-blur-sm	z-[9999]"></div>
        <div
          style={{
            backgroundImage: "url(./meadow_barn.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full h-full"
        />
        <Link
          href="/rsvp"
          className="absolute z-[9999] bottom-48 sm:bottom-72 text-2xl text-white text-center bg-blush left-1/2 -translate-x-1/2 px-8 py-4 rounded-xl"
        >
          <HEADER_Text size="text-2xl" additionalClasses="py-0">
            RSVP
          </HEADER_Text>
        </Link>
        <Banner />
        <CountdownTitle />
        <FindOutMore />
      </div>
      <MoreInfo />
      <QuestionsAndAnswers />
    </>
  );
}
