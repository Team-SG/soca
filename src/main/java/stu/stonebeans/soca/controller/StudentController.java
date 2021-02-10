package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.util.HashMap;
import java.util.Map;

@RestController
public class StudentController {

    private StudentSBO studentSBO;

    @Autowired
    public StudentController(StudentSBO studentSBO) {
        this.studentSBO = studentSBO;
    }

    // 이메일 중복 여부 확인 및 인증 번호 전송
    @RequestMapping(value = "/sendAuthEmail", method = RequestMethod.POST)
    public ResultVO sendAuthEmail(@RequestBody HashMap<String, String> map) {
        ResultVO resultVO = new ResultVO();
        if(studentSBO.checkDuplicateEmail(map.get("email")) == true) {
            // 인증 번호 전송
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
    public boolean checkDuplicateStudentID(@RequestBody String nickname) {
        return studentSBO.checkDuplicateNickname(nickname);
    }
}
