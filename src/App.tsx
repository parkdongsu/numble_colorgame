import React, { useEffect, useState } from "react";
import styled from "styled-components";

const App = () => {
  const boardSize: number = 360;
  const defalutTime: number = 15;
  const maxStage: number = 100;
  const degreeOfDifficulty: number = 2;

  const [tileSize, setTileSize] = useState<number>(boardSize / 2 - 4);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [stage, setStage] = useState<number>(1);
  const [time, setTime] = useState<number>(defalutTime);
  const [score, setScore] = useState<number>(0);
  const [numOfTiles, setNumOfTiles] = useState<number>();
  const [answer, setAnswer] = useState<number>(0);
  const [baseColor, setBaseColor] = useState<string>();
  const [answerColor, setAnswerColor] = useState<string>();

  useEffect(() => {
    setNumOfTiles(getSize(stage));
  }, [stage]);

  useEffect(() => {
    setTileSize(getTileSize(boardSize, numOfTiles));
    setAnswer(getRandomValue(numOfTiles));
    setBaseColor(getRandomColor());
  }, [stage, numOfTiles]);

  useEffect(() => {
    setAnswerColor(
      getSimilarColor(baseColor, stage, maxStage, degreeOfDifficulty)
    );
  }, [baseColor]);

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
    setTileSize(boardSize / 2 - 4);
    setScore(0);
    setIsPlaying(true);
  }, [isPlaying]);

  const getTileSize = (size, num) => {
    const length = size / Math.sqrt(num) - 4;
    return length;
  };

  const getSimilarColor = (color: string, value: number, limitValue: number, step: number) => {
    if (color != undefined) {
      const minRgbValue = 0x000000;
      let similarColor: string = "";
      const gap = (limitValue - value) * step;
      const beforeColor: string = color.replace("#", "0x");
      if (parseInt(beforeColor) - gap < minRgbValue) {
        similarColor = (parseInt(beforeColor) + gap).toString(16);
      } else {
        similarColor = (parseInt(beforeColor) - gap).toString(16);
      }
      similarColor = strToRgb(similarColor);
      return similarColor;
    }
  };

  const getRandomColor = () => {
    const preColor = Math.round(Math.random() * 0xffffff).toString(16);
    const color = strToRgb(preColor);
    return color;
  };

  const strToRgb = (str: string) => {
    let rgbValue: string = "";
    if (str.length < 6) {
      rgbValue = "#" + "0".repeat(6 - str.length) + str;
    } else {
      rgbValue = "#" + str;
    }
    return rgbValue;
  };

  const getRandomValue = (maxValue: number):number => {
    const value = Math.floor(Math.random() * maxValue);
    return value;
  };

  const getSize = (stage: number): number => {
    const size = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
    return size;
  };

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
        스테이지: {stage}, 남은 시간: {time}, 점수: {score}
      </Header>
      <GameBoard
        style={{
          display: `flex`,
          flexWrap: "wrap",
          width: `${boardSize}px`,
          height: `${boardSize}px`,
        }}
      >
        {Array.from(Array(numOfTiles), (v, index) => {
          return index == answer ? (
            <Tile
              key={index}
              style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                margin: `2px`,
                backgroundColor: `${answerColor}`,
              }}
              onClick={onClickAnswer}
            ></Tile>
          ) : (
            <Tile
              key={index}
              style={{
                width: `${tileSize}px`,
                height: `${tileSize}px`,
                margin: `2px`,
                backgroundColor: `${baseColor}`,
              }}
              onClick={onClickBase}
            ></Tile>
          );
        })}
      </GameBoard>
    </>
  );
};
export default App;

const Header = styled.header``;

const GameBoard = styled.div``;

const Tile = styled.div``;
