package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.config.PropertyUtil;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.vo.MailVO;

@Service
@AllArgsConstructor
public class MailSBOImpl implements MailSBO {
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = PropertyUtil.getProperty("spring.mail.username"); // application.properties 속성 불러오기

    /*
        함수 : 메일 발송
        설명 :
    */
    @Override
    public void sendEmail(String email) {
        MailVO mailVO = createMailVerificationCodeInfo(email);
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailVO.getAddress());
        message.setFrom(FROM_ADDRESS);
        message.setSubject(mailVO.getTitle());
        message.setText(mailVO.getMessage());
        mailSender.send(message);
    }

    /*
        함수 : 인증번호 전송용 메일 정보 생성
        설명 :
    */
    public MailVO createMailVerificationCodeInfo(String email) {
        MailVO mailVO = new MailVO();
        mailVO.setAddress(email + "@sogang.ac.kr"); // 파라미터로 받은 서강대 이메일 주소로 메일 전송
        mailVO.setTitle("SOCA 회원가입 인증번호입니다.");
        mailVO.setMessage("SOCA 회원가입 인증번호 안내드립니다.\n" +
                "인증번호는 " +getTempVerificationCode() + " 입니다.\n" +
                "회원가입 창에서 안내해드린 6자리 인증번호를 입력하시면 됩니다.");
        return mailVO;
    }

    /*
        함수 : 임시 비밀번호 전송용 메일 정보 생성
        설명 :
    */
    public MailVO createMailPasswordInfo(String email) {
        MailVO mailVO = new MailVO();
        mailVO.setAddress(email + "@sogang.ac.kr"); // 나중에 이 부분 파라미터로 받은 email로 변경 필요
        mailVO.setTitle("SOCA 임시로 변경된 비밀번호입니다.");
        mailVO.setMessage("SOCA 임시로 변경된 비밀번호 안내드립니다.\n" +
                "임시비밀번호는 " + getTempPassword() + " 입니다.\n" +
                "안내해드린 8자리 비밀번호로 로그인하시면 됩니다.");
        return mailVO;
    }

    /*
        함수 : 랜덤 인증 번호 생성
        설명 :
    */
    @Override
    public String getTempVerificationCode() {
        char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
                'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

        String str = "";

        int idx = 0;
        for (int i = 0; i < 6; i++) {
            idx = (int) (charSet.length * Math.random());
            str += charSet[idx];
        }
        return str;
    }

    /*
        함수 : 랜덤 패스워드 생성
        설명 :
    */
    @Override
    public String getTempPassword() {
        char[] charSet1 = new char[] {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
                'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };
        char[] charSet2 = new char[] {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};
        char[] charSet3 = new char[] {'!', '@', '#', '$', '%', '^', '&', '*', '(', ')'};
        String str = "";

        int idx = 0;
        for (int i = 0; i < 4; i++) {
            idx = (int) (charSet1.length * Math.random());
            str += charSet1[idx];
        }
        for (int i = 0; i < 2; i++) {
            idx = (int) (charSet2.length * Math.random());
            str += charSet2[idx];
        }
        for (int i = 0; i < 2; i++) {
            idx = (int) (charSet3.length * Math.random());
            str += charSet3[idx];
        }
        return str; // 임시비밀번호의 경우 영문4자+숫자2자+특문2자 랜덤으로 8자리가 되도록 설정
    }
}
