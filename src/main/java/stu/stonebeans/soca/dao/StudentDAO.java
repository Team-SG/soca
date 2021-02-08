package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.StudentVO;

@Mapper
public interface StudentDAO {
    // 이메일 중복 여부 체크
    public StudentVO checkDuplicateEmail(StudentVO studentVO);

    /*
        동빈-회원가입
    */
    // 닉네임 중복 여부 체크
    public StudentVO checkDuplicateNickname(String nickname);
    // 학번 중복 여부 체크
    public StudentVO checkDuplicateStudentID(String studentID);

}
