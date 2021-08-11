package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReplyVO {
    private int replyNum, postNum;
    private String nickname, content, postTime;
    private boolean accusedYN;

    @Override
    public String toString() {
        return "ReplyVO{" +
                "replyNum=" + replyNum +
                ", postNum=" + postNum +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", replyTime='" + postTime + '\'' +
                ", accusedYN=" + accusedYN +
                '}';
    }
}
