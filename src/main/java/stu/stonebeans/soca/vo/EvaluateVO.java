package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EvaluateVO {
    private static int postNum=0;
    private String subjectID;
    private int evaluation,grade,quality, gradeSatis, difficulty, homework, coverage, testNum;
    private float score1, score2, score3, score4,average1,average2,average3,average4,rank1,rank2,rank3,rank4;
    private String commentFinal,commentTest;
    private int recommendNum;

    public void increasePostNum(){
        postNum++;
    }
}
