package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.AskVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.util.HashMap;
import java.util.List;

public interface StudentSBO {

    // 이메일 중복 여부 체크
    boolean checkDuplicateEmail(String email);

    // 닉네임 중복 확인
    boolean checkDuplicateNickname(String nickname);

    // 회원가입
    void register(StudentVO studentVO);

    // 로그인
    ResultVO login(String email, String password);

    // 비밀번호 SHA256 암호화
    String encryptSHA256(String password);

    // 학생 정보 조회
    StudentVO findStudent(String email);

    // 비밀번호 변경
    void changePassword(String password, String email);

    // 마이페이지 정보 변경
    void changeMyPage(HashMap<String,String> map);

    // 기술 문의 보내기
    void sendAsk(HashMap<String, String> map);

    List<AskVO> getAsk(int checked);
}
