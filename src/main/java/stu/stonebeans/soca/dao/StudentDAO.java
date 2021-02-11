package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.StudentVO;

@Mapper
public interface StudentDAO {

    // 이메일 중복 여부 체크
    public StudentVO checkDuplicateEmail(String email);

    // 닉네임 중복 여부 체크
    public StudentVO checkDuplicateNickname(String nickname);

    // 회원가입
    public StudentVO register(StudentVO studentVO);

    // 로그인
    public String login(String email);
}
