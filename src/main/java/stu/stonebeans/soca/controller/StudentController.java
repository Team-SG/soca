package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.StudentVO;

@RestController
public class StudentController {

    private StudentSBO studentSBO;

    @Autowired
    public StudentController(StudentSBO studentSBO) {
        this.studentSBO = studentSBO;
    }

    // 이메일 중복 여부 체크
    @RequestMapping(value = "/checkDuplicateEmail", method = RequestMethod.POST)
    public boolean checkDuplicateEmail(@RequestBody StudentVO studentVO) {
        return studentSBO.checkDuplicateEmail(studentVO);
    }

    // 닉네임 중복 여부 체크
    @RequestMapping(value = "/checkDuplicateNickname", method = RequestMethod.POST)
    public boolean checkDuplicateStudentID(@RequestBody String nickname) {
        return studentSBO.checkDuplicateNickname(nickname);
    }
}
