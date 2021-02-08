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
    private String studentID; //학번

    @Override
    public String toString() {
        return "StudentVO{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", nickname='" + nickname + '\'' +
                ", studentID='" + studentID + '\'' +
                '}';
    }
}
