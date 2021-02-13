package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

public interface StudentSBO {

    // 이메일 중복 여부 체크
    boolean checkDuplicateEmail(String email);

    // 인증번호 동일 확인
    boolean checkAuthCode(String code);

    // 닉네임 중복 확인
    boolean checkDuplicateNickname(String nickname);

    // 회원가입
    boolean register(StudentVO studentVO);

    // 로그인
    ResultVO login(String email, String password);

    // 비밀번호 SHA256 암호화
    String encryptSHA256(String password);
}
