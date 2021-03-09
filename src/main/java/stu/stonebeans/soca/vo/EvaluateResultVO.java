package stu.stonebeans.soca.vo;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EvaluateResultVO {
    private float evaluationAvg;
    private float qualityAvg;
    private float gradeSatisAvg;
    private float difficultyAvg;
    private float homeworkAvg;
    private float coverageAvg;
    private int evaluationCnt;

    @Override
    public String toString() {
        return "EvaluateResultVO{" +
                "evaluationAvg=" + evaluationAvg +
                ", qualityAvg=" + qualityAvg +
                ", gradeSatisAvg=" + gradeSatisAvg +
                ", difficultyAvg=" + difficultyAvg +
                ", homeworkAvg=" + homeworkAvg +
                ", coverageAvg=" + coverageAvg +
                ", evaluationCnt=" + evaluationCnt +
                '}';
    }

    public float getEvaluationAvg() {
        return evaluationAvg;
    }
}
