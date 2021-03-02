package stu.stonebeans.soca.sbo.impl;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import stu.stonebeans.soca.config.PropertyUtil;
import stu.stonebeans.soca.sbo.EvaluateSBO;
import stu.stonebeans.soca.sbo.MailSBO;
import stu.stonebeans.soca.sbo.StudentSBO;
import stu.stonebeans.soca.vo.*;
import stu.stonebeans.soca.dao.StudentDAO;
import stu.stonebeans.soca.dao.EvaluateDAO;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@Service
@AllArgsConstructor
public class EvaluateSBOImpl implements EvaluateSBO {

    @Autowired
    private EvaluateDAO evaluateDAO;

    @Override
    public SubjectVO getSubjectData(String subjectID){
        return evaluateDAO.getSubjectData(subjectID);
    }

    @Override
    public List<SubjectVO> getAllMajors() { return evaluateDAO.getAllMajors(); }

    @Override
    public List<SubjectVO> findSubjects(int num) {
        if(num == 1) {
            return evaluateDAO.getSubjectsBySub();
        } else if(num == 2) {
            return evaluateDAO.getSubjectsByProf();
        } else if(num == 3) {
            return evaluateDAO.getThisYearSubjects();
        } else if(num == 4) {
            return evaluateDAO.getThisYearProf();
        } else {
            return null;
        }
    }

    @Override
    public List<String> findProfBySubject(String nowItem, String num)
    {
        if(num.equals("1")) {
            return evaluateDAO.findProfBySubject(nowItem);
        } else {
            return evaluateDAO.findThisYearProf(nowItem);
        }
    }

    @Override
    public List<SubjectVO> findSubByProf(String nowItem, String num) {
        if(num.equals("1")) {
            return evaluateDAO.findSubByProf(nowItem);
        } else {
            return evaluateDAO.findThisYearSub(nowItem);
        }
    }

    @Override
    public List<String> findProfBySubstr(String nowItem, String num) {
        if(num.equals("1")) {
            return evaluateDAO.findSubBySubstr(nowItem + "%");
        } else {
            return evaluateDAO.findThisYearBySubstr(nowItem + "%");
        }
    }

    @Override
    public List<EvaluateVO> getRecentEval() {
        return evaluateDAO.getRecentEval();
    }

    //강의 평가 저장하기
    @Override
    public void saveEvaluateWrite(EvaluateVO evaluateVO){
        evaluateDAO.saveEvaluateWrite(evaluateVO);
    }

    //학생의 강의 평가 결과를 가져옴
    @Override
    public EvaluateVO getEvaluateComplete(HashMap<String,String> map){ return evaluateDAO.getEvaluateComplete(map);}

    //추천 했는지 여부를 확인
    @Override
    public boolean isRecommended( HashMap<String,Object> map){
        HashMap<String,Object> result=evaluateDAO.isRecommended(map);
        if(result==null) return false;
        else return true;
    }

    //추천하기
    @Override
    public void addRecommend(HashMap<String,Object> map){ evaluateDAO.addRecommend(map);}

    //추천해제하기
    @Override
    public void deleteRecommend(HashMap<String,Object> map){ evaluateDAO.deleteRecommend(map);}

    //강의평가 과목별 결과 가져오기
    @Override
    public EvaluateResultVO getEvaluateData(HashMap<String,String> map){/*HashMap<String,Object>*/
        //if(evaluateDAO.getEvaluateData(map)==null) return "false";
        //else return "true";
       /* HashMap<String,Object> result= evaluateDAO.getEvaluateData(map);
        HashMap<String,Object> s=new HashMap<>();
        s.put("email",2);*/
        //return "ahwl";
        /*HashMap<String,Object> data=new HashMap<>();
        data.put("evaluationAvg", result.get("AVG(evaluation)"));
        data.put("evaluationCnt", result.get("COUNT(evaluation)"));
        data.put("qualityAvg", result.get("AVG(quality)"));
        data.put("gradeSatisAvg",result.get("AVG(gradeSatis)"));
        data.put("difficultyAvg",result.get("AVG(difficulty)"));
        data.put("homeworkAvg",result.get("AVG(homework)"));
        data.put("coverageAvg",result.get("AVG(coverage)"));
*/
      //  return result;
        return evaluateDAO.getEvaluateData(map);
    }
}
