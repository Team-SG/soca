package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stu.stonebeans.soca.dao.StudentDAO;
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

    // 인증번호 동일 여부 체크
    @RequestMapping(value = "/checkAuthCode", method = RequestMethod.POST)
    public boolean checkAuthCode(HttpSession session, @RequestBody HashMap<String, String> map) {
        String verificationCode = (String) session.getAttribute("verificationCode");
        return map.get("AuthCode").equals(verificationCode);
    }

    // 닉네임 중복 여부 체크
    @RequestMapping(value = "/checkDuplicateNickname", method = RequestMethod.POST)
    public boolean checkDuplicateNickname(@RequestBody HashMap<String, String> map) {
        return studentSBO.checkDuplicateNickname(map.get("nickname"));
    }

   // 회원가입
    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public void register(@RequestBody StudentVO studentVO) {
        studentSBO.register(studentVO);
    }

    // 마이페이지 정보 변경
    @RequestMapping(value="/changeMyPage",method=RequestMethod.POST)
    public void changeMyPage(HttpSession session,@RequestBody StudentVO studentVO){
        HashMap<String,String> map=new HashMap<>();
        map.put("currentEmail",(String)session.getAttribute("email"));
        map.put("newEmail",studentVO.getEmail());
        map.put("newNickname",studentVO.getNickname());

        session.setAttribute("email",studentVO.getEmail());
        session.setAttribute("nickname",studentVO.getNickname());

        studentSBO.changeMyPage(map);
    }


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

    // 회원 정보 조회
    @RequestMapping(value = "checkStudentInfo", method = RequestMethod.POST)
    public ResultVO checkStudentInfo(HttpSession session, @RequestBody HashMap<String, String> map) {
        boolean check = studentSBO.checkDuplicateEmail(map.get("email"));
        ResultVO result = new ResultVO();

        if(check == true)
        {
            result.setStatus(-1);
            result.setMsg("존재하지 않는 이메일입니다.");
        }
        else
        {
            result = mailSBO.sendEmail(session, map.get("email"), 2);
        }
        return result;
    }

    @RequestMapping(value="loginAuthCheck", method = RequestMethod.POST)
    public ResultVO loginAuthCheck(HttpSession session, @RequestBody HashMap<String, String> map) {
        ResultVO result = new ResultVO();
        String authCode = map.get("authCode");
        String veriCode = (String)session.getAttribute("verificationCode");
        if(authCode.equals(veriCode)) {
            result = mailSBO.sendEmail(session, map.get("email"), 3);
        }
        else {
            result.setStatus(-1);
            result.setMsg("잘못된 인증번호입니다.");
        }
        return result;
    }


    // 패스워드를 변경할 경우
    @RequestMapping(value="/passwordChange",method=RequestMethod.POST)
    public ResultVO passwordChange(HttpSession session, @RequestBody HashMap<String,String> map){
        ResultVO result=new ResultVO();
        String email=(String)session.getAttribute("email");
        String currentPassword=map.get("currentPassword");
        String newPassword=map.get("password");

        String password=studentSBO.findStudent(email).getPassword();
        if(studentSBO.encryptSHA256(currentPassword).equals(password)){
            if(currentPassword.equals(newPassword)){
                result.setStatus(-2);
                result.setMsg("현재 비밀번호와 다른 비밀번호로 설정하십시오.");
            }
            else{
                studentSBO.changePassword(newPassword,email);
                result.setStatus(1);
                result.setMsg("비밀번호 변경을 완료했습니다.");
            }
        }
        else{
            result.setStatus(-1);
            result.setMsg("현재 비밀번호가 일치하지 않습니다.");
        }
         return result;
    }

    // 마이페이지에서 이메일 중복 여부 확인 및 인증 메일 발송
    @RequestMapping(value = "/sendAuthMyEmail", method = RequestMethod.POST)
    public ResultVO sendAuthMyEmail(HttpSession session, HttpServletRequest httpServletRequest, @RequestBody HashMap<String, String> map) {
        String email = map.get("email");

        // 이메일 중복 여부 체크를 통과하였을 경우, 인증 메일 발송
        if(studentSBO.checkDuplicateEmail(email) == true) {
            return mailSBO.sendEmail(session, email, 4);
        } else {
            return new ResultVO(-1, "이미 사용 중인 이메일입니다.");
        }
    }
}
