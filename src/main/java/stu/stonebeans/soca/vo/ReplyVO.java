package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReplyVO {
    private int replyNum, postNum, rereplyCnt;
    private String nickname, content, postTime;
    private boolean accusedYN;

    @Override
    public String toString() {
        return "ReplyVO{" +
                "replyNum=" + replyNum +
                ", postNum=" + postNum +
                ", rereplyCnt=" + rereplyCnt +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", postTime='" + postTime + '\'' +
                ", accusedYN=" + accusedYN +
                '}';
    }
}
