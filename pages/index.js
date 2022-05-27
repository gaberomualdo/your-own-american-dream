import { useState, useEffect } from "react";
import Head from "next/head";
import {
  characterNames,
  decisions,
  makeTitle,
  quizQuestions,
} from "../lib/util";
import { v4 } from "uuid";
import Game from "../lib/sdk";
import commaNumber from "comma-number";
const seedrandom = require("seedrandom");

const Panel = ({ children, className, style }) => (
  <div
    className={"text-white rounded-md p-3 " + className}
    style={{
      backgroundColor: "rgba(0,0,0,.5)",
      ...style,
    }}
  >
    {children}
  </div>
);

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const asArray = (e) => {
  if (!e) return [];
  return Object.keys(e)
    .sort()
    .map((key) => e[key]);
};
const chooseRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const newEventID = () => new Date().getTime().toString() + v4();

const gameStartsAt = 1920;
const gameEndsAt = 1960;
const gameLength = 60 * 20 * 1000;
const yearLength = gameLength / (gameEndsAt - gameStartsAt);

export default function Home() {
  const [game, setGame] = useState(null);
  const [status, setStatus] = useState("Welcome to Your Own American Dream!");
  const [name, setName] = useState(null);
  const [date, setDate] = useState({
    currentMonth: "December",
    currentYear: gameStartsAt - 1,
  });
  const [decision, setDecision] = useState([]);
  const [quizQuestionStatus, setQuizQuestionStatus] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState(chooseRandom(quizQuestions));

  const addEvent = async (evt, callback = () => {}) => {
    if (evt.amount) evt.amount = Math.round(evt.amount);
    const db = firebase.database();
    await db.ref(`${newEventID()}`).set(evt);
    await callback();
  };

  const getCurrentTimings = () => {
    let currentYear =
      gameStartsAt + (new Date().getTime() - game.startedAt) / yearLength;
    const currentMonth =
      months[Math.floor((currentYear - Math.floor(currentYear)) * 12)];
    currentYear = Math.floor(currentYear);
    return { currentMonth, currentYear };
  };

  useEffect(() => {
    (async () => {
      const db = firebase.database();
      db.ref("/").on("value", (snapshot) => {
        console.log(snapshot);
        const events = asArray(snapshot.val());
        if (game?.events.length !== events.length) {
          const newGame = new Game(events);
          setGame(newGame);
        }
      });
    })();

    const interval = setInterval(() => {
      const profile = name && game.users.find((e) => e.name === name);
      if (name && !profile) {
        setName(null);
      }
      if (game && game.started && profile) {
        const { currentMonth, currentYear } = getCurrentTimings();
        if (date.currentMonth !== currentMonth) {
          setDate({ currentMonth, currentYear });
          const decisionsToMake = decisions.filter(
            (e) => e.when.year === currentYear && e.when.month === currentMonth
          );
          if (decisionsToMake.length > 0) {
            setDecision([...decision, ...decisionsToMake]);
          }
          // propogate wage changes
          if (profile.wage > 0) {
            addEvent({
              type: "money-changed",
              name,
              amount: profile.wage - profile.costs,
            });
          }
        }
      }
    }, 500);
    return () => clearInterval(interval);
  }, [game]);

  if (!game) {
    return null;
  }

  const profile = name && game.users.find((e) => e.name === name);
  const profileNumberGenerator = seedrandom(name);

  return (
    <>
      <Head>
        <title>{makeTitle("")}</title>
      </Head>
      <div
        style={{
          backgroundImage: "url(/bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="min-h-screen w-full"
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
          }}
          className="min-h-screen w-full"
        >
          {!game.started ? (
            <div className="w-full min-h-screen flex justify-center items-center">
              <div class="bg-white rounded-md shadow p-8 w-5/6">
                <h1 className="font-bold text-center text-2xl mb-6">
                  Select Your Character
                </h1>
                <div class="grid grid-cols-3">
                  {characterNames.map((cName) => {
                    const taken = game.users.map((e) => e.name).includes(cName);
                    return (
                      <button
                        className={
                          "p-4 m-2 rounded-md border " +
                          (name === cName
                            ? "bg-blue-600 text-white"
                            : taken && "bg-gray-100 text-gray-500")
                        }
                        key={cName}
                        disabled={taken || name}
                        onClick={() => {
                          setName(cName);
                          addEvent({
                            type: "user-joined",
                            name: cName,
                            money: 0,
                            wage: 0,
                          });
                        }}
                      >
                        {cName}{" "}
                        {name === cName ? "(you)" : taken ? "(taken)" : ""}
                      </button>
                    );
                  })}
                </div>
                <button
                  class="rounded-md bg-gray-200 border px-8 py-3 float-right mt-12"
                  onClick={() => {
                    addEvent({
                      type: "game-started",
                      time: new Date().getTime(),
                    });
                  }}
                >
                  Start Game
                </button>
              </div>
            </div>
          ) : (
            name && (
              <div className="flex flex-col p-4 min-h-screen">
                <div className="text-white flex justify-between items-center">
                  <img src="/logo.png" className="h-10 w-auto" />
                  <p class="text-2xl font-bold">
                    {date.currentMonth} {date.currentYear}
                  </p>
                </div>
                <div
                  className="flex relative items-stretch space-x-2 pt-4"
                  style={{
                    flex: "1 1 100%",
                  }}
                >
                  <div class="flex flex-col w-1/5 space-y-4 items-stretch">
                    <Panel
                      className="w-full flex-1"
                      style={
                        {
                          // backgroundColor: "rgb(231, 76, 60)",
                        }
                      }
                    >
                      <h1 class="text-center text-2xl font-bold mb-3">
                        Stocks
                      </h1>
                      <p>
                        You cannot access the stock market because your social
                        class and economic status are too low.
                      </p>
                    </Panel>
                    <Panel
                      className="w-full bg-blue-600"
                      style={{
                        backgroundColor: "rgb(211, 84, 0)",
                      }}
                    >
                      <h1 class="text-center text-2xl font-bold mb-3">
                        Lottery
                      </h1>
                      <div className="px-4 pb-4">
                        <button
                          className={
                            "w-full text-lg py-4 text-center border rounded-md __box transition-all"
                          }
                          onClick={() => {
                            if (Math.random() > 0.975) {
                              alert("You won the lottery! You just made $25K!");
                              addEvent({
                                type: "money-changed",
                                name,
                                amount: 25000,
                              });
                            } else {
                              alert("You did not win the lottery.");
                              addEvent({
                                type: "money-changed",
                                name,
                                amount: -100,
                              });
                            }
                          }}
                        >
                          Play with $100
                        </button>
                      </div>
                    </Panel>
                    <Panel
                      className="w-full flex-1"
                      style={
                        {
                          // backgroundColor: "rgb(142, 68, 173)",
                        }
                      }
                    >
                      <h1 class="text-center text-2xl font-bold mb-3">
                        Leaderboard
                      </h1>
                      <ul className="leading-relaxed">
                        {game.users.map((e, i) => (
                          <li>
                            {i + 1}.&nbsp;&nbsp; {e.name} — $
                            {commaNumber(e.money)}: {e.job ? e.job : "No Job"}
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  </div>
                  <Panel className="w-3/5">
                    {decision.length > 0 ? (
                      <>
                        <h1 className="text-center text-4xl font-bold mb-3">
                          Make a Decision
                        </h1>
                        <p className="text-center mb-10">
                          This decision will influence your wage and ability to
                          achieve the dream.
                        </p>
                        <h2 className="text-center text-2xl">
                          {decision[0].content}
                        </h2>
                        <div class="grid grid-cols-2 px-8 mt-3">
                          {decision[0].options.map((e, i) => (
                            <button
                              className={
                                "text-lg py-4 m-2 text-center border rounded-md __box transition-all"
                              }
                              onClick={() => {
                                decision[0].callback(
                                  e,
                                  name,
                                  addEvent,
                                  setStatus,
                                  profile
                                );
                                setDecision(decision.slice(1));
                              }}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h1 className="text-center text-4xl font-bold mb-3">
                          Play To Earn
                        </h1>
                        <p className="text-center mb-10">
                          Earn cash by beating some quiz questions! Answer
                          correctly for $250, otherwise lose $100.
                        </p>
                        <h2 className="text-center text-2xl">
                          {quizQuestion.content}
                        </h2>
                        <div class="grid grid-cols-2 px-8 mt-3">
                          {quizQuestion.options.map((e, i) => (
                            <button
                              className={
                                "text-lg py-4 m-2 text-center border rounded-md __box transition-all " +
                                (quizQuestionStatus &&
                                  quizQuestionStatus[0] === i &&
                                  (quizQuestionStatus[1] === "correct"
                                    ? "text-white bg-green-600"
                                    : "text-white bg-red-600"))
                              }
                              disabled={
                                quizQuestionStatus &&
                                quizQuestionStatus[0] === i
                              }
                              onClick={() => {
                                const correct = i === quizQuestion.correct;
                                setQuizQuestionStatus(
                                  correct ? [i, "correct"] : [i, "incorrect"]
                                );

                                addEvent({
                                  name,
                                  type: "money-changed",
                                  amount: correct ? 250 : -100,
                                });
                                setTimeout(() => {
                                  setQuizQuestionStatus(null);
                                  setQuizQuestion(chooseRandom(quizQuestions));
                                }, 300);
                              }}
                            >
                              {e}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                    <h1 className="text-center text-4xl font-bold mt-10 mb-3">
                      Activity
                    </h1>
                    <p className="text-center mb-4">
                      See what everyone else is doing to achieve the dream.
                    </p>
                    <div className="text-center border-t border-gray-600 pt-4">
                      {game.eventsReversed
                        .map((e) => {
                          if (e.type === "user-joined") {
                            return `${e.name} joined the game`;
                          }
                          if (e.type === "update-user") {
                            return `${e.name}'s ${Object.keys(e.updates).join(
                              " & "
                            )} changed`;
                          }
                          if (e.type === "money-changed") {
                            return `${e.name} ${
                              e.amount < 0 ? "lost" : "earned"
                            } $${commaNumber(Math.abs(e.amount))}`;
                          }
                        })
                        .slice(0, 15)
                        .map((e) => (
                          <p className="text-sm">{e}</p>
                        ))}
                    </div>
                  </Panel>
                  <Panel className="w-1/5">
                    {name && (
                      <>
                        <h1 className="text-center text-2xl font-bold mb-3">
                          {name}
                        </h1>
                        <h1 class="text-center text-4xl font-bold mb-6">
                          ${commaNumber(profile.money)}
                        </h1>
                        <div class="text-lg leading-relaxed space-y-5">
                          <p>
                            Your Job:
                            <br /> {profile.job || "No Job Yet"}
                          </p>
                          <p className="text-green-500 font-bold">
                            Current Monthly Salary:
                            <br />${commaNumber(Math.round(profile.wage))}
                          </p>
                          <p className="text-red-500 font-bold">
                            Monthly Costs:
                            <br />${commaNumber(Math.round(profile.costs))}
                          </p>
                          <p>
                            Spouse:
                            <br />
                            {profile.spouse || "No Spouse"}
                          </p>
                          <p>
                            City:
                            <br />
                            {profile.city || "None - Currently Nomadic"}
                          </p>
                          <p>
                            Birth date:
                            <br />
                            {
                              months[Math.floor(profileNumberGenerator() * 12)]
                            }{" "}
                            {Math.floor(profileNumberGenerator() * 29)},{" "}
                            {Math.round(1896 + profileNumberGenerator() * 6)}
                          </p>
                          <p>
                            Favorite color:
                            <br />
                            {
                              [
                                "Blue",
                                "Green",
                                "Red",
                                "Yellow",
                                "Orange",
                                "Purple",
                                "Pink",
                                "Brown",
                                "Black",
                                "White",
                              ][Math.floor(profileNumberGenerator() * 10)]
                            }
                          </p>
                        </div>
                      </>
                    )}
                  </Panel>
                </div>
                <div class="flex w-full mt-4">
                  <Panel className="w-full text-center">
                    <h2 class="text-lg font-bold">{status}</h2>
                  </Panel>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
