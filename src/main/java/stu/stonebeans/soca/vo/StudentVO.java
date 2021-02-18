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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
