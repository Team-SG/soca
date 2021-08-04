package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PostVO {
    private int postNum;
    private String title, nickname, content, postTime;
    private boolean solYN, delYN;
    private int view, replyNum;
    private String subjectID, subjectNo;

    @Override
    public String toString() {
        return "PostVO{" +
                "postNum=" + postNum +
                ", title=" + title +
                ", nickname=" + nickname +
                ", content=" + content +
                ", postTime=" + postTime +
                ", solYN=" + solYN +
                ", delYN=" + delYN +
                ", view=" + view +
                ", replyNum=" + replyNum +
                ", subjectID=" + subjectID +
                ", subjectNo=" + subjectNo +
                "}";
    }
}
