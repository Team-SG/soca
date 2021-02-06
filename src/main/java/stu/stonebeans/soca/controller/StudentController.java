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

    @RequestMapping(value = "/checkDuplicateEmail", method = RequestMethod.POST)
    public boolean checkDuplicateEmail(@RequestBody StudentVO studentVO) {
        return studentSBO.checkDuplicateEmail(studentVO);
    }
}
