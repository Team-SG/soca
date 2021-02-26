package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    // 전공 종류 가져오기
    @RequestMapping(value = "/getAllMajors", method = RequestMethod.POST)
    public List<SubjectVO> getMajor() {
        List<SubjectVO> subjectLists =  evaluateSBO.getAllMajors();
        return subjectLists;
    }

    // 과목 가져오기
    @RequestMapping(value = "/getAllSubjects", method = RequestMethod.POST)
    public SubjectVO[] findSubjects(@RequestBody int num) {
        List<SubjectVO> subjectList = evaluateSBO.findSubjects(num);
        SubjectVO[] array = subjectList.toArray(new SubjectVO[subjectList.size()]);
        return array;
    }

    // 과목으로 교수명 가져오기
    @RequestMapping(value = "/findProfBySubject", method = RequestMethod.POST)
    public List<String> findProfBySubject(@RequestBody HashMap<String, String> map) {
        String nowItem = map.get("nowItem");
        String num = map.get("num");
        List<String> returnVal = evaluateSBO.findProfBySubject(nowItem, num);
        return returnVal;
    }

    // 교수명으로 과목 가져오기
    @RequestMapping(value = "/findSubByProf", method = RequestMethod.POST)
    public List<String> findSubByProf(@RequestBody HashMap<String, String> map) {
        String nowItem = map.get("nowItem");
        String num = map.get("num");
        List<String> returnVal = evaluateSBO.findSubByProf(nowItem, num);
        return returnVal;
    }

    // 최근 강의 평가 가져오기
    @RequestMapping(value = "/getRecentEval", method = RequestMethod.POST)
    public List<EvaluateVO> getRecentEval() {
        return evaluateSBO.getRecentEval();
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
        return evaluateSBO.getEvaluateResult(map);
    }

    //추천 했는지 여부를 확인
    @RequestMapping(value="/isRecommended",method=RequestMethod.POST)
    public boolean isRecommended(HttpSession session, @RequestBody HashMap<String,Object> map){
        map.put("email",(String)session.getAttribute("email"));
        return evaluateSBO.isRecommended(map);
    }

    //추천 or 추천해제
    @RequestMapping(value="/RecommendOrNot",method=RequestMethod.POST)
    public boolean RecommendOrNot(HttpSession session,@RequestBody HashMap<String,Object> map){
        map.put("email",(String)session.getAttribute("email"));

        if((boolean)map.get("isRecommended")==true){
            evaluateSBO.deleteRecommend(map);
            return false;
        }else{
            evaluateSBO.addRecommend(map);
            return true;
        }
    }

}
