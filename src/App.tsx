import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScoreBoard from "./components/ScoreBoard";
import GameBoard from "./components/GameBoard";

const App = () => {

  const defalutTime: number = 15;


  const [stage, setStage] = useState<number>(1);
  const [time, setTime] = useState<number>(defalutTime);
  const [score, setScore] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);



  useEffect(() => {
    if (time == 0) {
    setTimeout(() => {
        window.alert(`GAME OVER! \n스테이지: ${stage}, 점수: ${score}`);
        setIsPlaying(false);
    }, 200);
    }
    const countdown = setInterval(() => {
    setTime(time - 1);
    }, 1000);
    return () => clearInterval(countdown);
  }, [time]);

  useEffect(() => {
    setStage(1);
    setTime(defalutTime);
    setScore(0);
    setIsPlaying(true);
  }, [isPlaying]);

  const onClickAnswer = () => {
    setScore(score + Math.pow(stage, 3) * time);
    setStage(stage + 1);
    setTime(defalutTime);
  };

  const onClickBase = () => {
      if (time < 3) {
      setTime(0);
      } else {
      setTime(time - 3);
      }
  };

  return (
    <>
      <Header>
        <ScoreBoard stage={stage} time={time} score={score} />
      </Header>
      <Body>
        <GameBoard stage={stage} onClickAnswer={onClickAnswer} onClickBase={onClickBase} />
      </Body>
    </>
  );
};
export default App;

const Header = styled.header``;

const Body = styled.body``;


