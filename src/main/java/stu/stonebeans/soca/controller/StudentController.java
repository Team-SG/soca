package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;

@RestController
public class StudentController {

    private StudentSBO studentSBO;
    private MailSBO mailSBO;

    @Autowired
    public StudentController(StudentSBO studentSBO, MailSBO mailSBO) {
        this.studentSBO = studentSBO;
        this.mailSBO = mailSBO;
    }

    // 이메일 중복 여부 확인 및 인증 메일 발송
    @RequestMapping(value = "/sendAuthEmail", method = RequestMethod.POST)
    public ResultVO sendAuthEmail(HttpSession session, HttpServletRequest httpServletRequest, @RequestBody HashMap<String, String> map) {
        String email = map.get("email");

        // 이메일 중복 여부 체크를 통과하였을 경우, 인증 메일 발송
        if(studentSBO.checkDuplicateEmail(email) == true) {
            return mailSBO.sendEmail(session, email, 1);
        } else {
            return new ResultVO(-1, "이미 사용 중인 이메일입니다.");
        }
    }

    // 닉네임 중복 여부 체크
    @RequestMapping(value = "/checkDuplicateNickname", method = RequestMethod.POST)
    public boolean checkDuplicateNickname(@RequestBody HashMap<String, String> map) {
        return studentSBO.checkDuplicateNickname(map.get("nickname"));
    }

  /*  // 회원가입
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void register(@RequestBody StudentVO studentVO) {
        studentSBO.register(studentVO);
    }

   */

    // 로그인
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResultVO login(HttpSession session, @RequestBody HashMap<String, String> map) {
        String email = map.get("email");
        String password = map.get("password");

        StudentVO student = studentSBO.findStudent(email);
        ResultVO result = studentSBO.login(email, password);
        if(result.getStatus() == 1) {
            session.setAttribute("email", email);
            session.setAttribute("nickname", student.getNickname());
        }
        return result;
    }

    // 로그아웃
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public boolean logout(HttpSession session) {
        session.removeAttribute("email");
        return true;
    }

    // 회원 정보 찾기
    @RequestMapping(value = "checkStudentInfo", method = RequestMethod.POST)
    public ResultVO checkStudentInfo(HttpSession session, @RequestBody HashMap<String, String> map) {
        boolean check = studentSBO.checkDuplicateEmail(map.get("email"));
        ResultVO result = new ResultVO();

        // 이메일이 존재하는 경우에만 인증 메일 전송
        if(check == true) {
            result.setStatus(-1);
            result.setMsg("존재하지 않는 이메일입니다.");
        } else {
            result.setStatus(1);
            mailSBO.sendEmail(session, map.get("email"), 1);
            result.setMsg("인증번호 전송이 완료되었습니다.");
        }
        return result;
    }

    // 회원 정보 찾기 화면에서 입력한 인증번호 확인
    @RequestMapping(value="loginAuthCheck", method = RequestMethod.POST)
    public ResultVO loginAuthCheck(HttpSession session, @RequestBody HashMap<String, String> map) {
        ResultVO result = new ResultVO();
        String authCode = map.get("authCode");
        String veriCode = (String)session.getAttribute("verificationCode");
        if(authCode.equals(veriCode)) {
            result.setStatus(1);
            result.setMsg("인증되었습니다. 임시 비밀번호를 보내드렸습니다.");
        }
        else {
            result.setStatus(-1);
            result.setMsg("잘못된 인증번호입니다.");
        }
        return result;
    }
}
