package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.MailVO;
import stu.stonebeans.soca.vo.ResultVO;

import javax.servlet.http.HttpSession;

public interface MailSBO {

    // 메일 발송
    ResultVO sendEmail(HttpSession session, String email, int flag);

    // 회원가입 시 인증번호 전송용 메일 정보 생성
    public MailVO createMailRegisterVerificationCode(String email, String verificationCode);

    // 비밀번호변경 시 인증번호 전송용 메일 정보 생성
    public MailVO createMailPasswordVerificationCode(String email, String verificationCode);

    // 임시 비밀번호 전송용 메일 정보 생성
    public MailVO createMailTempPassword(String email, String password);

    // 랜덤 인증번호 생성
    String makeVerificationCode();

    // 랜덤 패스워드 생성
    String makeTempPassword();
}
