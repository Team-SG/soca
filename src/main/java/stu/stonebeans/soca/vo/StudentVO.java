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
    private String nickname; //닉네임
    private String startedDate; // 계정 생성 일자
    private String useYN; // 사용여부
    private String passwordUpdate; // 패스워드 변경일

    @Override
    public String toString() {
        return "StudentVO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", startedDate='" + startedDate + '\'' +
                ", useYN='" + useYN + '\'' +
                ", passwordUpdate='" + passwordUpdate + '\'' +
                '}';
    }
}
