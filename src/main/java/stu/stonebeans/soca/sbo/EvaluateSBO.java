package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.SubjectVO;

import java.util.List;

public interface EvaluateSBO {

    // 해당 수업 데이터 가져오기
    SubjectVO getSubjectData(String subjectID);

    List<SubjectVO> getAllMajors();

    List<SubjectVO> findSubjects();
}
