package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReplyVO {
    private int replyNum, postNum, rereplyCnt;
    private String email, nickname, content, postTime;
    private boolean accusedYN, delYN;

    @Override
    public String toString() {
        return "ReplyVO{" +
                "replyNum=" + replyNum +
                ", postNum=" + postNum +
                ", rereplyCnt=" + rereplyCnt +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", postTime='" + postTime + '\'' +
                ", accusedYN=" + accusedYN +
                ", delYN=" + delYN +
                '}';
    }
}
