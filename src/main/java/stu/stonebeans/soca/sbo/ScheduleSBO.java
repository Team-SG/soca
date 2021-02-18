package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;
import java.util.List;

public interface ScheduleSBO {

    // 수강년도 및 학기 데이터 가져오기
    List<SubjectVO> getYearSemester();

    // 해당 수강년도 및 학기 수강과목 가져오기
    List<SubjectVO> getSubjectList(HashMap<String,String> map);

    // 과목 목록 가져오기
    List<SubjectVO> findSubjects(SubjectVO subject);

    //
    void insertSubject(SubjectVO subject);
}
