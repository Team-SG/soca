package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RereplyVO {
    private int rereplyNum, replyNum;
    private String nickname, content, postTime;
    private boolean accusedYN;

    @Override
    public String toString() {
        return "RereplyVO{" +
                "rereplyNum=" + rereplyNum +
                ", replyNum=" + replyNum +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", postTime='" + postTime + '\'' +
                ", accusedYN=" + accusedYN +
                '}';
    }
}
