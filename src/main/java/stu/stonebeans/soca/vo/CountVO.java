package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class CountVO {
    private int options;
    private int cnt;

    public int getOptions() {
        return options;
    }

    public int getCnt() {
        return cnt;
    }
}
