package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PostVO {
    private int postNum;
    private String title, email, nickname, content, postTime;
    private boolean solYN, delYN, accusedYN;
    private int viewCnt, replyNum;
    private String subjectID, subjectNo;

    @Override
    public String toString() {
        return "PostVO{" +
                "postNum=" + postNum +
                ", title='" + title + '\'' +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", postTime='" + postTime + '\'' +
                ", solYN=" + solYN +
                ", delYN=" + delYN +
                ", accuseYN=" + accusedYN +
                ", viewCnt=" + viewCnt +
                ", replyNum=" + replyNum +
                ", subjectID='" + subjectID + '\'' +
                ", subjectNo='" + subjectNo + '\'' +
                '}';
    }
}
