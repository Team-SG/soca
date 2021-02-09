package stu.stonebeans.soca.vo;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ResultVO {
    private int status; // 상태 (성공이면 1, 실패면 -1)
    private String msg; // 메시지
}
