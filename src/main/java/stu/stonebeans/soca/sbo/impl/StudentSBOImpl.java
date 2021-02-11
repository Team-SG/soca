package stu.stonebeans.soca.sbo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    @Override
    public boolean register(StudentVO studentVO){
        StudentVO result=studentDAO.register(studentVO);

        if(result!=null) return true;
        else return false;
    }

    @Override
    public ResultVO login(String email, String password) {
        StudentVO emailCheck = studentDAO.checkDuplicateEmail(email);
        ResultVO result = new ResultVO();
        if(emailCheck == null) {
            result.setStatus(-1);
            result.setMsg("존재하지 않는 이메일입니다.");
            return result;
        }

        String passwordCheck = studentDAO.login(email);

        if (passwordCheck.equals(encryptSHA256(password))) {
            result.setStatus(1);
        }
        else {
            result.setStatus(-1);
            result.setMsg("잘못된 비밀번호입니다.");
        }
        return result;
    }

    @Override
    public String encryptSHA256(String password) {
        String sha = "";
        try {
            MessageDigest sh = MessageDigest.getInstance("SHA-256");
            sh.update(password.getBytes());
            byte byteData[] = sh.digest();
            StringBuffer sb = new StringBuffer();
            for(int i = 0; i < byteData.length; i++) {
                sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));
            }
            sha = sb.toString();
        } catch(NoSuchAlgorithmException e) {
            sha = null;
        }
        return sha;
    }


}
