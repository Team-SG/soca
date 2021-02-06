package stu.stonebeans.soca.sbo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.StudentVO;

@Service
public class StudentSBOImpl implements StudentSBO {
    @Autowired
    private StudentDAO studentDAO;

    @Override
    public boolean checkDuplicateEmail(StudentVO studentVO) {
        StudentVO result = studentDAO.checkDuplicateEmail(studentVO);
        if(result != null) return false;
        else return true;
    }
}
