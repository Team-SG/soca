package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class RereplyVO {
    private int rereplyNum, replyNum;
    private String email, nickname, content, postTime;
    private boolean accusedYN, delYN;

    @Override
    public String toString() {
        return "RereplyVO{" +
                "rereplyNum=" + rereplyNum +
                ", replyNum=" + replyNum +
                ", email='" + email + '\'' +
                ", nickname='" + nickname + '\'' +
                ", content='" + content + '\'' +
                ", postTime='" + postTime + '\'' +
                ", accusedYN=" + accusedYN +
                ", delYN=" + delYN +
                '}';
    }
}
