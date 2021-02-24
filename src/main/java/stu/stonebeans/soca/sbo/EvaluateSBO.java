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

    //강의 평가 저장하기
    void saveEvaluateWrite(EvaluateVO evaluateVO);
}
