package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PostVO {
    private int postNum;
    private String title, email, content;
    private boolean solYN, delYN;
    private int view, replyNum;
    private String subjectID;

    @Override
    public String toString() {
        return "PostVO{" +
                "postNum=" + postNum +
                ", title=" + title +
                ", email=" + email +
                ", content=" + content +
                ", solYN=" + solYN +
                ", delYN=" + delYN +
                ", view=" + view +
                ", replyNum=" + replyNum +
                ", subjectID=" + subjectID +
                "}";
    }
}
