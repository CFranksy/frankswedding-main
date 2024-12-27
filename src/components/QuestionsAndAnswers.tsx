import Questions from "@/../public/QuestionsAndAnswers.json";
import Taxis from "@/../public/Taxis.json";
import HEADER_Text from "./HEADER_Text";

const QuestionsAndAnswers = () => {
  return (
    <section className="w-dvh flex justify-center items-center py-4">
      <div className=" w-5/6 sm:w-3/4 h-full flex flex-col text-center bg-blush rounded-lg py-10 px-4">
        <HEADER_Text additionalClasses="text-lightBlush text-3xl sm:text-7xl">
          Frequently Asked Questions
        </HEADER_Text>
        <div className="flex sm:flex-row flex-col justify-center flex-wrap w-full">
          {Questions.map((question) => {
            return (
              <div
                key={JSON.stringify(question)}
                className="flex flex-col text-white p-2 px-4 w-full sm:w-96 shrink-0"
              >
                <h2 className="font-bold font-1xl">{question.q}</h2>
                <p className="text-sm italic">{question.a}</p>
              </div>
            );
          })}
        </div>

        <HEADER_Text additionalClasses="text-lightBlush text-3xl sm:text-7xl">
          Taxi&apos;s
        </HEADER_Text>

        <div className="flex justify-center flex-col sm:flex-row">
          {Taxis.map((taxiRank, key) => {
            return (
              <div
                className="flex sm:flex-row flex-col justify-center"
                key={`${key}_${taxiRank}`}
              >
                <div
                  key={JSON.stringify(taxiRank)}
                  className="flex flex-col text-white p-2 px-4"
                >
                  <h2 className="font-bold font-1xl">{taxiRank.name}</h2>
                  <p className="text-sm italic">{taxiRank.number}</p>
                </div>
              </div>
            );
          })}
        </div>

        <HEADER_Text additionalClasses="text-lightBlush text-3xl sm:text-7xl">
          Hotels
        </HEADER_Text>

        <div className="flex sm:flex-row flex-col justify-center">
          <p className="text-sm text-white">
            The hotel is now fully booked but there are plenty of other options
            around. It is only a 15 minutes taxi ride from the centre of
            Stratford Upon Avon as well. If you need any suggestions where to stay please ask.
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuestionsAndAnswers;
