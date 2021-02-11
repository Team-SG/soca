package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.MailVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.util.HashMap;
import java.util.Map;

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
    public ResultVO sendAuthEmail(@RequestBody HashMap<String, String> map) {
        ResultVO resultVO = new ResultVO();
        String email = map.get("email");

        // 이메일 중복 여부 체크를 통과하였을 경우, 인증 메일 발송
        if(studentSBO.checkDuplicateEmail(email) == true) {
            mailSBO.sendEmail(email);
            resultVO.setStatus(1);
            resultVO.setMsg("인증번호 전송이 완료되었습니다.");
        } else {
            resultVO.setStatus(-1);
            resultVO.setMsg("이미 사용 중인 이메일 입니다.");
        }
        return resultVO;
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
}
