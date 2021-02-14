package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.config.PropertyUtil;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.MailVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.dao.StudentDAO;

import javax.servlet.http.HttpSession;

@Service
@AllArgsConstructor
public class MailSBOImpl implements MailSBO {

    private StudentSBO studentSBO;
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = PropertyUtil.getProperty("spring.mail.username"); // application.properties 속성 불러오기

    /*
        함수 : 메일 발송
        설명 : 파라미터로 전달받은 email 주소로 메일 전송
            flag = 1 : 회원가입 과정에서 인증번호 발송
            flag = 2 : 비밀번호변경 과정에서 인증번호 발송
            flag = 3 : 비밀번호변경 과정에서 임시비밀번호 발송
    */
    @Override
    public ResultVO sendEmail(HttpSession session, String email, int flag) {
        String code = null;
        MailVO mailVO = null;
        if(flag == 1) {
            code = makeVerificationCode();
            mailVO = createMailRegisterVerificationCode(email, code);
        }
        else if(flag == 2) {
            code = makeVerificationCode();
            mailVO = createMailPasswordVerificationCode(email, code);
        }
        else if(flag == 3) {
            code = makeTempPassword();
            mailVO = createMailTempPassword(email, code);
        }
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailVO.getAddress());
        message.setFrom(FROM_ADDRESS);
        message.setSubject(mailVO.getTitle());
        message.setText(mailVO.getMessage());

        ResultVO resultVO = new ResultVO();
        try {
            if(flag == 1){
                mailSender.send(message);
                session.setAttribute("verificationCode", code);
                resultVO.setStatus(1);
                resultVO.setMsg("인증번호 전송이 완료되었습니다.");
            }
            else if(flag == 2){
                mailSender.send(message);
                session.setAttribute("verificationCode", code);
                resultVO.setStatus(1);
                resultVO.setMsg("인증번호 전송이 완료되었습니다.");
            }
            else if(flag == 3){
                mailSender.send(message);
                session.setAttribute("tempPassword", code);
                resultVO.setStatus(1);
                resultVO.setMsg("임시비밀번호 전송이 완료되었습니다.");
                studentSBO.changePassword(code, email);
            }
        } catch(Exception err) {
            resultVO.setStatus(-1);
            resultVO.setMsg("이메일 전송에 실패하였습니다.\n" + err.getMessage());
        }
        return resultVO;
    }

    /*
        함수 : 회원가입 시 인증번호 전송용 메일 정보 생성
        설명 : 회원가입 과정에서 인증번호를 전송하기 위해 필요한 메일 정보 생성
    */
    public MailVO createMailRegisterVerificationCode(String email, String code) {
        MailVO mailVO = new MailVO();
        mailVO.setAddress(email + "@sogang.ac.kr"); // 파라미터로 받은 서강대 이메일 주소로 메일 전송
        mailVO.setTitle("SOCA 회원가입 인증번호입니다.");
        mailVO.setMessage("SOCA 회원가입 인증번호 안내드립니다.\n" +
                "인증번호는 " + code + " 입니다.\n" +
                "회원가입 창에서 안내해드린 6자리 인증번호를 입력하시면 됩니다.");
        return mailVO;
    }

    /*
        함수 : 비밀번호변경 시 인증번호 전송용 메일 정보 생성
        설명 : 비밀번호변경 과정에서 인증번호를 전송하기 위해 필요한 메일 정보 생성
    */
    public MailVO createMailPasswordVerificationCode(String email, String code) {
        MailVO mailVO = new MailVO();
        mailVO.setAddress(email + "@sogang.ac.kr"); // 파라미터로 받은 서강대 이메일 주소로 메일 전송
        mailVO.setTitle("SOCA 임시비밀번호 변경 이메일 확인용 인증번호입니다.");
        mailVO.setMessage("SOCA 임시비밀번호 변경 이메일 확인용 인증번호 안내드립니다.\n" +
                "인증번호는 " + code + " 입니다.\n" +
                "인증번호란에 안내해드린 6자리 인증번호를 입력하시면 됩니다.");
        return mailVO;
    }

    /*
        함수 : 임시 비밀번호 전송용 메일 정보 생성
        설명 : 비밀번호변경 과정에서 임시로 만들어진 비밀번호를 전송하기 위해 필요한 메일 정보 생성
    */
    public MailVO createMailTempPassword(String email, String password) {
        MailVO mailVO = new MailVO();
        mailVO.setAddress(email + "@sogang.ac.kr"); // 파라미터로 받은 서강대 이메일 주소로 메일 전송
        mailVO.setTitle("SOCA 임시로 변경된 비밀번호입니다.");
        mailVO.setMessage("SOCA 임시로 변경된 비밀번호 안내드립니다.\n" +
                "임시비밀번호는 " + password + " 입니다.\n" +
                "안내해드린 8자리 비밀번호로 로그인하시면 됩니다.");
        return mailVO;
    }

    /*
        함수 : 랜덤 인증번호 생성
        설명 : [영문(대문자) or 숫자 6자] 조합의 총 6자리의 랜덤 인증번호 생성
    */
    @Override
    public String makeVerificationCode() {
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
        설명 : [영문(대문자) 4자 + 숫자 2자 + 특문 2자] 총 8자리의 랜덤 패스워드 생성
    */
    @Override
    public String makeTempPassword() {
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
        return str;
    }
}
