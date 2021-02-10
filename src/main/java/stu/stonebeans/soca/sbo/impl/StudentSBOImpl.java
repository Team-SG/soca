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
    public boolean checkDuplicateEmail(String email) {
        StudentVO result = studentDAO.checkDuplicateEmail(email);

        // 해당 이메일을 가진 사용자가 없을 경우, 해당 이메일 사용이 가능하므로 true
        // 해당 이메일을 가진 사용자가 있을 경우, 해당 이메일 사용이 불가능하므로 false
        if(result == null) return true;
        else return false;
    }

    /*
        함수 : 닉네임 중복 여부 체크
        설명 : Student 테이블에 해당 닉네임을 가진 사용자가 존재하는지 확인
    */
    @Override
    public boolean checkDuplicateNickname(String nickname) {
        StudentVO result = studentDAO.checkDuplicateNickname(nickname);

        // 해당 닉네임을 가진 사용자가 없을 경우, 해당 닉네임 사용이 가능하므로 true
        // 해당 닉네임을 가진 사용자가 있을 경우, 해당 닉네임 사용이 불가능하므로 false
        if(result == null) return true;
        else return false;
    }

    /*
        함수 : 학번 중복 여부 체크
        설명 : Student 테이블에 해당 학번을 가진 사용자가 존재하는지 확인
    */
    @Override
    public boolean checkDuplicateStudentID(String studentID) {
        StudentVO result = studentDAO.checkDuplicateStudentID(studentID);

        // 해당 학번을 가진 사용자가 없을 경우, 정상적으로 입력을 하였으므로 true
        // 해당 학번을 가진 사용자가 있을 경우, 누군가 잘못 입력하였으므로 false
        if(result == null) return true;
        else return false;
    }
}
