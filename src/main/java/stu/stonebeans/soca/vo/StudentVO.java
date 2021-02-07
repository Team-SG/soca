package stu.stonebeans.soca.vo;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder

public class StudentVO {
    private String email; // 이메일
    private String password; // 패스워드
    private String nickname;

    @Override
    public String toString() {
        return "StudentVO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                '}';
    }
}
