package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.dao.ScheduleDAO;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.*;

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
        ScheduleVO duplicateCheck = scheduleDAO.checkDuplicateSchedule(schedule);
        List<ScheduleVO> allSchedule = scheduleDAO.getSchedule(schedule);
        ResultVO result = new ResultVO();
        result.setStatus(1);
        if(duplicateCheck != null) {
            result.setStatus(-1);
            result.setMsg("이미 추가된 과목입니다.");
        } else {
            SubjectVO nowSubject = scheduleDAO.getSubjectData(schedule.getSubjectID());
            int credit = 0;
            int i;
            for(i = 0; i < allSchedule.size(); i++) {
                SubjectVO Subjects = scheduleDAO.getSubjectData(allSchedule.get(i).getSubjectID());
                credit += Subjects.getCredit();
                if(Subjects.getTime().equals(nowSubject.getTime()))
                    break; //time 겹치는거 제거 알고리즘 생각해봐야할텐데..
            }
            credit += nowSubject.getCredit();
            if(credit > 22) {
                result.setStatus(-1);
                result.setMsg("최대 수강 학점을 초과하였습니다.");
            } else if(i != allSchedule.size()) {
                result.setStatus(-1);
                result.setMsg("수강 시간이 겹치는 과목이 추가되었습니다.");
            }
        }
        return result;
    }

    @Override
    public void deleteSchedule(ScheduleVO schedule) { scheduleDAO.deleteSchedule(schedule); }

    /*
        함수:강의평가를 완료하였는지 확인
        설명: 로그인한 학생이 해당과목의 강의 평가를 완료하였는지 확인
     */
    @Override
    public boolean isEvaluated(HashMap<String,String> map){
        ScheduleVO result=scheduleDAO.isEvaluated(map);
        if(result.getEvaluateYN().equals("Y")) return true;
        else return false;
    }

    @Override
    public List<LikedVO> findLiked(String email) {
        return scheduleDAO.findLiked(email);
    }
}
