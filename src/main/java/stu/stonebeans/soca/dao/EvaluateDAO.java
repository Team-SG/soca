package stu.stonebeans.soca.dao;
import org.apache.ibatis.annotations.Mapper;

import stu.stonebeans.soca.vo.CountVO;
import stu.stonebeans.soca.vo.EvaluateResultVO;
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

    List<SubjectVO> findSubByProf(String nowItem);

    List<String> findThisYearProf(String nowItem);

    List<SubjectVO> findThisYearSub(String nowItem);

    List<String> findSubBySubstr(String nowItem);

    List<String> findThisYearBySubstr(String nowItem);

    List<EvaluateVO> getRecentEval(int num);

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);

    //학생의 강의 평가 결과를 가져옴
    EvaluateVO getEvaluateComplete(HashMap<String, String> map);

    //추천여부확인
    HashMap<String, Object> isRecommended(HashMap<String, Object> map);

    //추천하기
    void addRecommend(HashMap<String, Object> map);

    //추천해제하기
    void deleteRecommend(HashMap<String, Object> map);

    //강의평가 과목별 결과 가져오기
    EvaluateResultVO getEvaluateData(HashMap<String, String> map);

    //difficulty count 가져오기
    List<CountVO> getDiffCount(HashMap<String, String> map);

    //homework count 가져오기
    List<CountVO> getHomeCount(HashMap<String, String> map);

    //coverage count 가져오기
    List<CountVO> getCoverCount(HashMap<String, String> map);

    // 현재 과목, 교수의 최근 강의 평가
    List<EvaluateVO> getRecentSubjectEval(HashMap<String, String> map);

    //주어진 postNum의 강의 평가 결과를 가져옴
    EvaluateVO getEvalCompleteByPostNum(HashMap<String, Integer> map);
}
