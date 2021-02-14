package stu.stonebeans.soca.sbo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

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
        함수 : 회원가입
        설명 :
    */
    @Override
    public void register(StudentVO studentVO){
        String password= studentVO.getPassword();
        studentVO.setPassword(encryptSHA256(password));
        studentDAO.register(studentVO);
    }

    /*
        함수 : 로그인
        설명 : 사용자로부터 입력 받은 이메일과 패스워드로 인증 정보 확인
    */
    @Override
    public ResultVO login(String email, String password) {
        StudentVO emailCheck = studentDAO.checkDuplicateEmail(email);
        ResultVO result = new ResultVO();
        if(emailCheck == null || emailCheck.getUseYN().equals("N") ) {
            result.setStatus(-1);
            result.setMsg("존재하지 않는 이메일입니다.");
            return result;
        }

        String passwordCheck = studentDAO.login(email);
        if (passwordCheck.equals(encryptSHA256(password))) {
            result.setStatus(1);
        } else {
            result.setStatus(-1);
            result.setMsg("잘못된 비밀번호입니다.");
        }
        return result;
    }

    /*
        함수 : SHA256 암호화
        설명 : 파라미터로 넘어온 password 값을 SHA256 방식으로 암호화 하여 리턴
    */
    @Override
    public String encryptSHA256(String password) {
        String sha = "";
        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(password.getBytes());
            byte byteData[] = sh.digest();
            StringBuffer sb = new StringBuffer();
            for (int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
            }
            sha = sb.toString();
        } catch (NoSuchAlgorithmException e) {
            sha = null;
        }
        return sha;
    }

    /*
       함수 : 학생 정보 조회
       설명 : 파라미터로 넘어온 email 값으로 학생 정보 조회
   */
    @Override
    public StudentVO findStudent(String email) {
        StudentVO result = studentDAO.checkDuplicateEmail(email);
        return result;
    }

}
