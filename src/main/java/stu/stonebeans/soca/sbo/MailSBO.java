package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.MailVO;
import stu.stonebeans.soca.vo.ResultVO;

import javax.servlet.http.HttpSession;

public interface MailSBO {

    // 메일 발송
    ResultVO sendEmail(HttpSession session, String email);

    // 인증번호 전송 메일 정보 생성
    public MailVO createMailVerificationCodeInfo(String email, String verificationCode);

    // 비밀번호 전송 메일 정보 생성
    public MailVO createMailPasswordInfo(String email);

    // 랜덤 인증 번호 생성
    String getTempVerificationCode();

    // 랜덤 패스워드 생성
    String getTempPassword();
}
