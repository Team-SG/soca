package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;

import stu.stonebeans.soca.vo.EvaluateVO;
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

    List<String> findProfBySubject(String nowItem);

    List<String> findSubByProf(String nowItem);

    List<String> findThisYearProf(String nowItem);

    List<String> findThisYearSub(String nowItem);

    List<EvaluateVO> getRecentEval();

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);

    //학생의 강의 평가 결과를 가져옴
    EvaluateVO getEvaluateResult(HashMap<String,String> map);

    //추천여부확인
    HashMap<String,Object> isRecommended( HashMap<String,Object> map);

    //추천하기
    void addRecommend(HashMap<String,Object> map);

    //추천해제하기
    void deleteRecommend(HashMap<String,Object> map);
}
