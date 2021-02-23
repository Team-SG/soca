package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.ScheduleDAO;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.ResultVO;
import stu.stonebeans.soca.vo.ScheduleVO;
import stu.stonebeans.soca.vo.StudentVO;
import stu.stonebeans.soca.vo.SubjectVO;

import javax.security.auth.Subject;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class ScheduleSBOImpl implements ScheduleSBO {

    private final Logger logger = LoggerFactory.getLogger(ScheduleSBOImpl.class);

    @Autowired
    private ScheduleDAO scheduleDAO;

    /*
        함수 : 수강년도 및 학기 데이터 조회
        설명 : 과목 테이블에 존재하는 모든 수강년도와 학기 데이터를 조회
     */
    @Override
    public List<SubjectVO> getYearSemester() { return scheduleDAO.getYearSemester(); }

    /*
       함수 : 해당 수강년도 및 학기 수강과목 조회
       설명 : 로그인한 이용자의 선택 년도와 학기의 수강과목 목록을 조회
    */
    @Override
    public List<SubjectVO> getSubjectList(HashMap<String,String> map) {
        return scheduleDAO.getSubjectList(map);
    }

    @Override
    public List<SubjectVO> findSubjects(SubjectVO subject) {
        return scheduleDAO.findSubjects(subject);
    }

    @Override
    public void insertSchedule(ScheduleVO schedule) {
        scheduleDAO.insertSchedule(schedule);
    }

    @Override
    public List<SubjectVO> getMajor(SubjectVO subject) {
        return scheduleDAO.getMajor(subject);
    }

    @Override
    public ResultVO checkDuplicateSchedule(ScheduleVO schedule) {
        ScheduleVO check = scheduleDAO.checkDuplicateSchedule(schedule);
        ResultVO result = new ResultVO();
        if(check == null) {
            result.setStatus(1);
        } else {
            result.setStatus(-1);
            result.setMsg("이미 추가된 과목입니다.");
        }
        return result;
    }

    @Override
    public void deleteSchedule(ScheduleVO schedule) { scheduleDAO.deleteSchedule(schedule); }
}
