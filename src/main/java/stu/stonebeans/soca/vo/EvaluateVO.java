package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EvaluateVO {
    private static int postNum;
    private String email, subjectID;
    private int evaluation,quality, gradeSatis, difficulty, homework, coverage, testNum;
    private String grade;
    private float score1, score2, score3, score4,average1,average2,average3,average4,rank1,rank2,rank3,rank4;
    private String commentFinal,commentTest;
    private int recommendNum;

    public void setEmail(String email) {
        this.email = email;
    }
}
