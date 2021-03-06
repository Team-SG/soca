package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.EvaluateResultVO;
import stu.stonebeans.soca.vo.EvaluateVO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;
import java.util.List;

public interface EvaluateSBO {

    // 해당 수업 데이터 가져오기
    SubjectVO getSubjectData(String subjectID);

    List<SubjectVO> getAllMajors();

    List<SubjectVO> findSubjects(int num);

    List<String> findProfBySubject(String nowItem, String num);

    List<SubjectVO> findSubByProf(String nowItem, String num);

    List<String> findProfBySubstr(String nowItem, String num);

    List<EvaluateVO> getRecentEval();

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);

    //학생의 강의 평가 결과를 가져옴
    EvaluateVO getEvaluateComplete(HashMap<String,String> map);

    //추천 했는지 여부를 확인
    boolean isRecommended( HashMap<String,Object> map);

    //추천하기
    void addRecommend(HashMap<String,Object> map);

    //추천해제하기
    void deleteRecommend(HashMap<String,Object> map);

    //강의평가 과목별 결과 가져오기/*HashMap<String,Object>*/
    EvaluateResultVO getEvaluateData(HashMap<String,String> map);

    //항목별 count 가져오기
    int[] getSelectCount(HashMap<String,String> map);
}
