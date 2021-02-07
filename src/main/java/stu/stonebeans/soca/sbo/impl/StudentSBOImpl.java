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

    /*
        함수 : 이메일 중복 여부 체크
        설명 : Student 테이블에 해당 이메일을 가진 사용자가 존재하는지 확인
     */
    @Override
    public boolean checkDuplicateEmail(StudentVO studentVO) {
        StudentVO result = studentDAO.checkDuplicateEmail(studentVO);

        // 해당 이메일을 가진 사용자가 없을 경우, 해당 이메일 사용이 가능하므로 true
        // 해당 이메일을 가진 사용자가 있을 경우, 해당 이메일 사용이 불가능하므로 false
        if(result == null) return true;
        else return false;
    }
}
