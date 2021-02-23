package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;

import stu.stonebeans.soca.vo.StudentVO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.List;

@Mapper
public interface EvaluateDAO {

    // 이메일 중복 여부 체크
    public SubjectVO getSubjectData(String subjectID);

    List<SubjectVO> getAllMajors();

    List<SubjectVO> getSubjectsBySub();

    List<SubjectVO> getSubjectsByProf();
}
