package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.SubjectVO;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@RestController
public class ScheduleController {

    private ScheduleSBO scheduleSBO;

    @Autowired
    public ScheduleController(ScheduleSBO scheduleSBO) {
        this.scheduleSBO = scheduleSBO;
    }

    // 수강년도 및 학기 데이터 가져오기
    @RequestMapping(value = "/getYearSemester", method = RequestMethod.POST)
    public List<SubjectVO> getYearSemester() {
        return scheduleSBO.getYearSemester();
    }

    // 해당 수강년도 및 학기에 수강과목 가져오기
    @RequestMapping(value = "/getSubjectList", method=RequestMethod.POST)
    public List<SubjectVO> getSubjectList(HttpSession session, HashMap<String, String> map){
        HashMap<String,String> hmap=new HashMap<>();
        hmap.put("email",(String)session.getAttribute("email"));
        hmap.put("year", map.get("year"));
        hmap.put("semester",map.get("semester"));
        return scheduleSBO.getSubjectList(hmap);
    }
}
