import React from "react";

interface ScoreBoardProps {
    stage: number
    time: number
    score: number
}

const ScoreBoard = ({stage, time, score}: ScoreBoardProps) => {
    
    return(
        <div>
            스테이지: {stage}, 남은 시간: {time}, 점수: {score}
        </div>
    )
}

export default ScoreBoard;