package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;

import stu.stonebeans.soca.vo.EvaluateVO;
import stu.stonebeans.soca.vo.StudentVO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface EvaluateDAO {

    // 과목 정보 가져오기
    public SubjectVO getSubjectData(String subjectID);

    List<SubjectVO> getAllMajors();

    List<SubjectVO> getSubjectsBySub();

    List<SubjectVO> getSubjectsByProf();

    List<SubjectVO> getThisYearSubjects();

    List<SubjectVO> getThisYearProf();

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);

    //학생의 강의 평가 결과를 가져옴
    EvaluateVO getEvaluateResult(HashMap<String,String> map);
}
