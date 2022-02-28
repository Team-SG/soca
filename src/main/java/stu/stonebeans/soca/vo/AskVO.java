package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AskVO {
    private int askNum;
    private String email, content;
    private boolean handleYN;
    private String postTime, nickname;

    @Override
    public String toString() {
        return "AskVO{" +
                "askNum=" + askNum +
                ", email='" + email + '\'' +
                ", content='" + content + '\'' +
                ", handleYN=" + handleYN +
                ", postTime'" + postTime + '\'' +
                ", nickname'" + nickname + '\'' +
                '}';
    }
}
