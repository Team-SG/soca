package stu.stonebeans.soca.dao;

import org.apache.ibatis.annotations.Mapper;
import stu.stonebeans.soca.vo.ScheduleVO;
import stu.stonebeans.soca.vo.SubjectVO;

import java.util.HashMap;
import java.util.List;

@Mapper
public interface ScheduleDAO {

    // 수강년도 및 학기 데이터 가져오기
    public List<SubjectVO> getYearSemester();

    // 해당 수강년도 및 학기 수강과복 가져오기
    public List<SubjectVO> getSubjectList(HashMap<String,String> map);

    // 선택한 년도 및 학기 수강과목 가져오기
    public List<SubjectVO> findSubjects(SubjectVO subject);

    public void insertSchedule(ScheduleVO schedule);

    public List<SubjectVO> getMajor(SubjectVO subject);

    public ScheduleVO checkDuplicateSchedule(ScheduleVO schedule);

    public void deleteSchedule(ScheduleVO schedule);

    public List<ScheduleVO> getSchedule(ScheduleVO schedule);

    public SubjectVO getSubjectData(String subjectID);
}
