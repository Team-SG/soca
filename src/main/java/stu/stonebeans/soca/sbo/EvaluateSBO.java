package stu.stonebeans.soca.sbo;

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

    List<String> findSubByProf(String nowItem, String num);

    List<EvaluateVO> getRecentEval();

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);

    //학생의 강의 평가 결과를 가져옴
    EvaluateVO getEvaluateResult(HashMap<String,String> map);
}
