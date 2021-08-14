package stu.stonebeans.soca.sbo;

import stu.stonebeans.soca.vo.LikedVO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.ScheduleVO;
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

    // 시간표에 과목 넣기
    void insertSchedule(ScheduleVO schedule);

    // 전공 목록 가져오기
    List<SubjectVO> getMajor(SubjectVO subject);

    // 시간표에 중복 확인
    ResultVO checkDuplicateSchedule(ScheduleVO schedule);

    void deleteSchedule(ScheduleVO schedule);

    //해당학생이 해당과목의 강의평가를 완료하였는지 확인
   boolean isEvaluated(HashMap<String,String> map);

   List<LikedVO> findLiked(String email);
}
