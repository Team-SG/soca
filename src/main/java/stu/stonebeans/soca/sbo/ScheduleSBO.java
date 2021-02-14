package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.SubjectVO;

import java.util.List;

public interface ScheduleSBO {

    // 수강년도 및 학기 데이터 가져오기
    List<SubjectVO> getYearSemester();
}
