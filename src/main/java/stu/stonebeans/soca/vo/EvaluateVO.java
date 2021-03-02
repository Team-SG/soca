package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class EvaluateVO {
    private int postNum;
    private String email, subjectID;
    private int evaluation,quality, gradeSatis, difficulty, homework, coverage, testNum;
    private String grade;
    private float score1, score2, score3, score4,average1,average2,average3,average4,rank1,rank2,rank3,rank4;
    private String commentFinal,commentTest;
    private int recommendNum;

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "EvaluateVO{" +
                "postNum=" + postNum +
                ", email='" + email + '\'' +
                ", subjectID='" + subjectID + '\'' +
                ", evaluation=" + evaluation +
                ", quality=" + quality +
                ", gradeSatis=" + gradeSatis +
                ", difficulty=" + difficulty +
                ", homework=" + homework +
                ", coverage=" + coverage +
                ", testNum=" + testNum +
                ", grade='" + grade + '\'' +
                ", score1=" + score1 +
                ", score2=" + score2 +
                ", score3=" + score3 +
                ", score4=" + score4 +
                ", average1=" + average1 +
                ", average2=" + average2 +
                ", average3=" + average3 +
                ", average4=" + average4 +
                ", rank1=" + rank1 +
                ", rank2=" + rank2 +
                ", rank3=" + rank3 +
                ", rank4=" + rank4 +
                ", commentFinal='" + commentFinal + '\'' +
                ", commentTest='" + commentTest + '\'' +
                ", recommendNum=" + recommendNum +
                '}';
    }
}
