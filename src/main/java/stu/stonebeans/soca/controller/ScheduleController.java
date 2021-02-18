package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.ScheduleSBO;
import stu.stonebeans.soca.vo.ScheduleVO;
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
    public List<SubjectVO> getSubjectList(HttpSession session,@RequestBody HashMap<String, String> map){
        HashMap<String,String> hmap=new HashMap<>();
        hmap.put("email",(String)session.getAttribute("email"));
        hmap.put("year", map.get("year"));
        hmap.put("semester",map.get("semester"));
        return scheduleSBO.getSubjectList(hmap);
    }

    @RequestMapping(value = "/findSubjects", method=RequestMethod.POST)
    public SubjectVO[] findSubjects(@RequestBody HashMap<String, String> map) {
        String yearSemester = map.get("yearSemester");
        SubjectVO subject = new SubjectVO();
        String year = yearSemester.substring(0, 4);
        String semester = yearSemester.substring(4, 5);
        subject.setYear(year);
        subject.setSemester(semester);
        List<SubjectVO> subjectList = scheduleSBO.findSubjects(subject);
        SubjectVO[] array = subjectList.toArray(new SubjectVO[subjectList.size()]);
        return array;
    }

    @RequestMapping(value = "/insertSubject", method=RequestMethod.POST)
    public void insertGridData(HttpSession session, @RequestBody HashMap<String, String> map) {
        //String s = map.get("subject");
        //SubjectVO subject = new SubjectVO();
        String email = (String)session.getAttribute("email");
        String subjectID = "20211AAT200201";
        ScheduleVO schedule = new ScheduleVO();
        schedule.setEmail(email);
        schedule.setSubjectID(subjectID);;
        scheduleSBO.insertSubject(schedule);
    }

    @RequestMapping(value = "/getMajor", method=RequestMethod.POST)
    public List<SubjectVO> getMajor(@RequestBody HashMap<String, String> map) {
        SubjectVO subject = new SubjectVO();
        subject.setYear(map.get("year"));
        subject.setSemester(map.get("semester"));
        return scheduleSBO.getMajor(subject);
    }
}
