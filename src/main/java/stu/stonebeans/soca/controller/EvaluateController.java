package stu.stonebeans.soca.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.vo.EvaluateResultVO;
import stu.stonebeans.soca.vo.EvaluateVO;
import stu.stonebeans.soca.vo.ResultVO;
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
    public List<SubjectVO> findSubByProf(@RequestBody HashMap<String, String> map) {
        String nowItem = map.get("nowItem");
        String num = map.get("num");
        List<SubjectVO> returnVal = evaluateSBO.findSubByProf(nowItem, num);
        return returnVal;
    }

    @RequestMapping(value = "/findProfBySubstr", method = RequestMethod.POST)
    public List<String> findProfBySubstr(@RequestBody HashMap<String, String> map) {
        String nowItem = map.get("nowItem");
        String num = map.get("num");
        List<String> returnVal = evaluateSBO.findProfBySubstr(nowItem, num);
        return returnVal;
    }


    // 최근 강의 평가 가져오기
    @RequestMapping(value = "/getRecentEval", method = RequestMethod.POST)
    public List<EvaluateVO> getRecentEval(@RequestBody HashMap<String,Integer> map) {
        return evaluateSBO.getRecentEval(map);
    }

    //강의 평가 결과를 저장
    @RequestMapping(value = "/saveEvaluateWrite",method=RequestMethod.POST)
    public void saveEvaluateWrite(HttpSession session, @RequestBody EvaluateVO evaluateVO){
        evaluateVO.setEmail((String)session.getAttribute("email"));
        evaluateSBO.saveEvaluateWrite(evaluateVO);
    }

    //학생의 강의 평가 결과를 가져옴
    @RequestMapping(value="/getEvaluateComplete",method=RequestMethod.POST)
    public EvaluateVO getEvaluateComplete(HttpSession session,@RequestBody HashMap<String,String> map){
        map.put("email",(String)session.getAttribute("email"));
        return evaluateSBO.getEvaluateComplete(map);
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

    //강의평가 과목별 결과 가져오기
   @RequestMapping(value="/getEvaluateData",method = RequestMethod.POST)
    public EvaluateResultVO getEvaluateData(@RequestBody HashMap<String,String> map){
       return evaluateSBO.getEvaluateData(map);
    }

    //항목별 count 가져오기
    @RequestMapping(value="/getSelectCount",method=RequestMethod.POST)
    public int[] getSelectCount(@RequestBody HashMap<String,String> map){
        return evaluateSBO.getSelectCount(map);
    }

    // 현재과목의 최근 강의 평가 가져오기
    @RequestMapping(value = "/getRecentSubjectEval", method = RequestMethod.POST)
    public List<EvaluateVO> getRecentSubjectEval(@RequestBody HashMap<String,String> map) {
        return evaluateSBO.getRecentSubjectEval(map);
    }

    //주어진 postNum의 강의 평가 결과를 가져옴
    @RequestMapping(value="/getEvalCompleteByPostNum",method=RequestMethod.POST)
    public EvaluateVO getEvalCompleteByPostNum(@RequestBody HashMap<String,Integer> map){
        return evaluateSBO.getEvalCompleteByPostNum(map);
    }

    // 선택된 과목의 강의 평가 가져오기
    @RequestMapping(value="/findSelected", method=RequestMethod.POST)
    public List<EvaluateVO> findSelected(@RequestBody HashMap<String,Object> map) {
        return evaluateSBO.findSelected(map);
    }

    //강의 평가 전체 개수 가져오기
    @RequestMapping(value = "/getRecentEvalCnt", method = RequestMethod.POST)
    public Integer getRecentEvalCnt() {
        return evaluateSBO.getRecentEvalCnt();
    }

    // 인기 강의 가져오기
    @RequestMapping(value = "/getFavoriteSub", method = RequestMethod.POST)
    public List<SubjectVO> getFavoriteSub() { return evaluateSBO.getFavoriteSub(); }

    // 인기 교수 가져오기
    @RequestMapping(value = "/getFavoriteProf", method = RequestMethod.POST)
    public List<String> getFavoriteProf() { return evaluateSBO.getFavoriteProf(); }

    // 과목코드 -> 과목명 가져오기
    @RequestMapping(value = "/getSubByCode", method = RequestMethod.POST)
    public List<String> getSubByCode(@RequestBody String code) {
        return evaluateSBO.getSubByCode(code.substring(1, 8));
    }
}
