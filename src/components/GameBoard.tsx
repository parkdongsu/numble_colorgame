import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface GameBoardProps {
    stage: number
    onClickAnswer: any
    onClickBase: any
}

const GameBoard = ({ stage, onClickAnswer, onClickBase }: GameBoardProps) => {

    const maxStage: number = 100;
    const degreeOfDifficulty: number = 2;
    const boardSize: number = 360;

    const [tileSize, setTileSize] = useState<number>(boardSize / 2 - 4);
    const [numOfTiles, setNumOfTiles] = useState<number>();
    const [answer, setAnswer] = useState<number>(0);
    const [baseColor, setBaseColor] = useState<string>();
    const [answerColor, setAnswerColor] = useState<string>();
    const [checkTileNums, setCheckTileNums] = useState<number>(numOfTiles);

    useEffect(() => {
        setNumOfTiles(getSize(stage));
        setCheckTileNums(numOfTiles)
    }, [stage]);

    useEffect(() => {
        setTileSize(getTileSize(boardSize, numOfTiles));
        setAnswer(getRandomValue(numOfTiles));
        setBaseColor(getRandomColor());
    }, [checkTileNums,numOfTiles]);
    
    useEffect(() => {
        setAnswerColor(
        getSimilarColor(baseColor, stage, maxStage, degreeOfDifficulty)
        );
    }, [baseColor]);

    const getSize = (stage: number): number => {
        const size = Math.pow(Math.round((stage + 0.5) / 2) + 1, 2);
        return size;
    };

    const getTileSize = (size: number, num: number):number  => {
        let length = size / Math.sqrt(num) - 4;
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

    return(
        <Board style={{
            display: `flex`,
            flexWrap: "wrap",
            width: `${boardSize}px`,
            height: `${boardSize}px`,
        }}>
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
            </Board>
    )
}

export default GameBoard;

const Board = styled.div``
const Tile = styled.div``;
