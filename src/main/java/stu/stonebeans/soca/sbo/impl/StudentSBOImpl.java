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

    /*
        함수 : 패스워드 조건 여부 충족 체크
        설명 : 패스워드가 영문+숫자+특수문자 조합 8자~20자인지 확인
    */
    @Override
    public boolean checkPasswordCondition(String password){
        // password가 8자 미만 20자 초과일 경우 false
        if( password.length() < 8 || password.length() > 20 ) return false;
        else {
            int english = 0,number = 0,character = 0;
            for( int i=0;i<password.length();i++){
                char passwordChar=password.charAt(i);
                if(('A'<= passwordChar && passwordChar <= 'Z') || ('a'<= passwordChar && passwordChar <= 'z'))
                    english++;
                else if( '0'<= passwordChar && passwordChar <= '9')
                    number++;
                else character++;
            }
            if( english ==0 || number ==0 || character == 0) return false;
            else return true;
        }
    }

    /*
        함수 : 패스워드 일치 여부 체크
        설명 : 입력한 두 패스워드가 일치하는 지 여부 확인
    */
    @Override
    public boolean checkPasswordAgreement(String source, String target) {
       if(source.equals(target)) return true;
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
