package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class AccuseVO {
    private int accuseNum, types, postNum;
    private String content;
    private boolean handleYN;

    @Override
    public String toString() {
        return "AskVO{" +
                "accuseNum=" + accuseNum +
                ", types=" + types +
                ", postNum=" + postNum +
                ", content='" + content + '\'' +
                ", handleYN=" + handleYN +
                '}';
    }
}
