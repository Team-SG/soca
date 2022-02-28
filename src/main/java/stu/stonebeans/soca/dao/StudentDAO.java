package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.AskVO;
import stu.stonebeans.soca.vo.StudentVO;

import java.util.HashMap;
import java.util.List;

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

    // 비밀번호 변경
    public void changePassword(StudentVO student);

    // 마이페이지 정보변경
    public void changeMyPage(HashMap<String,String> map);

    // 기술 문의 보내기
    public void sendAsk(HashMap<String, String> map);

    public List<AskVO> getAsk();
    public List<AskVO> getAsk2();

    public AskVO getAskSelected(int num);

    void updateAsk(int askNum);
}