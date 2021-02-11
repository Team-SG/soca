package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.StudentVO;

@Mapper
public interface StudentDAO {

    // 이메일 중복 여부 체크
    public StudentVO checkDuplicateEmail(String email);

    // 닉네임 중복 여부 체크
    public StudentVO checkDuplicateNickname(String nickname);

    // register
    public StudentVO register(StudentVO studentVO);

    // login
    public String login(String email);
}
