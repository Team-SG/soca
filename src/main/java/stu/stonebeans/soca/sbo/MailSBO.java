package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.MailVO;

public interface MailSBO {

    // 메일 발송
    void sendEmail(String email);

    // 메일 정보 생성
    public MailVO createMailInfo(String email);

    // 랜덤 인증 번호 생성
    String getTempVerificationCode();

    // 랜덤 패스워드 생성
    String getTempPassword();
}
