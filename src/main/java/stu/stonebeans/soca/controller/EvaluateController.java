package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.HttpMediaTypeException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.vo.EvaluateVO;
import stu.stonebeans.soca.vo.SubjectVO;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@RestController
public class EvaluateController {

    private EvaluateSBO evaluateSBO;

    @Autowired
    public EvaluateController(EvaluateSBO evaluateSBO) { this.evaluateSBO = evaluateSBO; }

    @RequestMapping(value = "/getSubjectData", method = RequestMethod.POST)
    public SubjectVO getSubjectData(@RequestBody HashMap<String,String> map) {
        return evaluateSBO.getSubjectData(map.get("subjectID"));
    }

    @RequestMapping(value = "/getAllMajors", method = RequestMethod.POST)
    public List<SubjectVO> getMajor() {
        List<SubjectVO> subjectLists =  evaluateSBO.getAllMajors();
        return subjectLists;
    }

    @RequestMapping(value = "/getAllSubjects", method = RequestMethod.POST)
    public SubjectVO[] findSubjects(@RequestBody int num) {
        List<SubjectVO> subjectList = evaluateSBO.findSubjects(num);
        SubjectVO[] array = subjectList.toArray(new SubjectVO[subjectList.size()]);
        return array;
    }

    //강의 평가 결과를 저장
    @RequestMapping(value = "/saveEvaluateWrite",method=RequestMethod.POST)
    public void saveEvaluateWrite(HttpSession session, @RequestBody EvaluateVO evaluateVO){
        evaluateVO.setEmail((String)session.getAttribute("email"));
        evaluateSBO.saveEvaluateWrite(evaluateVO);
    }

    //학생의 강의 평가 결과를 가져옴
    @RequestMapping(value="/getEvaluateResult",method=RequestMethod.POST)
    public EvaluateVO getEvaluateResult(HttpSession session,@RequestBody HashMap<String,String> map){
        map.put("email",(String)session.getAttribute("email"));
        map.put("id","20211AAT200201");
        return evaluateSBO.getEvaluateResult(map);
    }
}
