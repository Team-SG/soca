package stu.stonebeans.soca.vo;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MailVO {
    private String address; // 보낼 이메일 주소
    private String title; // 제목
    private String message; // 내용
}
